var wt = 0, ang = 0, altang = 0, fb = 0, fa = 0, origx = 0, origy = 0, wtx = 0, wty = 0, fbx = 0, fby = 0;
var fbextx = 0, fbexty = 0, faextx = 0, faexty = 0, pinjt = false;
function pinjoint(ctx, ctx2) {
    sumq = "";
    suma = "";
    do {
        wt = rndgen(100, 225, 0, 25, -1);
        ang = rndgen(25, 40, 0, 1, -1);
        altang = 90 - ang;
        fb = dp(wt / Math.tan(ang * (Math.PI / 180)), 0, -1);
        fa = dp(wt / Math.sin(ang * (Math.PI / 180)), 0, -1);
    } while (fa > 450); //Ensures solution fits in canvas without canvas being too wide.

    sumq += "In the pin-jointed structure shown, use a vector diagram to determine the size of forces ";
    sumq += "F<sub>A</sub> and F<sub>B</sub>, given that the weight is " + wt + "&nbsp;N and the angle, &theta;, is ";
    sumq += ang + "<sup>O</sup>";

    origx = 425;
    origy = 550;
    wtx = origx;
    wty = wt + origy;
    fbx = wtx - fb;
    fby = wty;
    fbextx = fbx - 50;
    fbexty = fby;
    faextx = fbx - 50 * Math.sin(altang * (Math.PI / 180));
    faexty = fby + 50 * Math.cos(altang * (Math.PI / 180));
    jetup = false;
    space = false;
    jetroll = false;
    pinjt = true;
    
    ctx.drawImage(pinjnt, 0, 0, 650, 550);

    ctx2.linewidth = 2;
    ctx2.strokeStyle = '#ff0000';
    ctx2.beginpath;
    ctx2.moveTo(origx, origy);
    ctx2.lineTo(wtx, wty);
    ctx2.lineTo(fbx, fby);
    ctx2.lineTo(origx, origy);
    ctx2.stroke();
    ctx2.lineWidth = 2;
    ctx2.strokeRect(wtx - 15, wty, 15, -15);
    ctx2.font = "15px Comic Sans MS";
    ctx2.fillStyle = "red";
    ctx2.textAlign = "left";
    ctx2.fillText(" weight", origx + 10, origy + 0.5 * (wty - origy));
    ctx2.fillText(wt + " N", origx + 10, origy + 20 + 0.5 * (wty - origy));
    ctx2.textAlign = "center";
    ctx2.fillText("FB", fbx + 0.5 * (wtx - fbx), fby + 20);
    ctx2.font = "bold 15px Comic Sans MS";
    ctx2.fillText(fb + " N (\u00B1 4 N)", fbx + 0.5 * (wtx - fbx), fby + 40);
    ctx2.font = "normal 15px Comic Sans MS";
    ctx2.textAlign = "right";
    ctx2.fillText("90 - " + ang + " = " + altang + "\xB0", origx - 2, origy + 90);
    ctx2.fillText(ang + "\xB0", origx - 35, origy + 15);
    ctx2.fillText(" FA        ", fbx + 0.5 * (origx - fbx), fby - 35 - 0.5 * (fby - origy));
    ctx2.font = "bold 15px Comic Sans MS";
    ctx2.fillText(fa + " N (\u00B1 4 N)", fbx + 0.5 * (origx - fbx), fby - 15 - 0.5 * (fby - origy));
    ctx2.font = "normal 15px Comic Sans MS";
    ctx2.textAlign = "left";
    ctx2.fillText("Drawing not to scale.", 50, 20);
    ctx2.fillText("Scale given as an example.", 50, 40);
    ctx2.fillText("   Scale 1 cm : 25 N", 50, 70);
    ctx2.lineWidth = 1;
    ctx2.beginPath;
    ctx2.moveTo(origx, origy + 40);
    ctx2.arc(origx, origy, 40, Math.PI / 2, Math.PI / 2 + (Math.PI / 180) * altang, false);
    ctx2.moveTo(origx - 30, origy);
    ctx2.arc(origx, origy, 30, Math.PI, Math.PI + (Math.PI / 180) * -ang, true);
    ctx2.stroke();
    ctx2.beginpath;
    ctx2.lineWidth = 1;
    ctx2.setLineDash([6, 3]);
    ctx2.moveTo(origx, origy);
    ctx2.lineTo(origx - 65, origy);
    ctx2.stroke();
    ctx2.setLineDash([]);
    arrhead(ctx2, wtx, wty, 90, 2, "red");
    arrhead(ctx2, fbx, fby, 180, 2, "red");
    arrhead(ctx2, origx, origy, -ang, 2, "red")
    
    var notesLink = "images/Sci Bk2 Statics v1.10.pdf#page=13";
    var sumArray = [sumq, suma, notesLink];
    return sumArray;
}

