import Taro, { useState, Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Footer from '../../components/footer/footer';
import GlobalContext from '../../context'
import nextIcon from '../../images/next-icon.png'
import topImg from '../../images/Group.png'
import botImg from '../../images/C-BG2.png'

import './dashboard.scss'

class Dashboard extends Component {
  static contextType = GlobalContext;

  render() {
    Taro.setNavigationBarTitle({
      title: "个人中心"
    });
    const dashboardList = [
      {
        title: '我的课程', list: [
          { label: '课程1', progress: '28%', url:'/pages/courseList/courseList' }
        ]
      },
      {
        title: '档案中心', list: [
          { label: '我的证书', url: '/pages/my/my' },
          { label: '课程材料', url: '/pages/my/my' }
        ]
      },
      {
        title: '我的账号', list: [
          { label: '账号设定', url: '/pages/my/my' },
          { label: '购买记录', url: '/pages/my/my' },
          { label: '帮助', url: '/pages/courseList/courseList' }
        ]
      }
    ]
    const [list, setList] = useState(dashboardList);
    const { user } = this.context
    const [currentUser,setUser] = useState(user)
    
    const goDetail = (item)=>{
      Taro.navigateTo({
        url: `${item.url}?title=${item.label}`
      })
    }
    return (
      <View className="background">
        <Image src={topImg} mode="widthFix" style="width:100%;"></Image>
        <View className="top-left">你好，欢迎登入!</View>
        <View className="top-right">
          <View>{currentUser.name}</View>
          <View>linrong123@qq.com</View>
        </View>
        {list.map((item: any, index) => (
          <View className="section">
            <View className="section-title">{item.title}</View>
            {item.list.map((row, idx) =>
              <View className="row" key={row.label} onClick={() => goDetail(row)}>
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