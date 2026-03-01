import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/assignment.scss";
import GetHint from "./GetHint";
import QuerySubmiter from "./QuerySubmiter";

const Assignment = () => {
  const { id } = useParams();

  const [assignment, setAssignment] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssignment = async () => {
      setError("");

      try {
        const res = await fetch(`http://localhost:5000/api/assignments/${id}`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        setAssignment(data.data);
      } catch (error) {
        console.log("Error fetching assignments", error);
        setError("Something went wrong. Please try again.");
      }
    };

    fetchAssignment();
  }, [id]);



  if (error) return <p>{error}</p>;
  if (!assignment) return <p>Loading...</p>;

  return (
    <div className="assignment">
      <div className="assignment__left">
        <h2 className="assignment__title">{assignment.title}</h2>
        <p className="assignment__desc">{assignment.description}</p>

        {assignment.sampleTables.map((table: any) => (
          <div key={table._id} className="assignment__table">
            <h4>Table: {table.tableName}</h4>

            <table>
              <thead>
                <tr>
                  {table.columns.map((col: any) => (
                    <th key={col._id}>{col.columnName}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {table.rows.map((row: any, i: number) => (
                  <tr key={i}>
                    {Object.values(row).map((val: any, idx) => (
                      <td key={idx}>{String(val)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        <div className="assignment__expected">
          <h4>Expected Output</h4>

          <table>
            <thead>
              <tr>
                {Object.keys(assignment.expectedOutput.value[0]).map(
                  (key) => (
                    <th key={key}>{key}</th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {assignment.expectedOutput.value.map((row: any, i: number) => (
                <tr key={i}>
                  {Object.values(row).map((v: any, idx) => (
                    <td key={idx}>{String(v)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {
          id && <GetHint id={id} />
        }
      </div>
      {
        id && <QuerySubmiter id={id} />
      }
    </div>
  );
};

export default Assignment;