var prevsum = 0, prev2sum = 0, g = 9.81, m, v, h, pe, ke, W, F, s, t, T;
function energy() {
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
    if (SolnWin) {      //Prior to 1st open of SolnWin, the .closed test is null
        if (!SolnWin.closed) {  //Once SolnWin has been opened, SolnWin is true whether open or closed so need this extra test
                SolnWin.document.getElementById("myCanvas3");
                SolnWin.myCanvas3.height = "0.5";
                SolnWin.myCanvas3.width = "0.5";
                SolnWin.myCanvas3.style = "border: none;";
        }
    }
    sumq = "";
    suma = "";
    document.getElementById("a").innerHTML = "";
    document.getElementById("noteslink").style.visibility="visible";
    document.getElementById("noteslink").onclick = function() {
        window.open("images/Sci Bk3 Dynamics v1.9.pdf#page=70", "_blank")
    }
    do {
        sum = rndgen(1, 6, 0, 1, -1);
    } while(sum === prevsum || sum === prev2sum)
    prev2sum = prevsum;
    prevsum = sum;
    switch(sum) {
        case 1:
            m = rndgen(25, 150, 0, 1, -1);
            v = rndgen(20, 35, 0, 1, -1);
            h = rndgen(3, 10, 0, 1, -1);
            pe = dp(m * g * h, 2, -1);
            ke = dp(0.5 * m * v * v, 2, -1);
            W = dp(pe + ke, 2, -1);

            sumq += "A trolley of mass " + m + "&nbsp;kg is travelling with a velocity of " + v + 
                        "&nbsp;m/s along a track, "
            sumq += "which is " + h + "&nbsp;m above the ground. Calculate:<br>";
            sumq += "a. The kinetic energy of the trolley.<br>";
            sumq += "b. The potential energy of the trolley.<br>";
            sumq += "c. The total energy of the trolley.";

            suma += "\\(m=" + m + "\\ kg\\\\\\)";
            suma += "\\(v=" + v + "\\ m/s\\\\\\)";
            suma += "\\(h=" + h + "\\ m\\\\\\)";
            suma += "\\(g=\\ 9.81\\ m/s^2\\\\\\)";
            suma += "\\(KE=\\ ?\\ J\\\\\\)";
            suma += "\\(PE=\\ ?\\ J\\\\\\)";
            suma += "\\(W=\\ ?\\ J\\\\\\)";
            suma += "$$\\begin{aligned}&a.\\ \\ KE=\\frac{1}{2}mv^2=\\frac{1}{2}\\times" + m + "\\times" + v + 
                        "^2=" + thouSep(ke, "\\ ") + "\\ J\\\\[25pt]";
            suma += "&b.\\ \\ PE=mgh=" + m + "\\times" + g + "\\times" + h + "=" + thouSep(pe, "\\ ") + 
                            "\\ J\\\\[25pt]";
            suma += "&c.\\ \\ W=KE+PE=" + thouSep(ke, "\\ ") + "+" + thouSep(pe, "\\ ") + "=" + 
                        thouSep(W, "\\ ") + "\\ J\\end{aligned}$$";


            break;
        case 2:
            ke = rndgen(160, 285, 1, 10, -1);
            m = rndgen(70000, 90000, 0, 1000, -1);
            v = dp(Math.sqrt((2 * ke * 1000000) / (m)), 4, 2);
            sumq += "The kinetic energy of an aircraft on take-off is " + ke + "&nbsp;MJ. If the aircraft has a mass ";
            sumq += "of " + m / 1000 + "&nbsp;tonnes, calculate the take-off velocity, ";
            sumq += "rounding your answer to 2 decimal places.";

            suma += "\\(KE=" + ke + "\\times10^6\\ J\\\\\\)";
            suma += "\\(m=" + m / 1000 + "\\times10^3\\ kg\\\\\\)";
            suma += "\\(v=\\ ?\\ m/s\\\\\\)";
            suma += "$$\\begin{aligned}KE&=\\frac{1}{2}mv^2\\\\[5pt]";
            suma += "v&=\\sqrt{\\frac{2KE}{m}}\\\\[5pt]";
            suma += "&=\\sqrt{\\frac{2\\times" + ke + "\\times10^6}{" + m / 1000 + "\\times10^3}}=" + v + 
                            "\\ m/s\\end{aligned}$$";
            break;
        case 3:
            m = rndgen(30, 90, 0, 1, -1);
            h = rndgen(5, 30, 0, 1, -1);
            sumq += "An object of mass " + m + "&nbsp;kg is supported " + h + "&nbsp;m above the ground. ";
            sumq += "It is then released and falls freely to the ground. Calculate, in kJ to 2 decimal places, ";
            sumq += "its potential and kinetic energy:<br>";
            sumq += "a. Before release.<br>";
            sumq += "b. " + h / 2 + "&nbsp;m above the ground.<br>";
            sumq += "c. Just before it strikes the ground.";

            suma += "\\(m = " + m + "\\ kg\\\\\\)";
            suma += "\\(h=" + h + "\\ m\\\\\\)";
            suma += "\\(g=\\ 9.81\\ m/s^2\\\\\\)";
            suma += "$$\\begin{aligned}a.\\ \\ &PE=mgh=" + m + "\\times" + g + "\\times" + h + "=" + 
                            dp((m * g * h) / 1000, 4, 2) + "\\ kJ\\ (2\\ dp)\\\\[5pt]";
            suma += "&KE=0.00\\ kJ\\\\[25pt]";
            suma += "b.\\ \\ &PE=mgh=" + m + "\\times" + g + "\\times" + h / 2 + "=" + 
                            dp((m * g * (h / 2)) / 1000, 4, 2) + "\\ kJ\\ (2\\ dp)\\\\[5pt]";
            suma += "&KE=PE_a-PE_b=" + dp((m * g * h) / 1000, 2, -1) + "\\times10^3-" + 
                        dp((m * g * (h / 2)) / 1000, 2, -1) + "\\times10^3=" + 
                        dp(((m * g * h) / 1000) - ((m * g * (h / 2)) / 1000), 4, 2) + "\\ kJ\\ (2\\ dp)\\\\[25pt]";
            suma += "c.\\ \\ &PE=\\ 0.00\\ kJ\\\\[5pt]";
            suma += "&KE = PE_a-PE_c=" + dp((m * g * h) / 1000, 2, -1) + "\\times10^3-0=" + 
                        dp((m * g * h) / 1000, 4, 2) + "\\ kJ\\ (2\\ dp)\\end{aligned}$$";
            break;
        case 4:
            m = rndgen(80, 140, 0, 1, -1);
            h = rndgen(5, 12, 0, 1, -1);
            pe = m * g * h;
            v = dp(Math.sqrt((2 * pe) / m), 4, 2);
            sumq += "A mass of " + m + "&nbsp;kg is dropped from a height of " + h + 
                        "&nbsp;m. Assuming no losses, calculate:<br>";
            sumq += "a. The potential energy of the mass before release, rounding your answer to 2 decimal places.<br>";
            sumq += "b. The kinetic energy of the mass immediately before striking the ground, " + 
                    "rounding your answer to 2 decimal places.<br>";
            sumq += "c. The velocity of the mass immediately before striking the ground, " + 
                    "rounding your answer to 2 decimal places.";

            suma += "\\(m=" + m + "\\ kg\\\\\\)";
            suma += "\\(h=" + h + "\\ m\\\\\\)";
            suma += "\\(g=\\ 9.81\\ m/s^2\\\\\\)";
            suma += "$$\\begin{aligned}a.\\ \\ &PE=mgh=" + m + "\\times" + g + "\\times" + h + "=" + 
                        thouSep(dp(pe, 4, 2), "\\ ") + "\\ J\\ (2\\ dp)\\\\[25pt]";
            suma += "b.\\ \\ &KE=PE_a=" + thouSep(dp(pe, 4, 2), "\\ ") + "\\ J\\ (2\\ dp)\\\\[25pt]";
            suma += "c.\\ \\ &KE=\\frac{1}{2}mv^2\\\\[5pt]";
            suma += "&v=\\sqrt{\\frac{2KE}{m}}\\\\[5pt]";
            suma += "&\\ =\\sqrt{\\frac{2\\times" + thouSep(dp(pe, 2, -1), "\\ ") + "}{" + m + "}}\\\\[5pt]";
            suma += "&\\ =" + v + "\\ m/s\\ (2\\ dp)\\end{aligned}$$";
            break;
        case 5:
            F = rndgen(30, 75, 1, 0.5, -1);
            s = rndgen(20, 50, 0, 1, -1);
            t = rndgen(65, 130, 0, 5, -1);
            if(t < 120) {
                T = Math.floor(t / 60) + "\\ min\\ " + t % 60 + "\\ secs";
            } else {
                T = Math.floor(t / 60) + "\\ mins\\ " + t % 60 + "\\ secs";
            }
            sumq += "A force of " + F + " N is applied to an object, causing it to move " + s + " m in " + fromsecs(t);
            sumq += ". Calculate the power used, rounding your answer to 1 decimal place.";

            suma += "\\(F=" + F + "\\ N\\\\\\)";
            suma += "\\(s=" + s + "\\ m\\\\\\)";
            suma += "\\(t=" + T + "=" + t + "\\ s\\\\\\)";
            suma += "\\(P=\\ ?\\ W\\\\\\)";
            suma += "$$\\begin{aligned}W&=Fs\\\\[5pt]";
            suma += "&=" + F + "\\times" + s + "\\\\[5pt]";
            suma += "&=" + thouSep(dp(F * s, 2, -1), "\\ ") + "\\ J\\\\[25pt]";
            suma += "P&=\\frac{W}{t}\\\\[5pt]";
            suma += "&=\\frac{" + thouSep((F * s), "\\ ") + "}{" + t + "}\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + dp((F * s) / t, 3, 1) + "\\ W\\ (1\\ dp)}}\\end{aligned}$$";
            break;
        case 6:
            W = rndgen(7000, 13000, 0, 500, -1);
            s = rndgen(30, 80, 1, 0.5, -1);
            sumq += W / 1000 + " kJ of work is done when a force is applied to an object that causes it to move ";
            sumq += "horizontally and uniformly through " + s + " m. Calculate the size of the force applied, ";
            sumq += "rounding your answer to 2 decimal places.";

            suma += "\\(W=" + W / 1000 + "\\times10^3\\ J\\\\\\)";
            suma += "\\(s=" + s + "\\ m\\\\\\)";
            suma += "\\(F=\\ ?\\ N\\\\\\)";
            suma += "$$\\begin{aligned}W&=Fs\\\\[5pt]";
            suma += "F&=\\frac{W}{s}\\\\[5pt]";
            suma += "&=\\frac{" + W / 1000 + "\\times10^3}{" + s + "}\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + dp(W / s, 4, 2) + "\\ N\\ (2\\ dp)}}\\end{aligned}$$";
            break;
    }
    document.getElementById("q").innerHTML = sumq;
    document.getElementById("btnSoln").style.visibility="visible";
}