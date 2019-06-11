// Core
import React from 'react';

const ProductPreview = (props) => {
    return (
        <>
            <fieldset>
                <legend>
                    { props.name }
                </legend>
            </fieldset>
        </>
    );
};

export default ProductPreview;
