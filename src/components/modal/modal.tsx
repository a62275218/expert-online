import { View, Image } from "@tarojs/components";
import Taro, { useState, useEffect } from "@tarojs/taro";

import "./modal.scss";

function Modal(props) {
  const [show, setShow] = useState(props.show);
  const [button] = useState(props.button);
  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  const handleClose = () => {
    props.onClose && props.onClose();
  };

  const Remainder = (
    <View style="flex:1;width:100%" onClick={() => handleClose()}></View>
  );
  return (
    <View>
      {show && (
        <View className="mask">
          {Remainder}
          <View className="modal">
            <View className="title">{props.title}</View>
            <Image
              mode="widthFix"
              src={props.img}
              className="center-img"
            ></Image>
            <View className="subtitle">{props.subtitle}</View>
            {button.map(item => (
              <View key={item.name} className="button" onClick={() => item.func()}>
                <Image className="icon-img" src={item.img}></Image>
                {item.name}
              </View>
            ))}
            <View className="bottom-txt" onClick={()=>props.bottom.func()}>{props.bottom.text}</View>
          </View>
          {Remainder}
        </View>
      )}
    </View>
  );
}

export default Modal;
