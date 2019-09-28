import Taro from '@tarojs/taro-rn';
import React from 'react';
import { View, Text } from "@tarojs/components-rn";
import footerStyleSheet from "./footer_styles";
var _styleSheet = footerStyleSheet;

function _getClassName() {
  var className = [];
  var args = arguments[0];
  var type = Object.prototype.toString.call(args).slice(8, -1).toLowerCase();

  if (type === 'string') {
    args = args.trim();
    args && className.push(args);
  } else if (type === 'array') {
    args.forEach(function (cls) {
      cls = _getClassName(cls).trim();
      cls && className.push(cls);
    });
  } else if (type === 'object') {
    for (var k in args) {
      k = k.trim();

      if (k && args.hasOwnProperty(k) && args[k]) {
        className.push(k);
      }
    }
  }

  return className.join(' ').trim();
}

function _getStyle(classNameExpression) {
  var className = _getClassName(classNameExpression);

  var classNameArr = className.split(/\s+/);
  var style = [];

  if (classNameArr.length === 1) {
    style.push(_styleSheet[classNameArr[0].trim()]);
  } else {
    classNameArr.forEach(function (cls) {
      style.push(_styleSheet[cls.trim()]);
    });
  }

  return style;
}

let Footer = class Footer extends Taro.Component {
  render() {
    const props = this.props;

    return <View style={_getStyle(props.fixed ? "wrapper fixed" : 'wrapper')}>
        <View>©️ Copyright 2008-2019 Expert Online Training.</View>
        <View>All rights reserved</View>
        <View style="margin-top:8px;">Powered by <Text style={_styleSheet["emphasis"]}>Weboost</Text></View>
    </View>;
  }

};

export default Footer;