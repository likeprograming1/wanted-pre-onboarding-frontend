import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SiginInBox = styled.main`
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

const SignIn = () => {
  const [IdV, setIdV] = useState("");
  const [PSV, setPSV] = useState("");
  const login = localStorage.getItem("access_token");
  console.log(login);
  const navigate = useNavigate();
  const handleClick = () => {
    axios
      .post("https://www.pre-onboarding-selection-task.shop/auth/signin", {
        email: IdV,
        password: PSV,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access_token);
      })
      .then(() => {
        window.location.replace("/todo");
      });
  };
  useEffect(() => {
    if (login !== null) {
      window.location.replace("/todo");
    }
  }, []);
  return (
    <SiginInBox>
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
        data-testid="signin-button"
        disabled={!(IdV.includes("@") && PSV.length > 7)}
        onClick={() => {
          handleClick();
        }}
      >
        로그인
      </button>
    </SiginInBox>
  );
};

export default SignIn;
