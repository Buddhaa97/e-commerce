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

    const paths = Object.keys(data).map((listId) => ({
        params: {
            productId,
            listId
        }
    }));

    // Return the possible paths for static generation
    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const { listId } = params;
    // Fetch the product data based on the listId parameter
    const data =  await fetch(
        `https://e-commerce-954ba-default-rtdb.asia-southeast1.firebasedatabase.app/fruits/${listId}.json`,
        {
            method: 'GET',
        }).then(res => {
        return res.json()});

    // Return the product data as props
    return {
        props: {
            data
        },
        revalidate: 3600, //regenerate every 1 hour
    };
}

const EditContent = (props) => {
    const router = useRouter();
    const { listId, productId } = router.query;
    const [edit, setEdit] = useState(false);

    const handleOnSubmit = async (values) => {
        const payload = setIn(
            values,
            'quantity',
            1,
        );
        await fetch(
            `https://e-commerce-954ba-default-rtdb.asia-southeast1.firebasedatabase.app/fruits/${listId}.json`,
            {
                method: 'PUT',
                body: JSON.stringify(payload),
            });
        router.back();
    }

    return (
        <>
            <h2>View of id ({listId}) of product Id {productId}</h2>
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

export default EditContent;
