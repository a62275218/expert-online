import Taro, { Component, useState, useEffect, useContext,useDidShow } from "@tarojs/taro";
import { View, Image, Input } from "@tarojs/components";
import topImg from "../../images/B-6-BG.png";
import titleImg from "../../images/EOT-Clear.png";
import eyeImg from "../../images/EYE-ICON.png";
import eyeImgClose from "../../images/EYE-ICON-CLOSE.png";
import iconAccount from "../../images/icon_Account.png";
import botImg from "../../images/C-BG2.png";
import resetPswImg from "../../images/icon_PW.png";
import globalContext from '../../context';

import request from '../../common/request'
import md5 from 'md5'

import "./login.scss";

import Footer from "../../components/footer/footer";
import Modal from "../../components/modal/modal";

class Login extends Component {
  render() {
    Taro.setNavigationBarTitle({
      title: "登录"
    });
    const [pswShow, setPswShow] = useState(false);
    const [error, setError] = useState('');
    const [expireModal, setexpireModal] = useState(false);
    const [forgotPswModal, setForgotPswModal] = useState(false);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const context = useContext(globalContext)

    useDidShow(() => {
      const user = Taro.getStorageSync('user');
      if (user) {
        console.log('已登录')
        Taro.reLaunch({
          url: "/pages/dashboard/dashboard"
        });
        context.user = user
      }
    })

    const goTrial = ()=>{
      Taro.navigateTo({
        url: `/pages/courseVideo/courseVideo?trial=true`
      })
    }

    const goPurchase = () => {
      Taro.navigateTo({
        url: "/pages/purchaseMember/purchaseMember"
      });
    };
    const closeForgotPsw = () => {
      setForgotPswModal(false);
    };
    const resetPsw = async () => {
      if (!email) {
        setError('请输入邮箱')
      } else {
        setError('')
        try {
          const res = await request('api/public/api/v1/staffForgetPassword', {
            method: 'POST',
            data: {
              email
            }
          })
          setForgotPswModal(true)
          console.log(res)
        } catch (err) {
          setError('邮箱不存在')
        }
      }
    }
    const login = async () => {
      if (!email || !password) {
        setError('请输入邮箱和密码')
        return;
      } else {
        setError('')
      }
      try {
        let userInfo = await request('api/public/api/v1/wxLogin', {
          method: 'POST',
          data: {
            email,
            password: md5(password)
          }
        }, '登陆中')
        if (userInfo) {
          setError('')
          Taro.removeStorageSync('user')
          Taro.setStorageSync('user', userInfo)
          context.user = userInfo;
          const today = new Date();
          if (userInfo.endMemberTime * 1000 < Date.parse(today)) {
            setexpireModal(true)
            return
          }
          Taro.reLaunch({
            url: "/pages/dashboard/dashboard"
          });
        }
      } catch (err) {
        setError(err)
      }
    };
    return (
      <View className="bg" style="display:flex;flex-direction:column;">
        <Modal
          show={expireModal}
          img={iconAccount}
          title="您的账户已到期"
          subtitle="立即前往续约您的账户，继续学习!"
          button={[{ name: "续约账户", func: goPurchase }]}
        />
        <Modal
          show={forgotPswModal}
          img={resetPswImg}
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
              {error}
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
              onClick={() => resetPsw()}
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
          <View className="trial">先试用一下吗? 点击前往免费试用!<View className="button" onClick={()=>goTrial()}>免费试用</View></View>
        </View>
        <View style="margin-bottom:-20px;">
          <Footer></Footer>
        </View>
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
