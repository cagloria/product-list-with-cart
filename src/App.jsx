import data from "./data/data.json";
import Item from "./Item";
import Cart from "./Cart";

function App() {
    const listItems = data.map((item) => (
        <li key={item.name}>
            <Item
                name={item.name}
                category={item.category}
                price={item.price}
                imageObject={item.image}
            />
        </li>
    ));

    return (
        <>
            <h2>Desserts</h2>
            <div>{listItems}</div>
            <Cart />
        </>
    );
}

export default App;
