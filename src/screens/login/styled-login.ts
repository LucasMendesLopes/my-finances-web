import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginBg = styled.div`
  width: 50%;
  height: 100%;
  background-image: url('./src/assets/login-bg.png');
  background-size: cover;
  background-position: 55% 50%;
  background-color: #174c4c;
`;

export const FormContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 90%;
  align-items: center;
  gap: 30px;
`;

export const InputsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid;
  border-radius: 7px;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;
`;

export const RegisterRedirect = styled.div`
  display: flex;
  gap: 5px;
  font-weight: bold;

  a {
    color: #174c4c;
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }
`;
