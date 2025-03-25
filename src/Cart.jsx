import imgEmptyCart from "./assets/icons/illustration-empty-cart.svg";

function Cart() {
    return (
        <div>
            <h3>Your Cart</h3>
            <img src={imgEmptyCart} alt="" aria-hidden />
            <p>Your added items will appear here.</p>
        </div>
    );
}

export default Cart;
