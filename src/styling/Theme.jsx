import { createGlobalStyle } from "styled-components";
import { colors } from "./Variables";

export const GlobalStyle = createGlobalStyle`
    * {
        font-family: "Red Hat Text", sans-serif;
        color: ${colors.rose900};
    }
    
    html, body {
        margin: 0;
    }

    body {
        background-color: ${colors.rose50};
    }

    h2 {
        margin: 1.3125rem 0 1.875rem;
        font-size: 2.5rem;
    }
`;
