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
    setShow(false);
    props.onClose();
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
              <View key={item.name} className="button" style="margin:20px 0;" onClick={()=>item.func()}>{item.name}</View>
            ))}
          </View>
          {Remainder}
        </View>
      )}
    </View>
  );
}

export default Modal;
