import { useCallback, useEffect, useState } from 'react';
import Papa from 'papaparse';

const dataCache = new Map();
const inFlight = new Map();

const parseCsv = (csv) => {
  const parsed = Papa.parse(csv, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true
  }).data;

  if (!parsed || parsed.length === 0) {
    throw new Error('Empty dataset');
  }

  return parsed;
};

const loadCsv = (path, { timeoutMs = 6000 } = {}) => {
  if (dataCache.has(path)) {
    return Promise.resolve(dataCache.get(path));
  }

  if (inFlight.has(path)) {
    return inFlight.get(path);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const promise = fetch(path, { cache: 'force-cache', signal: controller.signal })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }
      return response.text();
    })
    .then((csv) => parseCsv(csv))
    .then((rows) => {
      dataCache.set(path, rows);
      return rows;
    })
    .finally(() => {
      clearTimeout(timeoutId);
      inFlight.delete(path);
    });

  inFlight.set(path, promise);
  return promise;
};

export const prefetchCsv = (path, options = {}) => {
  if (dataCache.has(path) || inFlight.has(path)) return;
  loadCsv(path, options).catch(() => {});
};

export default function useCsvData(path, options = {}) {
  const {
    retryCount = 2,
    retryDelay = 700,
    timeoutMs = 6000,
    initialRows = []
  } = options;
  const hasInitialRows = Array.isArray(initialRows) && initialRows.length > 0;
  const [rows, setRows] = useState(() => (hasInitialRows ? initialRows : []));
  const [isLoading, setIsLoading] = useState(() => !hasInitialRows);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const reload = useCallback(() => {
    dataCache.delete(path);
    inFlight.delete(path);
    setReloadKey((value) => value + 1);
  }, [path]);

  useEffect(() => {
    let isActive = true;

    const load = async () => {
      if (hasInitialRows && reloadKey === 0) {
        dataCache.set(path, initialRows);
        setRows(initialRows);
        setIsLoading(false);
        return;
      }

      if (dataCache.has(path)) {
        setRows(dataCache.get(path));
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      for (let attempt = 0; attempt <= retryCount; attempt += 1) {
        try {
          const parsed = await loadCsv(path, { timeoutMs });
          if (isActive) {
            setRows(parsed);
            setIsLoading(false);
          }
          return;
        } catch (err) {
          if (attempt >= retryCount) {
            if (isActive) {
              setRows([]);
              setError(err);
              setIsLoading(false);
            }
            return;
          }
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
      }
    };

    load();

    return () => {
      isActive = false;
    };
  }, [path, reloadKey, retryCount, retryDelay, timeoutMs, hasInitialRows, initialRows]);

  return { rows, isLoading, error, reload };
}
