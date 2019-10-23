import Taro, { Component, useState } from "@tarojs/taro";
import { View, Image, Input } from "@tarojs/components";
import Footer from "../../components/footer/footer";

import bg from '../../images/B-1_BG.png'

import './purchaseMember.scss'

const PurchaseMember = (props) => {
    Taro.setNavigationBarTitle({
        title: '购买会员'
    })

    const [type, setType] = useState('')

    const goIntro = () => {
        setType('person')
        Taro.navigateTo({
            url: '/pages/intro/intro'
        })
    }

    return (
        <View className="bg" style="display:flex;flex-direction:column">
            <Image src={bg} className="bg-img"></Image>
            <View className="center-flex purchase-wrapper">
                <View className="title">成为会员</View>
                <View className="sub-title" style="padding:20px 0">您是个人学习或企业机构呢?</View>
                <View className={type === 'person' ? "white-card active" : "white-card"} onClick={() => goIntro()}>我是个人学习</View>
                <View className={type === 'company' ? "white-card active" : "white-card"} onClick={() => setType('company')}>企业机构</View>
                <View style={type === 'company' ? '' : 'visibility:hidden'}>
                    <View className="sub-title" style="padding-top:20px">如您的企业机构需要订阅的账户超过100位使用者，</View>
                    <View className="sub-title">欢迎与我们联系：</View>
                    <View className="sub-title" style="padding-top:20px">eotteam@outook.com</View>
                </View>
            </View>
            <Footer fixed></Footer>
        </View>

    )
}

export default PurchaseMember