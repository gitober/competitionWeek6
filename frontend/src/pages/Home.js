import React, { useState, useEffect, useCallback } from 'react';
import GoalDetails from '../components/GoalDetails';
import GoalForm from '../components/GoalForm';

const Home = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authToken] = useState(localStorage.getItem('authToken'));
  const [deletedGoalId, setDeletedGoalId] = useState(null);
  const [setIsFormVisible] = useState(true);

  const fetchGoals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/goals', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setGoals(data || []);
      } else {
        console.error(`Failed to fetch goals: ${response.status} ${response.statusText}`);
        setError('Failed to fetch goals. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching goals:', error);
      setError('Error fetching goals. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [authToken]);

  const handleCreateGoal = async (newGoal) => {
    try {
      const response = await fetch('/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(newGoal),
      });

      if (response.ok) {
        const createdGoal = await response.json();
        setGoals((prevGoals) => [...prevGoals, createdGoal]);
        console.log('New goal created:', createdGoal);

        // Close the form after creating a new goal
        setIsFormVisible(false);
      } else {
        console.error('Failed to create goal:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };
  
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
      setIsFormVisible(true);
    } else {
      console.error('Failed to delete goal:', response.status, response.statusText);
      const errorData = await response.json();
      console.error('Error data:', errorData);
    }
  } catch (error) {
    console.error('Error deleting goal:', error);
  }
}, [setGoals, setIsFormVisible, authToken]);

  useEffect(() => {
    fetchGoals();
  }, [authToken, fetchGoals]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const DELETE_KEY = 'Delete';
      if (event.key === DELETE_KEY && goals.length > 0) {
        handleDelete(goals[0].id || goals[0]._id);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [goals, handleDelete]);

  useEffect(() => {
    if (deletedGoalId) {
      const timeoutId = setTimeout(() => {
        setDeletedGoalId(null);
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [deletedGoalId, setDeletedGoalId]);

  return (
    <div className="home">
      <div className="goals">
        {loading ? (
          <p>Loading goals...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          goals.map((goal) => (
            goal.id !== deletedGoalId && (
              <GoalDetails
                key={goal.id || goal._id}
                goal={goal}
                onDelete={() => handleDelete(goal.id || goal._id)}
                authToken={authToken}
                setGoals={setGoals}
                rerenderKey={Date.now()}
                closeForm={() => setIsFormVisible(true)}
              />
            )
          ))
        )}
      </div>
      <GoalForm authToken={authToken} onCreateGoal={handleCreateGoal} />
    </div>
  );
};

export default Home;