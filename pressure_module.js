var prevsum = 0, p1, p2, v1, v2, t1, t2;
function pressure() {
    var sum;
    document.getElementById("myCanvas");
    myCanvas.height = "0.5";
    myCanvas.width = "0.5";
    myCanvas.style = "border: none;";
    sumq = "";
    suma = "";
    document.getElementById("a").innerHTML = "";
    document.getElementById("noteslink").style.visibility="visible";
    document.getElementById("noteslink").onclick = function() {
        window.open("images/Sci Bk2 Statics v1.10.pdf#page=49", "_blank")
    }
    do {
        sum = 5//rndgen(1, 15, 0, 1, -1);
    } while(sum === prevsum)
    //prevsum = sum;
    switch(sum) {
        case 1:
            v1 = rndgen(2.5, 7, 1, 0.1, -1);
            p1 = rndgen(80, 200, 0, 1, -1);
            v2 = rndgen(v1 + 1.5, 12, 1, 0.1, -1);
            sumq += "If " + v1 + " m" + "<sup>3</sup> " + " of gas at a pressure of " + p1 + 
                    " kN/m" + "<sup>2</sup> is expanded to " + v2 + " m<sup>3</sup>" + 
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
            sumq += "Gas at a temperature of " + t1 + " <sup>O</sup>C, and having a volume of " + 
                    thouSep(v1, " ") + " cm<sup>3</sup>, is heated to " + t2 + 
                    " <sup>O</sup>C. If the pressure remains constant, calculate its new volume, " + 
                    "in m<sup>3</sup> to 2 decimal places.";
            suma += "\\(T_1=" + t1 + "+273=" + (t1 + 273) + "\\ K\\\\\\)";
            suma += "\\(V_1=" + thouSep(v1, "\\ ") + "\\times10^{-6}\\ m^3\\\\\\)";
            suma += "\\(T_2=" + t2 + "+273=" + (t2 + 273) + "\\ K\\\\\\)";
            suma += "\\(V_2=\\ ?\\ m^3\\\\\\)";
            suma += "$$\\begin{aligned}\\frac{V_1}{T_1}&=\\frac{V_2}{T_2}\\qquad\\qquad " + 
                    "Note:\\ pressure\\ remains\\ constant.\\\\[5pt]";
            suma += "V_2&=\\frac{V_1 T_2}{T_1}=\\frac{" + thouSep(v1, "\\ ") + "\\times10^{-6}\\times" + 
                    (t2 + 273) + "}{" + (t1 + 273) + "}=\\underline{\\mathbf{" + 
                    dp((v1 * Math.pow(10, -6) * (t2 + 273)) / (t1 + 273), 3, 2) + "\\ m^3\\ (2\\ dp)}}\\end{aligned}$$";
            break;
        case 3:
            p1 = rndgen(200, 500, 0, 1, -1);
            t1 = rndgen(10, 30, 0, 1, -1);
            v1 = rndgen(0.3, 0.5, 2, 0.01, -1);
            p2 = rndgen(p1 + 100, 900, 0, 1, -1);
            t2 = rndgen(t1 + 40, 150, 0, 1, -1);
            sumq += "A quantity of gas has a volume of " + v1 + " m<sup>3</sup> at a pressure of " + p1 + 
                        " mbar and a temperature of " + t1 + 
                        " <sup>O</sup>C. The gas is compressed until the pressure and temperature are " + p2 + 
                        " mbar and " + t2 + " <sup>O</sup>C respectively. If there is no loss of gas, " + 
                        "calculate the new volume to an accuracy of 3 decimal places.";
            suma += "\\(V_1=" + v1 + "\\ m^3\\\\\\)";
            suma += "\\(P_1=" + p1 + "\\times100=" + (p1 / 10) + "\\times10^3\\ N/m\\\\\\)";
            suma += "\\(T_1=" + t1 + "+273=" + (t1 + 273) + "\\ K\\\\\\)";
            suma += "\\(P_2=" + p2 + "\\times100=" + (p2 / 10) + "\\times10^3\\ N/m\\\\\\)";
            suma += "\\(T_2=" + t2 + "+273=" + (t2 + 273) + "\\ K\\\\\\)";
            suma += "\\(V_2=\\ ?\\ m^3\\\\\\)";
            suma += "$$\\begin{aligned}\\frac{P_1 V_1}{T_1}&=\\frac{P_2 V_2}{T_2}\\\\[5pt]";
            suma += "V_2&=\\frac{P_1 V_1 T_2}{T_1 P_2}=\\frac{" + (p1 / 10) + "\\times10^3\\times" + v1 + 
                    "\\times" + (t2 + 273) + "}{" + (t1 + 273) + "\\times" + (p2 / 10) + 
                    "\\times10^3}=\\underline{\\mathbf{" + 
                    dp((p1 * 100 * v1 * (t2 + 273)) / ((t1 + 273) * p2 * 100), 4, 3) + 
                    "\\ m^3\\ (3\\ dp)}}\\end{aligned}$$";
            break;
        case 4:
            p1 = rndgen(500, 800, 0, 1, -1);
            t1 = rndgen(12, 20, 0, 1, -1);
            v2 = rndgen(35, 45, 1, 0.1, -1);
            p2 = rndgen(2000, 3000, 0, 1, -1);
            t2 = rndgen(30, 45, 0, 1, -1);
            sumq += "An accumulator, with no hydraulic pressure, contains nitrogen at a pressure of " + p1 + 
                    " psi and a temperature of " + t1 + 
                    " <sup>O</sup>C. If the hydraulics are activated, the nitrogen is compressed into a volume of " + 
                    v2 + " in<sup>3</sup> at a pressure of " +  thouSep(p2, " ") + 
                    " psi. If the temperature also increases to " + t2 + 
                    " <sup>O</sup>C, calculate the initial volume of the accumulator, to 1 decimal place.";
            suma += "\\(P_1=" + p1 + "\\ psi\\\\\\)";
            suma += "\\(T_1=" + t1 + "+273=" + (t1 + 273) + "\\ K\\\\\\)";
            suma += "\\(V_2=" + v2 + "\\ in^3\\\\\\)";
            suma += "\\(P_2=" + thouSep(p2, "\\ ") + "\\ psi\\\\\\)";
            suma += "\\(T_2=" + t2 + "+273=" + (t2 + 273) + "\\ K\\\\\\)";
            suma += "\\(V_1=\\ ?\\ in^3\\\\\\)";
            suma += "$$\\begin{aligned}\\frac{P_1 V_1}{T_1}&=\\frac{P_2 V_2}{T_2}\\\\[5pt]";
            suma += "V_1&=\\frac{P_2 V_2 T_1}{T_2 P_1}=\\frac{" + thouSep(p2, "\\ ") + "\\times" + v2 + 
                    "\\times" + (t1 + 273) + "}{" + (t2 + 273) + "\\times" + p1 + "}=\\underline{\\mathbf{" + 
                    dp((p2 * v2 * (t1 + 273)) / ((t2 + 273) * p1), 2, 1) + "\\ in^3\\ (1\\ dp)}}\\end{aligned}$$";
            break;
        case 5:
            // p1 = Int((151 - 80) * Rnd() + 80)
            // t1 = Round((16 - 8) * Rnd() + 8, 1)
            // t2 = Round((41 - 30) * Rnd() + 30, 1)
            //     ssumarray(2) = """. A tyre is inflated so it has an absolute pressure of """ & p1 & """ psi at """ & _
            //                                                         t1 & """ """ & "^O " & """C. What is the new"""
            //     ssumarray(3) = """     absolute pressure, to an accuracy of 1 decimal place, if the tyre is heat soaked at """ & _
            //                                                                                     t2 & """ """ & "^O " & """C,"""
            //     ssumarray(4) = """     assuming the volume remains constant?"""
            //     ssumarray(7) = " P_1 " & """ = """ & p1 & """ psi"""
            //     ssumarray(8) = " T_1 " & """ = """ & t1 & """ + 273 = """ & t1 + 273 & """ K"""
            //     ssumarray(9) = " T_2 " & """ = """ & t2 & """ + 273 = """ & t2 + 273 & """ K"""
            //     ssumarray(10) = " P_2 " & """ = ?"""
            //     ssumarray(11) = """ """
            //     ssumarray(12) = "\frac{ P_1 }{ T_1 }=\frac{ P_2 }{ T_2 } " & """     Note: volume remains constant."""
            //     ssumarray(13) = " P_2 = \frac{ P_1 T_2 }{ T_1 }=\frac{" & p1 & Chr(215) & t2 + 273 & "}{" & t1 + 273 & "}=" & _
            //                                         Format((p1 * (t2 + 273)) / (t1 + 273), "0.0") & """ psi (1 dp)"""
            
            break;
    }
    document.getElementById("q").innerHTML = sumq;
    document.getElementById("btnSoln").style.visibility="visible";
}