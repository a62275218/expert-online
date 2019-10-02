import Taro, { useState, useRouter, Component, useEffect } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import topImg from '../../images/Group.png'

import './my.scss'

const myMap = {
  "我的证书":{
    subtitle:'证书清单',
    list:[
      {
        title:'证书1',
        right:'08/Apr/2018'
      }
    ]
  },
  "课程材料":{
    subtitle:'上过的课程',
    list:[
      {
        title:'课程1'
      }
    ]
  },
  "账号设定":{
    subtitle:'我的资料',
    list:[
      {
        title:'林榕'
      },
      {
        title:'email'
      },
      {
        title:'12312312213'
      },
      {
        title:'修改密码'
      }
    ]
  },
  "购买记录":{
    subtitle:'购买历史清单',
    list:[
      {
        title:'历史1'
      }
    ]
  },
}

export default ()=>{
  const router = useRouter()
  const {title} = router.params
  title && Taro.setNavigationBarTitle({
    title
  })
  
  useEffect(()=>{
    console.log(router.params.title)
  },[])

  const goDetail = (detail)=>{
    // Taro.navigateTo({
    //   url: '/pages/my/my'
    // })
  }

  return (<View className="bg">
  <Image src={topImg} mode="widthFix" style="width:100%;"></Image>
        <View className="top-left">{title}</View>
        <View className="top-right">
          <View>林榕</View>
          <View>linrong123@qq.com</View>
        </View>
        <View className="section">
            <View className="section-title">{myMap[title].subtitle}</View>
            {myMap[title].list.map((row, idx) =>
              <View className="row" key={row.title} onClick={()=>goDetail(row.detail)}>
                <View>{row.title}</View>
                <View>{row.right}</View>
              </View>)}
          </View>
  </View>)
}