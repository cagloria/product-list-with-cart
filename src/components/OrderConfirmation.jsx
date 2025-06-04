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
    padding: 20px 20px 24px;
    position: fixed;
    bottom: 0;
    background-color: ${colors.rose50};
    width: 100%;

    button {
        width: 100%;
    }
`;

const BackgroundShade = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: ${colors.rose900};
    opacity: 0.6;
`;

const Heading = styled.h2`
    margin: 0;
    font-size: 2.5rem;
`;

const Message = styled.p`
    margin: 0;
    color: ${colors.rose500};
`;

const Summary = styled.div`
    background-color: ${colors.rose75};
    padding: 24px 20px;
    border-radius: 8px;
`;

const ItemList = styled.ul`
    padding-left: 0;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`;

const Item = styled.li`
    list-style-type: none;
    font-size: 0.75rem;
    display: grid;
    grid-template-columns: auto auto 1fr auto;
    grid-auto-rows: auto;
    grid-template-areas: "i n n t" "i q c t";
    align-items: center;
    column-gap: 12px;

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
    font-size: 14px;
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

    function startNewOrder() {
        // TODO: Remove all items from cart
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
