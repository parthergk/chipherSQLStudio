import { useState } from "react";

const GetHint = ({ id }: { id: string }) => {
  const [hint, setHint] = useState("");
  const [error, setError] = useState("");
  const [loadingHint, setLoadingHint] = useState(false);

  const getHint = async () => {
    setError("");
    setHint("");

    try {
      setLoadingHint(true);

      const res = await fetch("http://localhost:5000/api/hint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ assigId: id }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to get hint");
        return;
      }

      setHint(data.data);
    } catch (err) {
      console.log(err);
      setError("Something went wrong while getting the hint");
    } finally {
      setLoadingHint(false);
    }
  };

  return (
    <div className="assignment__hint">
      <button onClick={getHint} disabled={loadingHint}>
        {loadingHint ? "Getting hint..." : "Get Hint"}
      </button>

      {hint && <p className="assignment__hint-text">{hint}</p>}
      {error && <p className="assignment__hint-error">{error}</p>}
    </div>
  );
};

export default GetHint;