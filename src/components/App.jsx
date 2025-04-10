import React, { useState } from "react";
import styled from "styled-components";
import { GlobalStyle } from "../styling/Theme";
import data from "../data/data.json";
import Item from "./Item";
import Cart from "./Cart";

const Section = styled.section`
    padding: 21px 6.4vw 27px;
    max-width: 1440px;
    box-sizing: border-box;
    margin: 0 auto;
    display: grid;
    gap: 30px;
    grid-template-columns: auto;
    grid-auto-rows: auto;
    grid-template-areas: "h" "i" "c";

    @media screen and (min-width: 1024px) {
        display: grid;
        grid-template-columns: minmax(auto, 800px) auto;
        grid-template-areas: "h c" "i c" "i c";
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
    gap: 20px;
    grid-auto-columns: auto;
    margin-top: 0;
    max-width: 1000px;

    @media screen and (min-width: 600px) {
        grid-template-columns: repeat(2, auto);
    }

    @media screen and (min-width: 1024px) {
        grid-template-columns: repeat(3, auto);
    }
`;

const CartPanel = styled(Cart)`
    grid-area: c;

    @media screen and (min-width: 1024px) {
        margin-top: 0;
        height: fit-content;
    }
`;

export default function App() {
    const [cart, setCart] = useState({ cartQuantity: 0, items: data });

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

    // TODO: Change to handle quantity change

    function handleItemQuantityChange(itemName, quantityChange) {
        let newCartArr = cart.items;
        let index = newCartArr.findIndex((item) => item.name === itemName);

        if (newCartArr[index].quantity) {
            newCartArr[index].quantity += quantityChange;
        } else {
            newCartArr[index].quantity = 1;
        }

        setCart({
            cartQuantity: (cart.cartQuantity += quantityChange),
            items: newCartArr,
        });
    }

    return (
        <>
            <GlobalStyle />
            <main>
                <Section>
                    <Heading>Desserts</Heading>
                    <ItemsList>{listItems ?? "Loading items..."}</ItemsList>
                    <CartPanel cart={cart} totalQuantity={cart.cartQuantity} />
                </Section>
            </main>
        </>
    );
}
