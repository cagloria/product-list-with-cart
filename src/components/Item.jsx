import React from "react";
import styled from "styled-components";
import iconAddCart from "../assets/icons/icon-add-to-cart.svg";
import { colors } from "../styling/Variables";
import iconDecrement from "../assets/icons/icon-decrement-quantity.svg";
import iconIncrement from "../assets/icons/icon-increment-quantity.svg";

const ItemComponent = styled.li`
    list-style: none;
    display: grid;
`;

// TODO: Styling for when item has > 0 quantity
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

// FIXME: Having quantity > 0 shifts content up
// TODO: Animation to distinguish Add to Cart and increment/decrement
const CartContainer = styled.div`
    grid-row: 2 / 3;
    position: relative;
    bottom: 22px;
    box-sizing: border-box;
    min-height: 43px;
    min-width: 160px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    justify-self: center;
    background-color: ${colors.primary};
    /* border: 1px solid transparent; */
    /* padding: 0 3px; */
    border-radius: 60px;
    font-weight: 600;

    span {
        font-size: 0.875rem;
        color: ${colors.rose50};
        flex-grow: 1;
        text-align: center;
    }
`;

const AddToCartButton = styled.button`
    width: 100%;
    box-sizing: border-box;
`;

const IncrementDecrementButton = styled.button`
    padding: 0;
    aspect-ratio: 1;
    justify-content: center;
    background-color: ${colors.primary};
    border: none;

    &:first-child {
        margin-left: 12px;
    }

    &:last-child {
        margin-right: 12px;
    }

    img {
        width: 10px;
        padding: 4px;
        aspect-ratio: 1;
        border: 1px solid ${colors.rose50};
        border-radius: 50%;
    }
`;

export default function Item({
    name,
    category,
    price,
    imageObject,
    onQuantityChange,
    quantity = 0,
}) {
    const sourceSet = `${imageObject.mobile} 654w, ${imageObject.tablet} 427w, ${imageObject.desktop} 502w`;

    price = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price);

    function addItem() {
        onQuantityChange(name, 1);
    }

    function removeItem() {
        if (quantity > 0) {
            onQuantityChange(name, -1);
        }
    }

    return (
        <ItemComponent>
            {/* FIXME: Fix responsive image source set */}
            <ItemImage
                srcSet={sourceSet}
                sizes="(min-width: 600px) 427px, (min-width: 1024px) 502px, 654px"
                src={imageObject.mobile}
                alt={name}
            />
            <CategoryName>{category}</CategoryName>
            <ItemName>{name}</ItemName>
            <Price>{price}</Price>
            <CartContainer>
                {quantity < 1 ? (
                    <AddToCartButton onClick={addItem}>
                        <img src={iconAddCart} alt="" aria-hidden />
                        Add to Cart
                    </AddToCartButton>
                ) : (
                    <>
                        <IncrementDecrementButton onClick={removeItem}>
                            <img src={iconDecrement} alt="Remove 1" />
                        </IncrementDecrementButton>
                        <span>{quantity}</span>
                        <IncrementDecrementButton onClick={addItem}>
                            <img src={iconIncrement} alt="Add 1" />
                        </IncrementDecrementButton>
                    </>
                )}
            </CartContainer>
        </ItemComponent>
    );
}
