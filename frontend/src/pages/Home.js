// components
import GoalDetails from "../components/GoalDetails";
import GoalForm from "../components/GoalForm";

const goalsArray = [
  {
    text: "Learn a new programming language",
    dueDate: new Date(2024, 3, 15), 
    priority: "Medium" ,
    createdAt: new Date(2024, 1, 20),
  },
  {
    text: "Complete a fitness challenge",
    dueDate: new Date(2024, 3, 30), 
    priority: "High", 
    createdAt: new Date(2024, 1, 15),
  },
  {
    text: "Read 10 books by the end of the year",
    dueDate: new Date(2024, 4, 3), 
    priority: "Low", 
    createdAt: new Date(2024, 1, 28),
  }
];


const Home = () => {
  return (
    <div className="home">
      <div className="goals">
        <GoalDetails goal={goalsArray[0]} />
        <GoalDetails goal={goalsArray[1]} />
        <GoalDetails goal={goalsArray[2]} />
      </div>
      <GoalForm />
    </div>
  );
};

export default Home;
