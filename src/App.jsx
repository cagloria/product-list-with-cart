import styled from "styled-components";
import { GlobalStyle } from "./styling/Theme";
import data from "./data/data.json";
import Item from "./components/Item";
import Cart from "./components/Cart";

const Section = styled.section`
    padding: 0 24px 27px;
    margin: 0 auto;
`;

const ItemsList = styled.ul`
    padding-left: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 0;
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
            <Section>
                <h2>Desserts</h2>
                <ItemsList>{listItems}</ItemsList>
                <Cart />
            </Section>
        </>
    );
}
