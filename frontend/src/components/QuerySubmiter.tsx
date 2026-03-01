import Editor from "@monaco-editor/react";
import { useState } from "react";

export default function QuerySubmiter({ id }: { id: string }) {
    const [query, setQuery] = useState<string>("SELECT * FROM employees");
    const [rows, setRows] = useState<any[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [attemptCount, setAttemptCount] = useState<number | null>(null);
    const [isCompleted, setIsCompleted] = useState<boolean | null>(null);

    const submitQuery = async () => {
        setError("");
        setRows([]);

        try {
            setLoading(true);

            const res = await fetch("http://localhost:5000/api/query", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    assId: id,
                    query,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Query failed");
                { setIsCompleted(data.isCompleted && data.isCompleted) }
                { setAttemptCount(data.attemptCount && data.attemptCount) }
                return;
            }


            setRows(data.rows || []);
            setAttemptCount(data.attemptCount);
            setIsCompleted(data.isCompleted);

        } catch (err) {
            console.log(err);
            setError("Something went wrong while executing query");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="assignment__right">

            <div className="assignment__editor">
                <div style={{ height: "250px", border: "1px solid #ccc" }}>
                    <Editor
                        height="100%"
                        defaultLanguage="sql"
                        defaultValue={query}
                        theme="vs-dark"
                        onChange={(value) => value && setQuery(value)}
                    />
                </div>

            </div>

            <div className="assignment__run-btn-container">
                <button className="assignment__run-btn" onClick={submitQuery} disabled={loading}>
                    {loading ? "Running..." : "Run Query"}
                </button>
            </div>

            <div className="assignment__result">

                <div className="assignment__progress">
                    <p>Attempts: {attemptCount !== null ? attemptCount : 0}</p>
                    <p>
                        Result Match:{" "}
                        <strong style={{ color: isCompleted ? "green" : "red" }}>
                            {
                                isCompleted === null ? "None" : (isCompleted ? "Correct" : "Incorrect")
                            }

                        </strong>
                    </p>
                </div>

                {error && <p className="assignment__result-error">{error}</p>}

                {rows.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                {Object.keys(rows[0]).map((key) => (
                                    <th key={key}>{key}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {rows.map((row, i) => (
                                <tr key={i}>
                                    {Object.values(row).map((val, idx) => (
                                        <td key={idx}>{String(val)}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}