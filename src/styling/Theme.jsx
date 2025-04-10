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

    button {
        width: fit-content;
        display: flex;
        background-color: ${colors.rose50};
        color: ${colors.rose900};
        align-items: center;
        gap: 8px;
        padding: 11px 26px;
        border: 1px solid ${colors.rose500};
        border-radius: 60px;
        font-size: 0.875rem;
        font-weight: 600;
        transition: 0.2s ease border-color, 0.2s ease color;

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
