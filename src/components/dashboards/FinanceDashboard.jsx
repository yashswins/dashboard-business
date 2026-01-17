'use client';

import { useMemo } from 'react';
import useCsvData from '@/lib/useCsvData';
import PlotlyChart from '@/components/charts/PlotlyChart';

export default function FinanceDashboard({ initialRows = [] }) {
  const { rows: loadedRows, isLoading, error, reload } = useCsvData('/sample-data/sample_finance.csv', {
    initialRows
  });
  const dataRows = loadedRows.length ? loadedRows : initialRows;

  const { departments, budgetValues, actualValues } = useMemo(() => {
    const budget = groupSum(dataRows, 'department', 'budget');
    const actual = groupSum(dataRows, 'department', 'transaction_amount');
    const departments = mergeLabels([budget.labels, actual.labels]);
    return {
      departments,
      budgetValues: mapToSeries(budget.map, departments).map(roundValue),
      actualValues: mapToSeries(actual.map, departments).map(roundValue)
    };
  }, [dataRows]);

  const varianceOverTime = useMemo(
    () => {
      const data = groupSumByDate(dataRows, 'date', 'variance');
      return { ...data, values: data.values.map(roundValue) };
    },
    [dataRows]
  );
  const spendByCategory = useMemo(
    () => {
      const data = groupSum(dataRows, 'category', 'transaction_amount');
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
      {/* Budget vs Actual */}
      <div className="col-span-2">
        <h3 className="text-lg font-semibold mb-4 text-white">Budget vs Actual by Department</h3>
        <PlotlyChart
          data={[
            // Budget bars (background, wider)
            {
              x: budgetValues,
              y: departments.map(d => truncateLabel(d, 14)),
              type: 'bar',
              orientation: 'h',
              name: 'Budget',
              marker: { color: 'rgba(148, 163, 184, 0.3)' },
              hovertemplate: '%{y}<br>Budget: $%{x:,.0f}<extra></extra>',
              width: 0.6
            },
            // Actual bars (foreground, thinner, colored by performance)
            {
              x: actualValues,
              y: departments.map(d => truncateLabel(d, 14)),
              type: 'bar',
              orientation: 'h',
              name: 'Actual',
              marker: {
                color: actualValues.map((actual, i) =>
                  actual <= budgetValues[i] ? '#34C759' : '#FF6B6B'
                )
              },
              hovertemplate: '%{y}<br>Actual: $%{x:,.0f}<extra></extra>',
              width: 0.3
            }
          ]}
          layout={{
            ...plotlyLayout,
            barmode: 'overlay',
            showlegend: true,
            legend: { orientation: 'h', y: 1.08, x: 0.5, xanchor: 'center', font: { color: '#E5ECF6' } },
            margin: { l: 110, r: 20, t: 30, b: 40 },
            xaxis: { ...plotlyLayout.xaxis, title: { text: 'Amount ($)', standoff: 10 }, tickformat: ',.0f' },
            yaxis: { ...plotlyLayout.yaxis, automargin: true }
          }}
          config={{ displayModeBar: false, responsive: true }}
          style={{ width: '100%', height: '300px' }}
        />
      </div>

      {/* Variance Over Time */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">Variance Over Time</h3>
        <PlotlyChart
          data={[{
            x: varianceOverTime.dates,
            y: varianceOverTime.values,
            type: 'bar',
            marker: {
              color: varianceOverTime.values.map(v => v >= 0 ? '#34C759' : '#FF6B6B'),
              line: { color: 'rgba(255,255,255,0.3)', width: 1 }
            },
            hovertemplate: '%{x}<br>$%{y:,.0f}<extra></extra>'
          }]}
          layout={{
            ...plotlyLayout,
            xaxis: { ...plotlyLayout.xaxis, tickangle: -25 },
            yaxis: { ...plotlyLayout.yaxis, title: { text: 'Variance ($)', standoff: 10 }, tickformat: ',.0f', zeroline: true, zerolinecolor: 'rgba(255,255,255,0.4)', zerolinewidth: 2 }
          }}
          config={{ displayModeBar: false, responsive: true }}
          style={{ width: '100%', height: '280px' }}
        />
      </div>

      {/* Spend by Category */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">Spend by Category</h3>
        <PlotlyChart
          data={[{
            x: spendByCategory.values,
            y: spendByCategory.labels,
            type: 'bar',
            orientation: 'h',
            marker: {
              color: spendByCategory.values,
              colorscale: [
                [0, '#7CC9FF'],
                [0.5, '#7B7CFF'],
                [1, '#FF6B6B']
              ],
              line: { color: 'rgba(255,255,255,0.3)', width: 1 }
            },
            text: spendByCategory.values.map(v => `$${(v / 1000).toFixed(0)}K`),
            textposition: 'inside',
            textangle: 0,
            insidetextanchor: 'end',
            textfont: { color: '#ffffff', size: 11 },
            hovertemplate: '%{y}: $%{x:,.0f}<extra></extra>'
          }]}
          layout={{
            ...plotlyLayout,
            margin: { l: 100, r: 20, t: 10, b: 40 },
            xaxis: { ...plotlyLayout.xaxis, title: { text: 'Spend ($)', standoff: 10 }, tickformat: ',.0f' },
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

function formatCurrency(value) {
  return roundValue(value).toLocaleString();
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

function mergeLabels(labelArrays) {
  return Array.from(new Set(labelArrays.flat()));
}

function mapToSeries(map, labels) {
  return labels.map(label => map.get(label) || 0);
}
