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

let count = 5;
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


const initdata = { 
    nodes,
    edges:[
        {
            source:'n1',
            target:'n2',
            label:'n1-n2',
            date: '2021-05-10',
        },
        {
            source:'n2',
            target:'n4',
            label:'n1-n2',
            date: '2021-05-15',
        },
        {
            source:'n3',
            target:'n0',
            label:'n1-n2',
            date: '2021-05-17',
        }
    ]
};
let graph = null;
function Tmline(){
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
            <Timeline
                data={graphData}
                onClick={clickHandler}
            />
            <div ref={ref} />
        </div>
    )
}

export default Tmline;
