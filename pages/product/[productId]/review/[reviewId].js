import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { setIn } from 'final-form';
import classes from '../../../../components/modal/modal.module.css';

export async function getStaticPaths() {
    // Fetch the list of products and reviews
    const data = await fetch(
        'https://e-commerce-954ba-default-rtdb.asia-southeast1.firebasedatabase.app/fruits.json',
        {
            method: 'GET',
        }).then(res => {
        return res.json();
    });
    const productId = 'fruit';

    const paths = Object.keys(data).map((reviewId) => ({
        params: {
            productId,
            reviewId
        }
    }));

    // Return the possible paths for static generation
    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const { productId, reviewId } = params;
    // Fetch the product data based on the reviewId parameter
    const data =  await fetch(
        `https://e-commerce-954ba-default-rtdb.asia-southeast1.firebasedatabase.app/fruits/${reviewId}.json`,
        {
            method: 'GET',
        }).then(res => {
        return res.json()});

    // Return the product data as props
    return {
        props: {
            data
        }
    };
}

const Review = (props) => {
    const router = useRouter();
    const { reviewId, productId } = router.query;
    const [edit, setEdit] = useState(false);

    const handleOnSubmit = async (values) => {
        const payload = setIn(
            values,
            'quantity',
            1,
        );
        await fetch(
            `https://e-commerce-954ba-default-rtdb.asia-southeast1.firebasedatabase.app/fruits/${reviewId}.json`,
            {
                method: 'PUT',
                body: JSON.stringify(payload),
            });
        router.back();
    }

    return (
        <>
            <h2>review id {reviewId} of product Id {productId}</h2>
            <Form onSubmit={(values) => handleOnSubmit(values)} validate={() => {}}>
                {({handleSubmit}) => (
                    <>
                        <form onSubmit={handleSubmit}>
                            <Field name='name' defaultValue={props?.data?.name}
                                   render={({ input, meta }) => (
                                       <div className={classes.inputContainer}>
                                           <div className={classes.inputAlignment}>
                                               <label>Name:</label>
                                               <input type="text" {...input} disabled={!edit} />
                                           </div>
                                       </div>
                                   )}
                            />
                            <Field name='price' defaultValue={props?.data?.price}
                                   render={({ input, meta }) => (
                                       <div className={classes.inputContainer}>
                                           <div className={classes.inputAlignment}>
                                               <label>Price:</label>
                                               <input type="number" {...input} disabled={!edit} />
                                           </div>
                                       </div>
                                   )}
                            />
                            <button type="submit">submit</button>
                        </form>
                        <button onClick={() => setEdit(true)}>edit</button>
                    </>

                    )}
            </Form>
        </>
    )
}

export default Review;
