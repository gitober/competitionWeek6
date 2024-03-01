import React, { useState, useEffect } from "react";
import GoalDetails from "../components/GoalDetails";
import GoalForm from "../components/GoalForm";

const Home = () => {
  // State to store the fetched goals
  const [goals, setGoals] = useState([]);

  // Function to fetch goals from the API
  const fetchGoals = async () => {
    try {
      const response = await fetch("/api/goals");
      if (response.ok) {
        const data = await response.json();
        setGoals(data);
      } else {
        console.error("Failed to fetch goals");
      }
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  // Fetch goals on component mount
  useEffect(() => {
    fetchGoals();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className="home">
      <div className="goals">
        {/* Map through the fetched goals and render GoalDetails component for each */}
        {goals.map((goal) => (
          <GoalDetails key={goal.id} goal={goal} />
        ))}
      </div>
      <GoalForm onAdd={fetchGoals} /> {/* Pass fetchGoals function to update goals after adding */}
    </div>
  );
};

export default Home;
