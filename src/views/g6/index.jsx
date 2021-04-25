/**
 * name: index.jsx
 * author: Deve
 * date: 2021-04-19
 */
import React, { useEffect, useState } from 'react'
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

const initdata = { ...data };
let graph = null;

function G6Demo(){
    console.log(11111111)
    const ref = React.createRef();
    const [graphData, setGraphData] = useState(initdata);
    useEffect(() => {
        console.log(1)
        const dom = ref.current;
        const [{ width }] = dom.getClientRects()
        if (!graph){
            graph = new G6.Graph({
                container: dom,
                width,
                height: 400,
                fitView: true,
                fitViewPadding: [20, 40, 50, 20],
                modes: {
                    default: ['click-select', 'drag-canvas', 'zoom-canvas', 'drag-node'],
                },
            });
        }
        graph.data(graphData);
        graph.render();
        window.graph = graph
    }, [graphData])
    window.addItem = (a) => { graphData.nodes.push(a); setGraphData({ ...graphData, nodes: graphData.nodes }) }
    console.log(graphData, 'pppppppp')
    return (
        <div>
            <div ref={ref} />
            <Timeline data={graphData} />
        </div>
    )
}

export default G6Demo;
