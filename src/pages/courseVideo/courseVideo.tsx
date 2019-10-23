import Taro, {
  useDidShow,
  useState,
  useRouter,
  useEffect,
  useContext
} from "@tarojs/taro";
import { View, Image, Video } from "@tarojs/components";
import topImg from "../../images/Group.png";
import nextImg from "../../images/white-next-icon.png";
import download from "../../images/download-b.png";
import reWatchImg from "../../images/re_video.png";
import globalContext from "../../context";

import { useQuery } from "../../common/request";
import { downloadFile } from "../../common/utils";
import Modal from "../../components/modal/modal";
import mustImg from "../../images/must-know.png";
import finishImg from "../../images/video-finish.png";
import failImg from "../../images/test-fail.png";

import "./courseVideo.scss";

export default () => {
  Taro.setNavigationBarTitle({
    title: "开始学习"
  });
  const router = useRouter();
  const videoQuery = useQuery("api/public/api/v1/fetchUnitById");
  const trialQuery = useQuery('api/public/api/v1/fetchTestUnit')
  const [unit, setUnit] = useState({});
  const [mustModalShow, setmustModalShow] = useState(false);
  const [finishModalShow, setFinishModalShow] = useState(false);
  const [showLimitModal, setLimitModalShow] = useState(false);
  const [videoShow, setVideoShow] = useState(0)
  const context = useContext(globalContext);
  const [remain, setRemain] = useState(3)

  useDidShow(() => {
    if (router.params.trial) {
      trialQuery.request({
        method: 'GET'
      })
    } else {
      videoQuery.request({
        method: "POST",
        data: {
          id: router.params.id
        }
      });
    }
    Taro.request({
      url: 'https://eot.weboostapp.com/flag.php',
      success: res => {
        setVideoShow(() => {
          if (res.data == 1) {
            return false
          } else {
            return true
          }
        })
      }
    })
    if (!router.params.trial) {
      const date = new Date();
      const storedDate = new Date(Taro.getStorageSync("date")) || date;
      const dateDiff = compareDate(date, storedDate);

      let attemps = Taro.getStorageSync("attempts") || [];
      if (!dateDiff) {
        attemps.forEach(item => {
          if (
            item.user == context.user.id &&
            item.class == context.course.classId &&
            item.unit == router.params.id
          ) {
            setRemain(3 - item.times)
            console.log("做过题目了");
          }
        });
      }
    }
  });
  useEffect(() => {
    if (!trialQuery.isLoading) {
      setUnit(trialQuery.data[0]);
      context.unit = trialQuery.data[0];
      Taro.setStorageSync("quiz", trialQuery.data[0].quest);
      Taro.setStorageSync("context", context);
      Taro.setStorageSync("trial", true);
    }
  }, [trialQuery.data]);
  useEffect(() => {
    if (!videoQuery.isLoading) {
      setUnit(videoQuery.data[0]);
      context.unit = videoQuery.data[0];
      Taro.setStorageSync("quiz", videoQuery.data[0].quest);
      Taro.setStorageSync("context", context);
      Taro.removeStorageSync("trial");
    }
  }, [videoQuery.data]);
  const goQuiz = () => {
    context.unit.quest = [];
    Taro.removeStorageSync("timer");
    Taro.reLaunch({
      url: `/pages/quiz/quiz?context=${JSON.stringify(context)}`
    });
  };
  const downloadDoc = source => {
    if (source.url) {
      downloadFile(source.url, "image");
    } else {
      Taro.showToast({
        title: "缺失文件",
        icon: "none"
      });
    }
  };

  const videoToQuiz = () => {
    console.log(router.params.trial)
    setFinishModalShow(false);
    if (!router.params.trial) {
      validateStart();
    }
  };

  const compareDate = (newDate, oldDate) => {
    if (newDate.getFullYear() > oldDate.getFullYear()) {
      return true;
    }
    if (newDate.getMonth() > oldDate.getMonth()) {
      return true;
    }
    if (newDate.getDate() > oldDate.getDate()) {
      return true;
    }
    return false;
  };

  const backToDashboard = () => {
    Taro.reLaunch({
      url: "/pages/dashboard/dashboard"
    });
  };

  const validateStart = () => {
    if (!router.params.trial) {
      const date = new Date();
      const storedDate = new Date(Taro.getStorageSync("date")) || date;
      const dateDiff = compareDate(date, storedDate);
      let attemps = Taro.getStorageSync("attempts") || [];

      let limit = false;
      attemps.forEach(item => {
        if (
          item.user == context.user.id &&
          item.class == context.course.classId &&
          item.unit == unit.id
        ) {
          console.log("做过题目了");
          if (item.times >= 3) {
            limit = true;
          }
        }
      });
      if (limit && !dateDiff) {
        setLimitModalShow(true);
        return;
      }
    }
    setmustModalShow(true);
  };

  const reWatch = () => {
    console.log(router)
    Taro.redirectTo({
      url: `/pages/courseVideo/courseVideo?${router.params.id ? `id=${router.params.id}` : 'trial=true'}`
    })
  }
  return (
    <View>
      <Modal
        show={showLimitModal}
        title="本日尝试次数已到"
        img={failImg}
        subtitle={`请明天再来回答该题`}
        button={[{ name: "返回个人中心", func: backToDashboard }]}
        onClose={() => setLimitModalShow(false)}
      ></Modal>
      <Modal
        show={finishModalShow}
        title="视频已结束"
        img={finishImg}
        subtitle={`你已完成视频学习，马上前往做题测验！`}
        warntitle={router.params.trial ? '' : `今天剩余答题次数:${remain}次`}
        button={[{ name: "开始做题", func: videoToQuiz }]}
        onClose={() => setFinishModalShow(false)}
        bottom={{
          text: `我想再看一次视频`,
          func: reWatch,
          img: reWatchImg
        }}
      ></Modal>
      <Modal
        show={mustModalShow}
        title="做题须知"
        img={mustImg}
        subtitle={`测验有7题,答对6题才算过关`}
        extratitle={'测验时间:20分钟'}
        button={[{ name: "知道了", func: goQuiz }]}
        onClose={() => setmustModalShow(false)}
      ></Modal>
      <Image src={topImg} mode="widthFix" className="resized-img"></Image>
      <View className="top-left">{router.params.trial ? 'Test' : context.course.className}</View>
      <View className="top-right">
        <View className="top-section active">
          观看视频
          <Image src={nextImg} mode="widthFix" className="sec-img"></Image>
        </View>
        <View className="top-section">
          做题测验
          <Image
            src={nextImg}
            mode="widthFix"
            className="sec-img"
            style="opacity:0.4"
          ></Image>
        </View>
        <View>完成</View>
      </View>
      <View className="section-title">{unit.videoName}</View>
      <View className="video-container">
        {!finishModalShow && !showLimitModal && !mustModalShow && videoShow && <Video
          className="video"
          src={unit.videoUrl}
          controls={true}
          autoplay={false}
          initialTime={0}
          id='video'
          style={finishModalShow ? 'visibility:hidden' : ''}
          loop={false}
          muted={false}
          onEnded={() => setFinishModalShow(true)}
        />}
      </View>
      <View className="bot-container">
        <View className="sub-title">视频介绍</View>
        <View className="desc">{unit.videoDescription}</View>
        <View className="sub-title">课程材料</View>
        {unit.documentUrl &&
          unit.documentUrl.map(item => (
            <View
              key={item.id}
              className="material-section"
              onClick={() => downloadDoc(item)}
            >
              <Image src={download}></Image>
              {item.name}
            </View>
          ))}
        {!router.params.trial && <View className="error">{`今天剩余答题次数:${remain}次`}</View>}
        <View
          className="button"
          style="margin:20px 0;"
          onClick={() => validateStart()}
        >
          开始做题
        </View>
        <View style="height:40px;">  </View>
      </View>
    </View>
  );
};
