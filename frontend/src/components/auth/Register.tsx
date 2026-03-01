import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth.scss";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Registration failed");
                return;
            }

            setMessage("Registration successful!");

            setTimeout(() => {
                navigate("/");
            }, 1500);

        } catch (err) {
            console.log("Error:", err);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="auth">
            <form className="auth__form" onSubmit={handleSubmit}>
                <h2 className="auth__title">Register</h2>

                {message && <p className="auth__message">{message}</p>}
                {error && <p className="auth__error">{error}</p>}

                <div className="auth__field">
                    <label >Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="auth__field">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="auth__btn">
                    Register
                </button>
                <p className="auth__footer">
                    Already registered <Link to="/">Login</Link>
                </p>
            </form>
        </div>
    );
}