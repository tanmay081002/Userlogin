import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnteredPassword, setReEnteredPassword] = useState(""); // New state for re-entered password
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();

    if (password !== reEnteredPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/Signup", {
        email,
        password,
      });

      if (response.data === "exist") {
        setError("User already exists");
      } else if (response.data === "notexist") {
        navigate("/home", { state: { id: email } });
      }
    } catch (e) {
      setError("Wrong details");
      console.error(e);
    }
  }

  return (
    <div className="login">
      <h1>Create account</h1>

      <form onSubmit={submit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create Password"
          required
        />
        <input
          type="password"
          name="renter"
          value={reEnteredPassword}
          onChange={(e) => setReEnteredPassword(e.target.value)}
          placeholder="Re Enter Password"
          required
        />

        <button type="submit">Submit</button>
      </form>

      {error && <p>{error}</p>}

      <p>OR</p>

      <Link to="/">Login</Link>
    </div>
  );
}

export default Signup;
