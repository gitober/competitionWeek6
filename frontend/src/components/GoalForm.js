import React, { useState } from "react";

const GoalForm = () => {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Make API request to create a new goal
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          dueDate,
          priority,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add goal");
      }

      // Optionally, you can handle success here, e.g., redirect to another page
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Goal</h3>
      {error && <div className="error">{error}</div>}
      <label>Text:</label>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <label>Due Date:</label>
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <label>Priority:</label>
      <input type="text" value={priority} onChange={(e) => setPriority(e.target.value)} />
      <button type="submit" disabled={loading}>Add Goal</button>
    </form>
  );
};

export default GoalForm;
