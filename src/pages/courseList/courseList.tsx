import Taro, { useState, useRouter, useDidShow, useEffect,useContext } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import topImg from '../../images/Group.png'
import watch from '../../images/watch video.png'
import fail from '../../images/Fail.png'
import done from '../../images/Done-W.png'

import { useQuery } from '../../common/request'
import globalContext from '../../context'

import "./courseList.scss";

export default () => {
  Taro.setNavigationBarTitle({
    title: "课程清单"
  });
  const courseQuery = useQuery('api/public/api/v1/fetchUnitsByClassIdAndStaffId')
  const router = useRouter()
  const [units, setUnits] = useState([])
  const [course, setCourse] = useState('')

  const context = useContext(globalContext)

  const goDetail = (unit) => {
    context.unit = unit
    Taro.navigateTo({
      url: `/pages/courseVideo/courseVideo?id=${unit.id}`
    })
  }
  useDidShow(() => {
    const routerCourse = JSON.parse(router.params.course)
    setCourse(routerCourse)
    context.course = routerCourse
    console.log('show')
    courseQuery.request({
      method: 'POST',
      data: {
        id: router.params.id,
        staffId:context.user.id
      }
    })
  })
  useEffect(() => {
    console.log('query course')
    if (!courseQuery.isLoading) {
      console.log(courseQuery.data)
      setUnits(courseQuery.data)
    }
  }, [courseQuery.data])
  return (
    <View>
      <Image src={topImg} mode="widthFix" style="width:100%;"></Image>
      <View className="top-left">{course.className}</View>
      <View className="top-right">
        <View>{course.classProcess}%</View>
        <View>课程完成度</View>
      </View>
      <View className="section-title">课程清单</View>
      {units.map(item => {
        return (
          <View key={item.id} className={item.finishStatus == 1?"row finish":"row"} onClick={() => goDetail(item)}>
            {item.finishStatus != 1 &&<Image className="icon" src={watch}></Image>}
            <View style="flex:1;margin-left:10px;">{item.videoName}</View>
            {item.finishStatus == 2 && <Image className="icon" src={fail}></Image>}
            {item.finishStatus == 1 && <Image className="icon" src={done}></Image>}
          </View>
        )
      })}
    </View>
  );
};
