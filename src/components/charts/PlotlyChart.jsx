'use client';

import { useState, useEffect, useSyncExternalStore, useId } from 'react';

let PlotlyComponent = null;
let plotlyLoadPromise = null;
const listeners = new Set();

const notifyListeners = () => {
  listeners.forEach((listener) => listener());
};

const loadPlotly = () => {
  if (PlotlyComponent) {
    return Promise.resolve(PlotlyComponent);
  }
  if (!plotlyLoadPromise) {
    plotlyLoadPromise = import('react-plotly.js')
      .then((mod) => {
        PlotlyComponent = mod.default || mod;
        notifyListeners();
        return PlotlyComponent;
      })
      .catch((err) => {
        plotlyLoadPromise = null;
        throw err;
      });
  }
  return plotlyLoadPromise;
};

const subscribe = (callback) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};

const getSnapshot = () => PlotlyComponent;
const getServerSnapshot = () => null;

export const prefetchPlotly = () => {
  if (typeof window === 'undefined') return;
  loadPlotly().catch(() => {});
};

function LoadingSkeleton({ height }) {
  return (
    <div
      className="w-full rounded-2xl border border-white/10 bg-white/5 animate-pulse"
      style={{ height }}
    />
  );
}

export default function PlotlyChart(props) {
  const height = props?.style?.height || '260px';
  const Plot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isReady, setIsReady] = useState(false);
  const chartId = useId();

  useEffect(() => {
    if (!Plot) {
      loadPlotly().catch(() => {});
    }
  }, [Plot]);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setIsReady(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  if (!Plot || !isReady) {
    return <LoadingSkeleton height={height} />;
  }

  return (
    <Plot
      key={chartId}
      {...props}
      style={{ ...props.style, height }}
      useResizeHandler
      layout={{
        ...props.layout,
        autosize: true
      }}
    />
  );
}
