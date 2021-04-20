/**
 * name: index.jsx
 * author: Deve
 * date: 2021-04-19
 */
import React, { useEffect } from 'react'
import G6 from '@antv/g6'
import Timeline from 'components/timeline'
import data from './data'

G6.Graph.prototype.selected = function (item){ 
    this.update(item, {
        style: {
            stroke: 'blue',
            lineWidth: 5,
        }, 
    })
}

function G6Demo(){
    const ref = React.createRef();
    let graph = null;
    useEffect(() => {
        const dom = ref.current;
        const [{ width }] = dom.getClientRects()
        if (!graph){
            graph = new G6.Graph({
                container: dom,
                width,
                height: 500,
                fitView: true,
                fitViewPadding: [20, 40, 50, 20],
                modes: {
                    default: ['click-select', 'drag-canvas', 'zoom-canvas', 'drag-node'],
                },
            });
        }
        graph.data(data);
        graph.render();
        window.graph = graph
    }, [])
    return (
        <div>
            <div ref={ref} />
            <Timeline data={data} />
        </div>
    )
}

export default G6Demo;
