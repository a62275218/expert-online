import '@tarojs/async-await'
import Taro, { Component, Config, } from '@tarojs/taro'

import Index from './pages/index'
import Login from './pages/login/login'
import Dashboard from './pages/dashboard/dashboard'
import My from './pages/my/my'
import GlobalContext, { globalState } from './context'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      //'pages/index/index',
      'pages/login/login',
      'pages/dashboard/dashboard',
      'pages/purchaseMember/purchaseMember',
      'pages/intro/intro',
      'pages/register/register',
      'pages/redeem/redeem',
      'pages/courseList/courseList',
      'pages/courseVideo/courseVideo',
      'pages/quiz/quiz',
      'pages/my/my'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'Expert Online Training',
      navigationBarTextStyle: 'black'
    }
  }


  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <GlobalContext.Provider value={globalState}>
          <Login />
      </GlobalContext.Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
