import React, { useState, useEffect } from "react";
import GoalDetails from "../components/GoalDetails";
import GoalForm from "../components/GoalForm";

const Home = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoals = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/goals");
        if (!response.ok) {
          throw new Error("Failed to fetch goals");
        }
        const data = await response.json();
        setGoals(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  const handleDelete = async (deletedGoalId) => {
    try {
      const response = await fetch(`/api/goals/${deletedGoalId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete goal");
      }
      setGoals(goals.filter((goal) => goal.id !== deletedGoalId));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="home">
      <div className="goals">
        {loading ? (
          <p>Loading goals...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : goals.length === 0 ? (
          <p>No goals found.</p>
        ) : (
          goals.map((goal) => (
            <GoalDetails key={goal.id} goal={goal} onDelete={handleDelete} />
          ))
        )}
      </div>
      <GoalForm />
    </div>
  );
};

export default Home;
