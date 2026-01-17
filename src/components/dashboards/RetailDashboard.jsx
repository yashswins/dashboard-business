'use client';

import { useMemo } from 'react';
import useCsvData from '@/lib/useCsvData';
import PlotlyChart from '@/components/charts/PlotlyChart';

export default function RetailDashboard({ initialRows = [] }) {
  const { rows: loadedRows, isLoading, error, reload } = useCsvData('/sample-data/sample_retail.csv', {
    initialRows
  });
  const dataRows = loadedRows.length ? loadedRows : initialRows;

  const revenueOverTime = useMemo(
    () => {
      const data = groupSumByDate(dataRows, 'date', 'revenue');
      return { ...data, values: data.values.map(roundValue) };
    },
    [dataRows]
  );
  const revenueByCategory = useMemo(
    () => {
      const data = groupSum(dataRows, 'product_category', 'revenue');
      return { ...data, values: data.values.map(roundValue) };
    },
    [dataRows]
  );
  const topProducts = useMemo(
    () => {
      const data = topNBySum(dataRows, 'product_name', 'revenue', 10);
      return { ...data, values: data.values.map(roundValue) };
    },
    [dataRows]
  );

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
      {/* Revenue Trend */}
      <div className="col-span-2">
        <h3 className="text-lg font-semibold mb-4 text-white">Revenue Trend</h3>
        <PlotlyChart
          data={[{
            x: revenueOverTime.dates,
            y: revenueOverTime.values,
            type: 'scatter',
            mode: 'lines+markers',
            line: { color: '#7CC9FF', width: 2.5, shape: 'spline', smoothing: 0.8 },
            marker: { color: '#7CC9FF', size: 6, line: { color: '#ffffff', width: 1 } },
            fill: 'tozeroy',
            fillcolor: 'rgba(124, 201, 255, 0.15)',
            hovertemplate: '%{x}<br>$%{y:,.0f}<extra></extra>'
          }]}
          layout={{
            ...plotlyLayout,
            xaxis: { ...plotlyLayout.xaxis, tickangle: -25 },
            yaxis: { ...plotlyLayout.yaxis, title: { text: 'Revenue ($)', standoff: 10 }, tickformat: ',.0f', rangemode: 'tozero' }
          }}
          config={{ displayModeBar: false, responsive: true }}
          style={{ width: '100%', height: '280px' }}
        />
      </div>

      {/* Category Breakdown */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">Revenue by Category</h3>
        <PlotlyChart
          data={[{
            labels: revenueByCategory.labels,
            values: revenueByCategory.values,
            type: 'pie',
            hole: 0.5,
            marker: {
              colors: ['#7CC9FF', '#34C759', '#FFB86C', '#FF6B6B', '#7B7CFF'],
              line: { color: 'rgba(15,15,35,0.8)', width: 3 }
            },
            textposition: 'outside',
            textinfo: 'label+percent',
            texttemplate: '%{label}<br>%{percent:.0%}',
            textfont: { color: '#E5ECF6', size: 11 },
            hovertemplate: '%{label}: $%{value:,.0f}<extra></extra>',
            pull: [0.02, 0.02, 0.02, 0.02, 0.02]
          }]}
          layout={{
            ...plotlyLayout,
            margin: { l: 20, r: 20, t: 30, b: 30 },
            annotations: [{
              text: `$${(revenueByCategory.values.reduce((a, b) => a + b, 0) / 1000000).toFixed(1)}M`,
              x: 0.5,
              y: 0.5,
              font: { size: 18, color: '#E5ECF6', family: '-apple-system, BlinkMacSystemFont, sans-serif' },
              showarrow: false
            }]
          }}
          config={{ displayModeBar: false, responsive: true }}
          style={{ width: '100%', height: '280px' }}
        />
      </div>

      {/* Top Products */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">Top Products Treemap</h3>
        <PlotlyChart
          data={[{
            type: 'treemap',
            labels: topProducts.labels.map(l => truncateLabel(l, 18)),
            parents: topProducts.labels.map(() => ''),
            values: topProducts.values,
            textinfo: 'none',
            texttemplate: '%{label}<br>%{percentRoot:.0%}',
            textfont: { color: '#ffffff', size: 11 },
            marker: {
              colors: ['#7CC9FF', '#5AE0C1', '#7B7CFF', '#FFB86C', '#FF6B6B', '#9F8BFF', '#34C759', '#FFA45C', '#5AAEFF', '#F95D9B'],
              line: { color: '#ffffff', width: 1 }
            },
            hovertext: topProducts.labels,
            hovertemplate: '%{label}: $%{value:,.0f}<extra></extra>'
          }]}
          layout={{
            ...plotlyLayout,
            margin: { l: 10, r: 10, t: 10, b: 10 }
          }}
          config={{ displayModeBar: false, responsive: true }}
          style={{ width: '100%', height: '280px' }}
        />
      </div>
    </div>
  );
}

// Common Plotly layout for all charts
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
  return { labels, values };
}

function groupSumByDate(rows, dateKey, valueKey) {
  const map = new Map();
  rows.forEach(row => {
    const date = row[dateKey];
    if (!date) return;
    map.set(date, (map.get(date) || 0) + toNumber(row[valueKey]));
  });

  const dates = Array.from(map.keys()).sort((a, b) => new Date(a) - new Date(b));
  const values = dates.map(date => map.get(date));
  return { dates, values };
}

function topNBySum(rows, key, valueKey, limit) {
  const grouped = groupSum(rows, key, valueKey);
  const ranked = grouped.labels.map((label, idx) => ({
    label,
    value: grouped.values[idx]
  }));
  ranked.sort((a, b) => b.value - a.value);

  const top = ranked.slice(0, limit);
  return {
    labels: top.map(item => item.label),
    values: top.map(item => item.value)
  };
}

function truncateLabel(label, maxLength) {
  if (!label || label.length <= maxLength) return label;
  return label.substring(0, maxLength) + '...';
}
