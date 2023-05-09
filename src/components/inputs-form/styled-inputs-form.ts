import styled from 'styled-components';

export const InputsFormContainer = styled.div`
  box-shadow: 0 6px 15px 1px grey;
  width: 100%;
  height: 150px;
  background-color: #ffffff;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;

  @media (max-width: 950px) {
    flex-direction: column;
    height: auto;
    align-items: start;

    button {
      width: 100%;
    }
  }
`;

export const InputsContainer = styled.div`
  width: 60%;
  display: flex;
  gap: 20px;

  input:focus-visible {
    box-shadow: none !important;
  }

  .MuiTextField-root {
    min-width: 40%;
  }

  div#checbox-container {
    display: flex;
  }

  @media (max-width: 950px) {
    width: 100%;
    flex-direction: column;
    margin-bottom: 20px;
  }
`;
