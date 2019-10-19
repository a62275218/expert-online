import { WebView } from '@tarojs/components'
import Taro,{useRouter,useDidShow,useState} from '@tarojs/taro'

import './webview.scss'

export default ()=>{
    const router = useRouter()
    const [link,setLink] = useState(Taro.getStorageSync('link') || router.params.link)
    Taro.setNavigationBarTitle({
        title:router.params.title
    })
    useDidShow(()=>{
        setLink(Taro.getStorageSync('link'))
    })
    return (
        <WebView src={link}></WebView>
    )
}