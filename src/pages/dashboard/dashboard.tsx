import Taro, { useState, useEffect, useDidShow, useContext } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Footer from '../../components/footer/footer';
import nextIcon from '../../images/next-icon.png'
import topImg from '../../images/Group.png'
import botImg from '../../images/C-BG2.png'
import globalContext from '../../context'

import { useQuery } from '../../common/request'

import './dashboard.scss'

const Dashboard = () => {
  Taro.setNavigationBarTitle({
    title: "个人中心"
  });
  const dashboardList = [
    {
      title: '我的课程', list: [
        { label: '课程1', progress: '28%', url: '/pages/courseList/courseList' }
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
        { label: '帮助', url: '/pages/help/help' }
      ]
    }
  ]
  const [list,setList] = useState(dashboardList);
  const userQuery = useQuery('api/public/api/v1/fetchStaffById')
  const [user, setUser] = useState(Taro.getStorageSync('user'))

  const context = useContext(globalContext)

  useDidShow(() => {
    const queryUser = context.user || user
    if(queryUser){
      userQuery.request({
        method:'POST',
        data:{
          id:queryUser.id
        }
      });
    }
  })
  useEffect(()=>{
    if (!userQuery.isLoading) {
      setUser(userQuery.data[0])
      context.user = userQuery.data[0]
      setList(oldList=>{
        oldList[0].list = userQuery.data[0].classProcess.map(item=>({
          label:item.className,
          id:item.classId,
          progress:`${item.classProcess}%`,
          url: `/pages/courseList/courseList?id=${item.classId}&course=${JSON.stringify(item)}`
        }))
        return oldList
      })
    }
    
  },[userQuery.data])

  const goDetail = (item) => {
    Taro.navigateTo({
      url: `${item.url}?title=${item.label}`
    })
  }
  return (
    <View className="background">
      <Image src={topImg} mode="widthFix" style="width:100%;"></Image>
      <View className="top-left">你好，欢迎登入!</View>
      <View className="top-right">
        <View>{user.lastName} {user.firstName}</View>
        <View>{user.email}</View>
      </View>
      {list.map((item: any, index) => (
        <View key={item.title} className="section">
          <View className="section-title">{item.title}</View>
          {item.list.map((row, idx) =>
            <View className="row" key={row.label} onClick={() => goDetail(row)}>
              <View>{row.label}</View>
              {row.progress ||<Image mode="widthFix" style='width:10px' src={nextIcon}></Image>}
            </View>)}
        </View>
      ))}
      <View className="gap"></View>
      <Footer></Footer>
      <Image className="bottom-img" src={botImg} mode="widthFix" style="width:100%;"></Image>
    </View>
  )
}

export default Dashboard