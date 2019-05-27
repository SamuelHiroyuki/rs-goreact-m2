import { createGlobalStyle } from 'styled-components';

import 'font-awesome/css/font-awesome.css';

const globalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: none;
        box-sizing: border-box;
    }

    html,
    body,
    #root {
        height: 100%;
    }

    body {
        background-color: #9b65e6;
        text-rendering: optimizeLegibility !important;
        -webkit-font-smoothing: antialiased !important;
        font-family: Arial, Helvetica, sans-serif;
    }
`;

export default globalStyle;
