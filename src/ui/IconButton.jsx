import styled from "styled-components";

const Button = styled.button`
    border: none;
    background-color: transparent;
    min-width: 40px;
    min-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;

    svg {
        width: 10px;
        height: 10px;
        transition-property: all;
        transition-duration: 0.2s;
        transition-timing-function: ease;

        path {
            transition-property: all;
            transition-duration: 0.2s;
            transition-timing-function: ease;
        }
    }
`;

/**
 *
 * @param {string} className        Prop to allow styled-components to style
 *                                  IconButton outside of this component
 * @param {function} IconComponent  SVG component using vite-plugin-svgr
 * @param {string} label            Alt label for button
 * @param {function} calledFunction On-click function for button
 * @returns Button with solely an icon as its content, with an aria-label and a
 * called function
 */
export default function IconButton({
    className,
    // eslint-disable-next-line no-unused-vars
    IconComponent,
    label,
    calledFunction,
}) {
    return (
        <Button
            className={className}
            aria-label={label}
            onClick={calledFunction}
        >
            <IconComponent aria-hidden />
        </Button>
    );
}
