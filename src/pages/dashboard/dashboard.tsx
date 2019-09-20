import Taro, { useState, Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Footer from '../../components/footer';
import GlobalContext from '../../context'
import nextIcon from '../../images/next-icon.png'
import topImg from '../../images/Group.png'
import botImg from '../../images/C-BG2.png'

import './dashboard.scss'

class Dashboard extends Component {
  static contextType = GlobalContext

  render() {
    const dashboardList = [
      {
        title: '我的课程', list: [
          { label: '课程1', progress: '28%' }
        ]
      },
      {
        title: '档案中心', list: [
          { label: '我的证书', url: '../pages/certification' },
          { label: '课程材料', url: '../pages/certification' }
        ]
      },
      {
        title: '我的账号', list: [
          { label: '账号设定', url: '../pages/certification' },
          { label: '购买记录', url: '../pages/certification' },
          { label: '帮助', url: '../pages/certification' }
        ]
      }
    ]
    const [list, setList] = useState(dashboardList);
    const { user } = this.context
    const [currentUser,setUser] = useState(user)
    const changeUser = ()=>{
      return Object.assign(currentUser,{name:'刘琳'})
    }
    return (
      <View style="height:100%;">
        <Image src={topImg} mode="widthFix" style="width:100%;"></Image>
        <View className="top-left">你好，欢迎登入!</View>
        <View className="top-right">
          <View>{currentUser.name}</View>
          <View>linrong123@qq.com</View>
        </View>
        {list.map((item: any, index) => (
          <View className="section" key={index}>
            <View className="title">{item.title}</View>
            {item.list.map((row, idx) =>
              <View className="row" key={row.label} onClick={() => { setUser(changeUser());console.log(this.context); }}>
                <View>{row.label}</View>
                <Image mode="widthFix" style='width:10px' src={nextIcon}></Image>
              </View>)}
          </View>
        ))}
        <View className="gap"></View>
        <Footer></Footer>
        <Image className="bottom-img" src={botImg} mode="widthFix" style="width:100%;"></Image>
      </View>
    )
  }
}

export default Dashboard