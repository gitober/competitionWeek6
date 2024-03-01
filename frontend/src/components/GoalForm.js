import React, { useState } from "react";

const GoalForm = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make POST request to create a new goal
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, dueDate, priority }),
      });
      if (response.ok) {
        // Trigger a function to update the UI after successful creation
        onAdd();
        // Clear input fields after successful creation
        setText("");
        setDueDate("");
        setPriority("");
      } else {
        console.error("Failed to add goal");
      }
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Goal</h3>

      <label>Text:</label>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <label>Due Date:</label>
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <label>Priority:</label>
      <input type="text" value={priority} onChange={(e) => setPriority(e.target.value)} />
      <button>Add Goal</button>
    </form>
  );
};

export default GoalForm;
