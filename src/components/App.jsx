import { useState } from "react";
import styled from "styled-components";
import { GlobalStyle } from "../styling/Theme";
import dataJSON from "../data/data.json";
import Item from "./Item";
import Cart from "./Cart";
import OrderConfirmation from "./OrderConfirmation";

const Section = styled.section`
    padding: 21px 5.7vw 27px;
    position: relative;
    max-width: 1440px;
    box-sizing: border-box;
    margin: 0 auto;
    display: grid;
    gap: 28px;
    grid-template-columns: auto;
    grid-auto-rows: auto;
    grid-template-areas: "h" "i" "c";

    @media screen and (min-width: 1024px) {
        grid-template-columns: 1fr minmax(380px, auto);
        grid-template-rows: auto 1fr;
        align-items: start;
        grid-template-areas: "h c" "i c";
        padding-top: 86px;
        padding-left: 7.8vw;
        padding-right: 7.8vw;
    }
`;

const Heading = styled.h1`
    grid-area: h;
    margin: 0;
`;

const ItemsList = styled.ul`
    grid-area: i;
    padding-left: 0;
    display: grid;
    align-items: start;
    gap: 20px;
    grid-auto-columns: 1fr;
    margin-top: 0;
    max-width: 1000px;

    @media screen and (min-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (min-width: 1440px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

const CartPanel = styled(Cart)`
    grid-area: c;

    @media screen and (min-width: 1024px) {
        margin-top: 0;
        height: fit-content;
    }
`;

// TODO: Adjust to remove entire data from cart on loading app, allowing each
// item to be added in the order that which the user adds it, not in the order
// that data.json dictates
// FIXME: Optimize replacing array of objects
export default function App() {
    const [cart, setCart] = useState({ cartQuantity: 0, items: dataJSON });
    const [confirmationIsOpen, setConfirmationIsOpen] = useState(false);

    const listItems = cart.items.map((item) => {
        const itemsArr = cart.items;

        const index = itemsArr.findIndex(
            (element) => element.name === item.name
        );
        const itemObj = itemsArr[index];

        return (
            <Item
                key={item.name}
                name={item.name}
                category={item.category}
                price={item.price}
                imageObject={item.image}
                onQuantityChange={handleItemQuantityChange}
                quantity={itemObj.quantity ?? 0}
            />
        );
    });

    /**
     * Changes total quantity of this item in the cart
     * @param {string} itemName             Name of item
     * @param {number} quantityDifference   Difference to change quantity of
     *                                      this item by
     */
    function handleItemQuantityChange(itemName, quantityDifference) {
        let newCartArr = cart.items;
        let index = newCartArr.findIndex((item) => item.name === itemName);

        if (newCartArr[index].quantity) {
            newCartArr[index].quantity += quantityDifference;
        } else {
            newCartArr[index].quantity = 1;
        }

        setCart({
            cartQuantity: (cart.cartQuantity += quantityDifference),
            items: newCartArr,
        });
    }

    /**
     * Remove all of an individual item from the cart
     * @param {string} itemName Name of item
     */
    function handleItemRemoval(itemName) {
        let newCartArr = cart.items;
        let index = newCartArr.findIndex((item) => item.name === itemName);
        const originalCartQuantity = newCartArr[index].quantity;

        if (newCartArr[index].quantity) {
            newCartArr[index].quantity = 0;
        }

        setCart({
            cartQuantity: cart.cartQuantity - originalCartQuantity,
            items: newCartArr,
        });
    }

    function handleOpenConfirmation() {
        setConfirmationIsOpen(true);
    }

    function handleStartNewOrder() {
        setConfirmationIsOpen(false);

        let newItems = cart.items.map((item) => {
            if (item.quantity > 0) {
                // Create new item with quantity 0 and replace
                return { ...item, quantity: 0 };
            } else {
                // No changes
                return item;
            }
        });

        setCart({ cartQuantity: 0, items: newItems });
    }

    return (
        <>
            <GlobalStyle />
            <main>
                <Section>
                    <Heading>Desserts</Heading>
                    <ItemsList>{listItems ?? "Loading items..."}</ItemsList>
                    <CartPanel
                        cartItems={cart.items}
                        totalQuantity={cart.cartQuantity}
                        onItemRemoval={handleItemRemoval}
                        onOpenConfirmation={handleOpenConfirmation}
                    />
                    {confirmationIsOpen ? (
                        <OrderConfirmation
                            cartItems={cart.items}
                            onStartNewOrder={handleStartNewOrder}
                            isOpen={confirmationIsOpen}
                        />
                    ) : null}
                </Section>
            </main>
        </>
    );
}
