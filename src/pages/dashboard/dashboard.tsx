import Taro, {
  useState,
  useEffect,
  useDidShow,
  useContext
} from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import Footer from "../../components/footer/footer";
import nextIcon from "../../images/next-icon.png";
import nextIconWhite from "../../images/white-next-icon.png";
import topImg from "../../images/Group.png";
import botImg from "../../images/C-BG2.png";
import globalContext from "../../context";

import { useQuery } from "../../common/request";
import { debounce } from '../../common/utils'

import "./dashboard.scss";

const Dashboard = () => {

  const dashboardList = [
    {
      title: "我的课程",
      list: []
    },
    {
      title: "档案中心",
      list: [
        { label: "我的证书", url: "/pages/my/my" },
        { label: "课程材料", url: "/pages/my/my" }
      ]
    },
    {
      title: "我的账号",
      list: [
        { label: "账号设定", url: "/pages/my/my" },
        { label: "购买记录", url: "/pages/my/my" },
        { label: "帮助", url: "/pages/help/help" },
        { label: "登出", url: "/pages/login/login" }
      ]
    }
  ];
  const [list, setList] = useState(dashboardList);
  const userQuery = useQuery("api/public/api/v1/fetchStaffById");
  const [user, setUser] = useState(Taro.getStorageSync("user"));

  const context = useContext(globalContext);

  useDidShow(() => {
    Taro.setNavigationBarTitle({
      title: "个人中心"
    });
    setUser(Taro.getStorageSync("user"))
    setList(list => {
      list.forEach(item => {
        item.list.forEach(i => {
          i.active = false;
        });
      });
      return list;
    });
    const queryUser = context.user || user;
    if (queryUser) {
      userQuery.request({
        method: "POST",
        data: {
          id: queryUser.id
        }
      });
    }
  });
  useEffect(() => {
    if (!userQuery.isLoading) {
      setUser(userQuery.data[0]);
      context.user = userQuery.data[0];
      const today = new Date();
      Taro.setStorageSync('user', userQuery.data[0])
      if (userQuery.data[0].endMemberTime * 1000 < Date.parse(today)) {
        console.log('expire')
        Taro.reLaunch({
          url: '/pages/login/login'
        })
        return
      }
      setList(oldList => {
        oldList[0].list = userQuery.data[0].classProcess.map(item => ({
          label: item.className,
          id: item.classId,
          progress: `${item.classProcess}%`,
          url: `/pages/courseList/courseList?id=${
            item.classId
            }&course=${JSON.stringify(item)}`
        }));
        return oldList;
      });
    }
  }, [userQuery.data]);

  const goDetail = (item, index, idx) => {
    setList(list => {
      list.forEach(item => {
        item.list.forEach(i => {
          i.active = false;
        });
      });
      list[index].list[idx].active = true;
      return list;
    });
    if (item.label == "登出") {
      Taro.removeStorageSync("user");
      Taro.reLaunch({
        url: item.url
      });
      return;
    }
    Taro.navigateTo({
      url: `${item.url}?title=${item.label}`
    });
  };
  return (
    <View className="background">
      <Image src={topImg} mode="widthFix" style="width:100%;"></Image>
      <View className="top-left">你好，欢迎登入!</View>
      <View className="top-right">
        <View>
          {user.lastName} {user.firstName}
        </View>
        <View>{user.email}</View>
      </View>
      {!userQuery.isLoading && (
        <View>
          {list.map((item: any, index) => (
            <View key={item.title} className="section">
              <View className="section-title">{item.title}</View>
              {item.list.map((row, idx) => (
                <View
                  className={row.active ? "row active-label" : "row"}
                  key={row.label}
                  onClick={() => goDetail(row, index, idx)}
                >
                  <View>{row.label}</View>
                  {row.progress || (
                    <Image
                      mode="widthFix"
                      style="width:10px"
                      src={row.active ? nextIconWhite : nextIcon}
                    ></Image>
                  )}
                </View>
              ))}
            </View>
          ))}
        </View>
      )}
      <View className="gap"></View>
      <Footer></Footer>
      <Image
        className="bottom-img"
        src={botImg}
        mode="widthFix"
        style="width:100%;"
      ></Image>
    </View>
  );
};

export default Dashboard;
