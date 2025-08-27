import { useState, useEffect } from "react";
import styled from "styled-components";
import { GlobalStyle } from "../styling/Theme";
import dataJSON from "../../public/data.json";
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

    @media screen and (min-width: 1920px) {
        max-width: 1920px;
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
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    width: 100%;
    margin-top: 0;
`;

const CartPanel = styled(Cart)`
    grid-area: c;

    @media screen and (min-width: 1024px) {
        margin-top: 0;
        height: fit-content;
    }
`;

export default function App() {
    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    });
    const [confirmationIsOpen, setConfirmationIsOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const catalogueItems = dataJSON.map((item) => {
        return (
            <Item
                key={item.name}
                item={item}
                onIncrement={handleItemIncrement}
                onDecrement={handleItemDecrement}
                quantity={getItemQuantityInCart(item.name)}
            />
        );
    });

    /**
     * Get the quantity of an item from the cart.
     * @param {string} itemName Item name
     * @returns Quantity of item in cart
     */
    function getItemQuantityInCart(itemName) {
        const index = cart.findIndex((cartItem) => cartItem.name === itemName);

        if (index > -1) {
            return cart[index].quantity;
        } else {
            return 0;
        }
    }

    /**
     * Increment the quantity of an item in the cart. Adds the item if it does
     * not exist in the cart.
     * @param {object} changedItem  Item to increment the quantity of
     */
    function handleItemIncrement(changedItem) {
        const index = cart.findIndex(
            (cartItem) => cartItem.name === changedItem.name
        );

        // If the item is not in the cart, add it
        if (index === -1) {
            changedItem.quantity = 1;
            setCart([...cart, changedItem]);
        }
        // If the item is in the cart, increment its quantity
        else {
            const newCart = cart.map((cartItem, cartIndex) => {
                // Change the quantity of only this item
                if (cartIndex === index) {
                    changedItem.quantity = cart[cartIndex].quantity + 1;
                    return changedItem;
                }
                // The other items don't change
                else {
                    return cartItem;
                }
            });

            setCart(newCart);
        }
    }

    /**
     * Decrement the quantity of an item in the cart.
     * @param {object} changedItem  Item to decrement the quantity of
     */
    function handleItemDecrement(changedItem) {
        const index = cart.findIndex(
            (cartItem) => cartItem.name === changedItem.name
        );

        // If quantity is 1, remove entire item
        if (cart[index].quantity === 1) {
            handleItemRemoval(changedItem);
        }
        // If quantity is > 1, decrement its quantity
        else {
            const newCart = cart.map((cartItem, cartIndex) => {
                // Change the quantity of this item
                if (cartIndex === index) {
                    changedItem.quantity = cart[cartIndex].quantity;
                    changedItem.quantity--;
                    return changedItem;
                }
                // The other items don't change
                else {
                    return cartItem;
                }
            });

            setCart(newCart);
        }
    }

    /**
     * Remove all of an individual item from the cart
     * @param {object} itemToRemove Item object to remove
     */
    function handleItemRemoval(itemToRemove) {
        setCart(cart.filter((item) => item.name !== itemToRemove.name));
    }

    /**
     * Opens confirmation panel
     */
    function handleOpenConfirmation() {
        setConfirmationIsOpen(true);
    }

    /**
     * Filters out all items that have any name value and sets it to the cart,
     * thus removing all items
     */
    function handleStartNewOrder() {
        setConfirmationIsOpen(false);
        setCart(cart.filter((item) => item.name === ""));
    }

    /**
     * Returns the total quantity of all items in cart
     * @returns Quantity of all items in cart
     */
    function getTotalQuantity() {
        let quantity = 0;
        cart.forEach((item) => {
            quantity += item.quantity;
        });
        return quantity;
    }

    return (
        <>
            <GlobalStyle />
            <main>
                <Section>
                    <Heading>Desserts</Heading>
                    <ItemsList>
                        {catalogueItems ?? "Loading items..."}
                    </ItemsList>
                    <CartPanel
                        cartItems={cart}
                        totalQuantity={getTotalQuantity()}
                        onItemRemoval={handleItemRemoval}
                        onOpenConfirmation={handleOpenConfirmation}
                    />
                    {confirmationIsOpen ? (
                        <OrderConfirmation
                            cartItems={cart}
                            onStartNewOrder={handleStartNewOrder}
                            isOpen={confirmationIsOpen}
                        />
                    ) : null}
                </Section>
            </main>
        </>
    );
}
