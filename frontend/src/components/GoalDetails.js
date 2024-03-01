import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const GoalDetails = ({ goal, onDelete }) => {
  const handleDelete = async () => {
    try {
      // Make DELETE request to delete the goal
      const response = await fetch(`/api/goals/${goal.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Trigger a function to update the UI after successful deletion
        onDelete(goal.id);
      } else {
        console.error("Failed to delete goal");
      }
    } catch (error) {
      console.error("Error deleting goal:", error);
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
      <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
    </div>
  );
};

export default GoalDetails;
