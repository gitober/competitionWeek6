import React, { useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const GoalDetails = ({ goal, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      // Make API request to delete the goal
      const response = await fetch(`/api/goals/${goal.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete goal");
      }

      // Call the onDelete callback to update the UI
      onDelete(goal.id);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="goal-details">
      <h4>{goal.text}</h4>
      <p>
        Created: {formatDistanceToNow(new Date(goal.createdAt), { addSuffix: true })}<br />
        Due Date: {formatDistanceToNow(new Date(goal.dueDate), { addSuffix: true })}<br />
        Priority: {goal.priority}
      </p>
      <button onClick={handleDelete} disabled={loading}>
        {loading ? "Deleting..." : "Delete"}
      </button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default GoalDetails;
