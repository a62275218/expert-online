import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

import './login.scss'

class Login extends Component {
    render() {
        return (
            <View>
                <Image src='../../images/Group.png' mode="widthFix" style="width:100%;"></Image>
                <View className="top-left">你好，欢迎登入!</View>
                <View className="top-right">
                    <View>
                        林榕
              </View>
                    <View>
                        linrong123@qq.com
              </View>
                </View>
                <View className="section-title">
                    我的课程
            </View>
                <View>
                </View>
            </View>
        )
    }
}

export default Login