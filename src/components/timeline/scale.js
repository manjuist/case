/**
 * name: scale.js
 * author: Deve
 * date: 2021-04-29
 */
import ICanvas from './canvas';
import Layout from './layout';

let dividerWidth = 50;
// const currentYear = 2021
// const currentMonth = 4
// const currentDay = 31
// const currentHour = 20

const timeType = 'h'
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
const time = timeTypeMap[timeType]

const myCanvas = ICanvas.getInstance()

class Scale {
    constructor({ context, config }){
        this.context = context;
        this.config = config;
        this.layout = new Layout(config);
        this.ratio = window.devicePixelRatio;
    }

    handleWheel = (deltaY) => {
        // 滚轮方向决定刻度增减
        if (deltaY > 0){
            dividerWidth -= 1;
        }
        if (deltaY < 0){
            dividerWidth += 1;
        }
    }

    drawScale=(deltaY, point = [0, 0]) => {
        // const [x, y] = point
        const {
            context,
            context: { canvas: { width } },
            config: { scaleHeight },
            layout,
            handleWheel,
            ratio,
        } = this;
        myCanvas.clearup(0, 0, undefined, scaleHeight + 30);
        // console.log(x * ratio, y * ratio)
        console.log(point, ratio)
        handleWheel(deltaY);
        const startPoint = layout.getStartPoint(0, scaleHeight);
        myCanvas.drawLine(...startPoint, ...layout.getStartPoint(width, scaleHeight))
        const line = (i) => {
            const xp = i * dividerWidth
            myCanvas.drawLine(...layout.getStartPoint(xp, 0), ...layout.getStartPoint(xp, scaleHeight))
        }
        for (let i = 0, len = time.max; i <= len; i++) {
            line(i)
            const xp = i * dividerWidth
            context.font = '24px monospace';
            context.textAlign = 'center';
            context.fillText(`${i}${timeType}`, ...layout.getStartPoint(xp, 30), 30);
        }
    }
}

export default Scale
