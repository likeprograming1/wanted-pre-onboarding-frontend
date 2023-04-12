import { Link } from "react-router-dom";
import styled from "styled-components";

const MainBox = styled.main`
  border: 1px solid red;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > p {
    font-size: 32px;
  }
`;

const LinkTo = styled(Link)`
  text-decoration: none;
  color: black;
  padding: 10px;
  font-weight: 600;
  :hover {
    color: #666;
  }
`;

function Main() {
  return (
    <MainBox>
      <p>프리온보딩 프론트엔드 인턴십 과제</p>
      <div>
        <LinkTo to="/signin" className="btn-link">
          로그인
        </LinkTo>
        <LinkTo to="/signup" className="btn-link">
          회원가입
        </LinkTo>
      </div>
    </MainBox>
  );
}

export default Main;
