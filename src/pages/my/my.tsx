import Taro, { useState, useRouter, useContext, useEffect, useDidShow } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import globalContext from '../../context';
import request, { useQuery } from '../../common/request';

import topImg from '../../images/Group.png';
import downloadImg from '../../images/download-b.png'
import whitedownImg from '../../images/download-w.png'

import {downloadFile} from '../../common/utils'

import './my.scss'

export default () => {
  const router = useRouter()
  const context = useContext(globalContext)
  const { user } = context
  const { title } = router.params
  const [history, setHistory] = useState([])
  const [certificateList,setCertificateList] = useState([])
  title && Taro.setNavigationBarTitle({
    title
  })
  const queryHistory = useQuery('api/public/api/v1/fetchHistoryPayment')
  const queryCertificate = useQuery('certificateCN/example.php')

  useDidShow(() => {
    const newList = []; 
    user.classProcess.forEach(item => {
      newList.push({
        img: downloadImg,
        activeImg: whitedownImg,
        title: item.className,
        right: item.finishDate,
        func: generateCertificate
      })
    })
    console.log(newList)
    setCertificateList(newList)
    if (title === '购买记录') {
      queryHistory.request({
        method: 'POST',
        data: {
          email: user.email
        }
      })
    }
  })

  const changeAcc = (row) => {
    Taro.navigateTo({
      url: `/pages/changeAcc/changeAcc?subtitle=${row.right}`
    })
  }

  const generateCertificate = (row) => {
    console.log(row)
    request('certificateCN/example.php',{
      method: 'POST',
      data: {
        name: user.lastName + ' ' + user.firstName,
        className: row.title,
        finishDate: row.right
      }
    }).then(res=>{
      downloadFile(res)
    })
  }

  const myMap = {
    "我的证书": {
      subtitle: '证书清单',
      list: certificateList
    },
    "课程材料": {
      subtitle: '上过的课程',
      list: [
        {
          title: '课程1'
        }
      ]
    },
    "账号设定": {
      subtitle: '我的资料',
      list: [
        {
          title: user.lastName + ' ' + user.firstName
        },
        {
          title: user.email
        },
        {
          title: user.phone, right: '修改手机', func: changeAcc
        },
        {
          right: '修改密码', func: changeAcc
        }
      ]
    },
    "购买记录": {
      subtitle: '购买历史清单',
      list: [],
    },
  }

  const [pageList, setPageList] = useState(myMap[title].list)
  useEffect(()=>{
    setPageList(myMap[title].list)
  },[myMap[title].list])
  useEffect(() => {
    if (!queryHistory.isLoading) {
      console.log(queryHistory.data)
      setPageList(queryHistory.data.map(item => ({
        // title:(<View>
        //   <View>FULL PACK Subscriptions</View>
        //   <View>{'$'+item.price}</View>
        // </View>),
        title: `$${item.price}   FULL PACK Subscriptions`,
        right: item.date
      })))
    }
  }, [queryHistory.data])

  const setActive = (detail, idx) => {
    setPageList(list => {
      list.map(item => {
        item.active = false
      })
      list[idx].active = true;
      return list
    })
    // Taro.navigateTo({
    //   url: '/pages/my/my'
    // })
  }

  const goRedeem = () => {
    Taro.navigateTo({
      url: '/pages/redeem/redeem'
    })
  }

  const parseDate = (stamp) => {
    const date = new Date(stamp)
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  return (<View className="bg">
    <Image src={topImg} mode="widthFix" style="width:100%;"></Image>
    <View className="top-left">{title}</View>
    <View className="top-right">
      <View>{user.lastName + ' ' + user.firstName}</View>
      <View>{user.email}</View>
    </View>
    {title == '账号设定' && <View className="section">
      <View className="section-title">我的会员</View>
      <View className="card">
        <View className="expire-title">Full PACK Subscriptions</View>
        <View className="expire-sec">
          <View>有效期至   {parseDate(user.endMemberTime)}</View>
          <View className="button redeem" onClick={() => goRedeem()}>续约我的会员</View>
        </View>
      </View>
    </View>}
    <View className="section">
      <View className="section-title">{myMap[title].subtitle}</View>
      {pageList && pageList.map((row, idx) =>
        <View className={row.active ? "row active" : "row"} key={row.title} onClick={() => { setActive(row, idx); row.func(row) }}>
          {row.img && <Image className="icon" src={row.active ? row.activeImg : row.img}></Image>}
          <View style="flex:1;">{row.title}</View>
          <View>{row.right}</View>
        </View>)}
    </View>
  </View>)
}