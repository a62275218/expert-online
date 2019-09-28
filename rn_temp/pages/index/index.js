import Taro from '@tarojs/taro-rn';
import React from 'react';
import { useState } from "@tarojs/taro-rn";
import { View, Image } from "@tarojs/components-rn";
import indexStyleSheet from "./index_styles";
// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion
var _styleSheet = indexStyleSheet;
Taro.setNavigationBarTitle({
  title: '个人中心'
});
let Index = class Index extends Taro.Component {
  render() {
    const [num, lock] = useState(3);
    return <View style={_styleSheet["bg"]}>
      <Image src="../../images/Group.png" mode="widthFix" style="width:100%;"></Image>
      <View style={_styleSheet["top-left"]}>你好，欢迎登入!</View>
      <View style={_styleSheet["top-right"]}>
        <View>
          林榕
        </View>
        <View>
          linrong123@qq.com
        </View>
      </View>
      <View style={_styleSheet["section-title"]}>
        我的课程
      </View>
      <View>
        {num} {lock}
      </View> 
    </View>;
  }

};
// class Index extends Component {
//   /**
//  * 指定config的类型声明为: Taro.Config
//  *
//  * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
//  * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
//  * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
//  */
//   config: Config = {
//     navigationBarTitleText: '个人中心'
//   }
//   componentWillReceiveProps(nextProps) {
//     console.log(this.props, nextProps)
//   }
//   componentWillUnmount() { }
//   componentDidShow() { }
//   componentDidHide() { }
//   render() {
//     return (
//       <View>
//         <Image src='../../images/Group.png' mode="widthFix" style="width:100%;"></Image>
//         <View className="top-left">你好，欢迎登入!</View>
//         <View className="top-right">
//           <View>
//             林榕
//           </View>
//           <View>
//             linrong123@qq.com
//           </View>
//         </View>
//         <View className="section-title">
//           我的课程
//         </View>
//         <View>
//         </View> 
//       </View>
//     )
//   }
// }
// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index;