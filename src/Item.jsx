import iconAddCart from "./assets/icons/icon-add-to-cart.svg";

function Item({ name, category, price, imageObject }) {
    return (
        <>
            <img src={imageObject.thumbnail} alt={name} />
            <p>{category}</p>
            <p>
                <b>{name}</b>
            </p>
            <p>{price}</p>
            <button>
                <img src={iconAddCart} alt="" aria-hidden />
                Add to Cart
            </button>
        </>
    );
}

export default Item;
