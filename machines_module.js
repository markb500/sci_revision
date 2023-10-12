var sumarrmachines = [], sumq, suma, t1, t2, t3, t4, n1, eff, load, effort, se, sl, ma, vr, radius, txt;
function machines() {
    var sum;
    jetup = false;
    jetroll = false;
    space = false;
    pinjt = false;
    sumq = "";
    suma = "";
    sumarrmachines = QLimitRepeats(sumarrmachines, 8);   //Ensures no repeat question until at least 50% of questions shown
    sum = sumarrmachines[sumarrmachines.length - 1];
    switch(sum) {
        case 1:
            var notesLink = "images/Sci Bk3 Dynamics v1.9.pdf#page=47";
            eff = rndgen(0.45, 0.75, 2, 0.01, -1);
            load = rndgen(4905, 11772, 0, 981, -1);
            do {
                se = rndgen(6, 15, 0, 1, -1);
                sl = rndgen(0.5, 0.7, 2, 0.01, -1);
            } while((se / sl) / (dp(se / sl, 2, 2)) !== 1 || (se / sl) === 10)
            vr = dp(se / sl, 2, -1);
            ma = dp(vr * eff, 4, -1);
            sumq += "A lever system has an efficiency of " + dp(eff * 100, 2, -1) + "&nbsp;% when used to lift a mass of " + 
                    thouSep(dp(load / 9.81, 4, -1), "&nbsp;") + 
                    "&nbsp;kg. Calculate, to 2 decimal places, the effort needed to raise the load when the effort moves " + 
                    se + "&nbsp;m to raise the load by " + sl + "&nbsp;m.";
            suma += "\\(\\eta=\\frac{" + dp(eff * 100, 2, -1) + "}{100}=" + eff + "\\\\\\)";
            suma += "\\(load=" + (dp(load / 9.81, 4, -1)) + "\\times9.81=" + thouSep(load, "\\ ") + "\\ N\\\\\\)";
            suma += "\\(s_E=" + se + "\\ m\\\\\\)";
            suma += "\\(s_L=" + sl + "\\ m\\\\\\)";
            suma += "\\(effort=\\ ?\\\\\\)";
            suma += "$$\\begin{aligned}VR&=\\frac{ s_E }{ s_L }=\\frac{" + se + "}{" + sl + "}=" + 
                    (se / sl) + "\\\\[25pt]";
            suma += "\\eta&=\\frac{MA}{VR}\\\\[5pt]";
            suma += "MA&=\\eta \\times VR=" + eff + "\\times" + vr + "=" + dp(eff * vr, 4, -1) + "\\\\[25pt]";
            suma += "MA&=\\frac{load}{effort}\\\\[5pt]";
            suma += "effort&=\\frac{load}{MA}=\\frac{" + thouSep(load, "\\ ") + "}{" + ma + 
                    "}=\\underline{\\mathbf{" + thouSep(dp(load / ma, 2, 2), "\\ ") + 
                    "\\ N\\ (2\\ dp)}}\\end{aligned}$$";
            break;
        case 2:
            var notesLink = "images/Sci Bk3 Dynamics v1.9.pdf#page=52";
            vr = rndgen(4, 9, 0, 1, -1);
            eff = rndgen(0.45, 0.74, 2, 0.01, -1);
            effort = rndgen(80, 200, 0, 1, -1);
            ma = dp(eff * vr, 2, -1);
            sumq += "A " + vr + " pulley system with an efficiency of " + dp(eff * 100, 2, -1) + 
                    "&nbsp;% is fitted in a workshop. What load can be lifted by an applied effort of " + effort + "&nbsp;N?";
            suma += "\\(VR=" + vr + "\\ \\ \\ \\ \\ (" + vr + "\\ pulley\\ system)\\\\\\)";
            suma += "\\(\\eta=\\frac{" + dp(eff * 100, 2, -1) + "}{100}=" + eff + "\\\\\\)";
            suma += "\\(effort=" + effort + "\\ N\\\\\\)";
            suma += "\\(load=\\ ?\\ N\\\\\\)";
            suma += "$$\\begin{aligned}\\eta&=\\frac{MA}{VR}\\\\[5pt]";
            suma += "MA&=\\eta\\times VR=" + eff + "\\times" + vr + "=" + ma + "\\\\[25pt]";
            suma += "MA&=\\frac{load}{effort}\\\\[5pt]";
            suma += "load&=MA\\times effort=" + ma + "\\times" + effort + 
                    "=\\underline{\\mathbf{" + thouSep(dp(ma * effort, 2, -1), "\\ ") + "\\ N}}\\end{aligned}$$";
            break;
        case 3:
            var notesLink = "images/Sci Bk3 Dynamics v1.9.pdf#page=52";
            do {
                load = rndgen(4905, 11772, 0, 981, -1);
                vr = rndgen(5, 8, 0, 1, -1);
                effort = rndgen(2000, 6000, 0, 1, -1);
                ma = dp(load / effort, 2, -1);
                eff = ma / vr;
            } while(eff < 0.3 || eff > 0.89)
            if (vr === 8) {
                txt = "an";
            } else {
                txt = "a";
            }
            sumq += "A mass of " + dp(load / 9.81, 4, -1) + "&nbsp;kg is lifted by " + txt + " " + vr + "&nbsp;pulley system. If the applied effort is " +   thouSep(effort, "&nbsp;") + "&nbsp;N, calculate:<BR>";
            sumq += "i. the mechanical advantage of the system, rounded to 2 decimal places.<BR>";
            sumq += "ii. the percentage efficiency of the system, to the nearest whole number.";
            suma += "\\(load=" + (dp(load / 9.81, 4, -1)) + "\\times 9.81=" + thouSep(load, "\\ ") + "\\ N\\\\\\)";
            suma += "\\(VR=" + vr + "\\ \\ \\ \\ \\ (" + vr + "\\ pulley\\ system)\\\\\\)";
            suma += "\\(effort=" + thouSep(effort, "\\ ") + "\\ N\\\\\\)";
            suma += "\\(MA=\\ ?\\\\\\)";
            suma += "\\(eta=\\ ?\\ \\%\\\\\\)";
            suma += "$$\\begin{aligned}i.\\ \\ MA&=\\frac{load}{effort}=\\frac{" + thouSep(load, "\\ ") + "}{" + 
                    thouSep(effort, "\\ ") + "}=\\underline{\\mathbf{" + dp(load / effort, 2, 2) + "\\ (2\\ dp)}}\\\\[15pt]";
            suma += "ii.\\ \\ \\ \\ \\ \\ \\eta &=\\frac{MA}{VR}\\times100=\\frac{" + ma + "}{" + vr + 
                    "}\\times100=\\underline{\\mathbf{" + dp(eff * 100, 0, -1) + "\\ \\%\\ (0\\ dp)}}\\end{aligned}$$";
            break;
        case 4:
            var notesLink = "images/Sci Bk3 Dynamics v1.9.pdf#page=56";
            sl = rndgen(0.004, 0.007, 3, 0.001, -1);
            radius = rndgen(0.4, 0.476, 3, 0.001, -1);
            se = dp(2 * Math.PI * radius, 3, -1);
            effort = rndgen(35, 50, 0, 1, -1);
            load = rndgen(5000, 6000, 0, 1, -1);
            vr = dp(se / sl, 1, -1);
            ma = dp(load / effort, 1, -1);
            eff = dp(ma / vr * 100, 0, -1);
            sumq += "A screw jack has a thread of pitch " + (sl * 1000) + 
                    "&nbsp;mm and the effort is applied at a radius of  " + dp(radius * 100, 1, -1) + 
                    "&nbsp;cm. It is found by experiment that an effort of " + effort + 
                    "&nbsp;N can lift a load of " + (load / 1000) + 
                    "&nbsp;kN. Find the velocity ratio and mechanical advantage, each to an accuracy of " + 
                    "1 decimal place, and the percentage efficiency to the nearest whole number.";
            suma += "\\(s_L=" + (sl * 1000) + "\\times10^{-3}\\ N\\\\\\)";
            suma += "\\(s_E=2\\pi r=2\\times\\pi\\times" + dp(radius * 100, 1, -1) + "\\times10^{-2}=" + se + 
                    "\\ m\\ (3\\ dp)\\\\\\)";
            suma += "\\(effort=" + effort + "\\ N\\\\\\)";
            suma += "\\(load=" + (load / 1000) + "\\times10^3\\ N\\\\\\)";
            suma += "\\(VR=\\ ?\\\\\\)";
            suma += "\\(MA=\\ ?\\\\\\)";
            suma += "\\(\\eta=\\ ?\\ \\%\\\\\\)";
            suma += "$$\\begin{aligned}VR&=\\frac{ s_E }{ s_L }=\\frac{" + se + "}{" + (sl * 1000) + 
                    "\\times10^{-3}}=\\underline{\\mathbf{" + dp(se / sl, 1, 1) + "\\ (1\\ dp)}}\\\\[25pt]";
            suma += "MA&=\\frac{load}{effort}=\\frac{" + (load / 1000) + "\\times10^3}{" + effort + 
                    "}=\\underline{\\mathbf{" + dp(load / effort, 1, 1) + "\\ (1\\ dp)}}\\\\[25pt]";
            suma += "\\eta&=\\frac{MA}{VR}\\times100=\\frac{" + ma + "}{" + vr + 
                    "}\\times100=\\underline{\\mathbf{" + eff + "\\%\\ (0\\ dp)}}\\end{aligned}$$";
            break;
        case 5:
                var notesLink = "images/Sci Bk3 Dynamics v1.9.pdf#page=56";
            sl = rndgen(0.005, 0.007, 3, 0.001, -1);
            radius = rndgen(0.15, 0.39, 2, 0.01, -1);
            se = dp(2 * Math.PI * radius, 3, -1);
            eff = rndgen(0.35, 0.54, 2, 0.01, -1);
            effort = rndgen(300, 500, 0, 1, -1);
            vr = dp(se / sl, 2, -1);
            ma = dp(eff * vr, 1, -1);
            sumq += "A screw jack has a single start thread of pitch " + (sl * 1000) + 
                    "&nbsp;mm and the effort is applied at a radius of " + radius + 
                    "&nbsp;m. If the efficiency of the jack is " + dp(eff * 100, 2, -1) + 
                    "&nbsp;%, calculate, to the nearest whole number, the maximum load that can be " + 
                    "raised by an effort of " + effort + "&nbsp;N.";
            suma += "\\(s_L=" + (sl * 1000) + "\\times10^{-3}\\ m\\\\\\)";
            suma += "\\(s_E=2\\times \\pi \\times r=2\\times\\pi\\times" + radius + "=" + se + 
                    "\\ m\\ (3\\ dp)\\\\\\)";
            suma += "\\(\\eta=\\frac{" + dp(eff * 100, 2, -1) + "}{100}=" + eff + "\\\\\\)";
            suma += "\\(effort=" + effort + "\\ N\\\\\\)";
            suma += "\\(load=\\ ?\\ N\\\\\\)";
            suma += "$$\\begin{aligned}VR&=\\frac{s_E}{s_L}=\\frac{" + se + "}{" + (sl * 1000) + 
                    "\\times10^{-3}}=" + vr + "\\\\[25pt]";
            suma += "\\eta&=\\frac{MA}{VR}\\\\[5pt]";
            suma += "MA&=\\eta \\times VR=" + eff + "\\times" + vr + "=" + dp(eff * vr, 1, 1) + "\\ (1\\ dp)\\\\[25pt]";
            suma += "MA&=\\frac{load}{effort}\\\\[5pt]";
            suma += "load&=MA\\times effort=" + ma + "\\times" + effort + "=\\underline{\\mathbf{" + 
                    thouSep(dp(ma * effort, 0, -1), "\\ ") + "\\ N\\ (0\\ dp)}}\\end{aligned}$$";
            break;
        case 6:
            var notesLink = "images/Sci Bk3 Dynamics v1.9.pdf#page=56";
            sl = rndgen(0.009, 0.014, 3, 0.001, -1);
            eff = rndgen(0.3, 0.5, 2, 0.01, -1);
            effort = rndgen(30, 75, 0, 1, -1);
            radius = rndgen(0.09, 0.16, 2, 0.01, -1);
            se = dp(2 * Math.PI * radius, 4, -1);
            vr = dp(se / sl, 2, -1);
            ma = dp(eff * vr, 2, -1);
            sumq += "A screw jack has a thread of " + (sl * 1000) + "&nbsp;mm pitch and an efficiency of " + 
                    dp(eff * 100, 2, -1) + "&nbsp;%. An effort of " + effort + "&nbsp;N is applied at a radius of " + 
                    dp(radius * 100, 1, -1) + "&nbsp;cm. Calculate the load that is lifted, accurate to 1 decimal place.";
            suma += "\\(s_L=" + (sl * 1000) + "\\times10^{-3}\\ m\\\\\\)";
            suma += "\\(\\eta=\\frac{" + dp(eff * 100, 2, -1) + "}{100}=" + eff + "\\\\\\)";
            suma += "\\(effort=" + effort + "\\ N\\\\\\)";
            suma += "\\(s_E=2\\times \\pi \\times r=2 \\times \\pi \\times" + (radius * 100) + 
                    "\\times10^{-2}=" + se + "\\ m\\\\\\)";
            suma += "\\(load=\\ ?\\ N\\\\\\)";
            suma += "$$\\begin{aligned}VR&=\\frac{s_E}{s_L}=\\frac{" + se + "}{" + (sl * 1000) + 
                    "\\times10^{-3}}=" + vr + "\\\\[25pt]";
            suma += "\\eta&=\\frac{MA}{VR}\\\\[5pt]";
            suma += "MA&=\\eta \\times VR=" + eff + "\\times" + vr + "=" + dp(eff * vr, 2, 2) + "\\ (2\\ dp)\\\\[25pt]";
            suma += "MA&=\\frac{load}{effort}\\\\[5pt]";
            suma += "load&=MA\\times effort=" + ma + "\\times" + effort + 
                    "=\\underline{\\mathbf{" + (thouSep(dp(ma * effort, 1, 1), "\\ ")) + "\\ N\\ (1\\ dp)}}\\end{aligned}$$";
            break;
        case 7:
            var notesLink = "images/Sci Bk3 Dynamics v1.9.pdf#page=64";
            t1 = rndgen(20, 50, 0, 1, -1);
            t2 = rndgen(60, 90, 0, 1, -1);
            t3 = rndgen(t1 + 10, 50, 0, 1, -1);
            t4 = rndgen(t2 + 20, 110, 0, 1, -1);
            n1 = rndgen(200, 350, 0, 1, -1);
            vr = dp((t2 * t4) / (t1 * t3), 2, -1);
            sumq += "A compound gear train has 2 driver gears, numbers 1 & 3, and 2 driven gears, numbers 2 & 4. " + 
                    "Gears 2 & 3 are mounted on the same shaft. The number of teeth on each gear are:<BR>";
            sumq += " t<sub>1</sub> = " + t1 + "&nbsp;teeth, t<sub>2</sub> = " + t2 + 
                    "&nbsp;teeth, t<sub>3</sub> = " + t3 + "&nbsp;teeth and t<sub>4</sub> =" + t4 + "&nbsp;teeth.<BR>";
            sumq += "If the input speed is " + n1 + 
                    "&nbsp;RPM, calculate the output speed, to an accuracy of 1 decimal place.";
            suma += "\\(t_1=" + t1 + "\\ teeth\\\\\\)";
            suma += "\\(t_2=" + t2 + "\\ teeth\\\\\\)";
            suma += "\\(t_3=" + t3 + "\\ teeth\\\\\\)";
            suma += "\\(t_4=" + t4 + "\\ teeth\\\\\\)";
            suma += "\\(N_1=" + n1 + "\\ RPM\\\\\\)";
            suma += "$$\\begin{aligned}VR&=\\frac{t_2 t_4}{t_1 t_3}=\\frac{" + t2 + "\\times" + t4 + "}{" + t1 + 
                    "\\times" + t3 + "}=" + dp((t2 * t4) / (t1 * t3), 2, 2) + "\\ (2\\ dp)\\\\[25pt]";
            suma += "VR&=\\frac{N_1}{N_4}\\\\[5pt]";
            suma += "N_4&=\\frac{N_1}{VR}=\\frac{" + n1 + "}{" + vr + "}=\\underline{\\mathbf{" + 
                    dp(n1 / vr, 1, 1) + "\\ RPM\\ (1\\ dp)}}\\end{aligned}$$";
            break;
        case 8:
            var notesLink = "images/Sci Bk3 Dynamics v1.9.pdf#page=64";
            t1 = rndgen(20, 40, 0, 1, -1);
            t2 = rndgen(90, 110, 0, 1, -1);
            t3 = rndgen(60, 80, 0, 1, -1);
            t4 = rndgen(120, 140, 0, 1, -1);
            vr = dp((t2 * t4) / (t1 * t3), 0, -1);
            do {
                ma = rndgen(2, 3, 1, 0.1, -1);
            } while(ma > (0.9 * vr))
            sumq += "A compound gear train consists of gear 1, with " + t1 + "&nbsp;teeth, meshing with the " + 
                    t2 + "&nbsp;teeth of gear 2. Gear 3, on the same shaft as gear 2, has " + t3 + 
                    "&nbsp;teeth and meshes with the " + t4 + "&nbsp;teeth of gear 4. Calculate, to the nearest whole number, " + 
                    "the velocity ratio and the percentage efficiency, if the mechanical advantage is " + ma;
            suma += "\\(t_1=" + t1 + "\\ teeth\\\\\\)";
            suma += "\\(t_2=" + t2 + "\\ teeth\\\\\\)";
            suma += "\\(t_3=" + t3 + "\\ teeth\\\\\\)";
            suma += "\\(t_4=" + t4 + "\\ teeth\\\\\\)";
            suma += "\\(MA=" + ma + "\\\\\\)";
            suma += "\\(VR=\\ ?\\\\\\)";
            suma += "\\(\\eta=\\ ?\\ \\%\\\\\\)";
            suma += "$$\\begin{aligned}VR&=\\frac{t_2 t_4}{t_1 t_3}=\\frac{" + t2 + "\\times" + t4 + 
                    "}{" + t1 + "\\times" + t3 + "}=\\underline{\\mathbf{" + vr + "\\ (0\\ dp)}}\\\\[25pt]";
            suma += "\\eta &=\\frac{MA}{VR}\\times 100=\\frac{" + ma + "}{" + vr + 
                    "}\\times 100=\\underline{\\mathbf{" + dp((ma / vr) * 100, 0, -1) + 
                    "\\ \\%\\ (0\\ dp)}}\\end{aligned}$$";
            break;
    }
    
    var sumArray = [sumq, suma, notesLink];
    return sumArray;
}