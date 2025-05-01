import styled from "styled-components";
import { convertToUSD } from "../utility/utility";
import { colors } from "../styling/Variables";
import iconRemove from "../assets/icons/icon-remove-item.svg";

const Item = styled.li`
    list-style-type: none;
    font-size: 0.875rem;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas: "h b" "p b";

    h4,
    b {
        font-weight: 600;
    }

    h4 {
        margin: 0;
        grid-area: h;
    }

    > p {
        margin: 10px 0;
        display: flex;
        gap: 12px;
        grid-area: p;
    }

    &:first-child {
        margin-top: -30px;
    }
`;

const Quantity = styled.span`
    color: ${colors.primary};
    font-weight: 600;
`;

const IndividualCost = styled.span`
    color: ${colors.rose500};
    grid-column: 1;
`;

const Total = styled.span`
    color: ${colors.rose500};
    font-weight: 600;
`;

const RemoveItemButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    margin-bottom: 10px;
    margin-right: -10px;
    padding: 0;
    grid-area: b;
    align-self: center;
    border: 0;

    img {
        border: 1px solid ${colors.rose400};
        border-radius: 50%;
        padding: 2px;
    }
`;

/**
 * Individual item displayed in a cart
 * @param {object} itemObj  JSON item object
 * @returns List item showing item name, quantity, individual price, total
 * price, and button to remove all of this item from cart
 */
export default function CartItem({ itemObj, onRemovalAll }) {
    /**
     * Remove all of this item from the cart
     */
    function removeAll() {
        onRemovalAll(itemObj.name);
    }

    return (
        <Item>
            <h4>{itemObj.name}</h4>
            <p>
                <Quantity>{itemObj.quantity}x</Quantity>
                <IndividualCost>
                    @ {convertToUSD(itemObj.price * itemObj.quantity)}
                </IndividualCost>
                <Total>{convertToUSD(itemObj.price)}</Total>
            </p>
            <RemoveItemButton
                aria-label="Remove all of this item from cart"
                onClick={removeAll}
            >
                <img src={iconRemove} alt="" aria-hidden />
            </RemoveItemButton>
        </Item>
    );
}
