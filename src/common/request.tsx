import Taro, { request, useState, useDidShow } from '@tarojs/taro'

const domain = 'https://eot.weboostapp.com/'

export default (uri: any, config?: any, loading?: any) => {
    return new Promise((resolve, reject) => {
        if (loading !== false) {
            Taro.showLoading({
                title: loading || '加载中'
            })
        }
        Taro.request({
            url: uri.startsWith('http') ? uri : `${domain}${uri}`,
            ...config,
            mask: true,
            success: res => {
                if(res.code && res.code == 0){
                    console.log(res)
                    resolve(res)
                    return
                }
                if (res.data) {
                    if (res.data.code == 0) {
                        resolve(res.data.data || res.data)
                    } else {
                        reject(res.data.msg)
                        // Taro.showToast({
                        //     title: res.data.msg || '请求失败',
                        //     icon: 'none'
                        // })
                    }
                } else {
                    // Taro.showToast({
                    //     title: '请求失败',
                    //     icon: 'none'
                    // })
                }
            },
            fail: err => {
                // Taro.showToast({
                //     title: '请求失败',
                //     icon: 'none'
                // })
                reject(err)
            },
            complete: () => {
                Taro.hideLoading();
            }
        })
    })
}

export const useQuery = (uri: any, loading?: any) => {
    const [data, setData] = useState()
    const [isLoading, setLoading] = useState(true)
    const request = (config?: any, ) => {
        Taro.showLoading({
            title: loading || '加载中'
        })
        Taro.request({
            url: uri.startsWith('http') ? uri : `${domain}${uri}`,
            ...config,
            mask: true,
            success: res => {
                if(uri ==='https://api.hantepay.com/v1.3/transactions/micropay'){
                    setData(res.data)
                    return
                }
                if(res.code){
                    setData(res.data || res)
                    return
                }
                if (res.data) {
                    if (res.data.code == 0) {
                        setData(res.data.data || res.data)
                    } else {
                        setData(res.data)
                        // Taro.showToast({
                        //     title: res.data.msg || '请求失败',
                        //     icon: 'none'
                        // })
                    }
                } else {
                    setData(res)
                    // Taro.showToast({
                    //     title: '请求失败',
                    //     icon: 'none'
                    // })
                }
            },
            fail: err => {
                // Taro.showToast({
                //     title: '请求失败',
                //     icon: 'none'
                // })
            },
            complete: () => {
                Taro.hideLoading();
                setLoading(false)
            }
        })
    }
    return { data, request, isLoading }
}