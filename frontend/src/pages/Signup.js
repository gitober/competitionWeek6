import { useNavigate } from "react-router-dom";
import useSignup from "../hooks/useSignup";
import useField from "../hooks/useField";

const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const username = useField("");
  const email = useField("");
  const password = useField("");
  const dob = useField(""); // Add useField for date of birth
  const phone = useField(""); // Add useField for phone number
  // const [error, setError] = useState(null);

  const { signup, error } = useSignup(setIsAuthenticated, navigate);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username.value, email.value, password.value, dob.value, phone.value);
    signup(username.value, email.value, password.value, dob.value, phone.value);
  }
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setError(null);
  //   try {
  //     const response = await fetch("/api/users/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         username: username.value,
  //         email: email.value,
  //         password: password.value,
  //         dob: dob.value, // Include date of birth
  //         phone_number: phone.value, // Include phone number
  //       }),
  //     });
      
  //     if (response.ok) {
  //       console.log("Signup successful");
  //       const data = await response.json();
  //       setIsAuthenticated(true);
  //       navigate("/");
  //     } else { 
  //       const errorData = await response.json();
  //       setError(errorData.error);
  //     }
  //   } catch (error) {
  //     console.error("Error during signup:", error);
  //     setError("An error occurred during signup. Please try again later.");
  //   }
  // };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>
        Username:
        <input
          type="text"
          {...username}
          autoComplete="username"
        />
      </label>
      <label>
        Email address:
        <input
          type="text"
          {...email}
          autoComplete="email"
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          {...password}
          autoComplete="new-password"
        />
      </label>
      <label>
        Date of birth:
        <input 
          type="date" 
          {...dob}
        />
      </label>
      <label>
        Phone number:
        <input 
          type="text" 
          {...phone}
        />      
      </label>
      {error && <div className="error">{error}</div>}
      <button type="submit">Sign up</button>
    </form>
  );
};

export default Signup;