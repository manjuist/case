/**
 * name: index.jsx
 * author: Deve
 * date: 2021-04-19
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Canvas from './canvas';
import Timeline from './timeline';

const ref = React.createRef();
const iCanvas = new Canvas();

function TimelineContainer({ data }){
    useEffect(() => {
        const dom = ref.current;
        iCanvas.init(dom);
        const context = iCanvas.getContext();
        Timeline.init({ context, data })
    }, []);

    return (<div ref={ref} />);
}

TimelineContainer.propTypes = {
    data: PropTypes.shape({
        nodes: PropTypes.arrayOf(PropTypes.shape({})),
        edges: PropTypes.arrayOf(PropTypes.shape({})),
    }).isRequired,
}

export { iCanvas };
export default TimelineContainer;
