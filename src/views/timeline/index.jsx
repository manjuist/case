/**
 * name: index.jsx
 * author: Deve
 * date: 2021-04-19
 */
import React, { useEffect, useState } from 'react'
import G6 from '@antv/g6'
import Timeline from '@WLH/timeline'

G6.Graph.prototype.selected = function (item){ 
    this.update(item, {
        style: {
            stroke: 'blue',
            lineWidth: 5,
        }, 
    })
}

let count = 15;
const nodes = []
const num = (min = 0, max = 200) => min + (((max - min) + 1) * Math.random())
while (count > 0){
    count -= 1;
    nodes.push({
        id: `n${count}`,
        label: `n${count}`,
        x: num(),
        y: num(),
    })
}


const initdata = { nodes };
let graph = null;
function G6Demo(){
    const ref = React.createRef();
    const [graphData, setGraphData] = useState(initdata);
    useEffect(() => {
        const dom = ref.current;
        const [{ width }] = dom.getClientRects()
        graph = new G6.Graph({
            container: dom,
            width,
            height: 400,
            fitView: true,
            fitViewPadding: [20, 40, 50, 20],
            modes: {
                default: ['click-select', 'drag-canvas', 'zoom-canvas', 'drag-node'],
            },
            gpuEnabled: true,
        });
        graph.data(graphData);
        graph.render();
        window.graph = graph
    }, [graphData])
    window.addItem = (a) => { graphData.nodes.push(a); setGraphData({ ...graphData, nodes: graphData.nodes }) }

    function clickHandler(currentNodes){
        const allNodes = graph.getNodes()
        const list = allNodes.filter(item => currentNodes.includes(item.getModel().id))
        list.forEach(item => graph.selected(item))
    }

    return (
        <div>
            <div ref={ref} />
            <Timeline
                data={graphData}
                onClick={clickHandler}
            />
        </div>
    )
}

export default G6Demo;
