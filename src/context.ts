import Taro from '@tarojs/taro'

export let state = {
    user:null,
    course:null,
    unit:null,
    quiz:null
}

export default Taro.createContext(state);
