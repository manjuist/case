/**
 * name: index.jsx
 * author: Deve
 * date: 2021-04-19
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Canvas from './canvas';
import Timeline from './timeline';
import { getCanvasPoint } from '../../utils'

const ref = React.createRef();
const iCanvas = new Canvas();
let timelineInstance = null;

const { inPath, addEvent } = iCanvas;

function TimelineContainer({ data }){
    useEffect(() => {
        const dom = ref.current;
        iCanvas.init(dom, (canvas) => {
            addEvent((e) => {
                if (timelineInstance){
                    timelineInstance.render({ eventPos: getCanvasPoint(canvas, [e.clientX, e.clientY]) })
                }
            })
        });
        const context = iCanvas.getContext();
        timelineInstance = Timeline.init({ context, data, inPath })
    }, []);

    if (timelineInstance){
        timelineInstance.render()
    }

    return (<div id="container" ref={ref} />);
}

TimelineContainer.propTypes = {
    data: PropTypes.shape({
        nodes: PropTypes.arrayOf(PropTypes.shape({})),
        edges: PropTypes.arrayOf(PropTypes.shape({})),
    }).isRequired,
}

export { iCanvas };
export default TimelineContainer;
