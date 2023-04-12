import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpBox = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > div {
    padding: 10px;
  }
`;

const SignUp = () => {
  const [IdV, setIdV] = useState("");
  const [PSV, setPSV] = useState("");
  const navigate = useNavigate();
  const login = localStorage.getItem("access_token");
  const handleSubmit = () => {
    axios
      .post(
        "https://www.pre-onboarding-selection-task.shop/auth/signup",
        {
          email: IdV,
          password: PSV,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((res) => {
        navigate("/signin");
        alert("회원가입 성공!");
      });
  };
  useEffect(() => {
    if (login !== null) {
      navigate("/todo");
    }
  }, []);
  return (
    <SignUpBox>
      <div>
        <label htmlFor="idbox">아이디 : </label>
        <input
          id="idbox"
          data-testid="email-input"
          value={IdV}
          onChange={(e) => setIdV(e.target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor="psbox">비밀번호 : </label>
        <input
          type="password"
          id="psbox"
          data-testid="password-input"
          value={PSV}
          onChange={(e) => setPSV(e.target.value)}
        ></input>
      </div>
      <button
        data-testid="signup-button"
        disabled={!(IdV.includes("@") && PSV.length > 7)}
        onClick={() => handleSubmit()}
      >
        회원가입
      </button>
    </SignUpBox>
  );
};

export default SignUp;
