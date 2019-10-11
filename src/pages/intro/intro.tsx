import Taro, { useState } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import topImg from "../../images/EOT-Clear.png";
import bg from "../../images/B-3-BG.png";
import "./intro.scss";

import Slogan from "../../components/slogan/slogan";

export default function Intro() {
  Taro.setNavigationBarTitle({
    title: "介绍"
  });

  const goRedeem = () => {
    Taro.navigateTo({
      url: "/pages/register/register"
    });
  };
  return (
    <View className="bg" style="display:flex;flex-direction:column">
      <Image src={bg} className="bg-img"></Image>
      <View className="wrapper">
        <Image src={topImg} mode="widthFix" style="width:100%;"></Image>
        <View className="article">
          <Text>FULL PACK</Text> subscriptions come with four stock courses,
          hand-crafted annually by Dr.Chris Thurber. The courses are:
          <Text>
            "New Staff","Returning Staff","Program Staff" and "Supervisory
            Staff".
          </Text>{" "}
          Each course contains about <Text>12 videos</Text>
          training modules and takes about <Text>4 houses</Text> to complete.
        </View>
        <View className="article">
          You can revise these stock courses or design custom courses by
          choosing content from our library or uploading your own videos,
          quizzes,and handouts!
        </View>
        <View className="white-card">
          <Slogan></Slogan>
          <View className="button" onClick={() => goRedeem()}>
            立即购买会员
          </View>
          <View className="sm-text" style="text-align:center;margin-top:20px">
            购买前需先注册会员唷
          </View>
        </View>
      </View>
    </View>
  );
}
