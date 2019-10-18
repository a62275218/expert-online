import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'

import './footer.scss'

function Footer(props){
    const goWeb=()=>{
        Taro.navigateTo({
            url:"/pages/webview/webview?link=http://info.weboostapp.com/&title=WeBoost"
        })
    }
    return (<View className={props.fixed?"wrapper fixed":'wrapper'} onClick={()=>goWeb()}>
        <View>© Copyright 2008-2019 Expert Online Training.</View>
        <View>All rights reserved</View>
        <View style="margin-top:8px;">Powered by <Text className="emphasis">Weboost</Text></View>
    </View>)
}

export default Footer