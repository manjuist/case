/**
 * name: timeline.js
 * author: Deve
 * date: 2021-04-20
 */

class Timeline {
    constructor({ context, data, config = { padding: [10, 10, 10, 10] } }){
        this.data = data;
        this.context = context;
        this.config = config;
    }
    render(config){
        const {
            data: { nodes, edges },
            context: { canvas: { height, width } },
        } = this;
        const { padding } = { ...this.config, ...config };
        console.log(nodes, edges, width, height, padding);
    }
}

Timeline.init = function (arg){
    const timeline = new Timeline(arg);
    timeline.render()
    return timeline;
}

export default Timeline
