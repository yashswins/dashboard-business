'use client';

import { useMemo } from 'react';
import useCsvData from '@/lib/useCsvData';
import PlotlyChart from '@/components/charts/PlotlyChart';

export default function MarketingDashboard({ initialRows = [] }) {
  const { rows: loadedRows, isLoading, error, reload } = useCsvData('/sample-data/sample_marketing.csv', {
    initialRows
  });
  const dataRows = loadedRows.length ? loadedRows : initialRows;

  const roasByChannel = useMemo(
    () => {
      const data = groupAvg(dataRows, 'channel', 'roas');
      return { ...data, values: data.values.map(roundValue) };
    },
    [dataRows]
  );
  const impressionsOverTime = useMemo(
    () => {
      const data = groupSumByDate(dataRows, 'date', 'impressions');
      return { ...data, values: data.values.map(roundValue) };
    },
    [dataRows]
  );
  const clicksOverTime = useMemo(
    () => {
      const data = groupSumByDate(dataRows, 'date', 'clicks');
      return { ...data, values: data.values.map(roundValue) };
    },
    [dataRows]
  );
  // Calculate CTR (Click-through rate) = clicks / impressions * 100
  const ctrOverTime = useMemo(() => {
    const dates = impressionsOverTime.dates;
    const values = dates.map((date, idx) => {
      const impressions = impressionsOverTime.values[idx];
      const clicks = clicksOverTime.values[idx];
      return impressions > 0 ? (clicks / impressions) * 100 : 0;
    });
    return { dates, values: values.map(roundValue) };
  }, [impressionsOverTime, clicksOverTime]);
  const ctrStats = useMemo(() => {
    if (!ctrOverTime.values.length) {
      return { latest: 0, average: 0, gaugeMax: 5 };
    }
    const total = ctrOverTime.values.reduce((sum, value) => sum + toNumber(value), 0);
    const average = roundValue(total / ctrOverTime.values.length);
    const latest = roundValue(ctrOverTime.values[ctrOverTime.values.length - 1]);
    const maxValue = Math.max(5, ...ctrOverTime.values);
    const gaugeMax = Math.ceil(maxValue / 5) * 5;
    return { latest, average, gaugeMax };
  }, [ctrOverTime]);
  const conversionsByCampaign = useMemo(
    () => {
      const data = groupSum(dataRows, 'campaign_name', 'conversions');
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
      {/* ROAS by Channel */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">ROAS by Channel</h3>
        <PlotlyChart
          data={[{
            type: 'scatterpolar',
            r: [...roasByChannel.values, roasByChannel.values[0]],
            theta: [...roasByChannel.labels, roasByChannel.labels[0]],
            fill: 'toself',
            fillcolor: 'rgba(124, 201, 255, 0.25)',
            line: { color: '#7CC9FF', width: 2 },
            marker: { color: '#7CC9FF', size: 8, line: { color: '#ffffff', width: 2 } },
            hovertemplate: '%{theta}: %{r:.0f}<extra></extra>'
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
                tickfont: { color: '#9EB0C9', size: 10 }
              },
              angularaxis: {
                color: '#E5ECF6',
                gridcolor: 'rgba(255,255,255,0.1)',
                linecolor: 'rgba(255,255,255,0.15)',
                tickfont: { color: '#E5ECF6', size: 11 }
              }
            },
            margin: { l: 60, r: 60, t: 30, b: 30 }
          }}
          config={{ displayModeBar: false, responsive: true }}
          style={{ width: '100%', height: '280px' }}
        />
      </div>

      {/* Conversions by Campaign */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">Conversions by Campaign</h3>
        <PlotlyChart
          data={[{
            y: conversionsByCampaign.labels.map(l => truncateLabel(l, 12)),
            x: conversionsByCampaign.values,
            type: 'bar',
            orientation: 'h',
            marker: {
              color: conversionsByCampaign.values,
              colorscale: [
                [0, 'rgba(52, 199, 89, 0.4)'],
                [1, '#34C759']
              ],
              line: { color: 'rgba(255,255,255,0.2)', width: 1 }
            },
            customdata: conversionsByCampaign.labels,
            hovertemplate: '%{customdata}: %{x:,.0f}<extra></extra>',
            textposition: 'none'
          }]}
          layout={{
            ...plotlyLayout,
            margin: { l: 100, r: 20, t: 10, b: 40 },
            xaxis: { ...plotlyLayout.xaxis, title: { text: 'Conversions', standoff: 10 }, tickformat: ',.0f' },
            yaxis: { ...plotlyLayout.yaxis, automargin: true }
          }}
          config={{ displayModeBar: false, responsive: true }}
          style={{ width: '100%', height: '280px' }}
        />
      </div>

      {/* Impressions Over Time - separate chart */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">Impressions Over Time</h3>
        <PlotlyChart
          data={[{
            x: impressionsOverTime.dates,
            y: impressionsOverTime.values,
            type: 'scatter',
            mode: 'lines',
            name: 'Impressions',
            line: { width: 3, color: '#7CC9FF', shape: 'spline' },
            fill: 'tozeroy',
            fillcolor: 'rgba(124, 201, 255, 0.2)',
            hovertemplate: '%{x}<br>%{y:,.0f}<extra></extra>'
          }]}
          layout={{
            ...plotlyLayout,
            xaxis: { ...plotlyLayout.xaxis, tickangle: -25 },
            yaxis: { ...plotlyLayout.yaxis, title: { text: 'Impressions', standoff: 10 }, tickformat: ',.0f' }
          }}
          config={{ displayModeBar: false, responsive: true }}
          style={{ width: '100%', height: '280px' }}
        />
      </div>

      {/* Click-Through Rate Over Time */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">Click-Through Rate (CTR)</h3>
        <PlotlyChart
          data={[{
            type: 'indicator',
            mode: 'gauge+number+delta',
            value: ctrStats.latest,
            number: { suffix: '%', valueformat: '.0f', font: { color: '#E5ECF6', size: 32 } },
            delta: {
              reference: ctrStats.average,
              valueformat: '.0f',
              suffix: '%',
              increasing: { color: '#34C759' },
              decreasing: { color: '#FF6B6B' }
            },
            gauge: {
              axis: {
                range: [0, ctrStats.gaugeMax],
                tickformat: '.0f',
                tickcolor: '#9EB0C9',
                tickfont: { color: '#9EB0C9' }
              },
              bar: { color: '#FFB86C' },
              bgcolor: 'rgba(255,255,255,0.02)',
              borderwidth: 0,
              steps: [
                { range: [0, ctrStats.gaugeMax * 0.5], color: 'rgba(124, 201, 255, 0.12)' },
                { range: [ctrStats.gaugeMax * 0.5, ctrStats.gaugeMax * 0.8], color: 'rgba(124, 201, 255, 0.22)' },
                { range: [ctrStats.gaugeMax * 0.8, ctrStats.gaugeMax], color: 'rgba(124, 201, 255, 0.32)' }
              ],
              threshold: {
                line: { color: '#ffffff', width: 2 },
                thickness: 0.75,
                value: ctrStats.average
              }
            }
          }]}
          layout={{
            ...plotlyLayout,
            margin: { l: 30, r: 30, t: 20, b: 20 }
          }}
          config={{ displayModeBar: false, responsive: true }}
          style={{ width: '100%', height: '280px' }}
        />
        <p className="mt-3 text-xs text-white/50">
          Latest vs period average {ctrStats.average}%.
        </p>
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
  return { labels, values };
}

function groupAvg(rows, key, valueKey) {
  const totals = new Map();
  const counts = new Map();
  rows.forEach(row => {
    const label = row[key];
    if (!label) return;
    totals.set(label, (totals.get(label) || 0) + toNumber(row[valueKey]));
    counts.set(label, (counts.get(label) || 0) + 1);
  });

  const labels = Array.from(totals.keys());
  const values = labels.map(label => totals.get(label) / counts.get(label));
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
