/**
 * name: timeline.js
 * author: Deve
 * date: 2021-04-20
 */

import ICanvas from './canvas';
import initConf from './config';
import Layout from './layout';
import Scale from './scale';
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


const myCanvas = ICanvas.getInstance()

class Timeline {
    constructor({
        container,
        data,
        onClick,
        config,
    }){
        const newConf = { ...initConf, ...config };
        this.data = data;
        this.config = newConf;
        this.onClick = onClick;
        this.currentPoint = [0, 0];
        this.container = container;
        this.context = myCanvas.getContext();
        this.ratio = window.devicePixelRatio;
        this.layout = new Layout(newConf);
        this.scale = new Scale({
            config: newConf,
            context: myCanvas.getContext()
        })
    }

    /**
     * 时间轴刻度线.
     *
     * @param {Number} deltaY
     */

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
        const { layout, context } = this;
        context.beginPath();
        context.moveTo(...layout.getStartPoint(x, y));
        context.arc(...layout.getStartPoint(x, y), 10, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
    }

    drawEntityLine(item){
        const {
            layout,
            context: { canvas: { width, height } },
            data: { nodes },
            currentPoint: [x, y],
            config: { scaleHeight, entityTitleWidth, padding: [, right, bottom] }
        } = this;

        const deliv = (height - scaleHeight - bottom) / nodes.length;
        const contentStartX = x + entityTitleWidth;
        const contentStartY = y + deliv + scaleHeight;
        const contentEndX = (x + width) - right;
        // const contentEndY = y + deliv + scaleHeight;
        const contentWidth = contentEndX - contentStartX;
        const contentHeight = 1;
        myCanvas.drawDot(...layout.getStartPoint(contentStartX, contentStartY), 4);
        myCanvas.drawRectLine(...layout.getStartPoint(contentStartX, contentStartY), contentWidth, contentHeight)
        if (this.eventPos){
            this.currentClick(item)
        }
        this.currentPoint = [x, y + deliv];
    }

    drawEntityTitle({ label }){
        const {
            context,
            currentPoint: [x, y],
            config: { scaleHeight, entityTitleWidth },
            layout,
        } = this;

        const textStartX = x + entityTitleWidth
        const textStartY = y + scaleHeight

        context.font = '24px monospace';
        context.textAlign = 'right';
        context.fillText(label, ...layout.getStartPoint(textStartX, textStartY), entityTitleWidth);
    }

    drawContent = () => {
        const {
            data: { nodes },
            config: { scaleHeight },
            layout,
        } = this;
        myCanvas.clearup(...layout.getStartPoint(0, scaleHeight));
        nodes.forEach((item) => {
            this.drawEntityLine(item);
            this.drawEntityTitle(item);
        })
        this.currentPoint = [0, 0];
    }

    render(config){
        if (config){
            const { eventPos } = config
            this.eventPos = eventPos
        }
        const { scale } = this;
        const newConf = { ...this.config, ...config };
        this.config = newConf;
        scale.drawScale()
        this.drawContent()
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
        let moveDist = 0;
        const { context: { canvas }, scale, container } = this;
        const moveCallback = (e) => { 
            if (Math.abs(e.clientX - moveDist) > 10){
                container.style.cursor = 'move'
                console.log(e)
            }
        }
        canvas.addEventListener('click', (e) => {
            this.render({ eventPos: getCanvasPoint(canvas, [e.clientX, e.clientY]) })
        }, false)
        canvas.addEventListener('mousewheel', (e) => {
            e.preventDefault()
            e.stopPropagation()
            scale.drawScale(e.deltaY, getCanvasPoint(canvas, [e.clientX, e.clientY]))
            this.drawContent()
        }, false)
        canvas.addEventListener('mousedown', (e) => {
            moveDist = e.clientX;
            moveCallback(e)
            canvas.addEventListener('mousemove', moveCallback, false)
        }, false)
        canvas.addEventListener('mouseup', (e) => {
            moveCallback(e)
            container.style.cursor = ''
            canvas.removeEventListener('mousemove', moveCallback, false)
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
