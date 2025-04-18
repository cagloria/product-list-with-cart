import styled from "styled-components";
import { colors } from "../styling/Variables";
import imgEmptyCart from "../assets/icons/illustration-empty-cart.svg";
import iconCarbonNeutral from "../assets/icons/icon-carbon-neutral.svg";
import { convertToUSD } from "../utility/utility";

const Panel = styled.div`
    background-color: ${colors.rose50};
    box-shadow: ${colors.rose100} 0px 8px 40px 8px;
    border-radius: 12px;
    padding: 26px 24px;
    display: flex;
    flex-direction: column;
`;

const Heading = styled.h3`
    color: ${colors.primary};
    margin: 0 0 40px;
    font-size: 1.5rem;
`;

const Image = styled.img`
    align-self: center;
`;

const Description = styled.p`
    text-align: center;
    margin-top: 15px;
    font-size: 14px;
`;

const ItemsList = styled.ul`
    padding-left: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const CartItem = styled.li`
    list-style-type: none;
    font-size: 0.875rem;

    h4,
    b {
        font-weight: 600;
    }

    h4 {
        margin: 4px 0;
    }

    > p {
        margin: 10px 0;
        display: flex;
        gap: 12px;
    }

    &:first-child {
        h4 {
            margin-top: -30px;
        }
    }
`;

const ItemQuantity = styled.span`
    color: ${colors.primary};
    font-weight: 600;
`;

const ItemIndividualCost = styled.span`
    color: ${colors.rose500};
`;

const ItemTotal = styled.span`
    font-weight: 600;
    color: ${colors.rose500};
`;

const OrderTotal = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    span:first-child {
        font-size: 0.875rem;
    }

    span:last-child {
        font-size: 1.5625rem;
        font-weight: 700;
    }
`;

const DeliveryInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    margin-top: 40px;
    padding: 10px;
    background-color: ${colors.rose75};
    font-size: 0.875rem;

    b {
        font-weight: 600;
    }

    p {
        margin: 0;
    }
`;

export default function Cart({ className, cart, totalQuantity }) {
    const items = cart.items.map((item) => {
        if (item.quantity > 0) {
            const individualPrice = convertToUSD(item.price);

            const totalPrice = convertToUSD(item.price * item.quantity);

            return (
                <CartItem key={item.name}>
                    <h4>{item.name}</h4>
                    <p>
                        <ItemQuantity>{item.quantity}x</ItemQuantity>
                        <ItemIndividualCost>
                            @ {individualPrice}
                        </ItemIndividualCost>
                        <ItemTotal>{totalPrice}</ItemTotal>
                    </p>
                </CartItem>
            );
        }
    });

    const totalCost = () => {
        let cost = 0;
        cart.items.forEach((item) => {
            if (item.quantity > 0) {
                cost += item.quantity * item.price;
            }
        });
        cost = convertToUSD(cost);
        return cost;
    };

    return (
        <Panel className={className}>
            <Heading>Your Cart ({totalQuantity})</Heading>
            {totalQuantity <= 0 ? (
                <>
                    <Image src={imgEmptyCart} alt="" aria-hidden />
                    <Description>
                        Your added items will appear here.
                    </Description>
                </>
            ) : (
                <>
                    <ItemsList>{items}</ItemsList>
                    <OrderTotal className="flex-row-space-between">
                        <span>Order Total</span>
                        <span>{totalCost()}</span>
                    </OrderTotal>
                    <DeliveryInfo>
                        <img src={iconCarbonNeutral} alt="" aria-hidden />
                        <p>
                            This is a <b> carbon-neutral </b> delivery
                        </p>
                    </DeliveryInfo>
                </>
            )}
        </Panel>
    );
}
