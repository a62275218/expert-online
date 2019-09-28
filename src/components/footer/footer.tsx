import { View, Text } from '@tarojs/components'

import './footer.scss'

function Footer(props){
    return (<View className={props.fixed?"wrapper fixed":'wrapper'}>
        <View>© Copyright 2008-2019 Expert Online Training.</View>
        <View>All rights reserved</View>
        <View style="margin-top:8px;">Powered by <Text className="emphasis">Weboost</Text></View>
    </View>)
}

export default Footer