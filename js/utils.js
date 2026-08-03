// js/utils.js - Shared utilities for Science Revision App

export function countDecimals(value) {
  if (Math.floor(value) !== value) {
    return value.toString().split('.')[1].length || 0;
  }
  return 0;
}

export function rndgen(lower, upper, dp, step, fix) {
  step = step * Math.pow(10, dp);
  if (fix === -1) {
    let tmp;
    do {
      tmp =
        (Math.floor(
          Math.random() *
            ((upper * Math.pow(10, dp)) / step - (lower * Math.pow(10, dp)) / step + 1) +
            (lower * Math.pow(10, dp)) / step
        ) /
          Math.pow(10, dp)) *
        step;
    } while (countDecimals(tmp) > dp);
    return tmp;
  }
  return (
    (Math.floor(
      Math.random() *
        ((upper * Math.pow(10, dp)) / step - (lower * Math.pow(10, dp)) / step + 1) +
        (lower * Math.pow(10, dp)) / step
    ) /
      Math.pow(10, dp)) *
    step
  ).toFixed(fix);
}

export function dp(num, scale, fix) {
  if (!('' + num).includes('e')) {
    const rounded = +(Math.round(num + 'e+' + scale) + 'e-' + scale);
    return fix === -1 ? rounded : rounded.toFixed(fix);
  }
  const arr = ('' + num).split('e');
  const sig = +arr[1] + scale > 0 ? '+' : '';
  const rounded = +(Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) + 'e-' + scale);
  return fix === -1 ? rounded : rounded.toFixed(fix);
}

export function thouSep(value, sep) {
  return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, sep);
}

export function fromsecs(t) {
  const hrs = Math.floor(t / 3600);
  const mins = Math.floor((t % 3600) / 60);
  const secs = t % 60;
  return { hrs, mins, secs };
}

export function QLimitRepeats(arr, x) {
  let sum;
  do {
    sum = rndgen(1, x, 0, 1, -1);
  } while (arr.includes(sum));
  arr.push(sum);
  if (arr.length > Math.ceil(x / 2)) {
    arr.shift();
  }
  return arr;
}

export function eqnformat(id) {
  if (window.MathJax && MathJax.Hub) {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, id]);
  }
}

export function sglarr(context, stx, sty, up) {
  // Draws single-headed arrow up or down from start point, length 30
  let l, hdy;
  if (up) {
    l = -30;
    hdy = 6;
  } else {
    l = 30;
    hdy = -6;
  }
  context.beginPath();
  context.moveTo(stx, sty);
  context.lineTo(stx, sty + l);
  context.moveTo(stx - 4, sty + l + hdy);
  context.lineTo(stx, sty + l);
  context.lineTo(stx + 4, sty + l + hdy);
  context.stroke();
}

export function dblarr(context, stx, sty, l, rt) {
  let hdx = 6;
  if (!rt) {
    l = l * -1;
    hdx = hdx * -1;
  }
  context.beginPath();
  context.moveTo(stx, sty);
  context.lineTo(stx + l, sty);
  context.moveTo(stx + hdx, sty - 4);
  context.lineTo(stx, sty);
  context.lineTo(stx + hdx, sty + 4);
  context.moveTo(stx + l - hdx, sty - 4);
  context.lineTo(stx + l, sty);
  context.lineTo(stx + l - hdx, sty + 4);
  context.stroke();
}

export function drawline(c, stx, sty, endx, endy, linewidth, linecolour, dotted) {
  let amount = 0;
  const myVar = setInterval(draw, 30);
  function draw() {
    if (amount < 1) {
      amount = Math.min(amount + 0.05, 1);
    }
    c.beginPath();
    c.strokeStyle = linecolour;
    c.lineWidth = linewidth;
    if (dotted) {
      c.setLineDash([7, 5]);
    }
    c.moveTo(stx, sty);
    c.lineTo(stx + (endx - stx) * amount, sty + (endy - sty) * amount);
    c.stroke();
    c.setLineDash([]);
  }
  setTimeout(function () {
    clearInterval(myVar);
  }, 1000);
}

export function drawarc(c, ctrx, ctry, radius, stang, endang, dir) {
  let amount = 0;
  const myVar = setInterval(draw, 30);
  function draw() {
    if (endang > 0 && stang + amount < endang) {
      amount = Math.min(amount + Math.PI / 90, endang);
    } else if (endang < 0 && stang + amount > endang) {
      amount = Math.max(amount - Math.PI / 90, endang);
    }
    c.beginPath();
    c.strokeStyle = 'red';
    c.arc(ctrx, ctry, radius, stang, stang + amount, dir);
    c.stroke();
  }
  setTimeout(function () {
    clearInterval(myVar);
  }, 1000);
}

export function arrhead(c, ptx, pty, ang, linewidth, linecolour) {
  const stx = ptx - 11.662 * Math.cos((ang + 30.964) * (Math.PI / 180));
  const sty = pty - 11.662 * Math.sin((ang + 30.964) * (Math.PI / 180));
  const endx = ptx - 11.662 * Math.cos((ang - 30.964) * (Math.PI / 180));
  const endy = pty - 11.662 * Math.sin((ang - 30.964) * (Math.PI / 180));
  c.beginPath();
  c.strokeStyle = linecolour;
  c.lineWidth = linewidth;
  c.moveTo(stx, sty);
  c.lineTo(ptx, pty);
  c.lineTo(endx, endy);
  c.stroke();
}

export function isCanvasBlank(canvas) {
  return !canvas
    .getContext('2d')
    .getImageData(0, 0, canvas.width, canvas.height)
    .data.some((channel) => channel !== 0);
}

// Image preloading
const imageSources = ['images/cofg.png', 'images/pinjoint.png', 'images/Cosbadge.png'];

export const images = {};

export function loadImages() {
  imageSources.forEach((src) => {
    const name = src.split('/').pop().replace('.png', '');
    const img = new Image();
    img.src = src;
    images[name] = img;
});
}
