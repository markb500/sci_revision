var ctx, ctx2, wt = 0, ang = 0, cf = 0, lift = 0, origx = 0, origy = 0, wtx = 0, wty = 0, cfx = 0, cfy = 0;
var cfextx = 0, cfexty = 0, liftextx = 0, liftexty = 0, jetroll = false;
function jetbank() {
    document.getElementById("btnShowhow").style.visibility="hidden";
    document.getElementById("myCanvas");
    myCanvas.height = 650;
    myCanvas.width = 550;
    ctx = myCanvas.getContext('2d');
    document.getElementById("myCanvas2");
    myCanvas2.height = 650;
    myCanvas2.width = 550;
    myCanvas2.style.visibility = "hidden";
    ctx2 = myCanvas2.getContext('2d');
    ctx2.clearRect(0, 0, myCanvas2.width, myCanvas2.height);
    sumq = "";
    suma = "";
    document.getElementById("a").innerHTML = "";
    document.getElementById("noteslink").style.visibility="visible";
    document.getElementById("noteslink").onclick = function() {
        window.open("images/Sci Bk2 Statics v1.10.pdf#page=15", "_blank")
    }
    wt = rndgen(300, 450, 0, 25, -1);
    ang = rndgen(20, 40, 0, 1, -1);
    cf = dp(wt * Math.tan(ang * (Math.PI / 180)), 0, -1);
    lift = dp(wt / Math.cos(ang * (Math.PI / 180)), 0, -1);

    sumq += "An aircraft of weight " + wt + "&nbsp;kN enters a " + ang + "<sup>O</sup> banked turn. "
    sumq += "Use a vector diagram to find the size of the centrifugal force and lift required to balance the turn."

    origx = 400;
    origy = 50;
    wtx = origx;
    wty = wt + origy;
    cfx = wtx - cf;
    cfy = wty;
    cfextx = cfx - 50;
    cfexty = cfy;
    liftextx = cfx - 50 * Math.sin(ang * (Math.PI / 180));
    liftexty = cfy + 50 * Math.cos(ang * (Math.PI / 180));
    jetup = false;
    space = false;
    pinjt = false;
    jetroll = true;

    ctx2.linewidth = 2;
    ctx2.strokeStyle = '#ff0000';
    ctx2.beginpath;
    ctx2.moveTo(origx, origy);
    ctx2.lineTo(wtx, wty);
    ctx2.lineTo(cfx, cfy);
    ctx2.lineTo(origx, origy);
    ctx2.strokeRect(wtx - 15, wty, 15, -15);
    ctx2.font = "15px Comic Sans MS";
    ctx2.fillStyle = "red";
    ctx2.textAlign = "left";
    ctx2.fillText(" weight", origx + 10, origy + 0.5 * (wty - origy));
    ctx2.fillText(wt + " kN", origx + 10, origy + 20 + 0.5 * (wty - origy));
    ctx2.textAlign = "center";
    ctx2.fillText("centrifugal force", cfx + 0.5 * (wtx - cfx), cfy + 20);
    ctx2.font = "bold 15px Comic Sans MS";
    ctx2.fillText(cf + " kN (\u00B1 4 kN)", cfx + 0.5 * (wtx - cfx), cfy + 40);
    ctx2.font = "normal 15px Comic Sans MS";
    ctx2.textAlign = "right";
    ctx2.fillText(ang + "\xB0", origx - 2, origy + 72);
    ctx2.fillText(" lift        ", cfx + 0.5 * (origx - cfx), cfy - 35 - 0.5 * (cfy - origy));
    ctx2.font = "bold 15px Comic Sans MS";
    ctx2.fillText(lift + " kN (\u00B1 4 kN)", cfx + 0.5 * (origx - cfx), cfy - 15 - 0.5 * (cfy - origy));
    ctx2.font = "normal 15px Comic Sans MS";
    ctx2.textAlign = "left";
    ctx2.fillText("Drawing not to scale.", 0, 20);
    ctx2.fillText("Scale given as an example.", 0, 40);
    ctx2.fillText("   Scale 1 cm : 50 kN", 0, 70);
    ctx2.lineWidth = 1;
    ctx2.beginPath;
    ctx2.moveTo(origx, origy + 40);
    ctx2.arc(origx, origy, 40, Math.PI / 2, Math.PI / 2 + (Math.PI / 180) * ang, false);
    ctx2.stroke();
    arrhead(ctx2, wtx, wty, 90, 2, "red");
    arrhead(ctx2, cfx, cfy, 180, 2, "red");
    arrhead(ctx2, origx, origy, 270 + ang, 2, "red")

    document.getElementById("q").innerHTML = sumq;
    document.getElementById("btnSoln").style.visibility="visible";
}

