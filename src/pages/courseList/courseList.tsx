import Taro, { Component, useState } from "@tarojs/taro";
import { View, Image, Input } from "@tarojs/components";
import topImg from '../../images/Group.png'

import "./courseList.scss";

const goDetail = () =>{
  Taro.navigateTo({
    url: '/pages/courseVideo/courseVideo'
  })
}

export default () => {
  Taro.setNavigationBarTitle({
    title: "课程清单"
  });
  return (
    <View>
      <Image src={topImg} mode="widthFix" style="width:100%;"></Image>
      <View className="top-left">示例课程</View>
      <View className="top-right">
        <View>28%</View>
        <View>课程完成度</View>
      </View>
      <View className="section-title">课程清单</View>
      <View className="row" onClick={()=>goDetail()}>
        <View>课程名</View>
        <View>img</View>
      </View>
      <View className="row finish">
        <View>课程名</View>
        <View>img</View>
      </View>
    </View>
  );
};
