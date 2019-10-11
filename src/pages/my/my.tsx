import Taro, { useState, useRouter, useContext, useEffect, useDidShow } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import globalContext from '../../context';
import request, { useQuery } from '../../common/request';
import topImg from '../../images/Group.png';
import downloadImg from '../../images/download-b.png'
import whitedownImg from '../../images/download-w.png'
import nextIcon from '../../images/next-icon.png'
import nextIconWhite from '../../images/white-next-icon.png'

import { downloadFile,generateDate } from '../../common/utils'

import './my.scss'

export default () => {
  const router = useRouter()
  const context = useContext(globalContext)
  const { user } = context
  const { title } = router.params
  const [certificateList, setCertificateList] = useState([])
  const [courseList, setCourseList] = useState(context.user.classProcess)
  const [unitList, setUnitList] = useState([])
  title && Taro.setNavigationBarTitle({
    title
  })
  const queryHistory = useQuery('api/public/api/v1/fetchHistoryPayment')
  const unitQuery = useQuery('api/public/api/v1/fetchUnitsByClassIds')

  useDidShow(() => {
    console.log(context)
    const newList = [];
    const courseL = [];
    user.classProcess.forEach(item => {
      // item.ifFinish && newList.push({
      //   img: downloadImg,
      //   activeImg: whitedownImg,
      //   title: item.className,
      //   right: item.finishDate,
      //   func: generateCertificate
      // })
      item.ifFinish && newList.push({
        img: downloadImg,
        activeImg: whitedownImg,
        title: item.className,
        right: item.finishDate,
        func: generateCertificate
      })
      courseL.push({
        id: item.classId,
        title: item.className,
        right: item.finishDate,
        func: goUnitDetail,
        rightIcon:true,
      })
    })
    console.log(newList)
    setCertificateList(newList)
    setCourseList(courseL)
    if (title === '购买记录') {
      queryHistory.request({
        method: 'POST',
        data: {
          email: user.email
        }
      })
    }
    if (title === '材料列表') {
      unitQuery.request({
        method: 'POST',
        data: {
          classId: router.params.id
        }
      })
    }
  })

  const goUnitDetail = (row) => {
    console.log(row)
    Taro.navigateTo({
      url: `/pages/my/my?title=材料列表&id=${row.id}`
    })
  }

  const changeAcc = (row) => {
    Taro.navigateTo({
      url: `/pages/changeAcc/changeAcc?subtitle=${row.right}`
    })
  }

  const generateCertificate = (row) => {
    console.log(row)
    request('certificateCN/exampleSec.php', {
      method: 'POST',
      data: {
        name: user.lastName + ' ' + user.firstName,
        className: row.title,
        finishDate: row.right
      }
    }).then(res => {
      downloadFile('https://eot.weboostapp.com/certificateCN/displayCertificate.jpg', 'image')
    })
  }

  const myMap = {
    "我的证书": {
      subtitle: '证书清单',
      list: certificateList
    },
    "课程材料": {
      subtitle: '上过的课程',
      list: courseList
    },
    "材料列表": {
      subtitle: '上过的课程',
      list: unitList
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
  useEffect(() => {
    setPageList(myMap[title].list)
  }, [myMap[title].list])
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

  useEffect(() => {
    if (!unitQuery.isLoading) {
      setUnitList(unitQuery.data[0].unitData)
      console.log(unitQuery.data[0].unitData)
    }
  }, [unitQuery.data])

  const setActive = (detail, idx) => {
    setPageList(list => {
      list.map(item => {
        item.active = false
      })
      list[idx].active = true;
      console.log(list)
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

  const downloadDoc = (source) => {
    if (source.url) {
      downloadFile(source.url, 'image')
    } else {
      Taro.showToast({
        title: '缺失文件',
        icon: 'none'
      })
    }
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
          <View>有效期至   {generateDate(user.endMemberTime)}</View>
          <View className="button redeem" onClick={() => goRedeem()}>续约我的会员</View>
        </View>
      </View>
    </View>}
    {title == '材料列表' && <View className="section">
      {
        unitList.map(item => <View key={item.id}>
          <View className="section-title">{item.videoName}</View>
          {
            !item.documentUrl.length && <View className="row">暂无材料</View>
          }
          {
            item.documentUrl.map(i => <View key={i.url} className="row" onClick={() => downloadDoc(i)}>
              <Image className="icon" src={downloadImg}></Image>
              <View style="flex:1;">{i.name}</View>
            </View>)
          }
        </View>)
      }
    </View>}

    {title !== '材料列表' && <View className="section">
      <View className="section-title">{myMap[title].subtitle}</View>
      {pageList && pageList.map((row, idx) =>
        <View className={row.active ? "row active-label" : "row"} key={row.title} onClick={() => { setActive(row, idx); row.func(row) }}>
          {row.img && <Image className="icon" src={row.active ? row.activeImg : row.img}></Image>}
          <View style="flex:1;">{row.title}</View>
          <View>{row.right}</View>
          {row.rightIcon && <Image style='width:10px;margin-left:20px;' mode="widthFix" src={row.active ? nextIconWhite : nextIcon}></Image>}
        </View>)}
    </View>}
  </View>)
}