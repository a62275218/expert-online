

import Taro, { Component, useState } from "@tarojs/taro";
import { View, Image, Input } from "@tarojs/components";
import Footer from "../../components/footer/footer";
import botImg from "../../images/EOT-Clear.png"
import bg from '../../images/F-4-BG.png'

Taro.setNavigationBarTitle({
    title: '帮助'
})

import './help.scss'

const Help = (props) => {

    const [type, setType] = useState('')

    const emailUs = ()=>{
        setType('email')
        Taro.setClipboardData({
            data:'info@expertonlinetraining.com'
        })
    }

    const goCompanySite = ()=>{
        setType('company')
        Taro.navigateTo({
            url:"/pages/webview/webview"
        })
    }

    return (
        <View className="bg" style="display:flex;flex-direction:column">
            <Image src={bg} className="bg-img"></Image>
            <View className="center-flex purchase-wrapper">
                <View className="title">帮助中心</View>
                <View className="sub-title" style="padding:20px 0">有任何疑问或想与我们联系?</View>
                <View className={type === 'email' ? "white-card active" : "white-card"} onClick={() => emailUs()}>Email 给我们</View>
                <View className={type === 'company' ? "white-card active" : "white-card"} onClick={() => goCompanySite()}>参访我们的网站</View>
            </View>
            <Image className="btn-img" src={botImg} mode="widthFix"></Image>
            <Footer fixed></Footer>
        </View>

    )
}

export default Help