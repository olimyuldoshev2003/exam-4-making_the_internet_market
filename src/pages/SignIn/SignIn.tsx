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
      navigate("/products");
    } catch (error) {}
  }

  return (
    <div>
      <section className="section flex justify-center items-center h-[100vh]">
        <div className="border-[1px] border-[#343434] p-[20px] rounded-[10px]">
          <h1 className="text-center text-[23px] font-[800] mt-[20px]">
            Login form
          </h1>
          <div className="for_img mt-[20px]">
            <img src={imgLogin} alt="" className="w-[100px] h-[100px] rounded-[50%] m-auto"/>
          </div>
          <form
            action=""
            className="flex flex-col justify-center items-center gap-[20px]"
            onSubmit={(event: React.FormEvent<HTMLFormElement>)=>postSignIn(event)}
          >
            <input
              type="email"
              name=""
              id=""
              className="outline-[#00f2ff] border-[1px] border-[#000] p-[4px_30px] text-[#000] placeholder:text-[#000]"
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
              className="outline-[#00f2ff] border-[1px] border-[#000] p-[4px_30px] text-[#000] placeholder:text-[#000]"
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
        </div>
      </section>
    </div>
  );
};

export default SignIn;
