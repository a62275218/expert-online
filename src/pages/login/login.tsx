import Taro, { Component, useState } from "@tarojs/taro";
import { View, Image, Input } from "@tarojs/components";
import topImg from "../../images/B-6-BG.png";
import titleImg from "../../images/EOT-Clear.png";
import eyeImg from "../../images/EYE-ICON.png"
import eyeImgClose from "../../images/EYE-ICON-CLOSE.png"
import iconAccount from '../../images/icon_Account.png'
import botImg from "../../images/C-BG2.png";
import resetPsw from '../../images/icon_PW.png'

import "./login.scss";

import Footer from "../../components/footer/footer";
import Modal from "../../components/modal/modal";

class Login extends Component {
  render() {
    const [pswShow, setPswShow] = useState(false);
    const [error, setError] = useState(false);
    const [expireModal, setexpireModal] = useState(false);
    const [forgotPswModal, setForgotPswModal] = useState(false);

    Taro.setNavigationBarTitle({
      title: '登录'
    })

    const goPurchase = () => {
      Taro.navigateTo({
        url: '/pages/purchaseMember/purchaseMember'
      })
    }
    return (
      <View className="bg">
        <Modal show={expireModal} img={iconAccount} title="您的账户已到期" subtitle="立即前往续约您的账户，继续学习!" button="续约账户" onClose={()=>setexpireModal(false)}/>
        <Modal show={forgotPswModal} img={resetPsw} title="重置您的密码" subtitle="系统已发送重置密码至您的注册邮箱，查看您的邮件来重置密码!" button="知道了" onClose={() => setForgotPswModal(false)} />
        <Image src={topImg} mode="widthFix" style="width:100%;"></Image>
        <Image src={titleImg} mode="widthFix" className="title-img"></Image>
        <View className="center-flex">
          <View className="login">
            <View className="title">登入账号</View>
            <View className="error" style={error ? '' : 'visibility:hidden'}>邮箱或密码不正确，请再输入一次</View>
            <View className="input">
              <View>邮箱</View>
              <Input type='text' placeholder='请输入您的邮箱'></Input>
            </View>
            <View className="input">
              <View>密码</View>
              <Image mode="widthFix" className="eye-icon" src={pswShow ? eyeImgClose : eyeImg} onClick={() => setPswShow(!pswShow)}></Image>
              <Input type='text' password={!pswShow} placeholder='请输入您的密码'></Input>
            </View>
            <View className="forgot-psw" onClick={() => setForgotPswModal(true)}>忘记密码了:(</View>
            <View className="button">登入</View>
            <View className="bot-text" onClick={() => goPurchase()}>还不是会员吗？按这里来购买会员唷</View>
          </View>
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
