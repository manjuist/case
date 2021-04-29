/**
 * name: canvas.js
 * author: Deve
 * date: 2021-04-19
 */

class ICanvas {
    constructor(){
        this.canvas = null;
        this.context = null;
    }

    createCanvas=() => {
        const { canvas } = this;

        if (canvas) return canvas

        this.canvas = document.createElement('canvas');
        return this.canvas;
    }

    getContext=() => {
        const { context, createCanvas } = this;

        if (context) return context;

        const canvas = createCanvas();
        this.context = canvas.getContext('2d');
        return this.context;
    }

    inPath=([x, y], path) => {
        const context = this.getContext()
        if (path){
            return context.isPointInPath(path, x, y)
        }
        return context.isPointInPath(x, y)
    }

    drawRectLine=(x, y, w, h, c = '#000') => {
        const { context } = this;
        context.beginPath()
        context.strokeStyle = c;
        context.fillStyle = c;
        context.rect(x, y, w, h);
        context.stroke()
        context.fill()
    }

    drawDot = (x, y, r, c = '#000') => {
        const { context } = this;
        context.beginPath()
        context.strokeStyle = c;
        context.fillStyle = c;
        context.arc(x, y, r, 0, Math.PI * 2);
        context.stroke()
        context.fill()
    }

    drawLine(x, y, x1, y1, w = 2){
        const { context } = this;
        context.lineWidth = w
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x1, y1);
        context.closePath();
        context.stroke();
    }
}

ICanvas.getInstance = function (){
    let { instance } = ICanvas;
    if (instance) return instance;
    instance = new ICanvas();
    ICanvas.instance = instance;
    return instance;
}

export default ICanvas
