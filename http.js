import axios from 'axios'
import qs from 'qs'

axios.interceptors.request.use(config => {
    // loading
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.resolve(error.response)
})

const checkStatus = (response) => {
    // loading
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
        if (typeof (response.data) == 'string')
            return JSON.parse(response.data)
        //防止后台数据data返回为null
        return response.data
    }
    // 异常状态下，把错误信息返回去
    return {
        status: -404,
        message: '网络访问异常'
    }
}

//错误处理
const checkCode = (res) => {
    if (res && res.status == -404) { //捕获网络访问异常错误
        alert(res.message)
        return {
            errcode: '404',
            message: '网络访问异常'
        }
    }
    if (res && res.errcode) {//捕获服务器内部错误或者后端手动抛出错误
        alert(res.message)
    }
    return res
}

export default {
    post(url, data) {
        return axios({
            method: 'post',
            url,
            data: qs.stringify(data),
            timeout: 60000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    },
    get(url, params) {
        return axios({
            method: 'get',
            url,
            params, // get 请求时带的参数
            timeout: 60000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    }
}