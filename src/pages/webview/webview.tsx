import { WebView } from '@tarojs/components'
import Taro,{useRouter} from '@tarojs/taro'

import './webview.scss'

export default ()=>{
    const router = useRouter()
    console.log(router.params)
    Taro.setNavigationBarTitle({
        title:router.params.title
    })
    return (
        <WebView src={router.params.link}></WebView>
    )
}