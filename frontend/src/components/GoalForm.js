import React, { useState } from 'react';

const GoalForm = ({ authToken, onCreateGoal }) => {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ text, dueDate, priority }),
      });
      if (response.ok) {
        // Goal creation successful, handle success
        console.log('Goal created successfully');

        // Call the provided onCreateGoal function to handle goal creation in the parent component
        onCreateGoal({ text, dueDate, priority });
      } else {
        // Goal creation failed, handle error
        console.error('Failed to create goal');
      }
    } catch (error) {
      console.error('Error creating goal:', error);
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
      <button type="submit">Add Goal</button>
    </form>
  );
};

export default GoalForm;
