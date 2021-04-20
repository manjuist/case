/**
 * name: index.jsx
 * author: Deve
 * date: 2021-04-19
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Canvas from './canvas';

const ref = React.createRef()

let canvas = null
let context = null

function Timeline({ data }){
    useEffect(() => {
        if (!canvas){
            canvas = new Canvas()
            const dom = ref.current;
            canvas.init(dom);

            console.log(context, canvas);
        }
    }, [])
    return (<div ref={ref} />)
}

Timeline.propTypes = {
    data: PropTypes.shape({

    }).isRequired,
}

export const getCanvas = () => canvas;
export const getContext = () => context;
export default Timeline
