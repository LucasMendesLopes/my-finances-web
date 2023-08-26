import { colors } from '-src/styles/theme';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const LoginBg = styled.div`
  width: 50%;
  height: 100%;
  background-image: url('/assets/images/login-bg.png');
  background-size: cover;
  background-position: 55% 50%;
  background-color: ${colors.blue200};
`;

export const FormContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 90%;
  width: 40rem;
  align-items: center;
  gap: 3rem;

  img#logo {
    width: 45%;
  }
`;

export const InputsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
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

  span {
    color: ${colors.grey200};
  }

  a {
    color: ${colors.blue200};
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }
`;
