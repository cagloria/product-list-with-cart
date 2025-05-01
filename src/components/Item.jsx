import React from "react";
import styled from "styled-components";
import iconAddCart from "../assets/icons/icon-add-to-cart.svg";
import { colors } from "../styling/Variables";
import iconDecrement from "../assets/icons/icon-decrement-quantity.svg";
import iconIncrement from "../assets/icons/icon-increment-quantity.svg";
import { convertToUSD } from "../utility/utility";

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

// TODO: Animation to distinguish Add to Cart and increment/decrement
const CartQuantityContainer = styled.div`
    grid-row: 2 / 3;
    position: relative;
    bottom: 22px;
    box-sizing: border-box;
    height: 43px;
    min-height: 43px;
    min-width: 160px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    justify-self: center;
    background-color: ${colors.primary};
    border: 1px solid transparent;
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
    height: 100%;
    border: none;
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

/**
 * Individual item that appears within the shopping page.
 * @param {string} name                 Name of item
 * @param {string} category             Cateogry of item
 * @param {number} price                Price of item
 * @param {object} imageObject          Object to hold image URLs
 * @param {function} onQuantityChange   Function to handle item quantity change
 * @param {number} quantity             Quantity of item
 * @returns List item displaying item image, details, and ability to change 
 * quantity
 */
export default function Item({
    name,
    category,
    price,
    imageObject,
    onQuantityChange,
    quantity = 0,
}) {
    const sourceSet = `${imageObject.mobile} 654w, ${imageObject.tablet} 427w, ${imageObject.desktop} 502w`;

    price = convertToUSD(price);

    function addItem() {
        if (quantity < 100) {
            onQuantityChange(name, 1);
        }
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
            <CartQuantityContainer>
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
            </CartQuantityContainer>
        </ItemComponent>
    );
}
