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
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/assignments", {
                    credentials: "include"
                });
                const data = await res.json();
                setAssignments(data.data);
            } catch (error) {
                console.log("Error fetching assignments", error);
            }
        };

        fetchAssignments();
    }, []);

    return (
        <div className="assignments">
            <h2>Assignments</h2>
            <div className="assignments__list">
                {assignments.map((a) => (
                    <div key={a._id} className="assignments__card">
                        <div>
                            <h3>Q. {a.title}</h3>
                            <p>{a.description}</p>
                            <span className="assignments__difficulty">{a.difficulty}</span>
                        </div>
                        <div className="assignments__btnbox">
                            <button onClick={()=> navigate(`/assignment/${a._id}`)}>Attempt</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Assignments;