function animsolnroll() {
    //Runs animation when 'Show me how' clicked
    $(':button').prop('disabled', true);
    ctx2.clearRect(0, 0, myCanvas2.width, myCanvas2.height);
    drawline(ctx2, origx, origy, wtx, wty, 2, "red", false);
    setTimeout(function() {arrhead(ctx2, wtx, wty, 90, 2, "red")}, 600);
    setTimeout(function() {drawline(ctx2, wtx, wty, cfextx, cfexty, 1, "red", true)}, 1200);
    ctx2.moveTo(origx, origy + 40);
    setTimeout(function() {drawarc(ctx2, origx, origy, 40, Math.PI / 2, 
                            (Math.PI / 2) + (Math.PI/180) * ang, false)}, 1800);
    setTimeout(function() {drawline(ctx2, origx, origy, liftextx, liftexty, 1, "red", true)}, 2400);
    setTimeout(function() {drawline(ctx2, wtx, wty, cfx, cfy, 2, "red", false)}, 3000);
    setTimeout(function() {arrhead(ctx2, cfx, cfy, 180, 2, "red")}, 3600);
    setTimeout(function() {drawline(ctx2, cfx, cfy, origx, origy, 2, "red", false)}, 4200);
    setTimeout(function() {arrhead(ctx2, origx, origy, 270 + ang, 2, "red")}, 4800);
    setTimeout(otherstuffroll, 5400);
    function otherstuffroll() {
        ctx2.lineWidth = 2;
        ctx2.strokeStyle = '#ff0000';
        ctx2.beginPath;
        ctx2.strokeRect(wtx - 15, wty, 15, -15);
        ctx2.stroke();
        ctx2.font = "15px Comic Sans MS";
        ctx2.fillStyle = "red";
        ctx2.textAlign = "left";
        ctx2.fillText(" weight", origx + 10, origy + 0.5 * (wty - origy));
        ctx2.fillText(wt + " kN", origx + 10, origy + 20 + 0.5 * (wty - origy));
        ctx2.textAlign = "center";
        ctx2.fillText("centrifugal force", cfx + 0.5 * (wtx - cfx), cfy + 20);
        ctx2.font = "bold 15px Comic Sans MS";
        ctx2.fillText(cf + " kN (\u00B1 4 kN)", cfx + 0.5 * (wtx - cfx), cfy + 40);
        ctx2.font = "normal 15px Comic Sans MS";
        ctx2.textAlign = "right";
        ctx2.fillText(ang + "\xB0", origx - 2, origy + 72);
        ctx2.fillText(" lift        ", cfx + 0.5 * (origx - cfx), cfy - 35 - 0.5 * (cfy - origy));
        ctx2.font = "bold 15px Comic Sans MS";
        ctx2.fillText(lift + " kN (\u00B1 4 kN)", cfx + 0.5 * (origx - cfx), cfy - 15 - 0.5 * (cfy - origy));
        ctx2.font = "normal 15px Comic Sans MS";
        ctx2.textAlign = "left";
        ctx2.fillText("Drawing not to scale.", 0, 20);
        ctx2.fillText("Scale given as an example.", 0, 40);
        ctx2.fillText("   Scale 1 cm : 50 kN", 0, 70);
        ctx2.setLineDash([]);
        $(':button').prop('disabled', false);
    }
}