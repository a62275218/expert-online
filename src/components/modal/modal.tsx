import { View, Image } from '@tarojs/components'

import './modal.scss'

function Modal(props) {
    return (
        <View>
            {props.show && <View className='mask'>
                <View className='modal'>
                    <View className='title'>{props.title}</View>
                    <Image mode="widthFix" src={props.img} className='center-img'></Image>
                    <View className='subtitle'>{props.subtitle}</View>
                    <View className='button' style="margin:20px 0;">{props.button}</View>
                </View>
            </View>}
        </View>)
}

export default Modal