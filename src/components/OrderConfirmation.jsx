import styled from "styled-components";
import { colors } from "../styling/Variables";
import { convertToUSD } from "../utility/utility";
import CheckIcon from "../assets/icons/icon-order-confirmed.svg?react";

const Panel = styled.div`
    box-sizing: border-box;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    display: flex;
    flex-direction: column;
    row-gap: 32px;
    padding: 40px 20px 24px;
    position: fixed;
    bottom: 0;
    background-color: ${colors.rose50};
    width: 100%;

    button {
        width: 100%;
    }

    @media screen and (min-width: 600px) {
        inset: 0;
        margin: auto;
        height: fit-content;
        border-radius: 12px;
        width: 90vw;
        max-width: 590px;
        padding: 20px 40px 24px;
    }
`;

const BackgroundShade = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: ${colors.rose900};
    opacity: 0.6;
`;

const Heading = styled.h2`
    margin: 0;
    margin-top: -8px;
    margin-bottom: -26px;
    font-size: 2.55rem;
    line-height: 3.0625rem;
`;

const Message = styled.p`
    margin: 0;
    margin-bottom: -9px;
    color: ${colors.rose500};
`;

const Summary = styled.div`
    background-color: ${colors.rose75};
    padding: 8px 28px 24px;
    border-radius: 8px;
`;

const ItemList = styled.ul`
    padding-left: 0;
    padding-bottom: 8px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    max-height: 270px;
    overflow-y: scroll;
`;

const Item = styled.li`
    list-style-type: none;
    font-size: 0.9rem;
    display: grid;
    grid-template-columns: auto auto 1fr auto;
    grid-auto-rows: auto;
    grid-template-areas: "i n n t" "i q c t";
    align-items: center;
    column-gap: 15px;
    padding-bottom: 24px;
    border-bottom: 1px solid ${colors.rose100};

    b {
        font-weight: 600;
    }

    img {
        border-radius: 6px;
        aspect-ratio: 1;
        width: 50px;
        grid-area: i;
    }
`;

const ItemName = styled.span`
    font-weight: 600;
    grid-area: n;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

const ItemQuantity = styled.span`
    color: ${colors.primary};
    font-weight: 600;
    grid-area: q;
`;

const ItemIndividualCost = styled.span`
    color: ${colors.rose500};
    grid-area: c;
`;

const ItemTotalCost = styled.span`
    color: ${colors.rose500};
    font-weight: 600;
    grid-area: t;
`;

const OrderTotal = styled.p`
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    span:first-of-type {
        font-size: 0.875rem;
    }

    span:last-of-type {
        font-size: 1.5625rem;
        font-weight: 700;
    }
`;

const Button = styled.button`
    padding-top: 16px;
    padding-bottom: 16px;
`;

export default function OrderConfirmation({ cartItems, onStartNewOrder }) {
    const items = cartItems.map((item) => {
        const total = convertToUSD(item.price * item.quantity);
        const individualCost = convertToUSD(item.price);

        if (item.quantity > 0) {
            return (
                <Item key={item.name}>
                    <img src={item.image.thumbnail} alt="" aria-hidden />
                    <ItemName>
                        <b>{item.name}</b>
                    </ItemName>

                    <ItemQuantity>{item.quantity}x</ItemQuantity>

                    <ItemIndividualCost>@{individualCost}</ItemIndividualCost>

                    <ItemTotalCost>
                        <b>{total}</b>
                    </ItemTotalCost>
                </Item>
            );
        }
    });

    /**
     * Calculates the total cost of all items in the cart
     * @returns Total cost
     */
    function totalCost() {
        let cost = 0;
        cartItems.forEach((item) => {
            if (item.quantity > 0) {
                cost += item.quantity * item.price;
            }
        });
        cost = convertToUSD(cost);
        return cost;
    }

    /**
     * Removes all items from cart and starts new order
     */
    function startNewOrder() {
        onStartNewOrder();
    }

    return (
        <>
            <BackgroundShade onClick={startNewOrder} />
            <Panel>
                <CheckIcon />
                <Heading>Order Confirmed</Heading>
                <Message>We hope you enjoy your food!</Message>

                <Summary>
                    <ItemList>{items}</ItemList>
                    <OrderTotal>
                        <span>Order Total</span>
                        <span>{totalCost()}</span>
                    </OrderTotal>
                </Summary>

                <Button className="button--primary" onClick={startNewOrder}>
                    Start New Order
                </Button>
            </Panel>
        </>
    );
}
