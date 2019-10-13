import { WebView } from '@tarojs/components'
import Taro from '@tarojs/taro'

import './webview.scss'

export default ()=>{
    Taro.setNavigationBarTitle({
        title:'Expert Online Training'
    })
    return (
        <WebView src="https://www.expertonlinetraining.com/"></WebView>
    )
}