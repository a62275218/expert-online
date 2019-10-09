import Taro, { useDidShow, useState, useRouter, useEffect, useContext } from "@tarojs/taro";
import { View, Image, Video } from "@tarojs/components";
import topImg from '../../images/Group.png'
import nextImg from '../../images/white-next-icon.png'
import download from '../../images/download-b.png'
import globalContext from '../../context'

import { useQuery } from '../../common/request'
import { downloadFile } from '../../common/utils'

import './courseVideo.scss'

export default () => {
  Taro.setNavigationBarTitle({
    title: "开始学习"
  });
  const router = useRouter()
  const videoQuery = useQuery('api/public/api/v1/fetchUnitById')

  const [unit, setUnit] = useState({})
  const context = useContext(globalContext)

  useDidShow(() => {
    videoQuery.request({
      method: 'POST',
      data: {
        id: router.params.id
      }
    });
  })
  useEffect(() => {
    if (!videoQuery.isLoading) {
      setUnit(videoQuery.data[0])
      context.unit = videoQuery.data[0]
    }
  }, [videoQuery.data])
  const goQuiz = () => {
    context.quiz = unit.quest
    Taro.navigateTo({
      url: `/pages/quiz/quiz`
    })
  }
  const downloadDoc = (source) => {
    if (source.url) {
      downloadFile(source.url)
    } else {
      Taro.showToast({
        title: '缺失文件',
        icon: 'none'
      })
    }

  }
  return (
    <View>
      <Image src={topImg} mode="widthFix" className="resized-img"></Image>
      <View className="top-left">{context.course.className}</View>
      <View className="top-right">
        <View className="top-section active">观看视频<Image src={nextImg} mode="widthFix" className="sec-img"></Image></View>
        <View className="top-section">做题测验<Image src={nextImg} mode="widthFix" className="sec-img" style="opacity:0.4"></Image></View>
        <View>完成</View>
      </View>
      <View className="section-title">{unit.videoName}</View>
      <View className="video-container">
        {/* <Video
          className="video"
          src={unit.videoUrl}
          controls={true}
          autoplay={false}
          initialTime={0}
          id='video'
          loop={false}
          muted={false}
        /> */}
      </View>
      <View className="bot-container">
        <View className="sub-title">视频介绍</View>
        <View className="desc">{unit.videoDescription}</View>
        <View className="sub-title">课程材料</View>
        {
          unit.documentUrl && unit.documentUrl.map(item => (
            <View key={item.id} className="material-section" onClick={() => downloadDoc(item)}>
              <Image src={download}></Image>
              {item.name}
            </View>
          ))
        }
        <View className="button" style="margin:40px 0;" onClick={() => goQuiz()}>开始做题</View>
      </View>
    </View>
  );
};
