import styled from "styled-components";
import CartItem from "./CartItem";
import { colors } from "../styling/Variables";
import { convertToUSD } from "../utility/utility";
import imgEmptyCart from "../assets/icons/illustration-empty-cart.svg";
import iconCarbonNeutral from "../assets/icons/icon-carbon-neutral.svg";

const Panel = styled.div`
    background-color: ${colors.rose50};
    box-shadow: ${colors.rose100} 0px 8px 40px 8px;
    border-radius: 12px;
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

const ItemsList = styled.ul`
    padding-left: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const OrderTotal = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;

    span:first-of-type {
        font-size: 0.875rem;
    }

    span:last-of-type {
        font-size: 1.5625rem;
        font-weight: 700;
    }
`;

const DeliveryInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    margin-top: 28px;
    padding: 10px;
    background-color: ${colors.rose75};
    font-size: 0.875rem;

    b {
        font-weight: 600;
    }

    p {
        margin: 0;
    }
`;

const ConfirmOrderButton = styled.button`
    margin-top: 31px;
    padding-top: 15px;
    padding-bottom: 15px;
    font-size: 1rem;
    width: 100%;
`;

/**
 * Panel displaying total items in cart and button to confirm order
 * @param {string} className        Prop to allow styled-components to style
 *                                  Cart outside of this component
 * @param {object} cartItems        All items in app
 * @param {number} totalQuantity    Total quantity of all items
 * @param {function} onItemRemoval  Passes item removal function
 * @returns Div element displaying items, cart total, and confirm order button
 */
export default function Cart({
    className,
    cartItems,
    totalQuantity,
    onItemRemoval,
}) {
    const items = cartItems.map((item) => {
        if (item.quantity > 0) {
            return (
                <CartItem
                    itemObj={item}
                    key={item.name}
                    onRemovalAll={handleItemRemoval}
                />
            );
        }
    });

    /**
     * Remove all of an individual item from the cart
     * @param {string} itemName Name of item
     */
    function handleItemRemoval(itemName) {
        onItemRemoval(itemName);
    }

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

    return (
        <Panel className={className}>
            <Heading>Your Cart ({totalQuantity})</Heading>
            {totalQuantity <= 0 ? (
                <>
                    <Image src={imgEmptyCart} alt="" aria-hidden />
                    <Description>
                        Your added items will appear here.
                    </Description>
                </>
            ) : (
                <>
                    <ItemsList>{items}</ItemsList>
                    <OrderTotal>
                        <span>Order Total</span>
                        <span>{totalCost()}</span>
                    </OrderTotal>
                    <DeliveryInfo>
                        <img src={iconCarbonNeutral} alt="" aria-hidden />
                        <p>
                            This is a <b> carbon-neutral </b> delivery
                        </p>
                    </DeliveryInfo>
                    <ConfirmOrderButton className="button--primary">
                        Confirm Order
                    </ConfirmOrderButton>
                </>
            )}
        </Panel>
    );
}
