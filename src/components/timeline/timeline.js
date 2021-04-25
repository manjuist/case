/**
 * name: timeline.js
 * author: Deve
 * date: 2021-04-20
 */

import moment from 'moment';

window.moment = moment;
class Timeline {
    constructor({ context, data, config = { padding: [10, 10, 10, 10] } }){
        this.data = data;
        this.context = context;
        this.config = config;
        this.currentPoint = [0, 0];
    }

    clearup(){
        const {
            context, 
            context: { canvas: { width, height } },
        } = this;
        context.clearRect(0, 0, width, height)
        this.currentPoint = [0, 0];
    }

    drawScale(){
        const {
            context, 
            context: { canvas: { width } },
        } = this;
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(width, 0);
        context.stroke();
        const line = (i, len) => {
            const x = i * (width / len)
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, 10);
            context.stroke();
        }
        for (let i = 0, len = 31; i < len; i++) {
            line(i, len)
            const x = i * (width / len)
            context.textAlign = 'center';
            context.fillText(`${i + 1}`, x, 20, 24);
        }
    }

    drawEntityLine(){
        const { 
            context,
            context: { canvas: { width, height } },
            data: { nodes },
            currentPoint: [x, y],
        } = this;
        window.ctx = context;
        const deliv = (height - 20) / nodes.length
        context.beginPath();
        context.moveTo(x, y + deliv);
        context.lineTo(x + width, y + deliv);
        context.stroke();
        this.currentPoint = [x, y + deliv];
    }

    drawEntityTitle({ label }){
        const { 
            context,
            currentPoint: [x, y],
        } = this;
        context.font = '24px monospace';
        context.textAlign = 'left';
        context.fillText(label, x, y - 6);
    }

    render(config){
        const {
            data: { nodes, edges },
            context: { canvas: { height, width } },
        } = this;
        this.clearup();
        const newConf = { ...this.config, ...config };
        this.config = newConf;
        const { padding } = newConf;
        console.log(nodes, edges, width, height, padding);
        this.drawScale()
        nodes.forEach((item) => { 
            this.drawEntityLine();
            this.drawEntityTitle(item);
        })
    }
}

Timeline.init = function (arg){
    const timeline = new Timeline(arg);
    timeline.render()
    return timeline;
}

export default Timeline
