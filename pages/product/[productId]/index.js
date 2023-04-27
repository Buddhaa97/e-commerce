import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AddedCart from '../../cart/added-cart';
import classes from './product.module.css';
import PopUpModal from '../../../components/modal/modal';

const productList = () => {
    const router = useRouter();
    const {productId} = router.query;
    const [items, setItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState([]);

    const getData = useCallback(async () => {
        const fetchedData = await fetch(
            'https://e-commerce-954ba-default-rtdb.asia-southeast1.firebasedatabase.app/fruits.json',
            {
                method: 'GET',
            }).then(res => {
            return res.json();
        });
        return fetchedData;
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData();
            setData(data)
        };
        fetchData();
    }, []);

    const arrangeData = data ? Object.entries(data).map(([key, value]) => ({[key]: value})) : [];
    const allData = arrangeData ? arrangeData.map(obj => {
            const key = Object.keys(obj)[0];
            const value = obj[key];
            return { id: key, ...value };
        }) : [];


    const addToCart = (fruit) => {
        if (items?.find(item => item.name === fruit.name)) {
            alert(fruit.name + ' is already added');
        } else {
            setItems(prev => [...prev, fruit]);
        }
    }
    const DeleteItem = (id) => {
        fetch(
            `https://e-commerce-954ba-default-rtdb.asia-southeast1.firebasedatabase.app/fruits/${id}.json`,
            {
                method: 'DELETE',
            });
    }

    const updateQuantity = (itemName, sign) => {
        setItems(items => {
            const index = items?.findIndex(item => item.name === itemName);
            sign === 'plus' ? items[index].quantity++ : items[index].quantity--;
            return [...items];
        });
    }
    const removeItem = (itemName) => {
        const newItem = items?.filter(item => item.name !== itemName);
        setItems(newItem);
    }

    const handleModal = () => {
        setIsOpen(true);
    }

    const purchaseProduct = async () => {
        const response = await fetch(
            'https://e-commerce-954ba-default-rtdb.asia-southeast1.firebasedatabase.app/shoppingList.json',
            {
                method: 'POST',
                body: JSON.stringify(items),
            });
        if (response.ok) {
            router.reload();
        } else {
            alert('something went wrong')
        }
    }

    const reloadPage = () => {
        router.reload();
    }

    return (
        <div className={classes.container}>
            <div className={classes.leftContainer}>
                <h1>List of {productId}</h1>
                <button onClick={handleModal}>Add more fruits</button>
                {
                    allData?.length ? allData.map(item => (
                        <>
                            <br/>
                            <div key={item.name}>
                                <div className={classes.titleContainer}>
                                    <h3>{item.name}</h3>
                                    <Link href={{pathname: `/product/detail/${item.name }`, query: {id: item.id}}}>
                                        <button>Detail</button>
                                    </Link>
                                </div>
                                <br/>
                                <button onClick={() => DeleteItem(item.id)}>Delete</button>
                                {/*TODO only visible to admin*/}
                                <button onClick={() => addToCart(item)}>Add to cart</button>
                                <Link href={{
                                    pathname: '/product/[productId]/list/[listId]',
                                    query: {productId: productId, listId: item.id}
                                }}>
                                    <button>Edit</button>
                                </Link>
                            </div>
                        </>
                    )) : <h1>Product not created yet</h1>
                }
            </div>
            {items?.length ?
                <div className={classes.rightContainer}>
                    <AddedCart items={items} updateQuantity={updateQuantity} remove={removeItem} /><br />
                    <button onClick={() => setItems([])}>cancel</button>
                    <button onClick={() => purchaseProduct()}>confirm</button>
                </div> : <></>
            }
            {isOpen ?
                <PopUpModal isOpen={isOpen} setIsOpen={setIsOpen} reload={reloadPage} /> :
                <></>
            }
        </div>
    )
}

export default productList;
