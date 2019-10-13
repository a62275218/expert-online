import Taro, { useDidShow, useState, useRouter, useEffect, useContext } from "@tarojs/taro";
import { View, Image, Video } from "@tarojs/components";
import topImg from '../../images/Group.png'
import nextImg from '../../images/white-next-icon.png'
import download from '../../images/download-b.png'
import globalContext from '../../context'

import { useQuery } from '../../common/request'
import { downloadFile } from '../../common/utils';
import Modal from "../../components/modal/modal";
import mustImg from '../../images/must-know.png'
import finishImg from '../../images/video-finish.png'

import './courseVideo.scss'

export default () => {
  Taro.setNavigationBarTitle({
    title: "开始学习"
  });
  const router = useRouter()
  const videoQuery = useQuery('api/public/api/v1/fetchUnitById')

  const [unit, setUnit] = useState({})
  const [mustModalShow,setmustModalShow] = useState(false)
  const [finishModalShow,setFinishModalShow] = useState(false)
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
      Taro.setStorageSync('quiz',videoQuery.data[0].quest)
      Taro.setStorageSync('context',context)
    }
  }, [videoQuery.data])
  const goQuiz = () => {
    context.unit.quest=[];
    Taro.removeStorageSync('timer')
    Taro.reLaunch({
      url: `/pages/quiz/quiz?context=${JSON.stringify(context)}`
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

  const videoToQuiz = ()=>{
    setFinishModalShow(false)
    setmustModalShow(true)
  }
  return (
    <View>
      <Modal show={finishModalShow}
        title="视频已结束"
        img={finishImg}
        subtitle={`你已完成视频学习，马上前往做题测验！`}
        button={[
          { name: "开始做题", func: videoToQuiz }
        ]}
        onClose={()=>setFinishModalShow(false)}
        ></Modal>
      <Modal show={mustModalShow}
        title="做题须知"
        img={mustImg}
        subtitle={`测验有7题,答对5题才算过关\r\n测验时间:20分钟`}
        button={[
          { name: "知道了", func: goQuiz }
        ]}
        onClose={()=>setmustModalShow(false)}
        ></Modal>
      <Image src={topImg} mode="widthFix" className="resized-img"></Image>
      <View className="top-left">{context.course.className}</View>
      <View className="top-right">
        <View className="top-section active">观看视频<Image src={nextImg} mode="widthFix" className="sec-img"></Image></View>
        <View className="top-section">做题测验<Image src={nextImg} mode="widthFix" className="sec-img" style="opacity:0.4"></Image></View>
        <View>完成</View>
      </View>
      <View className="section-title">{unit.videoName}</View>
      <View className="video-container">
        <Video
          className="video"
          src={unit.videoUrl}
          controls={true}
          autoplay={false}
          initialTime={0}
          id='video'
          loop={false}
          muted={false}
          onEnded={()=>setFinishModalShow(true)}
        />
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
        <View className="button" style="margin:40px 0;" onClick={() => setmustModalShow(true)}>开始做题</View>
      </View>
    </View>
  );
};
