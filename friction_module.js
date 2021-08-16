var prevsum, prev2sum, m, g = 9.81, mu, N, F;
function friction() {
    var sum;
    jetup = false;
    jetroll = false;
    space = false;
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
        window.open("images/Sci Bk3 Dynamics v1.9.pdf#page=79", "_blank")
    }
    qsel = rndgen(0, 5, 0, 1, -1);
    do {
        if(qsel === 5) {    //Reduces instances of case 4 (laws of friction Q)
            sum = rndgen(1, 4, 0, 1, -1);
        } else {
            sum = rndgen(1, 3, 0, 1, -1);
        }
    } while(sum === prevsum || sum === prev2sum)
    prev2sum = prevsum;
    prevsum = sum;
    switch(sum) {
        case 1:
            m = rndgen(20, 80, 0, 1, -1);
            mu = rndgen(0.35, 0.8, 2, 0.01, -1);
            F = dp(m * g * mu, 3, 1);
            sumq += "A steel block, mass " + m + " kg, rests on a horizontal wooden floor. If the coefficient of ";
            sumq += "friction between steel and wood is " + mu + ", determine the minimum force necessary to ";
            sumq += "move the block if the force is applied horizontally. Give your answer rounded to 1 decimal place.";

            suma += "\\(m=" + m + "\\ kg\\\\\\)";
            suma += "\\(\\mu =" + mu + "\\\\\\)";
            suma += "\\(g=9.81\\ m/s^2\\\\\\)";
            suma += "$$\\begin{aligned}F&=\\mu N\\\\[5pt]";
            suma += "&=\\mu m g\\\\[5pt]";
            suma += "&=" + mu + "\\times" + m + "\\times" + g + "\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + F + "\\ N\\ (1\\ dp)}}\\end{aligned}$$";
            break;
        case 2:
            do {
                m = rndgen(50000, 270000, 0, 500, -1);
                F = rndgen(420000, 2200000, 0, 10000, -1);
                mu = dp(F / (m * g), 2, -1);
            } while(mu < 0.7 || mu > 0.9)

            sumq += "An aircraft lands wheels up. If the mass of the aircraft is " + (m / 1000) + " tonne and it is found ";
            sumq += "that the force necessary to move it is " + thouSep((F / 1000), " ") + " kN, determine the coefficient of friction ";
            sumq += "between the aircraft and the runway.";

            suma += "\\(m=" + m / 1000 + "\\ T=" + (m / 1000) + "\\times 1000=" + thouSep(m, "\\ ") + "\\ kg\\\\\\)";
            if(F < 1000000) {
                suma += "\\(F=" + thouSep(F / 1000, "\\ ") + "\\ kN=" + (F / 1000) + "\\times 10^3\\ N\\\\\\)";
            } else {
                suma += "\\(F=" + thouSep(F / 1000, "\\ ") + "\\ kN=" + (F / 1000000) + "\\times 10^6\\ N\\\\\\)";
            }
            suma += "\\(\\mu =\\ ?\\\\\\)";
            suma += "$$\\begin{aligned}F&=\\mu N\\\\[5pt]";
            suma += "&=\\mu m g\\\\[25pt]";
            suma += "\\mu &=\\frac{F}{mg}\\\\[5pt]";
            if(F < 1000000) {
                suma += "&=\\frac{" + (F / 1000) + "\\times 10^3}{" + thouSep(m, "\\ ") + "\\times" + g + "}\\\\[5pt]";
            } else {
                suma += "&=\\frac{" + (F / 1000000) + "\\times 10^6}{" + thouSep(m, "\\ ") + "\\times" + g + "}\\\\[5pt]";
            }
            suma += "&=\\underline{\\mathbf{" + mu + "}}\\end{aligned}$$";
            break;
        case 3:
            F = rndgen(500000, 980000, 0, 500, -1);
            mu = rndgen(0.65, 0.9, 2, 0.01, -1);
            if(F / mu < 1000000) {
                N = dp((F / mu) / 1000, 4, 2);
            } else {
                N = dp((F / mu) / 1000000, 4, 2);
            }
            sumq += "The material used in a braking system is tested and it is found that the coefficient ";
            sumq += "of friction between the material and the steel brake disk is " + mu + ". Calculate the normal ";
            sumq += "force when the frictional force is " + (F / 1000) + " kN. "
            sumq += "Give your answer in correct engineering notation, rounded to 2 decimal places.";

            suma += "\\(\\mu=" + mu + "\\\\\\)";
            suma += "\\(F=" + F / 1000 + " kN=" + F / 1000 + "\\times 10^3\\ N\\\\\\)";
            suma += "\\(N=\\ ?\\ kN\\\\\\)";
            suma += "$$\\begin{aligned}F&=\\mu N\\\\[5pt]";
            suma += "N&=\\frac{F}{\\mu}\\\\[5pt]";
            suma += "&=\\frac{" + F / 1000 + "\\times 10^3}{" + mu + "}\\\\[5pt]";
            if(F / mu < 1000000) {
                suma += "&=" + thouSep(N, "\\ ") + "\\ kN\\ (2\\ dp)\\end{aligned}$$";
            } else {
                suma += "&=\\underline{\\mathbf{" + thouSep(N, "\\ ") + "\\ MN\\ (2\\ dp)}}\\end{aligned}$$";
            }
            break;
        case 4:
            sumq += "List the 6 laws of dry friction.";

            suma += "1. Friction always opposes the direction of motion or impending motion.<br><br>";
            suma += "2. Frictional force is proportional to the force between the surfaces.<br><br>";
            suma += "3. Frictional force is independent of the area in contact.<br><br>";
            suma += "4. Static friction is greater than dynamic friction.<br><br>";
            suma += "5. Dynamic friction is independent of velocity.<br><br>";
            suma += "6. Friction depends on the nature and condition of the surfaces involved.<br><br>";
            break;
    }
    document.getElementById("q").innerHTML = sumq;
    document.getElementById("btnSoln").style.visibility="visible";
}