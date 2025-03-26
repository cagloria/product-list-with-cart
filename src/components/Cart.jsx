import styled from "styled-components";
import { colors } from "../styling/Variables";
import imgEmptyCart from "../assets/icons/illustration-empty-cart.svg";

const Panel = styled.div`
    background-color: ${colors.rose50};
    box-shadow: ${colors.rose100} 0px 8px 20px 8px;
    border-radius: 12px;
    margin-top: 30px;
    padding: 26px 24px;
    display: flex;
    flex-direction: column;
`;

const Heading = styled.h3`
    color: ${colors.primary};
    margin: 0 0 40px;
    font-size: 1.5rem;
`;

const Image = styled.img`
    align-self: center;
`;

const Description = styled.p`
    text-align: center;
    margin-top: 15px;
    font-size: 14px;
`;

export default function Cart({ count = 0 }) {
    return (
        <Panel>
            <Heading>Your Cart ({count})</Heading>
            <Image src={imgEmptyCart} alt="" aria-hidden />
            <Description>Your added items will appear here.</Description>
        </Panel>
    );
}
