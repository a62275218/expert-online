import Taro, { useState } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import topImg from "../../images/EOT-Clear.png";
import bg from '../../images/B-3-BG.png'
import './intro.scss'

Taro.setNavigationBarTitle({
    title: '介绍'
})

export default function Intro() {
    return (
        <View className="bg">
            <Image src={bg} className="bg-img"></Image>
            <View className="wrapper">
                <Image src={topImg} mode="widthFix" style="width:100%;"></Image>
                <View className="article">
                    <Text>FULL PACK</Text> subscriptions come with four stock courses, hand-crafted annually by Dr.Chris Thurber. The courses are:
                    <Text>"New Staff","Returning Staff","Program Staff" and "Supervisory Staff".</Text> Each course contains about <Text>12 videos</Text>
                    training modules and takes about <Text>4 houses</Text> to complete.
                </View>
                <View className="article">
                    You can revise these stock courses or design custom courses by choosing content from our library or uploading your own videos, quizzes,and handouts!
                </View>
                <View className="white-card">
                    <View className="card-title"><Text>FULL PACK</Text> Subscriptions</View>
                    <View className="one-year">
                        <View className="number">1</View>
                        <View className="year">年</View>
                    </View>
                    <View className="title">$ 299 <Text>AUD</Text></View>
                    <View className="feature-row">
                        <View className="feature-row-expand">
                            <View className="feature button">
                                <View className="num">4</View>
                                <View>Courses</View>
                            </View>
                            <View className="feature button">
                                <View className="num">150</View>
                                <View>Videos</View>
                            </View>
                            <View className="feature button">
                                <View className="num">20</View>
                                <View>Hours</View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>)
}