/**
 * name: timeline.js
 * author: Deve
 * date: 2021-04-20
 */

import moment from 'moment';

window.moment = moment;

let time
let timeType = 'h'
const timeTypeMap = {
    h: {
        name: 'h', value: 12, next: 'd', pre: '', max: 24, min: 6, 
    },
    d: {
        name: 'd', value: 15, next: 'm', pre: 'h', max: 31, min: 7
    },
    m: {
        name: 'm', value: 6, next: '', pre: 'd', max: 12, min: 3
    },
}

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

    drawScale(deltaY){
        let curTime = timeTypeMap[timeType];
        if (time === undefined){
            time = curTime.value
        }
        if (time < curTime.min){
            time = curTime.min
            const preTime = curTime
            curTime = timeTypeMap[preTime.pre]
            if (!curTime) { 
                curTime = preTime
            } else {
                timeType = preTime.pre;
                time = curTime.value
            }
        }
        if (time > curTime.max){
            time = curTime.max
            const preTime = curTime
            curTime = timeTypeMap[preTime.next]
            if (!curTime) { 
                curTime = preTime
            } else {
                timeType = preTime.next;
                time = curTime.value
            }
        }
        if (deltaY > 0){
            time -= 1;
        } 
        if (deltaY < 0){
            time += 1;
        }
        const {
            context, 
            context: { canvas: { width } },
        } = this;
        this.drawLine([0, 0], [width, 0], true)
        const line = (i, len) => {
            const x = i * (width / len)
            this.drawLine([x, 0], [x, 10], true)
        }
        for (let i = 0, len = time; i < len; i++) {
            line(i, time)
            const x = i * (width / time)
            context.font = '24px monospace';
            context.textAlign = 'center';
            context.fillText(`${i + 1}${curTime.name}`, x, 20, 30);
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
