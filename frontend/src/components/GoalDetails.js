// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const GoalDetails = ({ goal }) => {
  return (
    <div className="goal-details">
      <h4>{goal.text}</h4>
      <p>Created: {formatDistanceToNow(new Date(goal.createdAt), { addSuffix: true })}<br />
        Due Date: {formatDistanceToNow(new Date(goal.dueDate), { addSuffix: true })}<br />
        Priority: {goal.priority}
      </p>
      <span className="material-symbols-outlined">delete</span>
    </div>
  );
};

export default GoalDetails;
