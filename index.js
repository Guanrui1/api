import config from './config.js'
import $http from './http'
import apiResources from './resource'

export default {
    /**
   * @method 测试api
   * @param id id
   * @param {*} 姓名 
   */
    async GetRealTimeData(id, name) {
        let params = {
            // id,
            // name
        }
        return await $http.post(config.baseUrl.concat(apiResources.GetRealTimeData), params)
    }
}