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
    padding: 40px
`;

export const InputsContainer = styled.div`
    display: flex; 
    gap: 20px;

    input:focus-visible{
        box-shadow: none !important;
    }

    .MuiInputBase-root {
        height: 45px;
    }

    .MuiFormLabel-root {
        margin-top: -5px;
    }
`;

export const Button = styled.button`
    font-size: 1rem;
    background-color: #1f5e5e;
    color: #ffffff; 
    cursor: pointer; 
    border: none; 
    border-radius: 7px; 
    width: 100px; 
    height: 45px;
    transition: all 0.5s ease;

    :hover{
        background-color: #174c4c;
    }

    :disabled {
        cursor: not-allowed;
        background-color: #676767;
    }
`;
