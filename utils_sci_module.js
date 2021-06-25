function eqnformat(id) {
  //re-runs mathjax rendering on text with given id. Used in all sum functions.
  MathJax.Hub.Queue(["Typeset",MathJax.Hub, id]);
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