import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *{
        margin: 0;
        padding:0;
        box-sizing: border-box;
    }
    ::-webkit-scrollbar {
        width: 12px;
        overflow: hidden;
    }
    ::-webkit-scrollbar-track {
        background: white;
        border-radius: 5px;
        overflow: hidden;
    }
    ::-webkit-scrollbar-thumb {
        background: black;
        border-radius: 5px;
        overflow: hidden;
    }
    body{
        font-family: 'Poppins', sans-serif;
        width: 100%;
        min-height: 100vh;  
        display: flex;
    }
    #root{
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        font-weight: 500;
        min-height: 100vh;
    }
    .App{
        height: 100%;
    }
    a{
        color: inherit;
        text-decoration: none;
    }
`;
