import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import Modal from 'react-modal';
import { setIn } from 'final-form';
import classes from "./modal.module.css";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#yourAppElement');

const PopUpModal = (props) => {
    // const afterOpenModal = () => {
    //     // references are now sync'd and can be accessed.
    //     subtitle.style.color = '#f00';
    // }

    function closeModal() {
        props.setIsOpen(false);
    }

    const handleOnSubmit = async (values) => {
        const payload = setIn(
            values,
            'quantity',
            1,
        );
        await fetch(
            'https://e-commerce-954ba-default-rtdb.asia-southeast1.firebasedatabase.app/fruits.json',
            {
                method: 'POST',
                body: JSON.stringify(payload),
            });
        props.setIsOpen(false);
    }

    return (
        <div>
            {/*<button onClick={openModal}>Open Modal</button>*/}
            <Modal
                isOpen={props.isOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <Form onSubmit={values => handleOnSubmit(values)} validate={() => {}}>
                    {({handleSubmit}) => (
                        <form onSubmit={handleSubmit}>
                            <Field name='name' defaultValue=""
                                   render={({ input, meta }) => (
                                       <div className={classes.inputContainer}>
                                          <div className={classes.inputAlignment}>
                                              <label>Name:</label>
                                              <input type="text" {...input} placeholder="Name of fruit" />
                                          </div>
                                       </div>
                                   )}
                            />
                            <Field name='price' defaultValue=""
                                   render={({ input, meta }) => (
                                       <div className={classes.inputContainer}>
                                           <div className={classes.inputAlignment}>
                                               <label>Price:</label>
                                               <input type="number" {...input} placeholder="Price" />
                                           </div>
                                       </div>
                                   )}
                            />
                            {/*<Field name='quantity' defaultValue=""*/}
                            {/*       render={({ input, meta }) => (*/}
                            {/*           <div className={classes.inputContainer}>*/}
                            {/*               <div className={classes.inputAlignment}>*/}
                            {/*                   <label>Quantity:</label>*/}
                            {/*                   <input type="number" {...input} placeholder="Quantity" />*/}
                            {/*               </div>*/}

                            {/*           </div>*/}
                            {/*       )}*/}
                            {/*/>*/}
                            <button onClick={closeModal}>cancel</button>
                            <button onSubmit={handleSubmit}>submit</button>
                        </form>
                    )}
                </Form>
            </Modal>
        </div>
    );
}

export default PopUpModal;
