import Taro from '@tarojs/taro'

export const downloadFile = (url, type?) => {
    Taro.getSetting({
        success:res=>{
            console.log(res)
            if(res.authSetting['scope.writePhotosAlbum']){
                console.log('已授权')
            }else if(res.authSetting['scope.writePhotosAlbum'] === false){
                console.log('未授权')
                Taro.openSetting()
            }
        }
    })
    Taro.showLoading({
        title: '下载中'
    })
    Taro.downloadFile({
        url,
        success: res => {
            console.log(res)
            if (type == 'video') {
                Taro.saveVideoToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: res => {
                        Taro.showToast({
                            title: '下载文件成功'
                        })
                    },
                    fail:()=>{
                        Taro.showToast({
                            title: '下载文件失败',
                            icon: 'none'
                        })
                    }
                })
            }else if(type == 'image'){
                Taro.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: res => {
                        Taro.showToast({
                            title: '下载文件成功'
                        })
                    },
                    fail:(err)=>{
                        console.log(err)
                        Taro.showToast({
                            title: '下载文件失败',
                            icon: 'none'
                        })
                    }
                })
            } else {
                Taro.openDocument({
                    filePath: res.tempFilePath,
                    success: () => {
                        Taro.showToast({
                            title: '下载文件成功'
                        })
                    },
                    fail:()=>{
                        Taro.showToast({
                            title: '下载文件失败',
                            icon: 'none'
                        })
                    }
                })
            }
        },
        fail: () => {
            Taro.showToast({
                title: '下载文件失败',
                icon: 'none'
            })
        }
    })
}