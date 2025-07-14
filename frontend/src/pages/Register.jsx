import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const registerUser = async () => {
    const URI = "http://localhost:5000/api/auth/register";
    await axios.post(URI, { username, password });
    alert("Registered.. Login Now");
  };
  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={registerUser}>Register</button>
    </div>
  );
}

export default Register;
