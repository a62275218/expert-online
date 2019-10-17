import Taro, { useRouter, useState, useEffect, useContext } from "@tarojs/taro";
import { View, Image, Input } from "@tarojs/components";
import globalContext from "../../context";

import topImg from "../../images/Group.png";
import eyeImg from "../../images/EYE-ICON.png";
import eyeImgClose from "../../images/EYE-ICON-CLOSE.png";

import md5 from "md5";
import { useQuery } from "../../common/request";

import "./changeAcc.scss";

export default () => {
  const router = useRouter();
  const { subtitle } = router.params;
  Taro.setNavigationBarTitle({
    title: subtitle
  })

  const [pswShow, setPswShow] = useState(false);
  const [rePswShow, setRePswShow] = useState(false);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [pswErr, setPswErr] = useState(false);
  const [rePswErr, setRePswErr] = useState(false);
  const [phone, setPhone] = useState("");

  const context = useContext(globalContext);
  const { user } = context;
  const pswQuery = useQuery("api/public/api/v1/changeStaffPassword");
  const phoneQuery = useQuery("api/public/api/v1/changeStaffPhone");



  const changePsw = () => {

    let valid = true;
    if (password.length < 8) {
      valid = false;
    }
    if (password !== rePassword) {
      valid = false;
    }
    setRePswErr(password !== rePassword);
    setPswErr(password.length < 8);
    if (!valid) {
      return;
    }
    pswQuery.request({
      method: "POST",
      data: {
        id: user.id,
        password: md5(password)
      }
    });
  };

  const changePhone = () => {
    phoneQuery.request({
      method: "POST",
      data: {
        id: user.id,
        phone
      }
    });
  };

  useEffect(() => {
    if (!phoneQuery.isLoading) {
      if (phoneQuery.data.code == 0) {
        Taro.showToast({
          title: "修改手机成功"
        });
        setTimeout(() => {
          Taro.navigateTo({
            url: "/pages/dashboard/dashboard"
          });
        }, 2000);
      }
    }
  }, [phoneQuery.data]);

  useEffect(() => {
    if (!pswQuery.isLoading) {
      if (pswQuery.data.code == 0) {
        Taro.showToast({
          title: "修改密码成功"
        });
        setTimeout(() => {
          Taro.navigateTo({
            url: "/pages/dashboard/dashboard"
          });
        }, 2000);
      }
    }
  }, [pswQuery.data]);

  return (
    <View className="bg">
      <Image src={topImg} mode="widthFix" style="width:100%;"></Image>
      <View className="top-left">账号设定</View>
      <View className="section">
        <View className="section-title">{subtitle}</View>
      </View>
      {subtitle == "修改密码" && (
        <View className="card">
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
              value={password}
              onInput={e => setPassword(e.target.value)}
              password={!pswShow}
              placeholder="请输入新的密码"
            ></Input>
          </View>
          <View className="error" style={pswErr ? "" : "visibility:hidden"}>
            密码长度至少8位
          </View>
          <View className="input">
            <Image
              mode="widthFix"
              className="eye-icon"
              src={rePswShow ? eyeImgClose : eyeImg}
              onClick={() => setRePswShow(!rePswShow)}
            ></Image>
            <Input
              type="text"
              value={rePassword}
              onInput={e => setRePassword(e.target.value)}
              password={!rePswShow}
              placeholder="请再次确认"
            ></Input>
          </View>
          <View className="error" style={rePswErr ? "" : "visibility:hidden"}>
            两次输入密码不一致
          </View>
          <View className="button" onClick={() => changePsw()}>
            确认修改
          </View>
        </View>
      )}
      {subtitle == "修改手机" && (
        <View className="card">
          <View className="input">
            <View>旧手机号</View>
            <Input type="text" value={user.phone} disabled></Input>
          </View>
          <View className="input">
            <View>新手机号</View>
            <Input
              type="text"
              value={phone}
              onInput={e => setPhone(e.target.value)}
              placeholder="请输入新的手机号"
            ></Input>
          </View>
          <View className="button" onClick={() => changePhone()}>
            确认修改
          </View>
        </View>
      )}
    </View>
  );
};
