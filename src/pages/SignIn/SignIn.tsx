import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../../utils/token";

//For images
import imgLogin from "../../assets/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-i.jpg"

const SignIn = () => {
//States
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const navigate = useNavigate();
 const [errorMessage, setErrorMessage] = useState<string>("");


//Types

 interface IExistedUser {
    email: string;
    password: string;
} 

//Functions


  async function postSignIn(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage('')
    let existedUser:IExistedUser = {
      email: email,
      password:password
    }

    try {
      const { data } = await axios.post("http://localhost:3000/api/login", existedUser);
      console.log(data);

      if (data.status >= 400) {
        setErrorMessage(data);
        return;
      }

      saveToken(data.accessToken);
      navigate("/home");
    } catch (error) {}
  }

  return (
    <div>
      <section className="section flex justify-center items-center h-[100vh]">
        <div className=" bg-[#343434] p-[20px] rounded-[10px]">
          <h1 className="text-center text-[23px] font-[800] mt-[20px] text-[#fff]">
            Login form
          </h1>
          <div className="for_img mt-[20px]">
            <img
              src={imgLogin}
              alt=""
              className="w-[100px] h-[100px] rounded-[50%] m-auto"
            />
          </div>
          <form
            action=""
            className="flex flex-col justify-center items-center gap-[20px] mt-[20px]"
            onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
              postSignIn(event)
            }
          >
            <input
              type="email"
              name=""
              id=""
              className="outline-[#565656] border-none p-[14px_40px]  text-[#000] placeholder:text-[#000] bg-[#e5e5e5] rounded-[20px]"
              placeholder="Username"
              value={email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(event.target.value)
              }
            />
            <input
              type="password"
              name=""
              id=""
              className="outline-[#565656] border-none p-[14px_40px] text-[#000] placeholder:text-[#000] bg-[#c2c2c2] rounded-[20px]"
              placeholder="Password"
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(event.target.value)
              }
            />
            <button className="p-[4px_30px] outline-none bg-[red] text-[#fff] rounded-[10px]">
              Submit
            </button>
          </form>
          {errorMessage && (
            <div style={{ color: "red", textAlign: "center", fontSize: 20 }}>
              {errorMessage}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SignIn;
