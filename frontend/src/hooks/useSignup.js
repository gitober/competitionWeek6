import { useState } from "react";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  // make necessary modification
  const signup = async (username, email, password, dob, phone) => {
    setIsLoading(true);
    setError(null);
    // const temp = {
    //   username: "johndoe",
    //   email: "johndoe@example.com",
    //   password: "securepassword",
    //   date_of_birth: "1998-11-01",
    //   phone_number: "+358 45-456-7890"
    // }
    const response = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({username, email, password, dob, phone}),
      body: JSON.stringify({username:"eetu", email:"eetu@metropolia.com", password:"something123", date_of_birth:"1998-11-01", phone_number:"+358 45-456-7890"}),
    });
    const user = await response.json();

    if (!response.ok) {
      setError(user.message);
      setIsLoading(false);
      return error;
    }

    sessionStorage.setItem("user", JSON.stringify(user));
    setIsLoading(false);
  };

  return { signup, isLoading, error };
};

export default useSignup;


// import { useState } from "react";

// const useSignup = (setIsAuthenticated, navigate) => {
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [dob, setDob] = useState("");
//     const [phone, setPhone] = useState("");

//     const handleSignup = async (event) => {

//       console.log("Signing")
//     try {
//       // Verify password match
//       if (password) {
//         console.error("Password error");
//       }

//       const response = await fetch("/api/user/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, email, password, dob, phone }),
//       });

//       if (response.ok) {
//         const user = await response.json();
//         localStorage.setItem("user", JSON.stringify(user));
//         console.log("User signed up successfully!");
//         setIsAuthenticated(true);
//         navigate("/");
//       } else {
//         console.error("Signup failed");
//       }
//     } catch (error) {
//       console.error("Error during signup:", error);
//     }
//   };

//   return {
//     username,
//     setUsername,
//     email,
//     setEmail,
//     password,
//     setPassword,
//     dob,
//     setDob,
//     phone,
//     setPhone,
//     handleSignup
//   };
// };

// export default useSignup;
