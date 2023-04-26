var prevsum = 0, prev2sum = 0, m, R, v, F, a, deg1, deg2, rev1, rev2, rad1, rad2, rpm1, rpm2;
function angmot() {
    var sum;
    jetup = false;
    jetroll = false;
    space = false;
    pinjt = false;
    sumq = "";
    suma = "";
    do {
        sum = rndgen(1, 8, 0, 1, -1);
    } while(sum === prevsum || sum === prev2sum)
    prev2sum = prevsum;
    prevsum = sum;
    switch(sum) {
        case 1:
            m = rndgen(3, 15, 1, 0.1, -1);
            R = rndgen(0.9, 1.9, 1, 0.1, -1);
            v = rndgen(1.5, 2.5, 1, 0.1, -1);
            sumq += "A body of mass " + m + "&nbsp;kg is rotating in a horizontal circle of diameter " + R * 2 + 
                    "&nbsp;m and with a linear velocity of " + v + 
                    "&nbsp;m/s. Calculate the centripetal force acting on the body, rounded to 1 decimal place.";
            suma += "\\(m=" + m + "\\ kg\\\\\\)";
            suma += "\\(r=" + R + "\\ m\\\\\\)";
            suma += "\\(v=" + v + "\\ m/s\\\\\\)";
            suma += "\\(F=\\ ?\\ N\\\\\\)";
            suma += "$$F=\\frac{mv^2}{r}=\\frac{" + m + "\\times" + v + "^2}{" + R + 
                    "}=\\underline{\\mathbf{" + dp((m * v * v) / R, 1, 1) + "\\ N\\ (1\\ dp)}}$$";
            break;
        case 2:
            m = rndgen(3.25, 9, 2, 0.25, -1);
            R = rndgen(1.1, 1.6, 1, 0.1, -1);
            w = rndgen(3, 5.9, 1, 0.1, -1);
            sumq += "An athlete is swinging a " + m + "&nbsp;kg training hammer in a horizontal circle at a radius of " + 
                    R + "&nbsp;m. If the angular velocity of the hammer is " + w + 
                    "&nbsp;rad/s, calculate the centrifugal force to 2 decimal places.";
            suma += "\\(m=" + m + "\\ kg\\\\\\)";
            suma += "\\(r=" + R + "\\ m\\\\\\)";
            suma += "\\(\\omega=" + w + "\\ rad/s\\\\\\)";
            suma += "\\(F=\\ ?\\ N\\\\\\)";
            suma += "$$F=m\\omega^2r=" + m + "\\times" + w + "^2\\times" + R + 
                    "=\\underline{\\mathbf{" + dp(m * w * w * R, 2, 2) + "\\ N\\ (2\\ dp)}}$$";
            break;
        case 3:
            m = rndgen(11.1, 13.5, 1, 0.1, -1);
            R = rndgen(1.1, 2.5, 1, 0.1, -1);
            F = rndgen(50, 75, 1, 0.5, -1);
            sumq += "Calculate the angular velocity of a " + m + "&nbsp;kg mass being swung at a horizontal radius of " + 
                    R + "&nbsp;m by a force of " + F + "&nbsp;N. Round your answer to 2 decimal places.";
            suma += "\\(m=" + m + "\\ kg\\\\\\)";
            suma += "\\(r=" + R + "\\ m\\\\\\)";
            suma += "\\(F=" + F + "\\ N\\\\\\)";
            suma += "\\(\\omega=\\ ?\\ rad/s\\\\\\)";
            suma += "$$\\begin{aligned}F&=m\\omega^2r\\\\[5pt]";
            suma += "\\omega&=\\sqrt{\\frac{F}{mr}}=\\sqrt{\\frac{" + F + "}{" + m + "\\times" + R + 
                    "}}=\\underline{\\mathbf{" + dp(Math.sqrt(F / (m * R)), 2, 2) + 
                    "\\ rad/s\\ (2\\ dp)}}\\end{aligned}$$";
            break;
        case 4:
            do {
                deg1 = rndgen(1, 301, 0, 1, -1);
                deg2 = rndgen(1, 301, 0, 1, -1);
            } while(deg1 === deg2)
            do {
                rev1 = rndgen(3, 250, 1, 0.5, -1);
                rev2 = rndgen(3, 250, 1, 0.5, -1);
            } while(rev1 === rev2)
            sumq += "Convert these angles to radians, rounding your answer to 2 decimal places.<BR>";
            sumq += "a. " + deg1 + "<sup>O</sup><BR>";
            sumq += "b. " + deg2 + "<sup>O</sup><BR>";
            sumq += "c. " + rev1 + " revolutions<BR>";
            sumq += "d. " + rev2 + " revolutions";
            suma += "\\(a.\\ " + deg1 + "\\times\\frac{\\pi}{180}=\\underline{\\mathbf{" + 
                    dp(deg1 * Math.PI / 180, 2, 2) + "\\ rad\\ (2\\ dp)}}\\\\\\)";
            suma += "\\(b.\\ " + deg2 + "\\times\\frac{\\pi}{180}=\\underline{\\mathbf{" + 
                    dp(deg2 * Math.PI / 180, 2, 2) + "\\ rad\\ (2\\ dp)}}\\\\\\)";
            suma += "\\(c.\\ " + rev1 + "\\times360\\times\\frac{\\pi}{180}=\\underline{\\mathbf{" + 
                    thouSep(dp(rev1 * 360 * Math.PI / 180, 2, 2), "\\ ") + "\\ rad\\ (2\\ dp)}}\\\\\\)";
            suma += "\\(d.\\ " + rev2 + "\\times360\\times\\frac{\\pi}{180}=\\underline{\\mathbf{" + 
                    thouSep(dp(rev2 * 360 * Math.PI / 180, 2, 2), "\\ ") + "\\ rad\\ (2\\ dp)}}\\)";
            break;
        case 5:
            do {
                rad1 = rndgen(0.1, 40, 1, 0.1, -1);
                rad2 = rndgen(0.1, 40, 1, 0.1, -1);
            } while(rad1 === rad2)
            do {
                rev1 = rndgen(2, 10, 1, 0.5, -1);
                rev2 = rndgen(2, 10, 1, 0.5, -1);
            } while(rev1 === rev2)
            sumq += "Convert these angles to degrees, rounding your answer to 2 decimal places.<BR>";
            sumq += "a. " + rad1 + " rad<BR>";
            sumq += "b. " + rad2 + " rad<BR>";
            sumq += "c. " + rev1 + " revolutions<BR>";
            sumq += "d. " + rev2 + " revolutions";
            suma += "\\(a.\\ " + rad1 + "\\times\\frac{180}{\\pi}=\\underline{\\mathbf{" + 
                    thouSep(dp(rad1 * 180 / Math.PI, 2, 2), "\\ ") + "^O\\ (2\\ dp)}}\\\\\\)";
            suma += "\\(b.\\ " + rad2 + "\\times\\frac{180}{\\pi}=\\underline{\\mathbf{" + 
                    thouSep(dp(rad2 * 180 / Math.PI, 2, 2), "\\ ") + "^O\\ (2\\ dp)}}\\\\\\)";
            suma += "\\(c.\\ " + rev1 + "\\times360=\\underline{\\mathbf{" + 
                    thouSep(dp(rev1 * 360, 2, 2), "\\ ") + "^O\\ (2\\ dp)}}\\\\\\)";
            suma += "\\(d.\\ " + rev2 + "\\times360=\\underline{\\mathbf{" + 
                    thouSep(dp(rev2 * 360, 2, 2), "\\ ") + "^O\\ (2\\ dp)}}\\)";
            break;
        case 6:
            do {
                deg1 = rndgen(180, 1500, 0, 1, -1);
                deg2 = rndgen(180, 1500, 0, 1, -1);
            } while(deg1 === deg2)
            do {
                rad1 = rndgen(4, 200, 2, 0.25, -1);
                rad2 = rndgen(4, 200, 2, 0.25, -1);
            } while(rad1 === rad2)
            sumq += "Convert the following to revolutions, rounding your answer to 1 decimal place.<BR>";
            sumq += "a. " + thouSep(deg1, " ") + "<sup>O</sup><BR>";
            sumq += "b. " + thouSep(deg2, " ") + "<sup>O</sup><BR>";
            sumq += "c. " + rad1 + " rad<BR>";
            sumq += "d. " + rad2 + " rad";
            suma += "\\(a.\\ \\frac{" + thouSep(deg1, "\\ ") + "}{360}=\\underline{\\mathbf{" + 
                    dp(deg1 / 360, 1, 1) + "\\ revolutions\\ (1\\ dp)}}\\\\\\)";
            suma += "\\(b.\\ \\frac{" + thouSep(deg2, "\\ ") + "}{360}=\\underline{\\mathbf{" + 
                    dp(deg2 / 360, 1, 1) + "\\ revolutions\\ (1\\ dp)}}\\\\\\)";
            suma += "\\(c.\\ \\frac{" + rad1 + "}{2\\pi}=\\underline{\\mathbf{" + 
                    dp(rad1 / (2 * Math.PI), 1, 1) + "\\ revolutions\\ (1\\ dp)}}\\\\\\)";
            suma += "\\(d.\\ \\frac{" + rad2 + "}{2\\pi}=\\underline{\\mathbf{" + 
                    dp(rad2 / (2 * Math.PI), 1, 1) + "\\ revolutions\\ (1\\ dp)}}\\\\\\)";
            break;
        case 7:
            do {
                rpm1 = rndgen(0.25, 900, 2, 0.25, -1);
                rpm2 = rndgen(0.25, 900, 2, 0.25, -1);
            } while(rpm1 === rpm2)
            sumq += "Convert the following to radians per second (rad/s), rounding your answer to 2 decimal places.<BR>";
            sumq += "a. " + rpm1 + " rpm<BR>";
            sumq += "b. " + rpm2 + " rpm<BR>";
            suma += "\\(a.\\ " + rpm1 + "\\times\\frac{2\\pi}{60}=\\underline{\\mathbf{" + 
                    dp(rpm1 * (2 * Math.PI / 60), 2, 2) + "\\ rad/s\\ (2\\ dp)}}\\\\\\)";
            suma += "\\(b.\\ " + rpm2 + "\\times\\frac{2\\pi}{60}=\\underline{\\mathbf{" + 
                    dp(rpm2 * (2 * Math.PI / 60), 2, 2) + "\\ rad/s\\ (2\\ dp)}}\\\\\\)";
            break;
        case 8:
            R = rndgen(75, 321, 0, 1, -1);
            a = 9.81;
            sumq += "The centripetal acceleration in a rotating space station could, in theory, be created to mimic the " + 
                    "acceleration due to gravity on earth. The 'outer' wall of the space station thus becomes the floor " + 
                    "for the astronauts. If the space station is " + R * 2 + "&nbsp;m in diameter, what angular velocity would be " + 
                    "required to achieve this aim? Round your answer to 3 decimal places.";
            suma += "\\(r=" + R + "\\ m\\\\\\)";
            suma += "\\(a=\\ 9.81\\ m/s^2\\\\\\)";
            suma += "$$\\begin{aligned}a&=\\omega^2r\\\\[5pt]";
            suma += "\\omega&=\\sqrt{\\frac{a}{r}}=\\sqrt{\\frac{" + a + "}{" + R + 
                    "}}=\\underline{\\mathbf{" + dp(Math.sqrt(a / R), 3, 3) + 
                    "\\ rad/s\\ (3\\ dp)}}\\end{aligned}$$";
            break;
        }
    
    var notesLink = "images/Sci Bk3 Dynamics v1.9.pdf#page=25";
    var sumArray = [sumq, suma, notesLink];
    return sumArray;
}