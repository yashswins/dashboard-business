import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export async function analyzeDataFile(buffer, filename) {
  const extension = filename.split('.').pop().toLowerCase();
  let data;

  if (extension === 'csv') {
    const text = buffer.toString('utf-8');
    data = Papa.parse(text, { header: true, dynamicTyping: true }).data;
  } else if (extension === 'xlsx' || extension === 'xls') {
    const workbook = XLSX.read(buffer);
    const sheetName = workbook.SheetNames[0];
    data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  } else {
    throw new Error('Unsupported file type');
  }

  // Analyze the data
  const columns = Object.keys(data[0] || {});
  const rowCount = data.length;

  const columnAnalysis = columns.map(col => {
    const values = data.map(row => row[col]).filter(v => v !== null && v !== undefined);
    const nonNullCount = values.length;
    const nullCount = rowCount - nonNullCount;

    // Detect data type
    const numericValues = values.filter(v => typeof v === 'number' || !isNaN(Number(v)));
    const isNumeric = numericValues.length / values.length > 0.8;

    const dateValues = values.filter(v => !isNaN(Date.parse(v)));
    const isDate = dateValues.length / values.length > 0.8;

    let dataType = 'text';
    if (isNumeric) dataType = 'numeric';
    else if (isDate) dataType = 'date';
    else if (new Set(values).size < values.length * 0.1) dataType = 'categorical';

    return {
      name: col,
      dataType,
      nullCount,
      sampleValues: values.slice(0, 5),
      uniqueCount: new Set(values).size
    };
  });

  // Generate recommendations
  const numericColumns = columnAnalysis.filter(c => c.dataType === 'numeric');
  const dateColumns = columnAnalysis.filter(c => c.dataType === 'date');
  const categoricalColumns = columnAnalysis.filter(c => c.dataType === 'categorical');

  const recommendations = [];

  if (dateColumns.length > 0 && numericColumns.length > 0) {
    recommendations.push({
      type: 'Time Series Chart',
      description: `Track ${numericColumns[0].name} over time`,
      columns: [dateColumns[0].name, numericColumns[0].name]
    });
  }

  if (categoricalColumns.length > 0 && numericColumns.length > 0) {
    recommendations.push({
      type: 'Bar Chart',
      description: `Compare ${numericColumns[0].name} across ${categoricalColumns[0].name}`,
      columns: [categoricalColumns[0].name, numericColumns[0].name]
    });
  }

  if (numericColumns.length >= 2) {
    recommendations.push({
      type: 'Scatter Plot',
      description: `Correlation between ${numericColumns[0].name} and ${numericColumns[1].name}`,
      columns: [numericColumns[0].name, numericColumns[1].name]
    });
  }

  // Generate summary for LLM
  const summary = `
Your file contains ${rowCount} rows and ${columns.length} columns.

Key columns identified:
${numericColumns.length > 0 ? `- Numeric: ${numericColumns.map(c => c.name).join(', ')}` : ''}
${dateColumns.length > 0 ? `- Date/Time: ${dateColumns.map(c => c.name).join(', ')}` : ''}
${categoricalColumns.length > 0 ? `- Categories: ${categoricalColumns.map(c => c.name).join(', ')}` : ''}

Recommended visualizations:
${recommendations.map(r => `- ${r.type}: ${r.description}`).join('\n')}
  `.trim();

  // Get top 5 rows as sample data for LLM analysis
  const sampleData = data.slice(0, 5);

  return {
    rowCount,
    columnCount: columns.length,
    columns, // Just column names as strings
    columnAnalysis, // Detailed analysis per column
    sampleData, // Top 5 rows for LLM context
    recommendations,
    summary
  };
}
