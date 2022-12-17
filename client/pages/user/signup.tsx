import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signUp } from "../../redux/actions/userActions";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch();

  const user = useSelector(state => state)

  console.log(user);
  

  const handleSignUp = (e: any) => {
    e.preventDefault();
    dispatch<any>(signUp("", email, name, password));
  };
  return (
    <div>
      <form onSubmit={handleSignUp} style={{ display: "flex" }}>
        <input
          type="text"
          name=""
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
          id=""
        />
        <input
          type="email"
          name=""
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          id=""
        />
        <input
          type="text"
          name=""
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          id=""
        />
        <button type="submit">SignIn</button>
      </form>
    </div>
  );
};

export default SignUp;
