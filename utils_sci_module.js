function eqnformat(id) {
  //re-runs mathjax rendering on text with given id. Used in all sum functions.
  MathJax.Hub.Queue(["Typeset",MathJax.Hub, id]);
  if(id === "a") {
    document.getElementById("myCanvas2").style.visibility="visible";
    if(jetup || jetroll || space || pinjt) {
        //When 'soln' button is clicked, shows 'Show me how' button in vector catagory
        document.getElementById("btnShowhow").style.visibility="visible";
    } else {
        document.getElementById("btnShowhow").style.visibility="hidden";
    }
  }
}

function animsel() {
    //Triggered by 'Show me how' button. Chooses appropriate animation function in vectors catagory
    if(jetup) {
        animsolnclimb();
    } else if(jetroll) {
        animsolnroll()
    } else if(space) {
        animsolnspace();
    } else if(pinjt) {
        animsolnpin();
    }
}

function rndgen(lower, upper, dp, step, fix) {
    //Produces random numbers between limits, with set number of decimal places and selectable steps. Also,
    //decimal places can be fixed.
    //upper = largest num
    //lower = smallest num
    //dp = number of decimal places
    //step = steps between smallest digits ie if 2 dp and want in 0.02 steps, then 0.02
    //fix = number of dp's fixed. -1 if no trailing zeros wanted
    step = step * Math.pow(10, dp);
    if(fix === -1) {
      do {
        var tmp =  (Math.floor(Math.random() * ((upper * Math.pow(10, dp) / step) - 
            (lower * Math.pow(10, dp) / step) + 1) + (lower * Math.pow(10, dp) / step)) / 
            Math.pow(10, dp) * step);
      } while((tmp * Math.pow(10, dp)) % step !== 0) //Solves occasional float point maths error
      return tmp;
    } else {
      return (Math.floor(Math.random() * (upper * Math.pow(10, dp) / step - 
            lower * Math.pow(10, dp) / step + 1) + lower * Math.pow(10, dp) / step) / 
            Math.pow(10, dp) * step).toFixed(fix);
    }
}
  
function dp(sum, dp, fix) {
    //Rounds 'sum' to selected number of decimal places. Decimal places can be fixed.
    //sum = number to be rounded
    //dp = number of dec places
    //dp = number of dp's fixed. -1 if no trailing zeros wanted.
    if(fix === -1) {
      return Math.round((sum + Number.EPSILON) * Math.pow(10, dp)) / Math.pow(10, dp);
    } else {
      dp = fix + 2;
      return (Math.round((sum + Number.EPSILON) * Math.pow(10, dp)) / Math.pow(10, dp)).toFixed(fix);
    }
}

function fromsecs(t) {
    //Converts secs to mins and secs
    if(t < 120) {
      return Math.floor(t / 60) + " min " + t % 60 + " secs";
    } else {
      return Math.floor(t / 60) + " mins " + t % 60 + " secs";
    }
}
function thouSep(value, sep) {
    //Adds chosen 1 000's separator
    return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, sep);
}

function sglarr(context, stx, sty, up) {
      //Draws single headed arrow up or down from start point, with length 30
      var l, hdy;
      if(up) {
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

function dblarr(context, stx, sty, l, rt) {
    //Draws double headed arrow left or right from start point, with given length
    var hdx = 6;
    if(!rt) {
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

function drawline(c, stx, sty, endx, endy, linewidth, linecolour, dotted) {
    var amount = 0;
    var myVar = setInterval(draw, 30);
    function draw() {
        if(amount < 1) {
            amount = Math.min(amount + 0.05, 1);
        }
        c.beginPath();
        c.strokeStyle = linecolour;
        c.lineWidth = linewidth;
        if(dotted) {
          c.setLineDash([7, 5]);
        }
        c.moveTo(stx, sty);
        c.lineTo(stx + (endx - stx) * amount, sty + (endy - sty) * amount);
        c.stroke();
        c.setLineDash([]);
    }
    setTimeout(function() {clearInterval(myVar)}, 1000);
}

function drawarc(c, ctrx, ctry, radius, stang, endang, dir) {
    var amount = 0;
    var myVar = setInterval(draw, 30);
    function draw() {
        if(endang > 0 && stang + amount < endang) {
            amount = Math.min(amount + Math.PI / 90, endang);
        } else if(endang < 0 && stang + amount > endang) {
            amount = Math.max(amount - Math.PI / 90, endang);
        }
        c.beginPath();
        c.strokeStyle = "red";
        c.arc(ctrx, ctry, radius, stang, stang + amount, dir);
        c.stroke();
    }
    setTimeout(function() {clearInterval(myVar)}, 1000);
}

function arrhead(c, ptx, pty, ang, linewidth, linecolour) {
    var stx = ptx - 11.662 * Math.cos((ang + 30.964) * (Math.PI / 180));
    var sty = pty - 11.662 * Math.sin((ang + 30.964) * (Math.PI / 180));
    var endx = ptx - 11.662 * Math.cos ((ang - 30.964) * (Math.PI / 180));
    var endy = pty - 11.662 * Math.sin((ang - 30.964) * (Math.PI / 180));
    c.beginPath();
    c.strokeStyle = linecolour;
    c.lineWidth = linewidth;
    c.moveTo(stx, sty);
    c.lineTo(ptx, pty);
    c.lineTo(endx, endy);
    c.stroke();
}