import Taro from '@tarojs/taro'

export const reducer = (state, action) => {
    switch (action.type) {
        case 'CHANGENAME':
            return Object.assign(state, { user: { name: '刘琳' } })
        default:
            return state
    }
}

export const globalState = {
    user: {
        name: '林榕',
        email: 'linrong123@qq.comn'
    },
    changeUserName:()=>{
        console.log(globalState)
        globalState.user.name = '刘琳'
    }
}

export default Taro.createContext(globalState);