import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
* {
    padding: 0;
    margin: 0;
    font-family: 'Work Sans', sans-serif;
    box-sizing: border-box;
}

html {
    height: 100%;
    scroll-behavior: smooth;
}

body {
    height: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #ffffff;

    #root{
        height: 100%;
        display: flex;
        flex-direction: column;
    }
}

button, input[type="checkbox"], input[type="radio"] {
    cursor: pointer;
}

button, input, textarea{
    border: none;
    background: none;
}

button, input, textarea, a {
  &:focus-visible {
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
  }
}

ul {
    list-style: none;
}


// Custom scroll ----------------
   // Firefox
   scrollbar-width: thin;
   scrollbar-color: transparent #888;

   // Chrome, Edge e Safari
  ::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 7px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;
