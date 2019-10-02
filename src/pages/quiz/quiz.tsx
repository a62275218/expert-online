import Taro, { Component, useState } from "@tarojs/taro";
import { View, Image, Video } from "@tarojs/components";
import topImg from "../../images/Group.png";
import nextImg from "../../images/white-next-icon.png";

import "./quiz.scss";

export default () => {
  Taro.setNavigationBarTitle({
    title: "开始学习"
  });
  const goQuiz = () => {
    Taro.navigateTo({
      url: "/pages/quiz/quiz"
    });
  };
  return (
    <View className="bg">
      <Image src={topImg} mode="widthFix" className="resized-img"></Image>
      <View className="top-left">示例课程</View>
      <View className="question-wrapper">
        <View style="flex:1;">
          <View className="top-right">
            <View className="top-section">
              观看视频
              <Image src={nextImg} mode="widthFix" className="sec-img" style="opacity:0.4"></Image>
            </View>
            <View className="top-section active">
              做题测验
              <Image
                src={nextImg}
                mode="widthFix"
                className="sec-img"
              ></Image>
            </View>
            <View>完成</View>
          </View>
          <View className="section-title">示例子课程</View>
          <View className="question">7 What does Inclusion mean?</View>
          <View className="answer-item">
            <View className="radio-ico"></View>
            <View style="flex:1;">示例答案示例答案示例答案示例答案示例答案示例答案示例答案示例答案示例答案示例答案示例答案示例答案示例答案示例答案</View>
          </View>
          <View className="answer-item">
            <View className="radio-ico selected"></View>
            <View style="flex:1;">示例答案示例答案示例答案示例答案示例答案示例答案示例答案示例答案示例答案示例答案示例答案示例答案示例答案示例答案</View>
          </View>
        </View>
        <View className="action">
          <View className="button prev">上一题</View>
          <View className="num">7/7</View>
          <View className="button">提交</View>
        </View>
      </View>
    </View>
  );
};
