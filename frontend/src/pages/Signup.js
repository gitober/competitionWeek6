import React, { useState } from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Make API request to register user
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          dob,
          phoneNumber,
        }),
      });

      if (!response.ok) {
        throw new Error("Sign up failed");
      }

      // If sign up successful, log in the user
      const loginResponse = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!loginResponse.ok) {
        throw new Error("Login failed");
      }

      // Redirect or handle successful login

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      {error && <div className="error">{error}</div>}
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <label>Email address:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <label>Date of birth:</label>
      <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
      <label>Phone number:</label>
      <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <button type="submit" disabled={loading}>Sign up</button>
    </form>
  );
};

export default Signup;
