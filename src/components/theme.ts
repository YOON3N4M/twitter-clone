import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 500px;
  background-color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const FormContainer = styled.form`
  margin: 0 auto;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const fadeup = keyframes` /* 2. css코드를 씀. */
0%{
    opacity: 0;
    transform: translateY(10px);
}
100%{
    opacity: 1;
    transform: none;
}
`;

export const fadein = keyframes` /* 2. css코드를 씀. */
0%{
    opacity: 0;

}
100%{
    opacity: 1;

}
`;
