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
      <View className="text">
        Your subscription to Expert Online Training gives you access to all videos, quizzes, and handouts.
      </View>
      <View className="text">
        Individuals may purchase a yearly subscription for $299. If you work for a summer camp or summer school, ask your employer to add you to their organizational subscription to EOT. Organizations, such as summer camps and summer schools, may purchase a yearly subscription for $299, which includes an administrative dashboard and 10 staff accounts to get you started. Organizations can purchase additional staff account for just $29 apiece.
      </View>
      <View className="feature-row">
        <View className="feature-row-expand">
          <View className="feature button">
            <View className="num">4<Text className="plus">+</Text></View>
            <View>Courses</View>
          </View>
          <View className="feature button">
            <View className="num" style={{marginLeft:'-10px'}}>110<Text className="plus">+</Text></View>
            <View>Videos</View>
          </View>
          <View className="feature button">
            <View className="num">22<Text className="plus">+</Text><Text className="hrs">hrs</Text></View>
            <View>Content</View>
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
