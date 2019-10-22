import { View, Text } from "@tarojs/components";
import Taro, { useState, useEffect } from "@tarojs/taro";

import "./slogan.scss";

const Slogan = () => {
  return (
    <View>
      <View className="card-title">
        <Text>FULL PACK</Text> Subscriptions
      </View>
      <View className="one-year">
        <View className="number">1</View>
        <View className="year">年</View>
      </View>
      <View className="title">
        $ 299 <Text>USD</Text>
      </View>
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
      <View className="md-text desc-row">·4 大类热门学习课程</View>
      <View className="sm-text desc-row">
        （新员工、退职人员、项目人员、监督人员课程）
      </View>
      <View className="md-text desc-row">·12 篇学习视频</View>
      <View className="md-text desc-row">·总约 4 小时的做题测验练习</View>
    </View>
  );
};

export default Slogan;
