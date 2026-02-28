type AssignmentPromptType = {
  title: string;
  difficulty: string;
  description: string;
  sampleTables: {
    tableName: string;
    columns: {
      columnName: string;
      dataType: string;
    }[];
  }[];
};

export function buildHintPrompt(assignment: AssignmentPromptType): string {
  return `
You are helping a student practice SQL.

Assignment Title: ${assignment.title}
Difficulty: ${assignment.difficulty}
Question: ${assignment.description}

Tables available:
${assignment.sampleTables
  .map(
    (t) =>
      `Table ${t.tableName} with columns: ${t.columns
        .map((c) => `${c.columnName} (${c.dataType})`)
        .join(", ")}`
  )
  .join("\n")}

Give a small hint that can guide the student in the right direction.

Important rules:
- Do NOT give the SQL query.
- Do NOT reveal the final answer.
- Only give a short conceptual hint.
- Maximum 2 sentences.
`;
}