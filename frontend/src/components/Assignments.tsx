import { useEffect, useState } from "react";
import "../styles/assignments.scss";
import { useNavigate } from "react-router-dom";

type Assignment = {
    _id: string;
    title: string;
    difficulty: string;
    description: string;
};

const Assignments = () => {
    const [error, setError] = useState("");
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAssignments = async () => {
            setError("");
            try {
                const res = await fetch("http://localhost:5000/api/assignments", {
                    method: "GET",
                    credentials: "include"
                });
                const data = await res.json();
                setAssignments(data.data);
            } catch (error) {
                console.log("Error fetching assignments", error);
                setError("Something went wrong. Please try again.");
            }
        };

        fetchAssignments();
    }, []);

    return (
        <div className="assignments">
            <h2>Assignments</h2>
            {error && <p className="assignment__error">{error}</p>}
            <div className="assignments__list">
                {assignments.length > 0 && assignments.map((a) => (
                    <div key={a._id} className="assignments__card">
                        <div>
                            <h3>Q. {a.title}</h3>
                            <p>{a.description}</p>
                            <span className="assignments__difficulty">{a.difficulty}</span>
                        </div>
                        <div className="assignments__btnbox">
                            <button onClick={() => navigate(`/assignment/${a._id}`)}>Attempt</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Assignments;