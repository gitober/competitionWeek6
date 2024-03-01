const Signup = () => {
  return (
    <form className="signup">
      <h3>Sign Up</h3>
      <label>Username:</label>
      <input type="text" />
      <label>Email address:</label>
      <input type="email" />
      <label>Password:</label>
      <input type="password" />
      <label>Date of birth:</label>
      <input type="date" />
      <label>Phone number:</label>
      <input type="text" />      
      <button>Sign up</button>
    </form>
  );
};

export default Signup;
