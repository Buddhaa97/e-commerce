import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ProductDetail = () => {
    const router = useRouter();
    const [item, setItem] = useState({});

    const getData = useCallback(async () => {
        const data =  await fetch(
            `https://e-commerce-954ba-default-rtdb.asia-southeast1.firebasedatabase.app/fruits/${router?.query?.id}.json`,
            {
                method: 'GET',
            }).then(res => {
            return res.json()});
        setItem(data);
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    const handleCLick = () => {
        router.back();
    }

    return (
        <div>
            <h1>Detail view of {item.name}</h1>
            <h2>Name: {item.name}</h2>
            <h2>Price: {item.price}</h2>
            <button onClick={() => handleCLick()}>Back</button>
        </div>
    )
}

export default ProductDetail;
