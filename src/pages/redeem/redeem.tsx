import Taro, { useState, useContext, useEffect } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import Star from "../../images/STAR.png";

import bg from "../../images/B-5-BG.png";

import { useQuery } from '../../common/request';

import Slogan from "../../components/slogan/slogan";
import Modal from "../../components/modal/modal";
import globalContext from '../../context'
import "./redeem.scss";

const Redeem = () => {
  Taro.setNavigationBarTitle({
    title: "购买会员"
  });
  const context = useContext(globalContext)

  const [successModal, setSuccessModal] = useState(false);

  const payQuery = useQuery('https://api.hantepay.com/v1.3/transactions/micropay')
  const openIdQuery = useQuery('api/public/api/v1/wxOpenId')

  const stamp = Date.parse(new Date()) + '';

  useEffect(() => {
    if (!openIdQuery.isLoading) {
      console.log(openIdQuery.data)
      payQuery.request({
        header: {
          Authorization: 'Bearer 5579fc44202f9a3e8976e4469bdbd9d03f87fbd3081523bec9e8104ef6770309'
        },
        method: 'POST',
        data: {
          amount: 299,
          currency: 'USD',
          reference: `${stamp}s14`,
          ipn_url: 'http://eot.weboostapp.com/api/public/api/v1/ipnCallBackSec',
          client_ip: '47.244.180.189',
          open_id: openIdQuery.data.openid
        }
      })
    }
  }, [openIdQuery.data])

  useEffect(() => {
    if (!payQuery.isLoading) {
      console.log(payQuery)
      if (payQuery.data.nonceStr) {
        console.log('开始支付')
        Taro.requestPayment({
          timeStamp: payQuery.data.timeStamp,
          nonceStr: payQuery.data.nonceStr,
          package: payQuery.data.wechatPackage,
          paySign: payQuery.data.paySign,
          signType:payQuery.data.signType,
          success(res) {
            console.log('支付成功'+res)
           },
          fail(res) {
            Taro.showToast({
              title:'支付失败',
              icon:'none'
            })
           }
        })
      }else{
        Taro.showToast({
          title:'支付失败',
          icon:'none'
        })
      }
    }
  }, [payQuery.data])

  const redeem = () => {
    Taro.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          console.log(res)
          openIdQuery.request({
            method: 'POST',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

    // Taro.requestPayment({
    //   timeStamp:stamp.substring(0,stamp.length-3),
    //   nonceStr:Math.random().toString(36).substr(2)
    // })
    //setSuccessModal(true)
  }

  const goDashboard = () => {
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
          name: "开始学习",
          func: goDashboard
        }]}
        onClose={() => setSuccessModal(false)}
      ></Modal>
      <Image src={bg} className="bg-img"></Image>
      <View className="white-card ">
        <Slogan></Slogan>
        <View className="line"></View>
        <View>使用者：{context.user.lastName + ' ' + context.user.firstName}</View>
        <View>注册邮箱：{context.user.email}</View>
        <View className="line"></View>
        <View className="flex-between">
          <View>需付金额：</View>
          <View>$299</View>
        </View>
        <View className="line"></View>
        <View className="button" onClick={() => redeem()}>立即购买</View>
      </View>
    </View>
  );
};

export default Redeem;
