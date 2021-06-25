var prevsum = 0, s, u, v, a, t, s_part, m, t1, t2, t3, s1, s2, s3, st;
function linmot() {
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
        window.open("images/Sci Bk3 Dynamics v1.9.pdf#page=5", "_blank")
    }
    do {
        sum = rndgen(1, 11, 0, 1, -1);
    } while(sum === prevsum)
    prevsum = sum;
    switch(sum) {
        case 1:
            do {
                u = rndgen(0, 8.3, 1, 0.1, -1);
                a = rndgen(0.5, 9, 1, 0.1, -1);
                t = rndgen(1.5, 7, 1, 0.1, -1);
            } while(u + (a * t) > 45 || u + (a * t) < 0 || u === 1 || t === 1)
            sumq += "A car initially travelling at " + dp(u * 3.6, 2, -1) + " km/h accelerates at " + a + 
                        " m/s\u00B2 for " + t + " s. What is its final velocity?";
            suma += "\\(u=" + dp(u * 3.6, 2, -1) + "\\times \\frac{1000}{3600}=" + u + "\\ m/s\\\\\\)";
            suma += "\\(a=" + a + "\\ m/s^2\\\\\\)";
            suma += "\\(t=" + t + "\\ s\\\\\\)";
            suma += "\\(v=\\ ?\\ m/s\\)";
            suma += "$$\\begin{aligned}v&=u+at\\\\[5pt]";
            suma += "&=" + u + "+" + a + "\\times" + t + "\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + dp(u + (a * t), 2, -1) + "\\ m/s\\ (2\\ dp)}}\\end{aligned}$$";
            break;
        case 2:
            do {
                u = rndgen(4, 8.1, 1, 0.1, -1);
                v = rndgen(12, 24.1, 1, 0.1, -1);
                a = rndgen(0.9, 2.5, 1, 0.1, -1);
            } while(dp((v - u) / a, 2, -1) - (v - u) / a !== 0 || a === 1)
            sumq += "A cyclist starts at " + u + " m/s and accelerates to " + v + 
                        " m/s down a slope. If the acceleration rate is " + a + 
                        " m/s\u00B2, for how long does the acceleration last?";
            suma += "\\(u=" + u + "\\ m/s\\\\\\)";
            suma += "\\(v=" + v + "\\ m/s\\\\\\)";
            suma += "\\(a=" + a + "\\ m/s^2\\\\\\)";
            suma += "\\(t=\\ ?\\ s\\)";
            suma += "$$\\begin{aligned}v&=u+at\\\\[5pt]";
            suma += "t&=\\frac{v-u}{a}\\\\[5pt]";
            suma += "&=\\frac{" + v + "-" + u + "}{" + a + "}\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + (v-u)/a + "\\ s}}\\end{aligned}$$";
            break;
        case 3:   
            s = rndgen(50, 201, 0, 1, -1);
            s_part = rndgen(5, s - 10, 0, 1, -1);
            u = 0;
            a = 9.81;
            v = dp(Math.sqrt(2 * a * s), 2, -1);
            sumq += "A stone is dropped down a mineshaft " + s + " m deep.<BR>";
            sumq += "i.&nbsp&nbsp At what velocity does it strike the bottom? (Round your answer to 2 decimal places)<BR>";
            sumq += "ii.&nbsp How long does it take to fall? (Round your answer to 2 decimal places)<BR>";
            sumq += "iii. How fast is it going after falling " + s_part + " m? (Round your answer to 2 decimal places)";
            suma += "\\(s=" + s + "\\ m\\\\\\)";
            suma += "\\(u =\\ 0\\ m/s\\\\\\)";
            suma += "\\(a=\\ 9.81\\ m/s^2\\\\\\)";
            suma += "\\(v=\\ ?\\ m/s\\\\\\)";
            suma += "\\(t=\\ ?\\ s\\\\\\)";
            suma += "$$\\begin{aligned}i.\\ \\ \\ \\ v^2&=u^2+2as\\\\[5pt]";
            suma += "v&=\\sqrt{u^2+2as}\\\\[5pt]";
            suma += "&=\\sqrt{" + u + "^2+2\\times" + a + "\\times" + s + "}\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + dp(Math.sqrt(2 * a * s), 2, -1) + "\\ m/s\\ (2\\ dp)}}\\\\[15pt]";
            suma += "ii.\\ \\ \\ v&=u+at\\\\[5pt]";
            suma += "t&=\\frac{v-u}{a}\\\\[5pt]";
            suma += "&=\\frac{" + v + "-" + u + "}{" + a + "}\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + dp((v - u) / a, 2, -1) + "\\ s\\ (2\\ dp)}}\\\\[15pt]";
            suma += "iii.\\ \\ v^2&=u^2+2as\\\\[5pt]";
            suma += "v&=\\sqrt{u^2+2as}\\\\[5pt]";
            suma += "&=\\sqrt{" + u + "^2+2\\times" + a + "\\times" + s_part + "}\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + dp(Math.sqrt(2 * a * s_part), 2, -1) + "\\ m/s\\ (2\\ dp)}}\\end{aligned}$$";
            break;
        case 4:
            m = rndgen(600, 2301, 0, 1, -1);
            u = rndgen(13.89, 27.79, 2, 0.01, -1);
            v = rndgen(5.56, u - 5.56, 2, 0.01, -1);
            s = rndgen(50, 210.5, 1, 0.5, -1);
            a = dp((Math.pow(v, 2) - Math.pow(u, 2)) / (2 * s), 2, -1);
            sumq += "A " + thouSep(m, " ") + " kg car brakes from " + dp(u * 3.6, 2, -1) + " km/h to " + 
                    dp(v * 3.6, 2, -1) + " km/h over a distance of " + s + " m.<BR>";
            sumq += "i.&nbsp&nbsp What is the rate of deceleration? Round your answer to 2 decimal places.<BR>";
            sumq += "ii.&nbsp How long does the braking last for? Round your answer to 2 decimal places.<BR>";
            sumq += "iii. What is the change in momentum?<BR>";
            sumq += "iv. What is the size of the braking force, in kN, to 1 decimal place?";
            suma += "\\(m=" + thouSep(m, "\\ ") + " kg\\\\\\)";
            suma += "\\(u=" + dp(u * 3.6, 2, -1) + "\\times \\frac{1000}{3600}=" + u + "\\ m/s\\\\\\)";
            suma += "\\(v=" + dp(v * 3.6, 2, -1) + "\\times \\frac{1000}{3600}=" + v + "\\ m/s\\\\\\)";
            suma += "\\(s=" + s + "\\ m\\\\\\)";
            suma += "\\(a=\\ ?\\ m/s^2\\\\\\)";
            suma += "\\(t=\\ ?\\ s\\\\\\)";
            suma += "\\(p=\\ ?\\ kgm/s\\\\\\)";
            suma += "\\(F=\\ ?\\ N\\\\\\)";
            suma += "$$\\begin{aligned}i.\\ \\ \\ v^2&=u^2+2as\\\\[5pt]";
            suma += "a&=\\frac{v^2-u^2}{2s}=\\frac{" + v + "^2-" + u + "^2}{2\\times" + s + "}=\\underline{\\mathbf{" + 
                    dp((Math.pow(v, 2) - Math.pow(u, 2)) / (2 * s), 3, 2) + "\\ m/s^2\\ (2\\ dp)}}\\\\[15pt]";
            suma += "ii.\\ \\ \\ v&=u+at\\\\[5pt]";
            suma += "t&=\\frac{v-u}{a}=\\frac{" + v + "+" + u + "}{" + a + "}=\\underline{\\mathbf{" + 
                    dp((v - u) / a, 2, 2) + "\\ s\\ (2\\ dp)}}\\\\[15pt]";
            suma += "iii.\\ \\ p&=m(v_2-v_1)=" + thouSep(m, "\\ ") + "\\times(" + v + "-" + u + 
                    ")=\\underline{\\mathbf{" + thouSep(dp(m * (v - u), 2, -1), "\\ ") + "\\ kgm/s}}\\\\[15pt]";
            suma += "iv.\\ \\ F&=ma=" + thouSep(m, "\\ ") + "\\times" + a + "=\\underline{\\mathbf{" + 
                    thouSep(dp(m * a, 1, 1), "\\ ") + "\\ N\\ (1\\ dp)}}\\end{aligned}$$";
            break;
        case 5:
            u = rndgen(25, 65.5, 1, 0.5, -1);
            a = 9.81;
            v = 0;
            sumq += "An arrow is fired vertically into the air at a velocity of " + u + " m/s.<BR>";
            sumq += "i.&nbsp&nbsp How high does the arrow fly? Round your answer to 2 decimal places.<BR>";
            sumq += "ii.&nbsp How long does it take the arrow to return to the ground? "
            sumq += "Round your answer to 2 decimal places.<BR>";
            suma += "\\(u=" + u + "\\ m/s\\\\\\)";
            suma += "\\(a=9.81\\ m/s\\\\\\)";
            suma += "\\(v=0\\ m/s\\\\\\)";
            suma += "\\(s=\\ ?\\ m\\\\\\)";
            suma += "\\(t=\\ ?\\ s\\\\\\)";
            suma += "$$\\begin{aligned}i.\\ \\ v^2&=u^2+2as\\\\[5pt]";
            suma += "s&=\\frac{v^2-u^2}{2a}=\\frac{" + v + "^2-" + u + "^2}{2\\times" + a * -1 + 
                    "}=\\underline{\\mathbf{" + dp((Math.pow(v, 2)-Math.pow(u, 2)) / (2 * a * -1), 3, 2) + 
                    "\\ m\\ (2\\ dp)}}\\\\[15pt]";
            suma += "ii.\\ \\ v&=u+at\\\\[5pt]";
            suma += "t&=\\frac{v-u}{a}=\\frac{" + u + "-" + v + "}{" + a + "}=\\underline{\\mathbf{" + 
                    dp((u - v) / a, 3, 2) + "\\ s\\ (2\\ dp)}}\\end{aligned}$$";
            break;
        case 6:
            do {
                u = rndgen(5, 15, 0, 1, -1);
                t = rndgen(2.1, 3.2, 1, 0.1, -1);
                s = rndgen(15, 26, 0, 1, -1);
                a = dp(2 * (s - u * t) / Math.pow(t, 2), 3, 2);
                v = dp(u + (a * t), 3, 2);
            } while (u * t <= s)
            sumq += "An ice hockey puck slides over a horizontal sheet of ice. ";
            sumq += "It passes point A with a velocity of " + u + " m/s and, " + t + 
                    " s later, passes point B. If the distance between A and B is " + s + " m ,determine:<BR>";
            sumq += "i.&nbsp&nbsp The retardation, to 2 decimal places.<BR>";
            sumq += "ii.&nbsp Its velocity as it passes point B, to 2 decimal places.<BR>";
            sumq += "iii. After passing point A, how long does it take for the puck to stop, to 2 decimal places.";
            suma += "\\(u=" + u + "\\ m/s\\\\\\)";
            suma += "\\(t=" + t + "\\ s\\\\\\)";
            suma += "\\(s=" + s + "\\ m\\\\\\)";
            suma += "\\(a=\\ ?\\ m/s^2\\\\\\)";
            suma += "\\(v=\\ ?\\ m/s\\\\\\)";
            suma += "$$\\begin{aligned}i.\\ \\ \\ s&=ut+\\frac{1}{2}at^2\\\\[5pt]";
            suma += "a&=\\frac{2(s-ut)}{t^2}=\\frac{2(" + s + "-" + u + "\\times" + t + ")}{" + t + 
                    "^2}=\\underline{\\mathbf{" + a + "\\ m/s^2\\ (2\\ dp)}}\\\\[15pt]";
            suma += "ii.\\ \\ v&=u+at=" + u + "+" + a + "\\times" + t + "=\\underline{\\mathbf{" + v + 
                    "\\ m/s\\ (2\\ dp)}}\\\\[15pt]";
            suma += "iii.\\ v&=u+at\\\\[5pt]";
            suma += "t&=\\frac{v-u}{a}=\\frac{" + 0 + "-" + u + "}{" + a + "}=\\underline{\\mathbf{" + 
                    dp((0 - u) / a, 3, 2) + "\\ s\\ (2\\ dp)}}\\end{aligned}$$";
            break;
        case 7:
            u = rndgen(25, 66, 0, 1, -1);
            s = rndgen(50, 201, 1, 0.5, -1);
            a = 9.81;
            v = dp(Math.sqrt(Math.pow(u, 2) + 2 * a * s), 3, 2);
            sumq += "An arrow is fired at " + u + " m/s down a " + s + " m deep mineshaft.<BR>";
            sumq += "i.&nbsp&nbsp How fast will it be going when it reaches the bottom? ";
            sumq += "Round your answer to 2 decimal places.<BR>";
            sumq += "ii.&nbsp How long does it take to reach the bottom? Round your answer to 2 decimal places.<BR>";
            suma += "\\(u=" + u + "\\ m/s\\\\\\)";
            suma += "\\(s=" + s + "\\ m\\\\\\)";
            suma += "\\(a=\\ 9.81\\ m/s^2\\\\\\)";
            suma += "\\(v=\\ ?\\ m/s\\\\\\)";
            suma += "\\(t=\\ ?\\ s\\\\\\)";
            suma += "$$\\begin{aligned}i.\\ \\ \\ v^2&=u^2+2as\\\\[5pt]";
            suma += "v&=\\sqrt{u^2+2as}=\\sqrt{" + u + "^2+2\\times" + a + "\\times" + s + 
                    "}=\\underline{\\mathbf{" + v + "\\ m/s\\ (2\\ dp)}}\\\\[15pt]";
            suma += "ii.\\ \\ v&=u+at\\\\[5pt]";
            suma += "t&=\\frac{v-u}{a}=\\frac{" + v + "-" + u + "}{" + a + "}=\\underline{\\mathbf{" + dp((v - u) / a, 3, 2) + "\\ s\\ (2\\ dp)}}\\end{aligned}$$";
            break;
        case 8:
            u = rndgen(1.1, 3.2, 1, 0.1, -1);
            s = rndgen(8, 11, 0, 1, -1);
            t = rndgen(1.5, 2.6, 1, 0.1, -1);
            a = dp((2 * (s - u * t)) / (Math.pow(t, 2)), 3, 2);
            sumq += "A ball, initially travelling at " + u + 
                    " m/s, starts to roll down a hill. The distance down the incline is " + s + 
                    " m and it travels this in " + t + " s.<BR>";
            sumq += "i.&nbsp&nbsp What is the rate of acceleration of the ball? Round your answer to 2 decimal places.<BR>";
            sumq += "ii.&nbsp What will the ball's velocity be at the bottom of the incline? Round your answer to 2 decimal places.";
            suma += "\\(u=" + u + "\\ m/s\\\\\\)";
            suma += "\\(s=" + s + "\\ m\\\\\\)";
            suma += "\\(t=" + t + "\\ s\\\\\\)";
            suma += "\\(a=\\ ?\\ m/s^2\\\\\\)";
            suma += "\\(v=\\ ?\\ m/s\\\\\\)";
            suma += "$$\\begin{aligned}i.\\ \\ \\ s&=ut+\\frac{1}{2}at^2\\\\[5pt]";
            suma += "a&=\\frac{2(s-ut)}{t^2}=\\frac{2(" + s + "-" + u + "\\times" + t + 
                    ")}{" + t + "^2}=\\underline{\\mathbf{" + a + "\\ m/s^2\\ (2\\ dp)}}\\\\[15pt]";
            suma += "ii.\\ \\ v&=u+at=" + u + "+" + a + "\\times" + t + 
                    "=\\underline{\\mathbf{" + dp(u + a * t, 3, 2) + "\\ m/s\\ (2\\ dp)}}\\end{aligned}$$";
            break;
        case 9:
            u = rndgen(50, 80, 1, 0.1, -1);
            t = rndgen(17, 33, 0, 1, -1);
            v = rndgen(8.3, 9.7, 1, 0.1, -1);
            sumq += "An aircraft lands on a horizontal runway with a touchdown velocity of " + 
                    dp(u * 3.6, 2, -1) + " km/h. If it takes " + t + 
                    " s to slow to the taxiing velocity of " + dp(v * 3.6, 2, -1) + " km/h, find:<BR>";
            sumq += "i.&nbsp&nbsp the distance travelled, to the nearest meter.<BR>";
            sumq += "ii.&nbsp the rate of deceleration, rounded to 2 decimal places.";
            suma += "\\(u=" + dp(u * 3.6, 2, -1) + "\\times \\frac{1000}{3600}=" + u + "\\ m/s\\\\\\)";
            suma += "\\(t=" + t + "\\ s\\\\\\)";
            suma += "\\(v=" + dp(v * 3.6, 2, -1) + "\\times \\frac{1000}{3600}=" + v + "\\ m/s\\\\\\)";
            suma += "$$\\begin{aligned}i.\\ \\ \\ s&=\\frac{1}{2}(u+v)t=\\frac{1}{2}(" + 
                    u + "+" + v + ")\\times" + t + "=\\underline{\\mathbf{" + 
                    thouSep(dp(0.5 * t * (u + v), 1, 0), "\\ ") + "\\ m\\ (0\\ dp)}}\\\\[15pt]";
            suma += "ii.\\ \\ v&=u+at\\\\[5pt]";
            suma += "a&=\\frac{v-u}{t}=\\frac{" + v + "-" + u + "}{" + t + "}=\\underline{\\mathbf{" + 
                    dp((v - u) / t, 3, 2) + "\\ m/s^2\\ (2\\ dp)}}\\end{aligned}$$";
            break;
        case 10:
            do {
                u = 0;
                v = rndgen(5.5, 16, 1, 0.1, -1);
                t1 = rndgen(5, 12, 0, 1, -1);
                t2 = rndgen(70, 211, 0, 1, -1);
                t3 = rndgen(2, 8, 0, 1, -1);
                s1 = dp(0.5 * v * t1, 2, -1);
                s2 = dp(v * t2, 2, -1);
                s3 = dp(0.5 * v * t3, 2, -1);
                st = s1 + s2 + s3;
            } while (t1 === t3)
            sumq += "A cyclist accelerates from rest to a velocity of " + v + " m/s in " + 
                    t1 + " s. He then continues at this velocity for " + 
                    fromsecs(t2) + ", before coming to rest in " + t3 + " s.<BR>";
            sumq += "i.&nbsp&nbsp Calculate the distance covered during each of the 3 phases of the journey.<BR>";
            sumq += "ii.&nbsp What is the total distance covered?<BR>";
            sumq += "iii. What is the average velocity of the cyclist, to 2 decimal places?<BR>";
            suma += "\\(u=" + u + "\\ m/s\\\\\\)";
            suma += "\\(v=" + v + "\\ m/s\\\\\\)";
            suma += "\\(t_1=" + t1 + "\\ s\\\\\\)";
            suma += "\\(t_2=" + Math.floor(t2 / 60) + "\\times60+" + t2 % 60 + "=" + t2 + "\\ s\\\\\\)";
            suma += "\\(t_3=" + t3 + "\\ s\\\\\\)";
            suma += "$$\\begin{aligned}i.\\ \\ \\ s_1&=\\frac{1}{2}(v+u)t=\\frac{1}{2}(" + 
                    v + "+" + u + ")\\times" + t1 + "=\\underline{\\mathbf{" + s1 + "\\ m}}\\ \\ \\ Acceleration\\ phase.\\\\[5pt]";
            suma += "s_2&=vt=" + v + "\\times" + t2 + "=\\underline{\\mathbf{" + thouSep(s2, "\\ ") + "\\ m}}\\ \\ \\ Steady\\ phase.\\\\[5pt]";
            suma += "s_3&=\\frac{1}{2}(v+u)t=\\frac{1}{2}(" + 
                    v + "+" + u + ")\\times" + t3 + "=\\underline{\\mathbf{" + s3 + "\\ m}}\\ \\ \\ Deceleration\\ phase.\\\\[15pt]";
            suma += "ii.\\ \\ s_T&=s_1+s_2+s_3=" + s1 + "+" + thouSep(s2, "\\ ") + "+" + s3 + "=\\underline{\\mathbf{" + thouSep(st) + "\\ m}}\\\\[15pt]";
            suma += "iii.\\ v&=\\frac{s}{t}=\\frac{s_T}{t_1+t_2+t_3}=\\frac{" + thouSep(st, "\\ ") + "}{" + t1 + "+" + t2 + "+" + t3 + "}=\\underline{\\mathbf{" + dp(st / (t1 + t2 + t3), 3, 2) + "\\ m/s\\ (2\\ dp)}}\\end{aligned}$$";
            break;
        case 11:
            do {
                u = rndgen(205, 226, 0, 1,-1);
                v = rndgen(236, 259, 0, 1, -1);
                t1 = rndgen(40, 59, 0, 1, -1);
                t2 = rndgen(1200, 3001, 0, 1, -1);
                t3 = rndgen(40, 59, 0, 1, -1);
                s1 = dp(0.5 * (v + u) * t1, 2, -1);
                s2 = dp(v * t2, 2, -1);
                s3 = dp(0.5 * (u + 20 + v) * t3, 2, -1);
                st = s1 + s2 + s3;
            } while(t1 === t3 || v < u + 20)
            sumq += "An aircraft in flight accelerates from " + dp(u * 3.6, 2, -1) + " km/h to " + 
                    dp(v * 3.6, 2, -1) + " km/h in " + t1 + " s. It then continues at this velocity for " + 
                    fromsecs(t2) + ", before slowing to " + dp((u + 20) * 3.6, 2, -1) + " km/h in " + t3 + " s.<BR>";
            sumq += "i.&nbsp&nbsp Calculate the distance covered during each of the 3 phases of the journey.<BR>";
            sumq += "ii.&nbsp What is the total distance covered?<BR>";
            sumq += "iii. What is the average velocity of the aircraft, to 2 decimal places?";
            suma += "\\(u_1=" + dp(u * 3.6, 2, -1) + "\\times\\frac{1000}{3600}=" + u + "\\ m/s\\\\\\)";
            suma += "\\(v_1=" + dp(v * 3.6, 2, -1) + "\\times\\frac{1000}{3600}=" + v + "\\ m/s\\\\\\)";
            suma += "\\(v_2=" + dp(v * 3.6, 2, -1) + "\\times\\frac{1000}{3600}=" + v + "\\ m/s\\\\\\)";
            suma += "\\(u_3=" + dp(v * 3.6, 2, -1) + "\\times\\frac{1000}{3600}=" + v + "\\ m/s\\\\\\)";
            suma += "\\(v_3=" + dp((u + 20) * 3.6, 2, -1) + "\\times\\frac{1000}{3600}=" + (u + 20) + "\\ m/s\\\\\\)";
            suma += "\\(t_1=" + t1 + "\\ s\\\\\\)";
            suma += "\\(t_2=" + Math.floor(t2 / 60) + "\\times60+" + t2 % 60 + "=" + thouSep(t2, "\\ ") + "\\ s\\\\\\)";
            suma += "\\(t_3=" + t3 + "\\ s\\\\\\)";
            suma += "$$\\begin{aligned}i.\\ \\ \\ s_1&=\\frac{1}{2}(v_1+u_1)t_1=\\frac{1}{2}(" + 
                    v + "+" + u + ")\\times" + t1 + "=\\underline{\\mathbf{" + 
                    thouSep(dp(0.5 * t1 * (v + u), 2, -1), "\\ ") + "\\ m}}\\ \\ \\ Acceleration\\ phase\\\\[5pt]";
            suma += "s_2&=v_2t_2=" + v + "\\times" + thouSep(t2, "\\ ") + "=\\underline{\\mathbf{" + 
                    thouSep(dp(v * t2, 2, -1), "\\ ") + "\\ m}}\\ \\ \\ Steady\\ phase\\\\[5pt]";
            suma += "s_3&=\\frac{1}{2}(v_3+u_3)t_3=\\frac{1}{2}(" + (u + 20) + "+" + v + ")\\times" + t3 + 
                    "=\\underline{\\mathbf{" + thouSep(dp(0.5 * t3 + (u + 20 + v), 2, -1), "\\ ") + 
                    "\\ m}}\\ \\ \\ Deceleration\\ phase\\\\[15pt]";
            suma += "ii.\\ s_T&=s_1+s_2+s_3=" + thouSep(s1, "\\ ") + "+" + thouSep(s2, "\\ ") + "+" + 
                    thouSep(s3, "\\ ") + "=\\underline{\\mathbf{" + thouSep(dp(s1 + s2 + s3, 2, -1), "\\ ") + "\\ m}}\\\\[15pt]";
            suma += "iii.\\ v&=\\frac{s}{t}=\\frac{s_T}{t_1+t_2+t_3}=\\frac{" + 
                    thouSep(st, "\\ ") + "}{" + t1 + "+" + t2 + "+" + t3 + "}=\\underline{\\mathbf{" + 
                    dp(st / (t1 + t2 + t3), 3, 2) + "\\ m/s\\ (2\\ dp)}}\\end{aligned}$$";
            break;
    }
    document.getElementById("q").innerHTML = sumq;
    document.getElementById("btnSoln").style.visibility="visible";
}