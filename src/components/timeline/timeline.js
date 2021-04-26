/**
 * name: timeline.js
 * author: Deve
 * date: 2021-04-20
 */

import moment from 'moment';

window.moment = moment;
class Timeline {
    constructor({
        context, data, config = { padding: [10, 10, 10, 10] }, inPath, selectHandler
    }){
        this.data = data;
        this.context = context;
        this.config = config;
        this.currentPoint = [0, 0];
        this.inPath = inPath;
        this.selectHandler = selectHandler;
    }

    drawLine([x, y], [x1, y1], normal){
        const { context } = this;
        context.beginPath();
        context.moveTo(x, y);
        if (normal){
            context.lineTo(x1, y1);
        } else {
            context.rect(x, y, x1 - x, 2);
        }
        context.closePath();
        context.stroke();
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
        this.drawLine([0, 0], [width, 0], true)
        const line = (i, len) => {
            const x = i * (width / len)
            this.drawLine([x, 0], [x, 10], true)
        }
        for (let i = 0, len = 31; i < len; i++) {
            line(i, len)
            const x = i * (width / len)
            context.font = '24px monospace';
            context.textAlign = 'center';
            context.fillText(`${i + 1}`, x, 20, 24);
        }
    }

    currentClick(item){
        console.log(this.inPath(this.eventPos))
        if (this.inPath(this.eventPos)){
            this.selectHandler([item.id])
        }
    }

    drawEntityLine(item){
        const { 
            context,
            context: { canvas: { width, height } },
            data: { nodes },
            currentPoint: [x, y],
        } = this;
        window.ctx = context;
        const deliv = (height - 20) / nodes.length
        this.drawLine([x, y + deliv], [x + width, y + deliv])
        if (this.eventPos){
            this.currentClick(item)
        }
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
        if (config){
            const { eventPos } = config
            this.eventPos = eventPos
        }
        const {
            data: { nodes },
        } = this;
        this.clearup();
        const newConf = { ...this.config, ...config };
        this.config = newConf;
        this.drawScale()
        nodes.forEach((item) => { 
            this.drawEntityLine(item);
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
