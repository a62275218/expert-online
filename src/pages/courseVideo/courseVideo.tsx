import Taro, { Component, useState } from "@tarojs/taro";
import { View, Image, Video } from "@tarojs/components";
import topImg from '../../images/Group.png'
import nextImg from '../../images/white-next-icon.png'

import './courseVideo.scss'

export default () => {
  Taro.setNavigationBarTitle({
    title: "开始学习"
  });
  const goQuiz = ()=>{
    Taro.navigateTo({
      url: '/pages/quiz/quiz'
    })
  }
  return (
    <View>
      <Image src={topImg} mode="widthFix" className="resized-img"></Image>
      <View className="top-left">示例课程</View>
      <View className="top-right">
        <View className="top-section active">观看视频<Image src={nextImg} mode="widthFix" className="sec-img"></Image></View>
        <View className="top-section">做题测验<Image src={nextImg} mode="widthFix" className="sec-img" style="opacity:0.4"></Image></View>
        <View>完成</View>
      </View>
      <View className="section-title">示例子课程</View>
      <View className="video-container">
      <Video
          className="video"
          src='http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
          controls={true}
          autoplay={false}
          poster='http://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg'
          initialTime={0}
          id='video'
          loop={false}
          muted={false}
        />
      </View>
      <View className="bot-container">
        <View className="sub-title">视频介绍</View>
        <View className="desc">示例j介绍</View>
        <View className="sub-title">课程材料</View>
        <View className="material-section">Attention</View>
        <View className="button" style="margin:40px 0;" onClick={()=>goQuiz()}>开始做题</View>
      </View>
    </View>
  );
};
