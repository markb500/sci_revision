var ctx, ctx2, wt = 0, ang = 0, thrust = 0, lift = 0, origx = 0, origy = 0, wtx = 0, wty = 0;
var thrustx = 0, thrusty = 0, thrustextx = 0, thrustexty = 0, liftextx = 0, liftexty = 0, jetup = false;
function jetclimb() {
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
        window.open("images/Sci Bk2 Statics v1.10.pdf#page=14", "_blank")
    }
    wt = rndgen(300, 450, 0, 1, -1);
    ang = rndgen(20, 40, 0, 1, -1);
    thrust = dp(wt * Math.sin(ang * (Math.PI / 180)), 0, -1);
    lift = dp(wt * Math.cos(ang * (Math.PI / 180)), 0, -1);

    sumq += "A jet of weight " + wt + "&nbsp;kN is in a constant velocity climb at an angle of " + ang + "<sup>O</sup>. "
    sumq += "Use a vector diagram to find the size of the net thrust and lift required to maintain the climb.";

    origx = 350;
    origy = 50;
    wtx = origx;
    wty = wt + origy;
    thrustx = wtx - thrust * Math.cos(ang * (Math.PI / 180));
    thrusty = wty - thrust * Math.sin(ang * (Math.PI / 180));
    thrustextx = thrustx - 50 * Math.cos(ang * (Math.PI / 180));
    thrustexty = thrusty - 50 * Math.sin(ang * (Math.PI / 180));
    liftextx = thrustx - 50 * Math.sin(ang * (Math.PI / 180));
    liftexty = thrusty + 50 * Math.cos(ang * (Math.PI / 180));
    jetroll = false;
    space = false;
    pinjt = false;
    jetup = true;

    ctx2.linewidth = 2;
    ctx2.strokeStyle = '#ff0000';
    ctx2.beginpath;
    ctx2.moveTo(origx, origy);
    ctx2.lineTo(wtx, wty);
    ctx2.lineTo(thrustx, thrusty);
    ctx2.lineTo(origx, origy);
    ctx2.translate(thrustx, thrusty);
    ctx2.rotate(ang * (Math.PI / 180));
    ctx2.translate(-thrustx, -thrusty);
    ctx2.strokeRect(thrustx, thrusty, 15, -15);
    ctx2.setTransform(1, 0, 0, 1, 0, 0);
    ctx2.stroke();
    ctx2.font = "15px Comic Sans MS";
    ctx2.fillStyle = "red";
    ctx2.textAlign = "left";
    ctx2.fillText(" weight", origx + 10, origy + 0.5 * (wty - origy));
    ctx2.fillText(wt + " kN", origx + 10, origy + 20 + 0.5 * (wty - origy));
    ctx2.textAlign = "right";
    ctx2.fillText(ang + "\xB0", wtx - 42, wty - 5);
    ctx2.fillText(ang + "\xB0", origx - 2, origy + 72);
    ctx2.fillText(" net thrust    ", thrustx + 0.3 * (wtx - thrustx), thrusty + 10 + 0.5 * (wty - thrusty));
    ctx2.font = "bold 15px Comic Sans MS";
    ctx2.fillText(thrust + " kN (\u00B1 4 kN)", thrustx + 0.3 * (wtx - thrustx), thrusty + 30 + 0.5 * (wty - thrusty));
    ctx2.font = "normal 15px Comic Sans MS";
    ctx2.fillText(" lift          ", thrustx + 0.5 * (origx - thrustx), thrusty - 35 - 0.5 * (thrusty - origy));
    ctx2.font = "bold 15px Comic Sans MS";
    ctx2.fillText(lift + " kN (\u00B1 4 kN)", thrustx + 0.5 * (origx - thrustx), thrusty - 15 - 0.5 * (thrusty - origy));
    ctx2.font = "normal 15px Comic Sans MS";
    ctx2.textAlign = "left";
    ctx2.fillText("Drawing not to scale.", 0, 20);
    ctx2.fillText("Scale given as an example.", 0, 40);
    ctx2.fillText("   Scale 1 cm : 50 kN", 0, 70);
    ctx2.lineWidth = 1;
    ctx2.beginPath;
    ctx2.moveTo(wtx - 40, wty);
    ctx2.arc(wtx, wty, 40, Math.PI, Math.PI + (Math.PI / 180) * ang, false);
    ctx2.moveTo(origx, origy + 40);
    ctx2.arc(origx, origy, 40, Math.PI / 2, Math.PI / 2 + (Math.PI / 180) * ang, false);
    ctx2.stroke();
    ctx2.beginPath;
    ctx2.setLineDash([7, 5]);
    ctx2.moveTo(wtx, wty);
    ctx2.lineTo(wtx - 60, wty);
    ctx2.stroke();
    ctx2.setLineDash([]);
    arrhead(ctx2, wtx, wty, 90, 2, "red");
    arrhead(ctx2, thrustx, thrusty, 180 + ang, 2, "red");
    arrhead(ctx2, origx, origy, 270 + ang, 2, "red")

    document.getElementById("q").innerHTML = sumq;
    document.getElementById("btnSoln").style.visibility="visible";
}

