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

    h1 {
        font-size: 2.5rem;
    }

    h2 {
        font-size: 1.5rem;
    }

    button {
        width: fit-content;
        display: flex;
        justify-content: center;
        background-color: ${colors.rose50};
        color: ${colors.rose900};
        align-items: center;
        gap: 8px;
        padding: 11px 26px;
        border: 1px solid ${colors.rose500};
        border-radius: 60px;
        font-size: 0.875rem;
        font-weight: 600;
        transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease;

        &:hover {
            color: ${colors.primary};
        }

        &:active {
            border-color: ${colors.rose900};
        }

        &.button--primary {
            background-color: ${colors.primary};
            color: ${colors.rose50};
            border-color: ${colors.primary};

            &:hover {
                background-color: ${colors.primaryDark};
                border-color: ${colors.primaryDark};
            }
        }
    }
`;
