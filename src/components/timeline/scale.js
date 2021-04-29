/**
 * name: scale.js
 * author: Deve
 * date: 2021-04-29
 */
import ICanvas from './canvas';
import Layout from './layout';

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

const myCanvas = ICanvas.getInstance()

class Scale {
    constructor({ context, config }){
        this.context = context;
        this.config = config;
        this.layout = new Layout(config);
    }

    handleWheel = (deltaY) => {
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
    }

    drawScale=(deltaY) => {
        const {
            context,
            context: { canvas: { width } },
            config: { scaleHeight },
            layout,
            handleWheel,
        } = this;
        handleWheel(deltaY)
        myCanvas.drawLine(...layout.getStartPoint(0, scaleHeight), ...layout.getStartPoint(width, scaleHeight))
        const line = (i, len) => {
            const x = i * (width / len)
            myCanvas.drawLine(...layout.getStartPoint(x, 0), ...layout.getStartPoint(x, scaleHeight))
        }
        for (let i = 0, len = time; i <= len; i++) {
            line(i, time)
            const x = i * (width / time)
            context.font = '24px monospace';
            context.textAlign = 'center';
            context.fillText(`${i}${timeType}`, ...layout.getStartPoint(x, 30), 30);
        }
    }
}

export default Scale
