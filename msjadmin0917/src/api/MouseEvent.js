//文字超出部分显示...鼠标经过浮层显示全部文字
const mouseover = ($event) => {
  let dom = $event.target,//获取当前容器
    style = window.getComputedStyle ? window.getComputedStyle(dom, '') : dom.currentStyle,//获取当前容器的样式 如果没有创建一个样式
    width = dom.clientWidth,//容器宽度
    paddingRight = style.paddingRight,//右padding
    paddingLeft = style.paddingLeft,//左padding
    marginLeft = style.marginLeft,//左margin
    marginRight = style.marginRight,//左margin
    boxWidth = width - parseInt(paddingRight) - parseInt(paddingLeft) - parseInt(marginLeft) - parseInt(marginRight),//计算容器的大小（有效存放大小）
    fontSize = style.fontSize,//获取字体大小
    text = dom.innerHTML,
    span = document.createElement("span"),
    left = $event.clientX,
    top = $event.clientY;
  span.style.cssText = `height:0;overflow:hidden;`;
  span.style.fontSize = fontSize;
  span.setAttribute('id', 'span');
  document.body.appendChild(span);
  document.querySelector('#span').innerHTML = text;
  let spanWidth = span.offsetWidth;
  document.body.removeChild(span);

  if (spanWidth > boxWidth) {
    let bgObj = document.createElement("div");
    bgObj.style.cssText = `position:absolute;top:${top + 10}px;left:${left}px;color:#fff;background:#333;max-width:400px;border-radius:5px;padding:10px;display:inline-block;font-size:14px;z-index:9999`;
    bgObj.setAttribute('id', 'bgObj');
    document.body.appendChild(bgObj);
    document.querySelector('#bgObj').innerHTML = text.replace('：', '');
  }

}
//鼠标移出浮层消失
const mouseout = ($event) => {
  let bgObj = document.querySelector('#bgObj');
  if (bgObj) {
    document.body.removeChild(bgObj);
  }
}
//鼠标移动浮层移动
const mousemove = ($event) => {
  let left = $event.clientX,
    top = $event.clientY,
    bgObj = document.querySelector('#bgObj');
  if (bgObj) {
    bgObj.style.top = (top + 10) + 'px',
      bgObj.style.left = left + 'px';
  }
}

export default {
  mouseover,
  mouseout,
  mousemove
}
// import MouseEvent from "../../api/MouseEvent";
// @mouseover="mouseover" @mouseout="mouseout" @mousemove="mousemove"

// mouseover(e) {
//   MouseEvent.mouseover(e);
// },
// mouseout(e) {
//   MouseEvent.mouseout(e);
// },
// mousemove(e) {
//   MouseEvent.mousemove(e);
// },
