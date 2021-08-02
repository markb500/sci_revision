var ctx, ctx2, scale, v1, v2, ang1, ang2, ang = 0, r, angr, origx = 0, origy = 0, v1x, v1y, v2x, v2y, rx, ry;
var angrtxty, v1ytxty, jetup = false, jetroll = false, space = false;
function spacediag() {
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
    sumq = "";
    suma = "";
    document.getElementById("a").innerHTML = "";
    document.getElementById("noteslink").style.visibility="visible";
    document.getElementById("noteslink").onclick = function() {
        window.open("images/Sci Bk2 Statics v1.10.pdf#page=8", "_blank")
    }

    do {
        v1 = rndgen(5, 15, 1, 0.5, -1);
        v2 = rndgen(5, 15, 1, 0.5, -1);
        ang1 = rndgen(-30, 30, 0, 1, -1);
        ang2 = rndgen(40, 70, 0, 1, -1);
        ang = ang2 - ang1;
        r = dp(Math.sqrt(Math.pow(v1, 2) + Math.pow(v2, 2) - 2 * v1 * v2 * Math.cos((180 - ang) * (Math.PI / 180))), 0, -1);
        angr = dp(Math.asin((v2 * Math.sin((180 - ang) * (Math.PI / 180))) / r) * (180 / Math.PI) + ang1, 0, -1);
    } while(v1 === v2 || (Math.abs(ang1) < 20 && ang1 !== 0) || ang < 30 || angr < 20)

    origx = 40;
    origy = 425;
    v1x = v1 * Math.cos((ang1 * (Math.PI / 180))) + origx;
    v1y = v1 * Math.sin((-ang1* (Math.PI / 180))) + origy;
    v2x = v2 * Math.cos((ang2 * (Math.PI / 180))) + origx;
    v2y = v2 * Math.sin((-ang2* (Math.PI / 180))) + origy;
    rx = r * Math.cos((angr * (Math.PI / 180))) + origx;
    ry = r * Math.sin((-angr * (Math.PI / 180))) + origy;
    jetroll = false;
    jetup = false;
    space = true;

    scale = (510 - origx) / (r * Math.cos((angr * (Math.PI / 180))));   //Set scale for max x
    if(ry < v2y && r * scale * Math.sin((-angr * (Math.PI / 180))) + origy < 40) {
            //If heighest point is ry and scale to large, re-scale for ry fit
        scale = (40 - 425) / (r * Math.sin((-angr * (Math.PI / 180))));
    } else if(v2y < ry && v2 * scale * Math.sin((-ang2* (Math.PI / 180))) + origy < 40) {
        //If heighest point is v2y and scale to large, re-scale for v2y fit
        scale = (40 - 425) / (v2 * Math.sin((-ang2* (Math.PI / 180))))
    }

    v1x = v1 * scale * Math.cos((ang1 * (Math.PI / 180))) + origx;
    v1y = v1 * scale * Math.sin((-ang1* (Math.PI / 180))) + origy;
    v2x = v2 * scale * Math.cos((ang2 * (Math.PI / 180))) + origx;
    v2y = v2 * scale * Math.sin((-ang2* (Math.PI / 180))) + origy;
    rx = r * scale * Math.cos((angr * (Math.PI / 180))) + origx;
    ry = r * scale * Math.sin((-angr * (Math.PI / 180))) + origy;
    angrtxty = origy - (110 * Math.sin((Math.PI/180) * angr * 0.3));
    v1ytxty = origy + 20 + 0.5 * (v1y - origy);

    sumq += "Use a space diagram, drawn to scale, to find the resultant force for the following system."
    
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(v1x, v1y);
    ctx.lineTo(origx, origy);
    ctx.lineTo(v2x, v2y);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = 1
    ctx.setLineDash([7, 5]);
    ctx.moveTo(origx, origy);
    ctx.lineTo(origx + 130, origy);
    ctx.stroke();
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(origx + 30, origy);
    if(ang1 > 0) {
        ctx.arc(origx, origy, 30, 0, -(Math.PI/180) * ang1, true);
    } else {
        ctx.arc(origx, origy, 30, 0, -(Math.PI/180) * ang1, false);
    }
    ctx.moveTo(origx + 70, origy);
    ctx.arc(origx, origy, 70, 0, -(Math.PI/180) * ang2, true);
    ctx.stroke();
    ctx.font = "15px Comic Sans MS";
    if(ang1 < 0) {
        ctx.textAlign = "right";
        ctx.fillText("V\u2081 " + v1 + " N ", origx + 0.5 * (v1x - origx), origy + 20 + 0.5 * (v1y - origy));
        ctx.textAlign = "left";
        ctx.fillText((ang1 * -1) + "\xB0", origx + (40 * Math.cos((Math.PI/180) * ang1)), origy + 14);
    } else {
        ctx.textAlign = "left";
        ctx.fillText("V\u2081 " + v1 + " N ", origx + 0.5 * (v1x - origx), origy + 20 + 0.5 * (v1y - origy));
        if(ang1 > 0) {
            ctx.textAlign = "left";
            ctx.fillText(ang1 + "\xB0", origx + (35 * Math.cos((Math.PI/180) * ang1)), origy - 2);
        }
    }
    ctx.textAlign = "right";
    ctx.fillText("V\u2082 " + v2 + " N ", origx + 0.5 * (v2x - origx), origy + 0.5 * (v2y - origy));
    ctx.textAlign = "left";
    ctx.fillText(ang2 + "\xB0", origx + (70 * Math.cos((Math.PI/180) * ang2 * 0.7)), 
                                origy - (70 * Math.sin((Math.PI/180) * ang2 * 0.8)));
    ctx.fillText("Drawing not to scale.", 0, 20);
    ctx.fillText("Scale given as an example.", 0, 40);
    if(scale < 29) {
        ctx.fillText("   Scale 1 cm : 2 N", 0, 70);
    } else if(scale < 56) {
        ctx.fillText("   Scale 1 cm : 1 N", 0, 70);
    } else {
        ctx.fillText("   Scale 1 cm : 0.5 N", 0, 70);
    }

    ctx2.lineWidth = 3;
    ctx2.strokeStyle = '#ff0000';
    ctx2.beginPath();
    ctx2.moveTo(origx, origy);
    ctx2.lineTo(rx, ry);
    ctx2.moveTo(origx + 110, origy);
    ctx2.stroke();
    ctx2.lineWidth = 1;
    ctx2.beginPath();
    ctx2.arc(origx, origy, 110, 0, -(Math.PI/180) * angr, true);
    ctx2.stroke();
    ctx2.lineWidth = 1
    ctx2.beginPath();
    ctx2.setLineDash([7, 5]);
    ctx2.moveTo(v1x, v1y);
    ctx2.lineTo(rx, ry);
    ctx2.lineTo(v2x, v2y);
    ctx2.stroke();
    ctx2.font = "bold 15px Comic Sans MS";
    ctx2.fillStyle = "red";
    ctx2.textAlign = "left";
    ctx2.fillText(r + " N (\u00B1 2 N)", origx + 0.5 * (rx - origx), origy + 20 + 0.5 * (ry - origy))
    if((angrtxty > (v1ytxty - 10)) && (angrtxty < (v1ytxty + 10))) {
        //Avoids crash between resultant angle text and v1 text
        ctx2.fillText(angr + "\xB0 (\u00B1 2\xB0)", origx + (110 * Math.cos((Math.PI/180) * angr * 0.1)), 
                                    origy - (110 * Math.sin((Math.PI/180) * angr * 0.3)) + 20);
    } else {
        ctx2.fillText(angr + "\xB0 (\u00B1 2\xB0)", origx + (110 * Math.cos((Math.PI/180) * angr * 0.1)), 
                                    origy - (110 * Math.sin((Math.PI/180) * angr * 0.3)));
    }
    arrhead(ctx2, rx, ry, -angr, 2, "red");

    document.getElementById("q").innerHTML = sumq;
    document.getElementById("btnSoln").style.visibility="visible";
}

