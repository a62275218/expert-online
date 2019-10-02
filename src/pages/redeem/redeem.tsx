import Taro, { Component, useState } from "@tarojs/taro";
import { View, Image, Input } from "@tarojs/components";
import Star from "../../images/STAR.png";

import bg from "../../images/B-5-BG.png";

import Slogan from "../../components/slogan/slogan";
import Modal from "../../components/modal/modal";
import "./redeem.scss";

Taro.setNavigationBarTitle({
  title: "购买会员"
});

const Redeem = () => {
  const [user] = useState("林榕");
  const [email] = useState("linrong123@qq.com");

  const [successModal, setSuccessModal] = useState(false);

  const redeem = ()=>{
    setSuccessModal(true)
  }

  const goDashboard = ()=>{
    Taro.navigateTo({
      url: '/pages/dashboard/dashboard'
    })
  }
  return (
    <View className="bg md-text">
      <Modal
        show={successModal}
        img={Star}
        title="您的会员已激活"
        subtitle="马上前往个人中心看学习视频吧!"
        button={[{
          name:"开始学习",
          func:goDashboard
        }]}
        onClose={() => setSuccessModal(false)}
      ></Modal>
      <Image src={bg} className="bg-img"></Image>
      <View className="white-card ">
        <Slogan></Slogan>
        <View className="line"></View>
        <View>使用者：{user}</View>
        <View>注册邮箱：{email}</View>
        <View className="line"></View>
        <View className="flex-between">
          <View>需付金额：</View>
          <View>$299</View>
        </View>
        <View className="line"></View>
        <View className="button" onClick={()=>redeem()}>立即购买</View>
      </View>
    </View>
  );
};

export default Redeem;
