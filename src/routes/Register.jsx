import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [rPasswordDirty, setrPasswordDirty] = useState(false);
  const [errorEmail, setErrorEmail] = useState("Email can not be empty");
  const [errorRepPassword, setErrorRepPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(
    "Password can not be empty"
  );
  const [formValid, setFormValid] = useState(false);
  useEffect(() => {
    if (errorEmail || errorPassword) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [errorEmail, errorPassword]);
  const handleSetPassword = useCallback((e) => {
    setPassword(e.target.value);
    if (e.target.value) {
      setErrorPassword("");
    }
  }, []);
  const blurHandler = (e) => {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      case "repeat password":
        setrPasswordDirty(true);
        break;
    }
  };

  const handleSetEmail = useCallback((e) => {
    setEmail(e.target.value);
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setErrorEmail("Incorrect email");
    } else {
      setErrorEmail("");
    }
  }, []);
  const handleSetRepeatPass = useCallback((e) => {
    setRepeatPass(e.target.value);
  }, []);
  const handleRegister = () => {
    const user = {
      email: email,
      password: password,
      createdAt: new Date().toLocaleString(),
    };
    password === repeatPass
      ? fetch(`http://localhost:5000/users`, {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-type": "application/json",
          },
        })
          .then(() => {
            navigate("/login");
          })
          .catch(() => {
            alert("Bad");
          })
      : setErrorRepPassword("Password are not equal");
  };

  return (
    <>
      <div className="flex flex-col items-center gap-1 mt-10">
        {emailDirty && errorEmail && (
          <div className="text-red-500">{errorEmail} </div>
        )}
        <input
          className="h-[50px] px-4 mt-5 bg-stone-200 text-2xl rounded-sm"
          name="email"
          onBlur={blurHandler}
          placeholder="email"
          value={email}
          onChange={handleSetEmail}
        />
        {passwordDirty && errorPassword && (
          <div className="text-red-500">{errorPassword} </div>
        )}
        <input
          className="h-[50px] px-4 mt-5 bg-stone-200 text-2xl rounded-sm"
          name="password"
          onBlur={blurHandler}
          placeholder="password"
          type="password"
          value={password}
          onChange={handleSetPassword}
        />
        {rPasswordDirty && errorRepPassword && (
          <div className="text-red-500">{errorRepPassword} </div>
        )}
        <input
          className="h-[50px] px-4 mt-5 bg-stone-200 text-2xl rounded-sm"
          name="repeat password"
          onBlur={blurHandler}
          placeholder="repeat password"
          type="password"
          value={repeatPass}
          onChange={handleSetRepeatPass}
        />
        <button
          className="text-2xl bg-stone-200 pt-2 pb-2 pl-10 pr-10 mt-5"
          disabled={!formValid}
          onClick={handleRegister}
        >
          Sign up
        </button>
      </div>
      
    </>
  );
}

export default Register;
