/**
 * name: timeline.js
 * author: Deve
 * date: 2021-04-20
 */

import ICanvas from './canvas'
import initConf from './config'
import { getCanvasPoint, getElementRect } from '../../utils'

/**
 * 获取指定元素宽度.
 *
 * @param {HTMLDivElement} container
 */
function getRectWidth(container){
    const { width } = getElementRect(container);
    return width;
}

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

const myCanvas = new ICanvas()

class Timeline {
    constructor({
        container,
        data,
        onClick,
        config,
    }){
        this.data = data;
        this.config = { ...initConf, ...config };
        this.onClick = onClick;
        this.currentPoint = [0, 0];
        this.container = container;
        this.context = myCanvas.getContext();
        this.ratio = window.devicePixelRatio;
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

    /**
     * 时间轴刻度线.
     *
     * @param {Number} deltaY
     */
    drawScale(deltaY){
        // timeType值可以是，时h,日d,月m,年y
        // 当前时间时间映射信息
        // max为当前单位最大值，min为最小值，value为中间值
        // 例如，timeType为月m时，max=12，min=1, value=6
        let curTime = timeTypeMap[timeType];
        // time为刻度数量
        if (time === undefined){
            time = curTime.value
        }
        // 刻度数小于最小值时切换更小单位，如月m->日d
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
        // 刻度数大于最大值时切换更大单位，如日d->月m
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
        // 滚轮方向决定刻度增减
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

    inPath([x, y]){
        const { ratio } = this;
        return myCanvas.inPath([x * ratio, y * ratio])
    }

    currentClick(item){
        if (this.inPath(this.eventPos)){
            this.onClick([item.id])
        }
    }

    drawDot(x, y){
        const { context } = this;
        context.beginPath();
        context.moveTo(x, y);
        context.arc(x, y, 10, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
    }

    drawEntityLine(item){
        const {
            context: { canvas: { width, height } },
            data: { nodes },
            currentPoint: [x, y],
            config: { scaleHeight, entityTitleWidth, padding: [, right, bottom] }
        } = this;

        const deliv = (height - scaleHeight - bottom) / nodes.length;
        const contentStartX = x + entityTitleWidth;
        const contentStartY = y + deliv + scaleHeight;
        const contentEndX = (x + width) - right;
        const contentEndY = y + deliv + scaleHeight;

        this.drawDot(contentStartX, contentStartY);

        this.drawLine([contentStartX, contentStartY], [contentEndX, contentEndY])
        if (this.eventPos){
            this.currentClick(item)
        }
        this.currentPoint = [x, y + deliv];
    }

    drawEntityTitle({ label }){
        const {
            context,
            currentPoint: [x, y],
            config: { scaleHeight, entityTitleWidth }
        } = this;

        const textStartX = x + entityTitleWidth
        const textStartY = y + scaleHeight

        context.font = '24px monospace';
        context.textAlign = 'right';
        context.fillText(label, textStartX, textStartY, entityTitleWidth);
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

    init(){
        const {
            container,
            ratio,
            config: {
                width: confWidth,
                height: confHeight
            }
        } = this;
        const canvas = myCanvas.createCanvas();
        const canvasWidth = confWidth || getRectWidth(container);

        canvas.style.width = `${canvasWidth}px`;
        canvas.style.height = `${confHeight}px`;
        canvas.width = canvasWidth * ratio;
        canvas.height = confHeight * ratio;

        if (container && canvas){
            container.appendChild(canvas);
        }
    }

    addEvent(){
        const { context: { canvas } } = this;
        canvas.addEventListener('click', (e) => {
            this.render({ eventPos: getCanvasPoint(canvas, [e.clientX, e.clientY]) })
        }, false)
        canvas.addEventListener('mousewheel', (e) => {
            e.preventDefault()
            e.stopPropagation()
            this.drawScale(e.deltaY)
            this.render()
        }, false)
    }
}

Timeline.init = function (conf){
    const timeline = new Timeline(conf);
    timeline.init()
    timeline.addEvent()
    timeline.render()
    return timeline;
}

export default Timeline
