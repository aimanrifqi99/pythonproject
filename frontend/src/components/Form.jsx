// src/components/Form.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "./Form.css";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(""); // State for email (only for registration)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            let payload = { username, password };
            if (method === "register") {
                payload.email = email; // Include email in registration
            }

            const res = await api.post(route, payload);
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                alert("Registration successful! Please log in.");
                navigate("/login");
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                // Display server-side validation errors
                const messages = Object.values(error.response.data).flat();
                alert(messages.join("\n"));
            } else {
                alert("An error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            {method === "register" && (
                <input
                    className="form-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
            )}
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button className="form-button" type="submit" disabled={loading}>
                {name}
            </button>
            <div className="form-footer">
                {method === "login" ? (
                    <p>
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                ) : (
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                )}
            </div>
        </form>
    );
}

export default Form;
