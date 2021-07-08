var prevsum = 0, prev2sum = 0;
function momentcofg() {
    var sum;
    sumq = "";
    suma = "";
    document.getElementById("a").innerHTML = "";
    document.getElementById("noteslink").style.visibility="visible";
    do {
        sum = rndgen(1, 6, 0, 1, -1); //CofG (case 1) to Moments (cases 2 - 6) Q's ratio 1:5
    } while(sum === prevsum || sum === prev2sum)
    prev2sum = prevsum;
    prevsum = sum;
    switch(sum) {
        case 1:
            var jtr, ra, rb, rc, a, b, c, x;
            document.getElementById("noteslink").onclick = function() {
                window.open("images/Sci Bk2 Statics v1.10.pdf#page=39", "_blank")
            }
            jtr = rndgen(0, 1.9, 1, 0.1, -1);
            ra = rndgen(5000, 70000, 0, 100, -1);
            rb = ra * 5;
            rc = rb;
            a = dp(ra * (24.6 * Math.pow(10, -6)) + 1.887, 1, -1);
            b = dp(a * 5.867 - 1.887 + jtr, 1, -1);
            c = b;
            x = dp((ra * a + 2 * rb * b) / (ra + 2 * rb), 1, -1);
            sumq += "An aircraft is weighed and the load cell readings together with distances from datum to the undercarriage centres are as follows:<BR>";
            sumq += "R<sub>A</sub> = " + ra / 1000 + " kN,   R<sub>B</sub> = " + rb / 1000 + " kN,   a = " + a + " m,   b = " + b + " m<BR>";
            sumq += "Find the centre of gravity position for the aircraft, rounding your answer to 1 decimal place.";
            document.getElementById("myCanvas");
            myCanvas.height = 315;
            myCanvas.width = 625;
            var ctx = myCanvas.getContext('2d');
            var img = document.getElementById("cofg");
            ctx.drawImage(img, 20, 25, 600, 312);
            suma += "<br>".repeat(13);
            suma += "$$\\begin{aligned}\\bar{x}&=\\frac{R_A\\times a+ R_B\\times b+ R_C\\times c}{R_A + R_B + R_C}\\\\[5pt]";
            suma += "&=\\frac{" + (ra / 1000) + "\\times10^3 \\times" + a + "+" + (rb / 1000) + 
                    "\\times10^3 \\times" + b + "+" + (rc / 1000) + "\\times10^3 \\times" + c + "}{" + (ra / 1000) + 
                    "\\times10^3 +" + (rb / 1000) + "\\times10^3 +" + (rc / 1000) + "\\times10^3}\\\\[5pt]";
            suma += "&=" + dp(x, 3, 1) + "\\ m\\ (1\\ dp)\\end{aligned}$$";
            break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
            var left, findf, length, pivot, f1, f2, f3, d1, d2, d3, pivotx, f1x, f2x, f3x;
            document.getElementById("noteslink").onclick = function() {
                window.open("images/Sci Bk2 Statics v1.10.pdf#page=24", "_blank")
            }
            left = 40;
            do {
                length = rndgen(5, 20, 1, 0.5, -1);
                pivot = rndgen(2, length - 3, 1, 0.5, -1);
                f1 = rndgen(5, 50, 1, 0.5, -1);
                do {
                    f2 = rndgen(5, 50, 1, 0.5, -1);
                } while(f2 === f1)
                if(pivot < (length / 2)) {  //Pivot left half so, from left, f1 up, pivot, f2 up, f3 down
                    d1 = rndgen(1, pivot, 1, 0.5, -1);
                    d2 = rndgen(1, length - pivot, 1, 0.5, -1);
                    do {
                        d3 = rndgen(1, length - pivot, 1, 0.5, -1);
                    } while(d3 === d2)
                    f3 = dp((f2 * d2 - f1 * d1) / d3, 3, -1);
                } else {    //Pivot in right half so, from left, f1 up, f3 down, pivot, f2 up
                    d1 = rndgen(1, pivot, 1, 0.5, -1);
                    do {
                        d2 = rndgen(1, length - pivot, 1, 0.5, -1);
                    } while(d2 === d1)
                    d3 = rndgen(1, pivot, 1, 0.5, -1);
                    f3 = dp((f1 * d1 - f2 * d2) / d3, 3, -1);
                }
            } while(f3 <= 0 || f3 / dp(f3, 1, -1) !== 1 || f1 === 0 || f2 === 0 || d1 === 0 || d2 === 0 || d3 === 0 ||
                    Math.abs(d1 - d2) <= 1 || Math.abs(d2 - d3) <= 1 || Math.abs(d1 - d3) <= 1)
                    //Ensures f3 +ve & max 1 dp, no forces or distance = 0 and all atleast 1.5 m apart
            document.getElementById("myCanvas");
            myCanvas.height = 315;
            myCanvas.width = 500;
            var ctx = myCanvas.getContext('2d');

            pivotx = left + 400 * pivot / length;
            f1x = left + (400 * ((pivot - d1) / length));
            f2x = left + (400 * ((pivot + d2) / length));
            if(pivot < (length / 2)) {
                f3x = left + (400 * ((pivot + d3) / length));
            } else {
                f3x = left + (400 * ((pivot - d3) / length));
            }
            ctx.lineWidth = 3; //Draw beam & pivot with thicker line than arrows
            ctx.strokeRect(left, 100, 400, 25); //Beam
            ctx.arc(pivotx, 112.5, 5, 0, 2 * Math.PI); //Pivot
            ctx.fill();
            
            ctx.lineWidth = 1;
            ctx.font = "15px Comic Sans MS";
            ctx.textAlign = "center";
            sglarr(ctx, f1x, 100, true); //f1 up arrow
            sglarr(ctx, f2x, 100, true); //f2 up arrow
            sglarr(ctx, f3x, 125, false); //f3 arrow
            if(pivot < (length / 2)) {
                dblarr(ctx, f1x, 40, pivotx - f1x, true); //d1 arrow
                ctx.fillText(d1 + " m", f1x +  (pivotx - f1x) / 2, 100 - 70); //d1 text
                if(f2x < f3x) {
                    dblarr(ctx, f2x, 40, f2x - pivotx, false); //d2 arrow
                    dblarr(ctx,f2x, 185, f3x - f2x, true); //d3 arrow
                    ctx.fillText(d2 + " m", pivotx + (f2x - pivotx) / 2, 100 - 70); //d2 text
                    ctx.fillText(d3 - d2 + " m", f2x + (f3x - f2x) / 2, 100 + 105); //d3 text
                } else {
                    dblarr(ctx, f3x, 185, f3x - pivotx, false); //d3 arrow
                    dblarr(ctx, f3x, 40, f2x - f3x, true); //d2 arrow
                    ctx.fillText(d3 + " m", pivotx + (f3x - pivotx) / 2, 100 + 105); //d3 text
                    ctx.fillText(d2 - d3 + " m", f3x + (f2x - f3x) / 2, 100 - 70); //d2 text
                } 
            } else {
                dblarr(ctx, f2x, 40, f2x - pivotx, false); //d2 arrow
                ctx.fillText(d2 + " m", pivotx +  (f2x - pivotx) / 2, 100 - 70); //d2 text
                if(f1x < f3x) {
                    dblarr(ctx, f1x, 40, f3x - f1x, true); //d1 arrow
                    dblarr(ctx, f3x, 185, pivotx - f3x, true); //d3 arrow
                    ctx.fillText(d3 + " m", f3x + (pivotx - f3x) / 2, 100 + 105); //d3 text
                    ctx.fillText(d1 - d3 + " m", f1x + (f3x - f1x) / 2, 100 - 70); //d1 text
                } else {
                    dblarr(ctx, f3x, 185, f1x - f3x, true); //d3  arrow
                    dblarr(ctx, f1x, 40, pivotx - f1x, true); //d1 arrow
                    ctx.fillText(d1 + " m", f1x + (pivotx - f1x) / 2, 100 - 70); //d1 text
                    ctx.fillText(d3 - d1 + " m", f3x + (f1x - f3x) / 2, 100 + 105); //d3 text
                }
            }
            suma += "<br>".repeat(8);
            findf = rndgen(1, 3, 0, 1, -1);
            switch(findf) {
                case 1:
                    sumq += "Find the force, F<sub>1</sub> required to put the beam in equilibrium. " + 
                            "The pivot point is shown as \u2B24";
                    ctx.fillText("F\u2081", f1x, 100 - 35); //f1 text
                    ctx.fillText("F\u2082 " + f2 + " N", f2x, 100 - 35); //f2 text
                    ctx.fillText("F\u2083 " + f3 + " N", f3x, 100 + 70); ///f3 text
                    if(pivot < (length / 2)) {
                        suma += "$$\\begin{aligned}Clockwise\\ moments&=Anti{\\text -}clockwise\\ moments\\\\[5pt]";
                        suma += "F_1 d_1 +F_3 d_3 &=F_2 d_2\\\\[5pt]";
                        suma += "F_1 d_1 &=F_2 d_2 -F_3 d_3\\\\[5pt]";
                        suma += "F_1 &=\\frac{F_2 d_2 -F_3 d_3}{d_1}\\\\[5pt]";
                        suma += "&=\\frac{" + f2 + "\\times" + d2 + "-" + f3 + "\\times" + d3 + "}{" + d1 + "}\\\\[5pt]";
                        suma += "&=\\underline{\\mathbf{" + f1 + "\\ N}}\\end{aligned}$$";
                    } else {
                        suma += "$$\\begin{aligned}Clockwise\\ moments&=Anti{\\text -}clockwise\\ moments\\\\[5pt]";
                        suma += "F_1 d_1&=F_2 d_2 +F_3 d_3\\\\[5pt]";
                        suma += "F_1&=\\frac{F_2 d_2 +F_3 d_3}{d_1}\\\\[5pt]";
                        suma += "&=\\frac{" + f2 + "\\times" + d2 + "+" + f3 + "\\times" + d3 + "}{" + d1 + "}\\\\[5pt]";
                        suma += "&=\\underline{\\mathbf{" + f1 + "\\ N}}\\end{aligned}$$";
                    }
                    break;
                case 2:
                    sumq += "Find the force, F<sub>2</sub> required to put the beam in equilibrium. " + 
                            "The pivot point is shown as \u2B24";
                    ctx.fillText("F\u2081 " + f1 + " N", f1x, 100 - 35); //f1 text
                    ctx.fillText("F\u2082", f2x, 100 - 35); //f2 text
                    ctx.fillText("F\u2083 " + f3 + " N", f3x, 100 + 70); ///f3 text
                    if(pivot < (length / 2)) {
                        suma += "$$\\begin{aligned}Anti{\\text -}clockwise\\ moments&=Clockwise\\ moments\\\\[5pt]";
                        suma += "F_2 d_2&=F_1 d_1 +F_3 d_3\\\\[5pt]";
                        suma += "F_2&=\\frac{F_1 d_1 +F_3 d_3}{d_2}\\\\[5pt]";
                        suma += "&=\\frac{" + f1 + "\\times" + d1 + "+" + f3 + "\\times" + d3 + "}{" + d2 + "}\\\\[5pt]";
                        suma += "&=\\underline{\\mathbf{" + f2 + "\\ N}}\\end{aligned}$$";
                    } else {
                        suma += "$$\\begin{aligned}Anti{\\text -}clockwise\\ moments&=Clockwise\\ moments\\\\[5pt]";
                        suma += "F_2 d_2 +F_3 d_3&=F_1 d_1\\\\[5pt]";
                        suma += "F_2 d_2&=F_1 d_1 -F_3 d_3\\\\[5pt]";
                        suma += "F_2&=\\frac{F_1 d_1 -F_3 d_3}{d_2}\\\\[5pt]";
                        suma += "&=\\frac{" + f1 + "\\times" + d1 + "-" + f3 + "\\times" + d3 + "}{" + d2 + "}\\\\[5pt]";
                        suma += "&=\\underline{\\mathbf{" + f2 + "\\ N}}\\end{aligned}$$";
                    }
                    break;
                case 3:
                    sumq += "Find the force, F<sub>3</sub> required to put the beam in equilibrium. " + 
                            "The pivot point is shown as \u2B24";
                    ctx.fillText("F\u2081 " + f1 + " N", f1x, 100 - 35); //f1 text
                    ctx.fillText("F\u2082 " + f2 + " N", f2x, 100 - 35); //f2 text
                    ctx.fillText("F\u2083", f3x, 100 + 70); ///f3 text
                    if(pivot < (length / 2)) {
                        suma += "$$\\begin{aligned}Clockwise\\ moments&=Anti{\\text -}clockwise\\ moments\\\\[5pt]";
                        suma += "F_1 d_1 +F_3 d_3 &=F_2 d_2\\\\[5pt]";
                        suma += "F_3 d_3 &=F_2 d_2 -F_1 d_1\\\\[5pt]";
                        suma += "F_3 &=\\frac{F_2 d_2 -F_1 d_1}{d_3}\\\\[5pt]";
                        suma += "&=\\frac{" + f2 + "\\times" + d2 + "-" + f1 + "\\times" + d1 + "}{" + d3 + "}\\\\[5pt]";
                        suma += "&=\\underline{\\mathbf{" + f3 + "\\ N}}\\end{aligned}$$";
                    } else {
                        suma += "$$\\begin{aligned}Anti{\\text -}clockwise\\ moments&=Clockwise\\ moments\\\\[5pt]";
                        suma += "F_2 d_2 +F_3 d_3 &= F_1 d_1\\\\[5pt]";
                        suma += "F_3 d_3 &=F_1 d_1 -F_2 d_2\\\\[5pt]";
                        suma += "F_3 &=\\frac{F_1 d_1 -F_2 d_2 }{d_3}\\\\[5pt]";
                        suma += "&=\\frac{" + f1 + "\\times" + d1 + "-" + f2 + "\\times" + d2 + "}{" + d3 + "}\\\\[5pt]";
                        suma += "&=\\underline{\\mathbf{" + f3 + "\\ N}}\\end{aligned}$$";
                    }
                    break;
            }
            break;
    }
    document.getElementById("q").innerHTML = sumq;
    document.getElementById("btnSoln").style.visibility="visible";
}
