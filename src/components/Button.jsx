import styled from "styled-components";
import { colors } from "../styling/Variables";

const DefaultButton = styled.button`
    width: fit-content;
    min-height: 43px;
    display: flex;
    background-color: ${(props) =>
        props.primary ? colors.primary : colors.rose50};
    color: ${(props) => (props.primary ? colors.rose50 : colors.rose900)};
    align-items: center;
    gap: 8px;
    padding: 11px 26px;
    border: 1px solid
        ${(props) => (props.primary ? colors.primary : colors.rose500)};
    border-radius: 60px;
    font-size: 14px;
    font-weight: 600;
    transition: 0.2s ease border-color, 0.2s ease color, 0.2s ease box-shadow;

    &:hover {
        color: ${(props) => (props.primary ? colors.rose50 : colors.primary)};
        background-color: ${(props) =>
            props.primary ? colors.primaryDark : colors.rose50};
        border-color: ${(props) =>
            props.primary ? colors.primaryDark : colors.rose500};
    }

    &:active {
        border-color: ${colors.rose900};
    }
`;

export default function Button({ className, primary, iconImg, text }) {
    return (
        <DefaultButton className={className} primary={primary}>
            {iconImg ? <img src={iconImg} alt="" aria-hidden /> : undefined}
            {text}
        </DefaultButton>
    );
}
