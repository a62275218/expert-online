import Taro from '@tarojs/taro-rn';
import React from 'react';

import { View } from "@tarojs/components-rn";
import Footer from "../../components/footer/footer";
import bg from '../../images/B-1_BG.png';
Taro.setNavigationBarTitle({
  title: '购买会员'
});
import purchaseMemberStyleSheet from "./purchaseMember_styles";
var _styleSheet = purchaseMemberStyleSheet;
let PurchaseMember = class PurchaseMember extends Taro.Component {
  render() {
    const props = this.props;

    return <View style={[_styleSheet["bg"], `background-image: url(${bg});background-size:100%;`]}>
            <View style={[_styleSheet["center-flex"], _styleSheet["purchase-wrapper"]]}>
                <View>成为会员</View>
                <View>您是个人学习或企业机构呢?</View>
                <View></View>
            </View>
            <Footer fixed></Footer>
        </View>;
  }

};

export default PurchaseMember;