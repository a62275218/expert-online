var _class, _temp;

import { Provider as TCRNProvider } from '@tarojs/components-rn';
import TaroRouter from '@tarojs/taro-router-rn';
import pagesPurchaseMemberPurchaseMember from './pages/purchaseMember/purchaseMember';
import pagesLoginLogin from './pages/login/login';
import pagesDashboardDashboard from './pages/dashboard/dashboard';
import pagesIndexIndex from './pages/index/index';
import Taro from '@tarojs/taro-rn';
import React from 'react';
import '@tarojs/async-await';
import { Component } from "@tarojs/taro-rn";

import appStyleSheet from "./app_styles";
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
var _styleSheet = appStyleSheet;
let App = (_temp = _class = class App extends Component {
  constructor() {
    super(...arguments);
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    Taro._$app = this;
  }
  componentDidMount() {
    this.componentDidShow();
  }
  componentDidShow() {}
  componentDidHide() {}
  componentDidCatchError() {}
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <TCRNProvider>
                  <RootStack />
                </TCRNProvider>;
  }

  componentWillUnmount() {
    this.componentDidHide && this.componentDidHide();
  }

}, _class.config = {
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Expert Online Training',
    navigationBarTextStyle: 'black'
  }
}, _temp);
const RootStack = TaroRouter.initRouter([['pages/index/index', pagesIndexIndex], ['pages/dashboard/dashboard', pagesDashboardDashboard], ['pages/login/login', pagesLoginLogin], ['pages/purchaseMember/purchaseMember', pagesPurchaseMemberPurchaseMember]], Taro, App.config);
Taro.initNativeApi(Taro);
Taro.initPxTransform({
  "designWidth": 750,
  "deviceRatio": {
    "640": 1.17,
    "750": 1,
    "828": 0.905
  }
});
export default App;