function animsolnclimb() {
    //Runs animation when 'Show me how' clicked
    $(':button').prop('disabled', true);
    ctx2.clearRect(0, 0, myCanvas2.width, myCanvas2.height);
    drawline(ctx2, origx, origy, wtx, wty, 2, "red", false);
    setTimeout(function() {arrhead(ctx2, wtx, wty, 90, 2, "red")}, 600);
    setTimeout(function() {drawline(ctx2, wtx, wty, wtx - 60, wty, 1, "red", true)}, 1200);
    ctx2.moveTo(wtx - 40, wty);
    setTimeout(function() {drawarc(ctx2, wtx, wty, 40, Math.PI, Math.PI + (Math.PI/180) * ang, false)}, 1800);
    setTimeout(function() {drawline(ctx2, wtx, wty, thrustextx, thrustexty, 1, "red", true)}, 2400);
    ctx2.moveTo(origx, origy + 40);
    setTimeout(function() {drawarc(ctx2, origx, origy, 40, Math.PI / 2, 
                            (Math.PI / 2) + (Math.PI/180) * ang, false)}, 3000);
    setTimeout(function() {drawline(ctx2, origx, origy, liftextx, liftexty, 1, "red", true)}, 3600);
    setTimeout(function() {drawline(ctx2, wtx, wty, thrustx, thrusty, 2, "red", false)}, 4200);
    setTimeout(function() {arrhead(ctx2, thrustx, thrusty, 180 + ang, 2, "red")}, 4800);
    setTimeout(function() {drawline(ctx2, thrustx, thrusty, origx, origy, 2, "red", false)}, 5400);
    setTimeout(function() {arrhead(ctx2, origx, origy, 270 + ang, 2, "red")}, 6000);
    setTimeout(otherstuffclimb, 6600);
    function otherstuffclimb() {
        ctx2.lineWidth = 2;
        ctx2.strokeStyle = '#ff0000';
        ctx2.beginPath;
        ctx2.translate(thrustx, thrusty);
        ctx2.rotate(ang * (Math.PI / 180));
        ctx2.translate(-thrustx, -thrusty);
        ctx2.strokeRect(thrustx, thrusty, 15, -15);
        ctx2.setTransform(1, 0, 0, 1, 0, 0);
        ctx2.moveTo(origx, origy + 40);
        ctx2.stroke();
        ctx2.font = "15px Comic Sans MS";
        ctx2.fillStyle = "red";
        ctx2.textAlign = "left";
        ctx2.fillText(" weight", origx + 10, origy + 0.5 * (wty - origy));
        ctx2.fillText(wt + " kN", origx + 10, origy + 20 + 0.5 * (wty - origy));
        ctx2.textAlign = "right";
        ctx2.fillText(ang + "\xB0", wtx - 42, wty - 5);
        ctx2.fillText(ang + "\xB0", origx - 2, origy + 72);
        ctx2.fillText(" net thrust    ", thrustx + 0.3 * (wtx - thrustx), thrusty + 10 + 0.5 * (wty - thrusty));
        ctx2.font = "bold 15px Comic Sans MS";
        ctx2.fillText(thrust + " kN (\u00B1 4 kN)", thrustx + 0.3 * (wtx - thrustx), thrusty + 30 + 0.5 * (wty - thrusty));
        ctx2.font = "normal 15px Comic Sans MS";
        ctx2.fillText(" lift          ", thrustx + 0.5 * (origx - thrustx), thrusty - 35 - 0.5 * (thrusty - origy));
        ctx2.font = "bold 15px Comic Sans MS";
        ctx2.fillText(lift + " kN (\u00B1 4 kN)", thrustx + 0.5 * (origx - thrustx), thrusty - 15 - 0.5 * (thrusty - origy));
        ctx2.font = "normal 15px Comic Sans MS";
        ctx2.textAlign = "left";
        ctx2.fillText("Drawing not to scale.", 0, 20);
        ctx2.fillText("Scale given as an example.", 0, 40);
        ctx2.fillText("   Scale 1 cm : 50 kN", 0, 70);
        ctx2.setLineDash([]);
        $(':button').prop('disabled', false);
    }
}