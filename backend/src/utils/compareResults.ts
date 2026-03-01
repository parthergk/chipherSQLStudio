export default function compareResults(resultRows: any[], expected: any) {
  if (resultRows.length > 0) {
    if (resultRows.length !== expected.value.length) return false;
    const normalize = (arr:any[]) => arr.map((obj) => JSON.stringify(obj)).sort();

    return (
      JSON.stringify(normalize(resultRows)) === JSON.stringify(normalize(expected.value))
    );
  }

  return false;
}
