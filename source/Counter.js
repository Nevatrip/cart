// Core
import React, { Component } from 'react';
// import useStoreon from 'storeon/react';
import connect from 'storeon/react/connect';

class Counter extends Component {
    render () {
        const { dispatch, count } = this.props;

        return (
            <button onClick = { () => dispatch('inc') }>
                {count}
            </button>
        );
    }

}

export default connect('count', Counter);
// export const Counter = () => {

//     // const { dispatch, count } = this.props;
//     const { dispatch, count } = useStoreon('count');

//     return (
//         <button onClick = { () => dispatch('inc') }>
//             {count}
//         </button>
//     );


// };

// onClick = { () => dispatch('inc') }
