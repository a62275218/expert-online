import Taro, { Component } from "@tarojs/taro";
import { View, Image, Input } from "@tarojs/components";
import topImg from "../../images/Group.png";
import titleImg from "../../images/EOT-Clear.png";

import "./login.scss";
import botImg from "../../images/C-BG2.png";
import Footer from "../../components/footer";

class Login extends Component {
  render() {
    return (
      <View>
        <Image src={topImg} mode="widthFix" style="width:100%;"></Image>
        <Image src={titleImg} mode="widthFix" className="title-img"></Image>
        <View className="login">
          <View className="title">登入账号</View>
          <View className="input">
            <View>邮箱</View>
            <Input type='text' placeholder='请输入您的邮箱'></Input>
          </View>
          <View className="input">
            <View>密码</View>
            <Input type='text' password={true} placeholder='请输入您的密码'></Input>
          </View>
          <View className="forgot-psw">忘记密码了:(</View>
          <View className="login-btn">登入</View>
          <View className="bot-text">还不是会员吗？按这里来购买会员唷</View>
        </View>
        <Footer></Footer>
        <Image
          className="bottom-img"
          src={botImg}
          mode="widthFix"
          style="width:100%;"
        ></Image>
      </View>
    );
  }
}

export default Login;
