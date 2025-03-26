import styled from "styled-components";
import iconAddCart from "../assets/icons/icon-add-to-cart.svg";
import Button from "./Button";
import { colors } from "../styling/Variables";

const ItemComponent = styled.li`
    list-style: none;
    display: grid;
`;

const ItemImage = styled.img`
    border-radius: 8px;
    width: 100%;
    grid-row: 1 / 2;
`;

const CategoryName = styled.p`
    color: ${colors.rose500};
    font-size: 0.875rem;
    margin: -5px 0 4px;
    grid-row: 3 / 4;
`;

const ItemName = styled.p`
    font-weight: 600;
    margin: 0px 0;
    grid-row: 4 / 5;
`;

const Price = styled.p`
    color: ${colors.primary};
    font-weight: 600;
    margin: 4px 0;
    grid-row: 5 / 6;
`;

const CartButton = styled(Button)`
    position: relative;
    bottom: 22px;
    justify-self: center;
    grid-row: 2 / 3;
`;

export default function Item({ name, category, price, imageObject }) {
    const sourceSet = `${imageObject.mobile} 654w, ${imageObject.tablet} 427w, ${imageObject.desktop} 502w`;

    price = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price);

    return (
        <ItemComponent>
            <ItemImage
                srcSet={sourceSet}
                sizes="(min-width: 1024px) 502px, (min-width: 375px) 427px, 654px"
                src={imageObject.mobile}
                alt={name}
            />
            <CategoryName>{category}</CategoryName>
            <ItemName>{name}</ItemName>
            <Price>{price}</Price>
            <CartButton iconImg={iconAddCart} text="Add to Cart" />
        </ItemComponent>
    );
}
