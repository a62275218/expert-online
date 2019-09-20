import { View, Text } from '@tarojs/components'

import './footer.scss'

function Footer(){
    return (<View className="wrapper">
        <View>©️ Copyright 2008-2019 Expert Online Training.</View>
        <View>All rights reserved</View>
        <View style="margin-top:8px;">Powered by <Text className="emphasis">Weboost</Text></View>
    </View>)
}

export default Footer