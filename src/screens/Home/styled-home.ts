import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const Header = styled.div`
  position: absolute;
  width: 100%;
  height: 25vh;
  text-align: center;
  background-color: #297373;

  h1 {
    margin-top: 20px;
    color: #ffffff;
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
