import styled from "styled-components";
import iconAddCart from "./assets/icons/icon-add-to-cart.svg";
import { colors } from "./styling/Variables";

const ItemComponent = styled.li`
    list-style: none;
    display: flex;
    flex-direction: column;
`;

const ItemImage = styled.img`
    border-radius: 8px;
    width: 100%;
    order: 1;
`;

const CategoryName = styled.p`
    color: ${colors.categoryText};
    font-size: 0.875rem;
    margin: -5px 0 4px;
    order: 3;
`;

const ItemName = styled.p`
    font-weight: 600;
    margin: 0px 0;
    order: 4;
`;

const Price = styled.p`
    color: ${colors.primary};
    font-weight: 600;
    margin: 4px 0;
    order: 5;
`;

const CartButton = styled.button`
    order: 2;
    position: relative;
    bottom: 22px;
    width: fit-content;
    align-self: center;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 11px 26px;
    background-color: ${colors.panelBackground};
    border: 1px solid hsl(12, 20%, 44%);
    border-radius: 60px;
    font-size: 14px;
    font-weight: 600;
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
            <CartButton>
                <img src={iconAddCart} alt="" aria-hidden />
                Add to Cart
            </CartButton>
        </ItemComponent>
    );
}