function animsolnpin() {
    //Runs animation when 'Show me how' clicked
    $(':button').prop('disabled', true);
    ctx2.clearRect(0, 0, myCanvas2.width, myCanvas2.height);
    drawline(ctx2, origx, origy, wtx, wty, 2, "red", false);
    setTimeout(function() {arrhead(ctx2, wtx, wty, 90, 2, "red")}, 600);
    setTimeout(function() {drawline(ctx2, wtx, wty, fbextx, fbexty, 1, "red", true)}, 1200);
    ctx2.moveTo(origx, origy + 40);
    setTimeout(function() {drawarc(ctx2, origx, origy, 40, Math.PI / 2, 
                            (Math.PI / 2) + (Math.PI/180) * altang, false)}, 1800);
    setTimeout(function() {drawline(ctx2, origx, origy, faextx, faexty, 1, "red", true)}, 2400);
    setTimeout(function() {drawline(ctx2, wtx, wty, fbx, fby, 2, "red", false)}, 3000);
    setTimeout(function() {arrhead(ctx2, fbx, fby, 180, 2, "red")}, 3600);
    setTimeout(function() {drawline(ctx2, fbx, fby, origx, origy, 2, "red", false)}, 4200);
    setTimeout(function() {arrhead(ctx2, origx, origy, -ang, 2, "red")}, 4800);
    setTimeout(otherstuffpin, 5400);
    function otherstuffpin() {
        ctx2.lineWidth = 2;
        ctx2.strokeStyle = '#ff0000';
        ctx2.beginPath;
        ctx2.strokeRect(wtx - 15, wty, 15, -15);
        ctx2.stroke();
        ctx2.beginpath;
        ctx2.lineWidth = 1;
        ctx2.moveTo(origx - 30, origy);
        ctx2.arc(origx, origy, 30, Math.PI, Math.PI + (Math.PI / 180) * -ang, true);
        ctx2.stroke();
        ctx2.beginpath;
        ctx2.setLineDash([6, 3]);
        ctx2.moveTo(origx, origy);
        ctx2.lineTo(origx - 65, origy);
        ctx2.stroke();
        ctx2.setLineDash([]);
        ctx2.font = "15px Comic Sans MS";
        ctx2.fillStyle = "red";
        ctx2.textAlign = "left";
        ctx2.fillText(" weight", origx + 10, origy + 0.5 * (wty - origy));
        ctx2.fillText(wt + " N", origx + 10, origy + 20 + 0.5 * (wty - origy));
        ctx2.textAlign = "center";
        ctx2.fillText("FB", fbx + 0.5 * (wtx - fbx), fby + 20);
        ctx2.font = "bold 15px Comic Sans MS";
        ctx2.fillText(fb + " N (\u00B1 4 N)", fbx + 0.5 * (wtx - fbx), fby + 40);
        ctx2.font = "normal 15px Comic Sans MS";
        ctx2.textAlign = "right";
        ctx2.fillText("90 - " + ang + " = " + altang + "\xB0", origx - 2, origy + 90);
        ctx2.fillText(" FA        ", fbx + 0.5 * (origx - fbx), fby - 35 - 0.5 * (fby - origy));
        ctx2.fillText(ang + "\xB0", origx - 35, origy + 15);
        ctx2.font = "bold 15px Comic Sans MS";
        ctx2.fillText(fa + " N (\u00B1 4 N)", fbx + 0.5 * (origx - fbx), fby - 15 - 0.5 * (fby - origy));
        ctx2.font = "normal 15px Comic Sans MS";
        ctx2.textAlign = "left";
        ctx2.fillText("Drawing not to scale.", 50, 20);
        ctx2.fillText("Scale given as an example.", 50, 40);
        ctx2.fillText("   Scale 1 cm : 50 kN", 50, 70);
        ctx2.setLineDash([]);
        $(':button').prop('disabled', false);
    }
}