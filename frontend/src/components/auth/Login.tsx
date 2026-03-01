import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth.scss";

export default function Login() {
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
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Login failed");
                return;
            }

            setMessage("Login successful!");

            setTimeout(() => {
                navigate("/assignments");
            }, 2000);

        } catch (err) {
            console.log("Error",err);
            
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="auth">
            <form className="auth__form" onSubmit={handleSubmit}>
                <h2 className="auth__title">Login</h2>

                {message && <p className="auth__message">{message}</p>}
                {error && <p className="auth__error">{error}</p>}

                <div className="auth__field">
                    <label>Username</label>
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
                    Login
                </button>
                 <p className="auth__footer">
                    Don't have account <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    );
}