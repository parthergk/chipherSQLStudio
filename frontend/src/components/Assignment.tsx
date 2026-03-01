import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

const Assignment = () => {
  const { id } = useParams()
  const [assignment, setAssignment] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssignment = async () => {
      setError("");
      try {
        const res = await fetch(`http://localhost:5000/api/assignment/${id}`, {
          method: "GET",
          credentials: "include"
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

  return (
    <div>Assignment</div>
  )
}

export default Assignment