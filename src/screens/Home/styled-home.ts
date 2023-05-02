import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: #e6e6e6;
  overflow: auto;
`;

export const Header = styled.div`
  position: absolute;
  width: 100%;
  height: 25vh;
  text-align: center;
  background-color: #297373;
  color: #ffffff;
  padding-top: 20px;

  button {
    position: absolute;
    top: 20px;
    right: 23px;
    color: white;
    font-size: 1rem;
  }
`;

export const ElementsContainer = styled.div`
  position: absolute;
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  margin-top: 70px;
  padding-bottom: 40px;
`;
