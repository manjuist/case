import axios from 'axios'
import { packageLogInfo } from './Util'

// ajax 统一配置
const instance = axios.create({
    method: 'get',
    baseURL: '',
    timeout: 0,
    responseType: 'json'
})

instance.interceptors.request.use(
    config => ({ ...config, cancelToken: window.projectConf.source.token }),
    err => (Promise.reject(err))
)

const handleWithParameter = function (url, {
    method = 'GET',
    headers = {},
    contentType = 'application/json; charset=UTF-8',
    params = {},
    data = {}
}) {
    instance.defaults.headers = {
        ...instance.defaults.headers,
        ...headers,
        'Content-Type': contentType
    }
    
    // url替换参数
    let urlNew = url
    const strParams = []
    const paramsNew = { ...params }
    const keys = Object.keys(params)
    keys.forEach((key) => {
        const reg = new RegExp(`:${key}`, 'g')
        if (reg.test(urlNew)) {
            urlNew = urlNew.replace(reg, params[key])
            delete paramsNew[key]
        } else {
            strParams.push(`${key}=${params[key]}`)
        }
    })
    
    switch (method.toLowerCase()) {
    case 'get':
        return instance.get(urlNew, { params: paramsNew })
    case 'delete':
        return instance.delete(urlNew, { params: paramsNew, data })
    case 'post':
        return instance.post(urlNew, data, { params: strParams.length > 0 ? paramsNew : {} })
    case 'put':
        return instance.put(urlNew, data, { params: strParams.length > 0 ? paramsNew : {} })
    default: {
        const res = {
            then: resolve => resolve({
                statusCode: 300,
                message: 'method方式错误'
            })
        }
        return Promise.resolve(res)
    }
    }
}

// 发送日志接口
const sendLog = function ({
    opId = -1,
    content = '',
    payload = {},
    state = {}
}) {
    return new Promise(((resolve) => {
        const operateId = typeof opId === 'number' ? opId : opId(payload, state)
        const operateContent = typeof content === 'string' ? content : content(payload, state)
        console.log('operateId', operateId, 'operateContent=', operateContent)
        
        setTimeout(() => handleWithParameter('/api/sendLog', {
            method: 'post',
            data: {
                content: packageLogInfo({
                    opId: operateId,
                    content: operateContent
                })
            }
        }).then(resolve), 1000)
    }))
}

export {
    handleWithParameter,
    sendLog
}
