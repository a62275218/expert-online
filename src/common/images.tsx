const imgMap = {
    topImg:"../../images/B-6-BG.png",
    titleImg:"../../images/EOT-Clear.png",
    eyeImg:"../../images/EYE-ICON.png",
    eyeImgClose:"../../images/EYE-ICON-CLOSE.png",
    iconAccount:'../../images/icon_Account.png',
    botImg:'../../images/C-BG2.png',
  }
  
export default function(key){
  console.log(key)
  return require(imgMap[key])
}