function animsolnspace() {
    //Fired when 'Show me how' clicked so animation start delayed until required
    $(':button').prop('disabled', true);
    ctx2.clearRect(0, 0, myCanvas2.width, myCanvas2.height);
    drawline(ctx2, v1x, v1y, rx, ry, 1, "red", true);
    setTimeout(function() {drawline(ctx2, v2x, v2y, rx, ry, 1, "red", true)}, 600);
    setTimeout(function() {drawarc(ctx2, origx, origy, 110, 0, -(Math.PI/180) * angr, true)}, 1200);
    setTimeout(function() {drawline(ctx2, origx, origy, rx, ry, 3, "red", false)}, 1800);
    setTimeout(function() {arrhead(ctx2, rx, ry, -angr, 2, "red")}, 2400);
    setTimeout(otherstuffspace, 3000);
    function otherstuffspace() {
        ctx2.font = "bold 15px Comic Sans MS";
        ctx2.fillStyle = "red";
        ctx2.textAlign = "left";
        ctx2.fillText(r + " N (\u00B1 2 N)", origx + 0.5 * (rx - origx), origy + 20 + 0.5 * (ry - origy))
        if((angrtxty > (v1ytxty - 10)) && (angrtxty < (v1ytxty + 10))) {
            //Avoids crash between resultant angle text and v1 text
            ctx2.fillText(angr + "\xB0 (\u00B1 2\xB0)", origx + (110 * Math.cos((Math.PI/180) * angr * 0.1)), 
                                        origy - (110 * Math.sin((Math.PI/180) * angr * 0.3)) + 20);
        } else {
            ctx2.fillText(angr + "\xB0 (\u00B1 2\xB0)", origx + (110 * Math.cos((Math.PI/180) * angr * 0.1)), 
                                        origy - (110 * Math.sin((Math.PI/180) * angr * 0.3)));
        }
        space = false;
        $(':button').prop('disabled', false);
    }
}