import Taro, { useContext, useState } from "@tarojs/taro";
import { View, Image, Input } from "@tarojs/components";
import eyeImg from "../../images/EYE-ICON.png";
import eyeImgClose from "../../images/EYE-ICON-CLOSE.png";
import md5 from "md5"

import bg from "../../images/B-4-BG.png";
import './register.scss'
import globalContext from '../../context';

import request from '../../common/request'

const Register = () => {
  Taro.setNavigationBarTitle({
    title: "注册会员"
  });
  const [pswShow, setPswShow] = useState(false);
  const [rePswShow, setRePswShow] = useState(false);

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')

  const [nameErr, setNameErr] = useState(false)
  const [phoneErr, setPhoneErr] = useState(false)
  const [emailErr, setEmailErr] = useState(false)
  const [emailValidErr, setEmailValidErr] = useState(false)
  const [pswErr, setPswErr] = useState(false)
  const [rePswErr, setRePswErr] = useState(false)

  const context = useContext(globalContext)

  const validateAndGo = async () => {
    let valid = true;
    if (!firstName || !lastName) {

      valid = false
    }
    if (!phone) {

      valid = false
    }
    if (!email) {

      valid = false
    }
    if (password.length < 8) {
      valid = false
    }
    if (password !== rePassword) {

      valid = false
    }
    setRePswErr(password !== rePassword)
    setNameErr(!firstName || !lastName)
    setPhoneErr(!phone)
    setEmailErr(!email)
    setPswErr(password.length < 8)

    const mailPattern = "^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$"

    setEmailValidErr(!new RegExp(mailPattern).test(email))

    if(!valid){
      return
    }

    const userRes = await request('api/public/api/v1/wxRegisterStaff', {
      method: 'POST',
      data: {
        firstName,
        lastName,
        phone,
        email,
        password:md5(password)
      }
    })
    console.log(userRes)
    if (Array.isArray(userRes)) {
      Taro.setStorageSync('user',userRes[0])
      context.user = userRes[0];
      Taro.showToast({
        title: '注册成功'
      })
      setTimeout(() => {
        Taro.navigateTo({
          url: "/pages/redeem/redeem"
        });
      },2000)
    }else{
      Taro.showToast({
        title: '注册失败',
        icon:'none'
      })
    }
  }

  return (
    <View className="bg">
      <Image src={bg} className="bg-img"></Image>
      <View className="white-card">
        <View className="title">注册会员</View>
        <View>
          <View>名字</View>
          <View className="input-row">
            <View className="input">
              <Input value={lastName} onInput={e => setLastName(e.target.value)} type="text" placeholder="姓氏"></Input>
            </View>
            <View className="input">
              <Input value={firstName} onInput={e => setFirstName(e.target.value)} type="text" placeholder="名字"></Input>
            </View>
          </View>
          <View className="error" style={nameErr ? '' : 'visibility:hidden'}>请输入姓名</View>
          <View className="input">
            <View>电话</View>
            <Input value={phone} onInput={e => setPhone(e.target.value)} type="text" placeholder="请输入您的号码"></Input>
          </View>
          <View className="error" style={phoneErr ? '' : 'visibility:hidden'}>请输入电话</View>
          <View className="input">
            <View>邮箱</View>
            <Input value={email} onInput={e => setEmail(e.target.value)} type="text" placeholder="请输入您的邮箱"></Input>
          </View>
          <View className="error" style={emailErr || emailValidErr ? '' : 'visibility:hidden'}>{emailErr ? '请输入邮箱' : '邮箱格式错误'}</View>
          <View className="sm-text" style="padding:10px 0">
            * 所有登入信息将依照此邮箱
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
              value={password} onInput={e => setPassword(e.target.value)}
              password={!pswShow}
              placeholder="请输入您的密码"
            ></Input>
          </View>
          <View className="error" style={pswErr ? '' : 'visibility:hidden'}>密码长度至少8位</View>
          <View className="input">
            <Image
              mode="widthFix"
              className="eye-icon"
              src={rePswShow ? eyeImgClose : eyeImg}
              onClick={() => setRePswShow(!rePswShow)}
            ></Image>
            <Input
              type="text"
              value={rePassword} onInput={e => setRePassword(e.target.value)}
              password={!rePswShow}
              placeholder="请再次确认"
            ></Input>
          </View>
          <View className="error" style={rePswErr ? '' : 'visibility:hidden'}>两次输入密码不一致</View>
          <View className="button" onClick={() => validateAndGo()}>确认</View>
        </View>
      </View>
    </View>
  );
};

export default Register;
