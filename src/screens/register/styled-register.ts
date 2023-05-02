import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const RegisterBg = styled.div`
  width: 50%;
  height: 100%;
  background-image: url('/assets/images/register-bg.png');
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
  padding: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  width: 70vh;
  align-items: center;
  gap: 30px;

  img#logo {
    width: 60%;
  }
`;

export const InputsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputContainer = styled.div<{ type?: string }>`
  display: flex;
  flex-direction: ${({ type }) => (type === 'password' ? 'row' : 'column')};
  gap: 10px;

  p.error-message {
    color: #b52121;
  }
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

  span {
    color: #39393a;
  }
`;
