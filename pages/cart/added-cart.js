const AddedCart = (props) => {

    const total = props?.items?.map(item => item.price * item.quantity).reduce(
        (accumulator, currentValue) => accumulator + currentValue
    );

    return (
        <div>
            <h2>Cart Added</h2>
            {props?.items?.map((item, index) => (
                <div key={index}>
                    <p>Name: {item.name}</p>
                    <p>Price: Nu.{item.price * item.quantity}</p>
                    <p>Quantity: {item.quantity}</p>
                    <button onClick={() => props.updateQuantity(item.name, 'minus')} disabled={item.quantity === 1}>－</button>
                    <button onClick={() => props.updateQuantity(item.name, 'plus')}>＋</button><br />
                    <button onClick={() => props.remove(item.name)}>Remove</button>
                </div>
            ))}
            <button>Total : Nu.{total}</button>
        </div>
    )
}

export default AddedCart;
