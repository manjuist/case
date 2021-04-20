/**
 * name: data.js
 * author: Deve
 * date: 2021-04-19
 */

const data = {
    // 点集
    nodes: [
        {
            id: 'node1',
            x: 100,
            y: 200,
            label: 'node1',
        },
        {
            id: 'node2',
            x: 300,
            y: 200,
            label: 'node2',
        },
        {
            id: 'node3',
            x: 200,
            y: 100,
            label: 'node3',
        },
    ],
    // 边集
    edges: [
        {
            id: 'edge1',
            source: 'node1', // String，必须，起始点 id
            target: 'node2', // String，必须，目标点 id
            time: '1618814768696',
            label: 'edge1',
        },
    ],
};

export default data;
