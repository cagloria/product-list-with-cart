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
    const listItems = data.map((item) => (
        <Item
            key={item.name}
            name={item.name}
            category={item.category}
            price={item.price}
            imageObject={item.image}
        />
    ));

    return (
        <>
            <GlobalStyle />
            <main>
                <Section>
                    <Heading>Desserts</Heading>
                    <ItemsList>{listItems}</ItemsList>
                    <CartPanel />
                </Section>
            </main>
        </>
    );
}
