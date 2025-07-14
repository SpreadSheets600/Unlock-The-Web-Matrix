import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginUser = async () => {
    try {
      const URI = "http://localhost:5000/api/auth/login";
      const res = await axios.post(URI, { username, password });

      localStorage.setItem("token", res.data.token);
      navigate("/", {
        replace: true,
      });
    } catch (err) {
      alert("Login failed! Please check your credentials...");
      console.log(err);
    }
  };
  return (
    <div>
      <h2>Login</h2>
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
      <button onClick={loginUser}>Login</button>
    </div>
  );
}

export default Login;
