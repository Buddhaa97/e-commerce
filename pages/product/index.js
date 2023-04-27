import Link from 'next/link';

const ProductList = () => {
    return (
        <>
            <div>Product Page Of Fruits</div>
            <Link href={{ pathname: '/product/[productId]', query: { productId: 'fruit' } }}>
                <h2>SHOW ALL ITEMS</h2>
            </Link>
        </>
    )
}

export default ProductList;
