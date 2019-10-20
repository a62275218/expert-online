import { View, Image } from "@tarojs/components";
import Taro, { useState, useEffect } from "@tarojs/taro";

import "./modal.scss";

function Modal(props) {
  const [show, setShow] = useState(props.show);
  const [button, setBtn] = useState(props.button);
  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  const handleClose = () => {
    props.onClose && props.onClose();
  };

  const Remainder = (
    <View style="flex:1;width:100%" onClick={() => handleClose()}></View>
  );
  const handleClick = (idx, func) => {
    if (button.length > 1) {
      setBtn(btn => {
        btn.forEach(item => {
          item.active = false
        })
        btn[idx].active = true
        return btn
      })
      func()
    } else {
      func()
    }
  }
  return (
    <View style="height:100%;">
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
            <View className="subtitle warn">{props.warntitle}</View>
            {props.extratitle &&<View className="subtitle extra">{props.extratitle}</View>}
            {button.map((item, idx) => (
              <View key={item.name} className={!item.active && button.length > 1 ? "button white-btn" : "button"} onClick={() => handleClick(idx, item.func)}>
                <Image className="icon-img" src={item.active ? item.activeImg : item.img}></Image>
                {item.name}
              </View>
            ))}
            <View className="bottom-txt" onClick={() => props.bottom.func()}>{props.bottom.text}<Image className="bot-img" src={props.bottom.img}></Image></View>
          </View>
          {Remainder}
        </View>
      )}
    </View>
  );
}

export default Modal;
