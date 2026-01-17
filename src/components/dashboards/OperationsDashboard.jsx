'use client';

import { useMemo } from 'react';
import useCsvData from '@/lib/useCsvData';
import PlotlyChart from '@/components/charts/PlotlyChart';

export default function OperationsDashboard({ initialRows = [] }) {
  const { rows: loadedRows, isLoading, error, reload } = useCsvData('/sample-data/sample_operations.csv', {
    initialRows
  });
  const dataRows = loadedRows.length ? loadedRows : initialRows;

  const oeeOverTime = useMemo(
    () => {
      const data = groupAvgByDate(dataRows, 'date', 'oee_score');
      return { ...data, values: data.values.map(roundValue) };
    },
    [dataRows]
  );
  const downtimeByLine = useMemo(
    () => {
      const data = groupSum(dataRows, 'production_line', 'downtime_hours');
      return { ...data, values: data.values.map(roundValue) };
    },
    [dataRows]
  );
  const defectRateByMachine = useMemo(
    () => groupAvgRatio(dataRows, 'machine_id', 'defect_count', 'units_produced'),
    [dataRows]
  );
  const unitsByMachine = useMemo(
    () => groupSum(dataRows, 'machine_id', 'units_produced'),
    [dataRows]
  );
  const rankedDefects = useMemo(() => {
    const ranked = defectRateByMachine.labels.map((label, idx) => ({
      label,
      value: defectRateByMachine.values[idx],
      units: unitsByMachine.map.get(label) || 0
    }));
    ranked.sort((a, b) => b.value - a.value);
    const top = ranked.slice(0, 10);
    return {
      labels: top.map(item => truncateLabel(item.label, 12)),
      fullLabels: top.map(item => item.label),
      values: top.map(item => Math.round(item.value * 100)),
      units: top.map(item => item.units)
    };
  }, [defectRateByMachine, unitsByMachine]);

  if (!dataRows.length && isLoading) return <div className="text-white/60">Loading...</div>;
  if (!dataRows.length && error) {
    return (
      <div className="text-white/60">
        Unable to load data.
        <button type="button" onClick={reload} className="ml-2 text-white underline underline-offset-4">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* OEE Over Time */}
      <div className="col-span-2">
        <h3 className="text-lg font-semibold mb-4 text-white">OEE Score Over Time</h3>
        <PlotlyChart
          data={[{
            x: oeeOverTime.dates,
            y: oeeOverTime.values,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: '#5AE0C1', size: 6 },
            line: { width: 2, color: '#5AE0C1' },
            fill: 'tozeroy',
            fillcolor: 'rgba(90, 224, 193, 0.15)',
            hovertemplate: '%{x}<br>%{y:.0f}<extra></extra>'
          }]}
          layout={{
            ...plotlyLayout,
            xaxis: { ...plotlyLayout.xaxis, tickangle: -25 },
            yaxis: { ...plotlyLayout.yaxis, title: { text: 'OEE Score', standoff: 10 }, tickformat: '.0f' }
          }}
          config={{ displayModeBar: false, responsive: true }}
          style={{ width: '100%', height: '280px' }}
        />
      </div>

      {/* Downtime by Line */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">Downtime Hours by Line</h3>
        <PlotlyChart
          data={[{
            type: 'barpolar',
            r: downtimeByLine.values,
            theta: downtimeByLine.labels.map(l => truncateLabel(l, 10)),
            marker: {
              color: downtimeByLine.values,
              colorscale: [
                [0, 'rgba(123, 124, 255, 0.5)'],
                [1, '#7B7CFF']
              ],
              line: { color: 'rgba(255,255,255,0.3)', width: 1 }
            },
            hovertemplate: '%{theta}: %{r:.0f} hrs<extra></extra>'
          }]}
          layout={{
            ...plotlyLayout,
            polar: {
              bgcolor: 'rgba(0,0,0,0)',
              radialaxis: {
                visible: true,
                color: '#9EB0C9',
                gridcolor: 'rgba(255,255,255,0.1)',
                linecolor: 'rgba(255,255,255,0.1)',
                tickfont: { color: '#9EB0C9', size: 10 },
                ticksuffix: 'h'
              },
              angularaxis: {
                color: '#E5ECF6',
                gridcolor: 'rgba(255,255,255,0.1)',
                linecolor: 'rgba(255,255,255,0.15)',
                tickfont: { color: '#E5ECF6', size: 10 }
              }
            },
            margin: { l: 40, r: 40, t: 20, b: 20 }
          }}
          config={{ displayModeBar: false, responsive: true }}
          style={{ width: '100%', height: '280px' }}
        />
      </div>

      {/* Defect Rate Ranking */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">Defect Rate by Machine (Top 10)</h3>
        <PlotlyChart
          data={[
            // Stems (lines from 0 to value)
            ...rankedDefects.labels.map((label, idx) => ({
              type: 'scatter',
              mode: 'lines',
              x: [0, rankedDefects.values[idx]],
              y: [label, label],
              line: { color: 'rgba(255,255,255,0.3)', width: 2 },
              hoverinfo: 'skip',
              showlegend: false
            })),
            // Dots at the end
            {
              type: 'scatter',
              mode: 'markers+text',
              x: rankedDefects.values,
              y: rankedDefects.labels,
              text: rankedDefects.values.map(v => `${v}%`),
              textposition: 'middle right',
              textfont: { color: '#ffffff', size: 11 },
              marker: {
                size: 14,
                color: rankedDefects.values,
                colorscale: [
                  [0, '#5AE0C1'],
                  [0.5, '#FFB86C'],
                  [1, '#FF6B6B']
                ],
                line: { color: '#ffffff', width: 2 }
              },
              customdata: rankedDefects.units,
              hovertemplate: '%{y}<br>Defect Rate: %{x}%<br>Units: %{customdata:,}<extra></extra>',
              showlegend: false
            }
          ]}
          layout={{
            ...plotlyLayout,
            margin: { l: 90, r: 50, t: 10, b: 40 },
            xaxis: { ...plotlyLayout.xaxis, title: { text: 'Defect Rate (%)', standoff: 10 }, range: [0, Math.max(...rankedDefects.values) * 1.2], tickformat: '.0f' },
            yaxis: { ...plotlyLayout.yaxis, automargin: true }
          }}
          config={{ displayModeBar: false, responsive: true }}
          style={{ width: '100%', height: '280px' }}
        />
      </div>
    </div>
  );
}

const plotlyLayout = {
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor: 'rgba(0,0,0,0)',
  font: {
    family: '-apple-system, BlinkMacSystemFont, sans-serif',
    color: '#E5ECF6',
    size: 11
  },
  margin: { l: 60, r: 20, t: 10, b: 50 },
  xaxis: {
    showgrid: true,
    gridcolor: 'rgba(255,255,255,0.08)',
    gridwidth: 1,
    automargin: true,
    tickfont: { color: '#9EB0C9' },
    zerolinecolor: 'rgba(255,255,255,0.15)'
  },
  yaxis: {
    showgrid: true,
    gridcolor: 'rgba(255,255,255,0.08)',
    gridwidth: 1,
    automargin: true,
    tickfont: { color: '#9EB0C9' },
    zerolinecolor: 'rgba(255,255,255,0.15)'
  },
  showlegend: false,
  autosize: true
};

function truncateLabel(label, maxLength) {
  if (!label || label.length <= maxLength) return label;
  return label.substring(0, maxLength) + '...';
}

function toNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

function roundValue(value) {
  return Math.round(toNumber(value));
}

function groupSum(rows, key, valueKey) {
  const map = new Map();
  rows.forEach(row => {
    const label = row[key];
    if (!label) return;
    map.set(label, (map.get(label) || 0) + toNumber(row[valueKey]));
  });

  const labels = Array.from(map.keys());
  const values = labels.map(label => map.get(label));
  return { labels, values, map };
}

function groupAvgByDate(rows, dateKey, valueKey) {
  const totals = new Map();
  const counts = new Map();
  rows.forEach(row => {
    const date = row[dateKey];
    if (!date) return;
    totals.set(date, (totals.get(date) || 0) + toNumber(row[valueKey]));
    counts.set(date, (counts.get(date) || 0) + 1);
  });

  const dates = Array.from(totals.keys()).sort((a, b) => new Date(a) - new Date(b));
  const values = dates.map(date => totals.get(date) / counts.get(date));
  return { dates, values };
}

function groupAvgRatio(rows, key, numeratorKey, denominatorKey) {
  const totals = new Map();
  const counts = new Map();
  rows.forEach(row => {
    const label = row[key];
    const denominator = toNumber(row[denominatorKey]);
    if (!label || denominator === 0) return;
    const ratio = toNumber(row[numeratorKey]) / denominator;
    totals.set(label, (totals.get(label) || 0) + ratio);
    counts.set(label, (counts.get(label) || 0) + 1);
  });

  const labels = Array.from(totals.keys());
  const values = labels.map(label => totals.get(label) / counts.get(label));
  return { labels, values };
}
