import Taro, {
  useDidShow,
  useState,
  useEffect,
  useRef,
  useRouter,
  useDidHide
} from "@tarojs/taro";
import { View, Image, Video } from "@tarojs/components";
import topImg from "../../images/Group.png";
import nextImg from "../../images/white-next-icon.png";
import passImg from "../../images/pass.png";
import failImg from "../../images/test-fail.png";
import finishImg from "../../images/finish.png";
import downloadImg from "../../images/download-w.png";
import replay from "../../images/reply-w.png";
import replayBlue from '../../images/replay_blue.jpg'
import quitImg from "../../images/quit.jpg";
import correctImg from "../../images/correct.png";
import incorrectImg from "../../images/incorrect.png";
import timerImg from '../../images/timer.png'

import { useQuery } from "../../common/request";
import { downloadFile, generateDate } from "../../common/utils";

import "./quiz.scss";

import Modal from "../../components/modal/modal";

export default () => {
  Taro.setNavigationBarTitle({
    title: "开始学习"
  });
  const router = useRouter();
  let context,
    trial;
  if (Taro.getStorageSync('context')) {
    context = Taro.getStorageSync('context')
  } else {
    context = router.params.context ? JSON.parse(router.params.context) : {}
  }
  if (Taro.getStorageSync('trial')) {
    trial = true
  } else {
    trial = false
  }
  const [quiz] = useState(Taro.getStorageSync('quiz'));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [quitModalShow, setQuitModalShow] = useState(false)
  const [count, setCount] = useState(20 * 60);
  //const [trial, setTrial] = useState('');
  const timer = useRef({})
  const [answerMap, setAnserMap] = useState(
    quiz &&
    quiz.map(item => ({
      correct: item.questionCorrectAnswerIndex,
      select: null
    }))
  );
  const [correctCount, setCorrect] = useState(0);
  const submitQuery = useQuery(
    "api/public/api/v1/updateStaffClassProcess",
    "提交答案中"
  );
  const certificateQuery = useQuery(
    "certificateCN/exampleSec.php",
    "生成证书中"
  );
  const [result, setResult] = useState("");
  const [showRes, setShowRes] = useState(false);

  useEffect(() => {
    setOptions(quiz[currentIndex].questionAnswerSelectionTrans.split("|"));
  }, [currentIndex]);

  useDidShow(() => {
    const localTrial = Taro.getStorageSync('trial')
    setCount(Taro.getStorageSync('timer') || (20 * 60));
    if (!router.params.showRes) {
      timer.current = setInterval(() => {
        setCount(c => c - 1)
      }, 1000)
    }
    console.log(router.params.showRes)
    if (router.params.showRes) {
      setShowRes(true);
      setAnserMap(JSON.parse(router.params.map));
    }
  });
  useDidHide(() => {
    Taro.setStorageSync('timer', count)
    clearInterval(timer.current)
  })
  useEffect(() => {
    if (count === 0) {
      console.log('到时间')
      submitResult()
      clearInterval(timer.current)
    }
  }, [count])

  const compareDate = (newDate, oldDate) => {
    if (newDate.getFullYear() > oldDate.getFullYear()) {
      return true
    }
    if (newDate.getMonth() > oldDate.getMonth()) {
      return true
    }
    if (newDate.getDate() > oldDate.getDate()) {
      return true
    }
    return false
  }

  useEffect(() => {
    (async () => {
      if (!submitQuery.isLoading) {
        const date = new Date();
        if (submitQuery.data && submitQuery.data.code == 0) {
          const classRes = submitQuery.data.classData[0];
          context.course = classRes;
          if (
            classRes.unitDone.indexOf(context.unit.id) > -1 &&
            classRes.ifFinish != 1
          ) {
            setResult("pass");
          } else if (classRes.unitFail.indexOf(context.unit.id) > -1) {
            setResult("fail");
          } else if (classRes.ifFinish == 1) {
            setResult("finish");
            certificateQuery.request({
              method: "POST",
              data: {
                name: context.user.lastName + " " + context.user.firstName,
                className: context.course.className,
                finishDate: generateDate(date)
              }
            });
          }
        }
      }
    })()
  }, [submitQuery.data]);

  const judgeTimes = () => {
    return new Promise((resolve) => {
      // const date = new Date('2019-10-23');
      const date = new Date();
      const dateString = `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()}`
      const storedDate = new Date(Taro.getStorageSync('date')) || date
      const dateDiff = compareDate(date, storedDate);
      let attemps = Taro.getStorageSync('attempts') || [];
      if (dateDiff) {
        console.log('清除次数')
        Taro.removeStorageSync('attempts')
        attemps = []
      }
      Taro.setStorageSync('date', dateString)
      let found = false;
      console.log(attemps)
      let limit = false;
      attemps.forEach(item => {
        if (item.user == context.user.id && item.class == context.course.classId && item.unit == context.unit.id) {
          console.log('做过题目了');
          found = true;
          item.times++;
          if (item.times > 3) {
            limit = true
          }
        }
      })
      if (limit) {
        resolve(true)
      }
      if (!found) {
        attemps.push({
          user: context.user.id,
          class: context.course.classId,
          unit: context.unit.id,
          times: 1
        })
      }
      Taro.setStorageSync('attempts', attemps)
      resolve(false)
    })
  }

  const select = (option: any) => {
    answerMap[currentIndex].select = options.indexOf(option);
    setAnserMap(answerMap);
  };

  const transSec = (time) => {
    return `${fillZero(Math.floor(time / 60))}:${fillZero(time % 60)}`
  }

  const fillZero = (num) => {
    return ("00000" + num).substr(-2)
  }

  const judgeIndex = (action, index) => {
    if (action == "minus") {
      return index > 0 ? index - 1 : index;
    } else {
      return index == quiz.length ? index : index + 1;
    }
  };

  const submit = () => {
    let valid = true;
    answerMap.forEach(item => {
      if (!item.select && item.select !== 0) {
        valid = false;
      }
    });
    if (!valid) {
      Taro.showToast({
        title: "请做完全部选择",
        icon: "none"
      });
      return;
    }
    submitResult();
  };

  const submitResult = async () => {
    let count = correctCount
    count = answerMap.reduce((count, current) => {
      return current.correct == current.select ? count + 1 : count;
    }, 0);
    setCorrect(count);
    //Taro.setStorageSync('timer',120)
    if (trial) {
      if (count >= 6) {
        setResult('pass')
      } else {
        setResult('fail')
      }
      return
    }
    let
      course = context.course,
      doneList = course.unitDone,
      progress,
      classProcessObj;

    const excced = await judgeTimes();
    if (excced) {
      setResult("limit")
      return
    }
    const date = new Date();
    if (count >= 6) {
      doneList =
        course.unitDone.indexOf(context.unit.id) > -1
          ? course.unitDone
          : course.unitDone.concat(context.unit.id);
      const failList = course.unitFail;
      const failIndex = failList.indexOf(context.unit.id);
      if (failIndex > -1) {
        failList.splice(failIndex, 1);
      }
      progress = Math.floor((doneList.length / course.countUnitNum) * 100);
      classProcessObj = {
        classId: course.classId,
        unitDone: doneList,
        unitFail: failList,
        ifFinish: progress == 100 ? 1 : 0,
        classProcess: progress + "",
        finishDate:
          progress == 100
            ? generateDate(date)
            : ""
      };
    } else {
      const doneList = course.unitDone;
      const successIndex = doneList.indexOf(context.unit.id);
      let ifFinish = 0, progress;
      if (doneList.length == course.countUnitNum) {
        ifFinish = 1;
        progress = '100'
      } else {
        if (successIndex > -1) {
          doneList.splice(successIndex, 1);
        }
        progress = Math.floor((doneList.length / course.countUnitNum) * 100);
      }
      classProcessObj = {
        classId: course.classId,
        classProcess: progress,
        unitDone: doneList,
        unitFail:
          course.unitFail.indexOf(context.unit.id) > -1
            ? course.unitFail
            : course.unitFail.concat(context.unit.id),
        ifFinish
      };
    }
    submitQuery.request({
      method: "POST",
      data: {
        id: context.user.id,
        classId: course.classId,
        classProcessObj
      }
    });
  };

  const downloadCertificate = () => {
    downloadFile(
      "https://eot.weboostapp.com/certificateCN/displayCertificate.jpg",
      "image"
    );
  };

  const backToDashboard = () => {
    Taro.reLaunch({
      url: trial ? "/pages/login/login" : "/pages/dashboard/dashboard"
    });
  };

  const goVideo = () => {
    Taro.reLaunch({
      url: trial ? '/pages/courseVideo/courseVideo?trial=true' : `/pages/courseVideo/courseVideo?id=${context.unit.id}`
    });
  };

  const closeQuit = () => {
    setQuitModalShow(false)
  }

  const redo = async () => {
    if (trial) {
      Taro.redirectTo({
        url: `/pages/quiz/quiz?context=${JSON.stringify(context)}`
      });
      return
    }
    Taro.removeStorageSync('timer')
    Taro.setStorageSync('context', context)
    const excced = await judgeTimes();
    if (excced) {
      setResult("limit")
      return
    }
    Taro.redirectTo({
      url: `/pages/quiz/quiz?context=${JSON.stringify(context)}`
    });
  };

  const showResult = () => {
    Taro.redirectTo({
      url: `/pages/quiz/quiz?showRes=true&map=${JSON.stringify(answerMap)}`
    });
  };

  const resultPage = <View>
    {
      quiz.map((item, index) => (
        <View className="question-wrapper">
          <View className="top-right">
            <View className="top-section active">
              观看视频
              <Image
                src={nextImg}
                mode="widthFix"
                className="sec-img"
              ></Image>
            </View>
            <View className="top-section active">
              做题测验
              <Image src={nextImg} mode="widthFix" className="sec-img"></Image>
            </View>
            <View>完成</View>
          </View>
          <View className="section-title">
            <View>{item.QuizNameTrans}</View>
          </View>
          <View className="question">
            {index + 1} {item.questionTrans}
          </View>
          {item.questionAnswerSelectionTrans.split("|").map((option, idx) => {
            return (
              <View
                className="answer-item"
                key={option}
              >
                <View
                  className={
                    answerMap[index].select == idx
                      ? "radio-ico selected"
                      : "radio-ico"
                  }
                ></View>
                <View style="flex:1;">{option}</View>
                {showRes && answerMap[index].select == idx && (
                  <Image
                    className="resImg"
                    src={
                      answerMap[index].select ==
                        answerMap[index].correct
                        ? correctImg
                        : incorrectImg
                    }
                  ></Image>
                )}
              </View>
            );
          })}
          {showRes && (
            <View className="feedback">
              {answerMap[index].select == answerMap[index].correct
                ? quiz[index].questionFeedbackCorrectTrans
                : quiz[index].questionFeedbackIncorrectTrans}
            </View>
          )}

        </View>
      ))
    }
    <View className="button" style="margin:0 20px;width:auto;" onClick={() => backToDashboard()}>
      返回个人中心
    </View>
    <View style="height:40px"></View>
  </View>

  return (
    <View className={showRes ? "" : "bg"}>
      <Modal
        show={result === "limit"}
        title="本日尝试次数已到"
        img={failImg}
        subtitle={`请明天再来回答该题`}
        button={[
          { name: "返回个人中心", func: backToDashboard }
        ]}
      ></Modal>
      <Modal
        show={result === "pass"}
        title="测验通过"
        img={passImg}
        subtitle={`答对${correctCount}题!`}
        button={[
          { name: "下载课程材料", func: trial?goVideo:backToDashboard, img: downloadImg }
        ]}
        bottom={!trial && {
          text: `之后再下载，返回${trial ? '注册' : '个人中心'}`,
          func: backToDashboard
        }}
      ></Modal>
      <Modal
        show={result === "fail"}
        title="测验失败"
        img={failImg}
        subtitle={`答对${correctCount}题!总共答对6题才算通过哟！`}
        button={[
          { name: "再看一次视频", func: goVideo, img: replayBlue, activeImg: replay },
          { name: "再做一次题目", func: redo },
          { name: "我的做题结果", func: showResult }
        ]}
        bottom={{
          text: `不看了，返回${trial?'注册':'个人中心'}`,
          func: backToDashboard
        }}
      ></Modal>
      <Modal
        show={quitModalShow}
        title="确认退出测验?"
        img={quitImg}
        button={[
          { name: "返回继续做题", func: closeQuit },
          { name: "狠心退出", func: backToDashboard },
        ]}
        onClose={() => closeQuit()}
      ></Modal>
      <Modal
        show={result === "finish"}
        title="你的课程都完成了"
        img={finishImg}
        subtitle={`恭喜完成 ${context.course && context.course.className} 课程,前往下载您的证书！`}
        button={[
          { name: "下载课程证书", func: downloadCertificate, img: downloadImg }
        ]}
        bottom={{
          text: "之后再下载，返回个人中心",
          func: backToDashboard
        }}
      ></Modal>
      <Image src={topImg} mode="widthFix" className="resized-img"></Image>
      <View className="top-left">{context.unit.videoName}</View>
      {
        showRes ? resultPage : <View className="question-wrapper">
          <View style="flex:1;">
            <View className="top-right">
              <View className="top-section active">
                观看视频
              <Image
                  src={nextImg}
                  mode="widthFix"
                  className="sec-img"
                ></Image>
              </View>
              <View className="top-section active">
                做题测验
              <Image src={nextImg} mode="widthFix" className="sec-img"></Image>
              </View>
              <View>完成</View>
            </View>
            <View className="quit-btn button" onClick={() => setQuitModalShow(true)}>退出测试</View>
            <View className="section-title">
              <View style="flex:1;">{quiz[currentIndex].QuizNameTrans}</View>
              <View className={count < 120 ? "timer warn" : "timer"} style={showRes ? "visibility:hidden" : ''}>
                <Image className="timer-img" mode="widthFix" src={timerImg}></Image>{transSec(count)}
              </View>
            </View>
            <View className="question">
              {currentIndex + 1} {quiz[currentIndex].questionTrans}
            </View>
            {options &&
              options.map((option, index) => {
                return (
                  <View
                    className="answer-item"
                    key={option}
                    onClick={() => {
                      showRes ? "" : select(option);
                    }}
                  >
                    <View
                      className={
                        answerMap[currentIndex].select == index
                          ? "radio-ico selected"
                          : "radio-ico"
                      }
                    ></View>
                    <View style="flex:1;">{option}</View>
                    {showRes && answerMap[currentIndex].select == index && (
                      <Image
                        className="resImg"
                        src={
                          answerMap[currentIndex].select ==
                            answerMap[currentIndex].correct
                            ? correctImg
                            : incorrectImg
                        }
                      ></Image>
                    )}
                  </View>
                );
              })}
            {showRes && (
              <View className="feedback">
                {answerMap[currentIndex].select == answerMap[currentIndex].correct
                  ? quiz[currentIndex].questionFeedbackCorrectTrans
                  : quiz[currentIndex].questionFeedbackIncorrectTrans}
              </View>
            )}
          </View>
          <View className="action">
            <View
              className="button prev"
              style={currentIndex == 0 ? "visibility:hidden" : ""}
              onClick={() => setCurrentIndex(idx => judgeIndex("minus", idx))}
            >
              上一题
          </View>
            <View className="num">
              {currentIndex + 1}/{quiz.length}
            </View>
            {
              showRes && currentIndex + 1 == quiz.length &&
              <View className="button" onClick={() => backToDashboard()}>
                返回个人中心
            </View>
            }
            {currentIndex + 1 == quiz.length ? (
              !showRes && (
                <View className="button" onClick={() => submit()}>
                  提交
              </View>
              )
            ) : (
                <View
                  className="button prev"
                  style={
                    quiz && currentIndex == quiz.length - 1
                      ? "visibility:hidden"
                      : ""
                  }
                  onClick={() => setCurrentIndex(idx => judgeIndex("add", idx))}
                >
                  下一题
            </View>
              )}
          </View>
        </View>
      }
    </View>
  );
};
