export function generateRecommendations(fileAnalysis) {
  if (!fileAnalysis || !Array.isArray(fileAnalysis.recommendations)) {
    return [];
  }

  return fileAnalysis.recommendations.map(item => ({
    type: item.type,
    description: item.description,
    columns: item.columns
  }));
}
