var prevsum = 0, prev2sum = 0, p1, p2, v1, v2, t1, t2, h, hman, hbar, rho, rhoman, rhobar, rho1, rho2, g;
var patmos, pabs, pgauge, F, a, rhofresh, rhosea;
function pressure() {
    var sum;
    jetup = false;
    jetroll = false;
    space = false;
    pinjt = false;
    document.getElementById("btnShowhow").style.visibility="hidden";
    document.getElementById("myCanvas");
    myCanvas.height = "0.5";
    myCanvas.width = "0.5";
    myCanvas.style = "border: none;";
    document.getElementById("myCanvas2");
    myCanvas2.height = "0.5";
    myCanvas2.width = "0.5";
    myCanvas2.style = "border: none;";
    sumq = "";
    suma = "";
    document.getElementById("a").innerHTML = "";
    document.getElementById("noteslink").style.visibility="visible";
    document.getElementById("noteslink").onclick = function() {
        window.open("images/Sci Bk2 Statics v1.10.pdf#page=49", "_blank")
    }
    do {
        sum = rndgen(1, 15, 0, 1, -1);
    } while(sum === prevsum || sum === prev2sum)
    prev2sum = prevsum;
    prevsum = sum;
    switch(sum) {
        case 1:
            v1 = rndgen(2.5, 7, 1, 0.1, -1);
            p1 = rndgen(80, 200, 0, 1, -1);
            v2 = rndgen(v1 + 1.5, 12, 1, 0.1, -1);
            sumq += "If " + v1 + "&nbsp;m" + "<sup>3</sup> " + " of gas at a pressure of " + p1 + 
                    "&nbsp;kN/m" + "<sup>2</sup> is expanded to " + v2 + "&nbsp;m<sup>3</sup>" + 
                    " at a constant temperature, calculate the new pressure in kN/m<sup>2</sup> to 2 decimal places.";
            suma += "\\(V_1=" + v1 + "\\ m^3\\\\\\)";
            suma += "\\(P_1=" + p1 + "\\times10^3\\ N/m^2\\\\\\)";
            suma += "\\(V_2=" + v2 + "\\ m^3\\\\\\)";
            suma += "\\(P_2=\\ ?\\ N/m^2\\\\\\)";
            suma += "$$\\begin{aligned}P_1 V_1 &= P_2 V_2\\qquad\\qquad\\qquad " + 
                    "Note:\\ temp\\ remains\\ constant.\\\\[5pt]";
            suma += "P_2&=\\frac{P_1 V_1}{V_2}=\\frac{" + p1 + "\\times10^3\\times" + v1 + "}{" + v2 + 
                    "}=\\underline{\\mathbf{" + dp((p1 * v1) / v2, 3, 2) + "\\ kN/m^2\\ (2\\ dp)}}\\end{aligned}$$";
            break;
        case 2:
            t1 = rndgen(20, 59, 0, 1, -1);
            v1 = rndgen(300000, 600000, 0, 1, -1);
            t2 = rndgen(t1 + 15, 75, 0, 1, -1);
            sumq += "Gas at a temperature of " + t1 + "&nbsp;<sup>O</sup>C, and having a volume of " + 
                    thouSep(v1, " ") + "&nbsp;cm<sup>3</sup>, is heated to " + t2 + 
                    "&nbsp;<sup>O</sup>C. If the pressure remains constant, calculate its new volume, " + 
                    "in m<sup>3</sup> to 2 decimal places.";
            suma += "\\(T_1=" + t1 + "+273.15=" + dp(t1 + 273.15, 2, -1) + "\\ K\\\\\\)";
            suma += "\\(V_1=" + thouSep(v1, "\\ ") + "\\times10^{-6}\\ m^3\\\\\\)";
            suma += "\\(T_2=" + t2 + "+273.15=" + dp(t2 + 273.15, 2, -1) + "\\ K\\\\\\)";
            suma += "\\(V_2=\\ ?\\ m^3\\\\\\)";
            suma += "$$\\begin{aligned}\\frac{V_1}{T_1}&=\\frac{V_2}{T_2}\\qquad\\qquad " + 
                    "Note:\\ pressure\\ remains\\ constant.\\\\[5pt]";
            suma += "V_2&=\\frac{V_1 T_2}{T_1}=\\frac{" + thouSep(v1, "\\ ") + "\\times10^{-6}\\times" + 
                    dp(t2 + 273.15, 2, -1) + "}{" + dp(t1 + 273.15, 2, -1) + "}=\\underline{\\mathbf{" + 
                    dp((v1 * Math.pow(10, -6) * dp(t2 + 273.15, 2, -1)) / dp(t1 + 273.15, 2, -1), 3, 2) + "\\ m^3\\ (2\\ dp)}}\\end{aligned}$$";
            break;
        case 3:
            p1 = rndgen(200, 500, 0, 1, -1);
            t1 = rndgen(10, 30, 0, 1, -1);
            v1 = rndgen(0.3, 0.5, 2, 0.01, -1);
            p2 = rndgen(p1 + 100, 900, 0, 1, -1);
            t2 = rndgen(t1 + 40, 150, 0, 1, -1);
            sumq += "A quantity of gas has a volume of " + v1 + "&nbsp;m<sup>3</sup> at a pressure of " + p1 + 
                        "&nbsp;mbar and a temperature of " + t1 + 
                        "&nbsp;<sup>O</sup>C. The gas is compressed until the pressure and temperature are " + p2 + 
                        "&nbsp;mbar and " + t2 + "&nbsp;<sup>O</sup>C respectively. If there is no loss of gas, " + 
                        "calculate the new volume to an accuracy of 3 decimal places.";
            suma += "\\(V_1=" + v1 + "\\ m^3\\\\\\)";
            suma += "\\(P_1=" + p1 + "\\ mbar\\\\\\)";
            suma += "\\(T_1=" + t1 + "+273.15=" + dp(t1 + 273.15, 2, -1) + "\\ K\\\\\\)";
            suma += "\\(P_2=" + p2 + "\\ mbar\\\\\\)";
            suma += "\\(T_2=" + t2 + "+273.15=" + dp(t2 + 273.15, 2, -1) + "\\ K\\\\\\)";
            suma += "\\(V_2=\\ ?\\ m^3\\\\\\)";
            suma += "$$\\begin{aligned}\\frac{P_1 V_1}{T_1}&=\\frac{P_2 V_2}{T_2}\\\\[5pt]";
            suma += "V_2&=\\frac{P_1 V_1 T_2}{T_1 P_2}=\\frac{" + p1 + "\\times" + v1 + 
                    "\\times" + dp(t2 + 273.15, 2, -1) + "}{" + dp(t1 + 273.15, 2, -1) + "\\times" + p2 + 
                    "}=\\underline{\\mathbf{" + 
                    dp((p1 * v1 * dp(t2 + 273.15, 2, -1)) / (dp(t1 + 273.15, 2, -1) * p2), 4, 3) + 
                    "\\ m^3\\ (3\\ dp)}}\\end{aligned}$$";
            break;
        case 4:
            p1 = rndgen(500, 800, 0, 1, -1);
            t1 = rndgen(12, 20, 0, 1, -1);
            v2 = rndgen(35, 45, 1, 0.1, -1);
            p2 = rndgen(2000, 3000, 0, 1, -1);
            t2 = rndgen(30, 45, 0, 1, -1);
            sumq += "An accumulator, with no hydraulic pressure, contains nitrogen at a pressure of " + p1 + 
                    "&nbsp;psi and a temperature of " + t1 + 
                    "&nbsp;<sup>O</sup>C. If the hydraulics are activated, the nitrogen is compressed into a volume of " + 
                    v2 + "&nbsp;in<sup>3</sup> at a pressure of " +  thouSep(p2, "&nbsp;") + 
                    "&nbsp;psi. If the temperature also increases to " + t2 + 
                    "&nbsp;<sup>O</sup>C, calculate the initial volume of the accumulator, to 1 decimal place.";
            suma += "\\(P_1=" + p1 + "\\ psi\\\\\\)";
            suma += "\\(T_1=" + t1 + "+273.15=" + dp(t1 + 273.15, 2, -1) + "\\ K\\\\\\)";
            suma += "\\(V_2=" + v2 + "\\ in^3\\\\\\)";
            suma += "\\(P_2=" + thouSep(p2, "\\ ") + "\\ psi\\\\\\)";
            suma += "\\(T_2=" + t2 + "+273.15=" + dp(t2 + 273.15, 2, -1) + "\\ K\\\\\\)";
            suma += "\\(V_1=\\ ?\\ in^3\\\\\\)";
            suma += "$$\\begin{aligned}\\frac{P_1 V_1}{T_1}&=\\frac{P_2 V_2}{T_2}\\\\[5pt]";
            suma += "V_1&=\\frac{P_2 V_2 T_1}{T_2 P_1}=\\frac{" + thouSep(p2, "\\ ") + "\\times" + v2 + 
                    "\\times" + dp(t1 + 273.15, 2, -1) + "}{" + dp(t2 + 273.15, 2, -1) + "\\times" + p1 + "}=\\underline{\\mathbf{" + 
                    dp((p2 * v2 * dp(t1 + 273.15, 2, -1)) / (dp(t1 + 273.15, 2, -1) * p1), 2, 1) + "\\ in^3\\ (1\\ dp)}}\\end{aligned}$$";
            break;
        case 5:
            p1 = rndgen(80, 150, 0, 1, -1);
            t1 = rndgen(8, 15, 1, 0.1, -1);
            t2 = rndgen(30, 40, 1, 0.1, -1);
            sumq += "A tyre is inflated so it has an absolute pressure of " + p1 + "&nbsp;psi at " + t1 + 
                    "&nbsp;<sup>O</sup>C. What is the new absolute pressure, to an accuracy of 1 decimal place, " + 
                    "if the tyre is heat soaked at " + t2 + "&nbsp;<sup>O</sup>C, assuming the volume remains constant?";
            suma += "\\(P_1=" + p1 + "\\ psi\\\\\\)";
            suma += "\\(T_1=" + t1 + "+273.15=" + dp(t1 + 273.15, 2, -1) + "\\ K\\\\\\)";
            suma += "\\(T_2=" + t2 + "+273.15=" + dp(t2 + 273.15, 2, -1) + "\\ K\\\\\\)";
            suma += "\\(P_2=\\ ?\\ psi\\\\\\)";
            suma += "$$\\begin{aligned}\\frac{P_1}{T_1}&=\\frac{P_2}{T_2}\\qquad\\qquad " + 
                    "Note:\\ volume\\ remains\\ constant.\\\\[5pt]";
            suma += "P_2&=\\frac{P_1 T_2}{T_1}=\\frac{" + p1 + "\\times" + dp(t2 + 273.15, 2, -1) + "}{" + dp(t1 + 273.15, 2, -1) + 
                    "}=\\underline{\\mathbf{" + dp((p1 * dp(t2 + 273.15, 2, -1)) / dp(t1 + 273.15, 2, -1), 3, 1) + 
                    "\\ psi\\ (1\\ dp)}}\\end{aligned}$$";
            break;
        case 6:
            v1 = rndgen(800, 1200, 0, 1, -1);
            t1 = rndgen(20, 28, 1, 0.1, -1);
            t2 = rndgen(33, 40, 1, 0.1, -1);
            sumq += "A hot air balloon contains " + thouSep(v1, "&nbsp;") + "&nbsp;m<sup>3</sup> of air at " + t1 + 
                    "&nbsp;<sup>O</sup>C. What volume will it occupy at " + t2 + 
                    "&nbsp;<sup>O</sup>C, assuming the pressure remains constant? Round the answer to 1 decimal place.";
            suma += "\\(V_1=" + thouSep(v1, " ") + "\\ m^3\\\\\\)";
            suma += "\\(T_1=" + t1 + "+273.15=" + dp(t1 + 273.15, 2, -1) + "\\ K\\\\\\)";
            suma += "\\(T_2=" + t2 + "+273.15=" + dp(t2 + 273.15, 2, -1) + "\\ K\\\\\\)";
            suma += "\\(V_2=\\ ?\\ m^3\\\\\\)";
            suma += "$$\\begin{aligned}\\frac{V_1}{T_1}&=\\frac{V_2}{T_2}\\qquad\\qquad " + 
                    "Note:\\ pressure\\ remains\\ constant.\\\\[5pt]";
            suma += "V_2&=\\frac{V_1 T_2}{T_1}=\\frac{" + thouSep(v1, "\\ ") + "\\times" + dp(t2 + 273.15, 2, -1) + "}{" + 
            dp(t1 + 273.15, 2, -1) + "}=\\underline{\\mathbf{" + 
                    thouSep(dp((v1 * dp(t2 + 273.15, 2, -1)) / dp(t1 + 273.15, 2, -1), 3, 1), "\\ ") + "\\ m^3\\ (1\\ dp)}}\\end{aligned}$$";
            break;
        case 7:
            v1 = rndgen(4, 10, 0, 1, -1);
            p1 = rndgen(80, 250, 1, 0.1, -1);
            p2 = rndgen(1100, 1300, 1, 0.1, -1);
            sumq += "An air compressor receives " + v1 + "&nbsp;m<sup>3</sup> of air at a pressure of " + p1 + 
                    "&nbsp;kN/m<sup>2</sup> absolute and compresses it to a pressure of " + thouSep(p2, "&nbsp;") + 
                    "&nbsp;kN/m<sup>2</sup> absolute. Calculate the final volume of air, rounded to 2 decimal places, " + 
                    "assuming no change in temperature.";
            suma += "\\(V_1=" + v1 + "\\ m^3\\\\\\)";
            suma += "\\(P_1=" + p1 + "\\times10^3\\ N/m^2\\\\\\)";
            suma += "\\(P_2=" + thouSep(p2, "\\ ") + "\\times10^3\\ N/m^2\\\\\\)";
            suma += "\\(V_2=\\ ?\\ m^3\\\\\\)";
            suma += "$$\\begin{aligned}P_1 V_1&=P_2 V_2\\qquad\\qquad " + 
                    "Note:\\ temperature\\ remains\\ constant.\\\\[5pt]";
            suma += "V_2&=\\frac{P_1 V_1}{P_2}=\\frac{" + p1 + "\\times10^3\\times" + v1 + "}{" + p2 + 
                    "\\times10^3}=\\underline{\\mathbf{" + dp((p1 * 1000 * v1) / (p2 * 1000), 4, 2) + 
                    "\\ m^3\\ (2\\ dp)}}\\end{aligned}$$";
            break;
        case 8:
            v1 = rndgen(2, 5, 1, 0.1, -1);
            t1 = rndgen(40, 60, 0, 1, -1);
            v2 = v1 * 2;
            sumq += "If " + v1 + "&nbsp;m<sup>3</sup> of gas at " + t1 + 
                    "&nbsp;<sup>O</sup>C is heated at a constant pressure until its volume is doubled, " + 
                    "what will be the final temperature, in <sup>O</sup>C?";
            suma += "\\(V_1=" + v1 + "\\ m^3\\\\\\)";
            suma += "\\(T_1=" + t1 + "+273.15=" + dp(t1 + 273.15, 2, -1) + "\\ K\\\\\\)";
            suma += "\\(V_2=V_1\\times2=" + v2 + "\\ m^3\\\\\\)";
            suma += "\\(T_2=\\ ?\\ ^OC\\\\\\)";
            suma += "$$\\begin{aligned}\\frac{V_1}{T_1}&=\\frac{V_2}{T_2}\\\\[5pt]";
            suma += "T_2&=\\frac{T_1 V_2}{V_1}=\\frac{" + dp(t1 + 273.15, 2, -1) + "\\times" + v2 + "}{" + v1 + "}=" + 
                    dp((dp(t1 + 273.15, 2, -1) * v2) / v1, 2, -1) + "\\ K\\\\[5pt]";
            suma += "&=" + dp((dp(t1 + 273.15, 2, -1) * v2) / v1, 2, -1) + "-273.15=\\underline{\\mathbf{" + 
                    (dp((dp(t1 + 273.15, 2, -1) * v2) / v1, 2, -1) - 273.15) + "\\ ^OC}}\\end{aligned}$$";
            break;
        case 9:
            v1 = rndgen(5, 20, 0, 1, -1);
            p1 = rndgen(100.5, 150, 1, 0.1, -1);
            t1 = rndgen(10, 30,0, 1, -1);
            p2 = rndgen(400.5, 500, 1, 0.1, -1);
            t2 = rndgen(100, 140, 0, 1, -1);
            sumq += "If " + v1 + "&nbsp;m<sup>3</sup> of air is compressed from initial conditions of " + p1 + 
                    "&nbsp;kN/m<sup>2</sup> absolute and " + t1 + "&nbsp;<sup>O</sup>C to final conditions of " + p2 + 
                    "&nbsp;kN/m<sup>2</sup> absolute and " + t2 + 
                    "&nbsp;<sup>O</sup>C, calculate the final volume of the air, to an accuracy of 2 decimal places.";
            suma += "\\(V_1=" + v1 + "\\ m^3\\\\\\)";
            suma += "\\(P_1=" + p1 + "\\times10^3\\ N/m^2\\\\\\)";
            suma += "\\(T_1=" + t1 + "+273.15=" + dp(t1 + 273.15, 2, -1) + "\\ K\\\\\\)";
            suma += "\\(P_2=" + p2 + "\\times10^3\\ N/m^2\\\\\\)";
            suma += "\\(T_2=" + t2 + "+273.15=" + dp(t2 + 273.15, 2, -1) + "\\ K\\\\\\)";
            suma += "\\(V_2=\\ ?\\ m^3\\\\\\)";
            suma += "$$\\begin{aligned}\\frac{P_1 V_1}{T_1}&=\\frac{P_2 V_2}{T_2}\\\\[5pt]";
            suma += "V_2&=\\frac{P_1 V_1 T_2}{T_1 P_2}=\\frac{" + p1 + "\\times10^3\\times" + v1 + 
                    "\\times" + dp(t2 + 273.15, 2, -1) + "}{" + dp(t1 + 273.15, 2, -1) + "\\times" + p2 + 
                    "\\times10^3}=\\underline{\\mathbf{" + 
                    dp((p1 * 1000 * v1 * dp(t2 + 273.15, 2, -1)) / (dp(t1 + 273.15, 2, -1) * p2 * 1000), 4, 2) + 
                    "\\ m^3\\ (2\\ dp)}}\\end{aligned}$$"; 
            break;
        case 10:
            p1 = rndgen(0.75, 1.20, 2, 0.1, -1);
            t1 = rndgen(15, 30, 0, 1, -1);
            v1 = 4;
            v2 = 1;
            sumq += "Air is compressed in a cylinder from a pressure of " + p1 + "&nbsp;bar and a temperature of " + 
                    t1 + "&nbsp;<sup>O</sup>C to one quarter of its original volume at a constant temperature.<BR>"
            sumq += "i. What is the resulting pressure?<BR>";
            sumq += "ii. The air is then heated at a constant pressure until it occupies its original volume. " + 
                    "Calculate the final temperature in <sup>O</sup>C.";
            suma += "\\(P_1=" + p1 + "\\ bar\\\\\\)";
            suma += "\\(T_1=" + t1 + "+273.15=" + dp(t1 + 273.15, 2, -1) + "\\ K\\\\\\)";
            suma += "\\(V_1=4m^3\\\\\\)";
            suma += "\\(V_2=1m^3\\\\\\)";
            suma += "\\(P_2=\\ ?\\ bar\\\\\\)";
            suma += "\\(T_2=\\ ?\\ ^OC\\\\\\)";
            suma += "$$\\begin{aligned}i.\\ \\ P_1 V_1&=P_2 V_2\\qquad\\qquad " + 
                    "Note:\\ temperature\\ remains\\ constant.\\\\[5pt]";
            suma += "P_2&=\\frac{P_1 V_1}{V_2}=\\frac{" + p1 + "\\times" + v1 + "}{" + v2 + "}=" + 
                    dp(p1 * v1 / v2, 3, -1) + "\\ bar\\\\[5pt]";
            suma += "ii.\\ \\frac{V_1}{T_1}&=\\frac{V_2}{T_2}\\qquad\\qquad " + 
                    "Note:\\ pressure\\ remains\\ constant.\\\\[5pt]";
            suma += "T_2&=\\frac{V_2 T_1}{V_1}=\\frac{" + v1 + "\\times" + dp(t1 + 273.15, 2, -1) + "}{" + v2 + "}=" + 
                    thouSep(dp(v1 * dp(t1 + 273.15, 2, -1) / v2, 3, -1), "\\ ") + "\\ K\\\\[5pt]";
            suma += "&=" + thouSep(dp(v1 * dp(t1 + 273.15, 2, -1) / v2, 3, -1), "\\ ") + "-273.15=\\underline{\\mathbf{" + 
                    (dp((v1 * dp(t1 + 273.15, 2, -1) / v2) - 273.15, 3, -1)) + "^OC}}\\end{aligned}$$";
            break;
        case 11:
            document.getElementById("noteslink").onclick = function() {
                window.open("images/Sci Bk2 Statics v1.10.pdf#page=64", "_blank")
            }
            h = rndgen(1.85, 2.85, 2, 0.01, -1);
            rho = rndgen(0.71, 0.90, 2, 0.01, -1);
            g = 9.81;
            sumq += "A manometer reads " + h + "&nbsp;m. If the working fluid has a relative density of " + rho + 
                    ", calculate the gauge pressure being indicated, both in N/m<sup>2</sup> and bar, " + 
                    "each rounded to 2 decimal places.";
            suma += "\\(h=" + h + "\\ m\\\\\\)";
            suma += "\\(\\rho=" + rho + "\\times1\\ 000=" + dp(rho * 1000, 2, -1) + "\\ kg/m^3\\\\\\)";
            suma += "\\(P=\\ ?\\ N/m^2\\ \\&\\ bar\\\\\\)";
            suma += "$$\\begin{aligned}P&=\\rho gh=" + thouSep(rho, "\\ ") + "\\times" + g + "\\times" + 
                    h + "=\\underline{\\mathbf{" + thouSep(dp(rho * 1000 * g * h, 4, 2), "\\ ") + 
                    "\\ N/m^2\\ (2\\ dp)}}\\\\[5pt]";
            suma += "&=\\frac{" + dp(rho * 1000 * g * h, 4, 2) + "}{" + thouSep(100000, "\\ ") + 
                    "}=\\underline{\\mathbf{" + dp(dp(rho * 1000 * g * h, 4, 2) / 100000, 4, 2) + 
                    "\\ bar\\ (2\\ dp)}}\\end{aligned}$$";
            break;
        case 12:
            document.getElementById("noteslink").onclick = function() {
                window.open("images/Sci Bk2 Statics v1.10.pdf#page=64", "_blank")
            }
            patmos = rndgen(99.8, 102, 1, 0.1, -1);
            rho = 1.02;
            h = rndgen(8, 25, 0, 1, -1);
            g = 9.81;
            pabs = dp((rho * 1000 * g * h) + (patmos * 1000), 3, -1);
            sumq += "Given atmospheric pressure as " + patmos + 
                    "&nbsp;kN/m<sup>2</sup> and that 'sea water' has a relative density of " + rho + 
                    ", calculate the absolute pressure on the hull of a submarine at a depth of " + h + 
                    "&nbsp;m, giving your answer in N/m<sup>2</sup> and bar, each to an accuracy of 1 decimal place.";
            suma += "\\(P_{ATMOS}=" + patmos + "\\times10^3\\ N/m^2\\\\\\)";
            suma += "\\(\\rho=" + rho + "\\times1\\ 000=" + thouSep((rho * 1000), "\\ ") + "\\ kg/m^3\\\\\\)";
            suma += "\\(h=" + h + "\\ m\\\\\\)";
            suma += "\\(P_{ABS}=\\ ?\\ N/m^2\\ \\&\\ bar\\\\\\)";
            suma += "$$\\begin{aligned}P_{GUAGE}&=\\rho gh=" + thouSep((rho * 1000), "\\ ") + "\\times" + g + 
                    "\\times" + h + "=" + thouSep(dp(rho * 1000 * g * h, 4, -1), "\\ ") + "\\ N/m^2\\\\[5pt]";
            suma += "P_{ABS}&=P_{GUAGE}+ P_{ATMOS}=" + thouSep(dp(rho * 1000 * g * h, 4, -1), "\\ ") + 
                    "+" + patmos + "\\times10^3=\\underline{\\mathbf{" + thouSep(pabs, "\\ ") + 
                    "\\ N/m^2\\ (1\\ dp)}}\\\\[5pt]";
            suma += "&=\\frac{" + thouSep(pabs, "\\ ") + "}{100\\ 000}=\\underline{\\mathbf{" + 
                    dp(pabs / 100000, 3, 1) + "\\ bar\\ (1\\ dp)}}\\end{aligned}$$";
            break;
        case 13:
            document.getElementById("noteslink").onclick = function() {
                window.open("images/Sci Bk2 Statics v1.10.pdf#page=60", "_blank")
            }
            hman = rndgen(205, 305, 0, 1, -1);
            rhoman = 1200;
            hbar = rndgen(735, 755, 0, 1, -1);
            rhobar = 13600;
            g = 9.81;
            pguage = dp(rhoman * g * (hman / 1000), 3, -1);
            patmos = dp(rhobar * g * (hbar / 1000), 3, -1);
            sumq += "A manometer on a gas pipe reads " + hman + "&nbsp;mm of oil (oil density = " + 
                    thouSep(rhoman, "&nbsp;") + "&nbsp;kg/m<sup>3</sup>). A barometer alongside the pipe reads " + 
                    hbar + "&nbsp;mmHg (Hg density = " + thouSep(rhobar, "&nbsp;") + 
                    "&nbsp;kg/m<sup>3</sup>). Calculate the absolute pressure of the gas in the pipe, " + 
                    "in N/m<sup>2</sup> rounded to 2 decimal places.";
            suma += "\\(h_{MAN}=" + hman + "\\times10^{-3}\\ m\\\\\\)";
            suma += "\\(\\rho_{MAN}=" + thouSep(rhoman, "\\ ") + "\\ kg/m^3\\\\\\)";
            suma += "\\(h_{BAR}=" + hbar + "\\times10^{-3}\\ m\\\\\\)";
            suma += "\\(\\rho_{BAR}=" + thouSep(rhobar, "\\ ") + "\\ kg/m^3\\\\\\)";
            suma += "\\(p_{ABS}=\\ ?\\ N/m^2\\\\\\)";
            suma += "$$\\begin{aligned}P_{GUAGE}&=\\rho_{MAN}\\ g\\ h_{MAN}=" + thouSep(rhoman, "\\ ") + 
                    "\\times" + g + "\\times" + hman + "\\times10^{-3}=" + thouSep(pguage, "\\ ") + 
                    "\\ N/m^2\\\\[5pt]";
            suma += "P_{ATMOS}&=\\rho_{BAR}\\ g\\ h_{BAR}=" + thouSep(rhobar, "\\ ") + "\\times" + g + 
                    "\\times" + hbar + "\\times10^{-3}=" + thouSep(patmos, "\\ ") + "\\ N/m^2\\\\[5pt]";
            suma += "P_{ABS}&=P_{GUAGE}+ P_{ATMOS}=" + thouSep(pguage, "\\ ") + "+" + thouSep(patmos, "\\ ") + 
                    "=\\underline{\\mathbf{" + thouSep(dp((pguage + patmos), 4, 2), "\\ ") + 
                    "\\ N/m^2}}\\ (2\\ dp)\\end{aligned}$$";
            break;
        case 14:
            document.getElementById("noteslink").onclick = function() {
                window.open("images/Sci Bk2 Statics v1.10.pdf#page=67", "_blank")
            }
            F = rndgen(2, 3.5, 1, 0.1, -1);
            a = rndgen(45, 75, 0, 1, -1);
            rhofresh = 1000;
            rhosea = 1025;
            g = 9.81;
            sumq += "A ship has a weight of " + F + "&nbsp;MN. The area at the waterline is " + a + "&nbsp;m<sup>2</sup>. " + 
                    "Calculate the draught of the ship, to 2 decimal places, in:<BR>";
            sumq += "i. Fresh water of density " + thouSep(1000, "&nbsp;") + " kg/m<sup>3</sup><BR>";
            sumq += "ii. Sea water of density " + thouSep(1025, "&nbsp;") + " kg/m<sup>3</sup>";
            suma += "\\(F=" + F + "\\times10^6\\ N\\\\\\)";
            suma += "\\(A=" + a + "\\ m^2\\\\\\)";
            suma += "\\(\\rho_{FRESH}=" + thouSep(rhofresh, "\\ ") + "\\ kg/m^3\\\\\\)";
            suma += "\\(\\rho_{SEA}=" + thouSep(rhosea, "\\ ") + "\\ kg/m^3\\\\\\)";
            suma += "\\(h_{FRESH}=\\ ?\\ m\\\\\\)";
            suma += "\\(h_{SEA}=\\ ?\\ m\\\\\\)";
            suma += "$$\\begin{aligned}F&=\\rho ghA\\\\[5pt]";
            suma += "h_{FRESH}&=\\frac{F}{\\rho_{FRESH}\\ g\\ A}=\\frac{" + F + "\\times10^6}{" + 
                    thouSep(rhofresh, "\\ ") + "\\times" + g + "\\times" + a + "}=\\underline{\\mathbf{" + 
                    dp((F * 1000000) / (rhofresh * g * a), 4, 2) + "\\ m\\ (2\\ dp)}}\\\\[5pt]";
            suma += "h_{SEA}&=\\frac{F}{\\rho_{SEA}\\ g\\ A}=\\frac{" + F + "\\times10^6}{" + 
                    thouSep(rhosea, "\\ ") + "\\times" + g + "\\times" + a + "}=\\underline{\\mathbf{" + 
                    dp((F * 1000000) / (rhosea * g * a), 4, 2) + "\\ m\\ (2\\ dp)}}\\end{aligned}$$";
            break;
        case 15:
            document.getElementById("noteslink").onclick = function() {
                window.open("images/Sci Bk2 Statics v1.10.pdf#page=67", "_blank")
            }
            v1 = rndgen(800, 14000, 0, 1, -1);
            rho1 = rndgen(1.002, 1.018, 3, 0.001, -1);
            rho2 = rndgen(1.112, 1.194, 3, 0.001, -1);
            g = 9.81;
            sumq += "Calculate, to 1 decimal place, the change in lift on a balloon of volume " + thouSep(v1, "&nbsp;") + 
                    "&nbsp;m<sup>3</sup>, when a decrease in temperature increases the air density from " + 
                    rho1 + "&nbsp;kg/m<sup>3</sup> to " + rho2 + "&nbsp;kg/m<sup>3</sup>.";
            suma += "\\(V=" + thouSep(v1, "\\ ") + "\\ m^3\\\\\\)";
            suma += "\\(\\rho_1=" + rho1 + "\\ kg/m^3\\\\\\)";
            suma += "\\(\\rho_2=" + rho2 + "\\ kg/m^3\\\\\\)";
            suma += "$$F=\\rho ghA=\\rho gV=( \\rho_2 - \\rho_1 )gV=(" + rho2 + "-" + rho1 + 
                    ")\\times" + g + "\\times" + thouSep(v1, "\\ ") + "=" + 
                    thouSep(dp((rho2 - rho1) * g * v1, 3, 1), "\\ ") + "\\ N\\ (1\\ dp)$$";
            break;
    }
    document.getElementById("q").innerHTML = sumq;
    document.getElementById("btnSoln").style.visibility="visible";
}