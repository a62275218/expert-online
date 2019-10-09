import Taro, { Component, useState, useEffect, useContext } from "@tarojs/taro";
import { View, Image, Input } from "@tarojs/components";
import topImg from "../../images/B-6-BG.png";
import titleImg from "../../images/EOT-Clear.png";
import eyeImg from "../../images/EYE-ICON.png";
import eyeImgClose from "../../images/EYE-ICON-CLOSE.png";
import iconAccount from "../../images/icon_Account.png";
import botImg from "../../images/C-BG2.png";
import resetPsw from "../../images/icon_PW.png";
import globalContext from '../../context';

import request from '../../common/request'
import md5 from 'md5'

import "./login.scss";

import Footer from "../../components/footer/footer";
import Modal from "../../components/modal/modal";

class Login extends Component {
  render() {
    const [pswShow, setPswShow] = useState(false);
    const [error, setError] = useState(false);
    const [expireModal, setexpireModal] = useState(false);
    const [forgotPswModal, setForgotPswModal] = useState(false);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const context = useContext(globalContext)
    
    useEffect(() => {
      const user = Taro.getStorageSync('user');
      if(user){
        console.log('已登录')
        Taro.navigateTo({
          url: "/pages/dashboard/dashboard"
        });
        context.user = user
      }
    }, [])

    Taro.setNavigationBarTitle({
      title: "登录"
    });

    const goPurchase = () => {
      Taro.navigateTo({
        url: "/pages/purchaseMember/purchaseMember"
      });
    };
    const closeForgotPsw = () => {
      setForgotPswModal(false);
    };
    const login = async () => {
      console.log(email)
      console.log(password)
      if(!email || !password){
        Taro.showToast({
          title: '请输入用户名和密码',
          icon: 'none'
        })
        return;
      }
      
      let userInfo = await request('api/public/api/v1/wxLogin', {
        method: 'POST',
        data: {
          email,
          password:md5(password)
        }
      }, '登陆中')
      console.log(userInfo)
      if(userInfo){
        Taro.setStorageSync('user',userInfo)
        Taro.navigateTo({
          url: "/pages/dashboard/dashboard"
        });
      }
      console.log(Taro.getStorageSync('user'))
    };
    return (
      <View className="bg" style="display:flex;flex-direction:column;">
        <Modal
          show={expireModal}
          img={iconAccount}
          title="您的账户已到期"
          subtitle="立即前往续约您的账户，继续学习!"
          button={[{ name: "续约账户", func: goPurchase }]}
          onClose={() => setexpireModal(false)}
        />
        <Modal
          show={forgotPswModal}
          img={resetPsw}
          title="重置您的密码"
          subtitle="系统已发送重置密码至您的注册邮箱，查看您的邮件来重置密码!"
          button={[{ name: "知道了", func: closeForgotPsw }]}
          onClose={() => setForgotPswModal(false)}
        />
        <Image src={topImg} mode="widthFix" style="width:100%;"></Image>
        <Image src={titleImg} mode="widthFix" className="title-img"></Image>
        <View className="center-flex">
          <View className="login">
            <View className="title">登入账号</View>
            <View className="error" style={error ? "" : "visibility:hidden"}>
              邮箱或密码不正确，请再输入一次
            </View>
            <View className="input">
              <View>邮箱</View>
              <Input type="text" placeholder="请输入您的邮箱" value={email} onInput={e => setEmail(e.target.value)}></Input>
            </View>
            <View className="input">
              <View>密码</View>
              <Image
                mode="widthFix"
                className="eye-icon"
                src={pswShow ? eyeImgClose : eyeImg}
                onClick={() => setPswShow(!pswShow)}
              ></Image>
              <Input
                type="text"
                password={!pswShow}
                placeholder="请输入您的密码"
                value={password}
                onInput={e => setPassword(e.target.value)}
              ></Input>
            </View>
            <View
              className="forgot-psw"
              onClick={() => setForgotPswModal(true)}
            >
              忘记密码了:(
            </View>
            <View className="button" onClick={() => login()}>
              登入
            </View>
            <View className="bot-text" onClick={() => goPurchase()}>
              还不是会员吗？按这里来购买会员唷
            </View>
          </View>
        </View>

        <Footer></Footer>
        <Image
          src={botImg}
          mode="widthFix"
          style="width:100%;"
        ></Image>
      </View>
    );
  }
}

export default Login;
