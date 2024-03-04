import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const GoalDetails = ({ goal, onDelete, authToken, setGoals, rerenderKey, closeForm }) => {
  
  const handleDelete = useCallback(async (goalId) => {
    try {
      const response = await fetch(`/api/goals/${goalId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
        console.log('Goal deleted successfully');

        // Close the form after deleting a goal
        closeForm();
      } else {
        console.error('Failed to delete goal:', response.status, response.statusText);
        // Log the error details
        const errorData = await response.json();
        console.error('Error data:', errorData);
      }
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  }, [authToken, setGoals, closeForm]);

  const renderDate = (date) => {
    return date ? formatDistanceToNow(new Date(date), { addSuffix: true }) : 'N/A';
  };

  useEffect(() => {
    // This effect will run whenever rerenderKey changes
    console.log('Rerendering GoalDetails');
  }, [rerenderKey]);

  return (
    <div className="goal-details" onClick={() => onDelete(goal.id || goal._id)}>
      <h4>{goal.text}</h4>
      <p>
        {goal.createdAt && <span>Created: {renderDate(goal.createdAt)}</span>}
        {goal.dueDate && <span>Due Date: {renderDate(goal.dueDate)}</span>}
        <br />
        Priority: {goal.priority}
      </p>
      <button onClick={() => handleDelete(goal.id || goal._id)}>Delete</button>
    </div>
  );
};

// PropTypes declaration
GoalDetails.propTypes = {
  goal: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  authToken: PropTypes.string.isRequired,
  setGoals: PropTypes.func.isRequired,
  rerenderKey: PropTypes.any.isRequired, 
  closeForm: PropTypes.func.isRequired, 
};

export default GoalDetails;
