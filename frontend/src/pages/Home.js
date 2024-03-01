import React, { useState, useEffect } from "react";
import GoalDetails from "../components/GoalDetails";
import GoalForm from "../components/GoalForm";

const Home = () => {
  // State to store the fetched goals
  const [goals, setGoals] = useState([]);

  // Replace 'yourAuthToken' with the actual authentication token
  const yourAuthToken = localStorage.getItem('authToken');

  // Function to fetch goals from the API
  const fetchGoals = async () => {
    try {
      const response = await fetch("/api/goals", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${yourAuthToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setGoals(data.data);
      } else {
        console.error("Failed to fetch goals");
      }
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

const addGoal = async (newGoal) => {
  try {
    const yourAuthToken = localStorage.getItem('authToken');

    const response = await fetch("/api/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${yourAuthToken}`,
      },
      body: JSON.stringify(newGoal),
    });

    if (response.ok) {
      // Refetch goals after adding
      fetchGoals();
    } else {
      console.error("Failed to add goal");
    }
  } catch (error) {
    console.error("Error adding goal:", error);
  }
};

  // Function to update a goal
  const updateGoal = async (id, updatedGoal) => {
    try {
      const response = await fetch(`/api/goals/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${yourAuthToken}`,
        },
        body: JSON.stringify(updatedGoal),
      });

      if (response.ok) {
        // Refetch goals after updating
        fetchGoals();
      } else {
        console.error("Failed to update goal");
      }
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  // Function to delete a goal
  const deleteGoal = async (id) => {
    try {
      const response = await fetch(`/api/goals/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${yourAuthToken}`,
        },
      });

      if (response.ok) {
        // Refetch goals after deleting
        fetchGoals();
      } else {
        console.error("Failed to delete goal");
      }
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  // Fetch goals on component mount
  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]); // Include fetchGoals in the dependency array

  return (
    <div className="home">
      <div className="goals">
        {/* Map through the fetched goals and render GoalDetails component for each */}
        {goals.map((goal) => (
          <GoalDetails
            key={goal._id}
            goal={goal}
            onUpdate={(updatedGoal) => updateGoal(goal._id, updatedGoal)}
            onDelete={() => deleteGoal(goal._id)}
          />
        ))}
      </div>
      <GoalForm onAdd={addGoal} /> {/* Pass addGoal function to update goals after adding */}
    </div>
  );
};

export default Home;
