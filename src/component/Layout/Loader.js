import React, { Fragment } from 'react';

const Loader = () => {
    return (
        <Fragment>
            <div className='flex justify-center items-center' style={{ marginTop: '40vh' }}>
                <span className="loading loading-spinner text-error loading-lg"></span>
            </div>
        </Fragment>
    );
};

export default Loader;