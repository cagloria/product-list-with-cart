import styled from "styled-components";
import { colors } from "../styling/Variables";
import { convertToUSD } from "../utility/utility";
import IconButton from "../ui/IconButton";
import CartIcon from "../assets/icons/icon-add-to-cart.svg?react";
import DecrementIconSVG from "../assets/icons/icon-decrement-quantity.svg?react";
import IncrementIconSVG from "../assets/icons/icon-increment-quantity.svg?react";

const ItemComponent = styled.li`
    list-style: none;
    display: grid;
`;

const ItemImage = styled.img`
    box-sizing: border-box;
    border: 3px solid
        ${(props) => (props.$quantity > 0 ? colors.primary : "transparent")};
    border-radius: 8px;
    width: 100%;
    grid-row: 1 / 2;
    transition: border-color 0.1s ease-in;
    height: 207px;
    object-fit: cover;

    @media screen and (min-width: 1024px) {
        height: 243px;
    }
`;

const CategoryName = styled.p`
    color: ${colors.rose500};
    font-size: 0.87rem;
    margin: -9px 0 6px;
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

const QuantityChangeButton = styled(IconButton)`
    &:first-child {
        margin-left: 12px;
    }

    &:last-child {
        margin-right: 12px;
    }

    svg {
        padding: 4px;
        border: 1px solid ${colors.rose50};
        border-radius: 50%;
    }

    &:hover {
        svg {
            background-color: ${colors.rose100};

            path {
                fill: ${colors.primary};
            }
        }
    }
`;

/**
 * Individual item that appears within the shopping page
 * @param {string} item                 Item object
 * @param {function} onQuantityChange   Function to handle item quantity change
 * @param {number} quantity             Quantity of item
 * @returns List item displaying item image, details, and ability to change
 * quantity
 */
export default function Item({ item, onQuantityChange, quantity = 0 }) {
    /**
     * Adds one of this item to cart. Prevents function if quantity is over 99.
     */
    function addItem() {
        if (quantity < 100) {
            onQuantityChange(item, 1);
        }
    }

    /**
     * Removes one of this item from the cart.
     */
    function removeItem() {
        if (quantity > 0) {
            onQuantityChange(item, -1);
        }
    }

    return (
        <ItemComponent>
            <ItemImage
                srcSet={`${item.image.mobile} 654w, ${item.image.tablet} 427w, ${item.image.desktop} 502w`}
                sizes="(max-width: 600px) 654px, (max-width: 1024px) 427px, 502px"
                src={item.image.desktop}
                aria-hidden
                alt=""
                $quantity={quantity}
            />
            <CategoryName>{item.category}</CategoryName>
            <ItemName>{item.name}</ItemName>
            <Price>{convertToUSD(item.price)}</Price>
            <CartQuantityContainer>
                {quantity < 1 ? (
                    <AddToCartButton onClick={addItem}>
                        <CartIcon aria-hidden />
                        Add to Cart
                    </AddToCartButton>
                ) : (
                    <>
                        <QuantityChangeButton
                            IconComponent={DecrementIconSVG}
                            label="Remove 1"
                            calledFunction={removeItem}
                        />
                        <span>{quantity}</span>
                        <QuantityChangeButton
                            IconComponent={IncrementIconSVG}
                            label="Add 1"
                            calledFunction={addItem}
                        />
                    </>
                )}
            </CartQuantityContainer>
        </ItemComponent>
    );
}
