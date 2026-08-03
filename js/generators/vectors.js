// js/generators/vectors.js
// Vector questions: space diagram, jet climb, jet bank, pin joint.
// Drawing and "Show me how" animations keep module-level state so timed
// steps can reuse the last question geometry. Behaviour matches the
// original training app; layout is grouped for maintainability.
import {
  rndgen, dp, thouSep, QLimitRepeats,
  sglarr, dblarr, drawline, drawarc, arrhead, images
} from '../utils.js';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const NOTES_SPACE = 'images/Sci Bk2 Statics v1.10.pdf#page=5';
const CANVAS_W = 550;
const CANVAS_H = 850;
const TYPE = { SPACE: 1, CLIMB: 2, BANK: 3, PIN: 4 };

/** @type {number[]} */
let recentIds = [];

// ---------------------------------------------------------------------------
// Drawing state (shared by sub-questions and Show-me-how animations)
// ---------------------------------------------------------------------------
let ctx, ctx2;
let sumq = '', suma = '', notesLink = '';
let jetup = false, jetroll = false, space = false, pinjt = false;

// Space diagram
let scale, v1, v2, ang1, ang2, ang = 0, r, angr;
let origx = 0, origy = 0, v1x, v1y, v2x, v2y, rx, ry, angrtxty, v1ytxty;

// Jet climb / bank / pin joint
let wt = 0, thrust = 0, lift = 0, cf = 0, altang = 0, fb = 0, fa = 0;
let wtx = 0, wty = 0, thrustx = 0, thrusty = 0, thrustextx = 0, thrustexty = 0;
let liftextx = 0, liftexty = 0, cfx = 0, cfy = 0, cfextx = 0, cfexty = 0;
let fbx = 0, fby = 0, fbextx = 0, fbexty = 0, faextx = 0, faexty = 0;

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------
function toRad(deg) {
  return deg * (Math.PI / 180);
}

function toDeg(rad) {
  return rad * (180 / Math.PI);
}

/** Clear question-type flags before selecting a new scenario. */
function resetTypeFlags() {
  jetup = false;
  jetroll = false;
  space = false;
  pinjt = false;
}

function bindContexts(ctxArg, ctx2Arg) {
  ctx = ctxArg;
  ctx2 = ctx2Arg;
}

function publishTypeFlags() {
  window.jetup = jetup;
  window.jetroll = jetroll;
  window.space = space;
  window.pinjt = pinjt;
}


// ===========================================================================
// 1. Space diagram (vector addition by scale drawing)
// ===========================================================================
function spacediag() {

    sumq = "";
    suma = "";

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
    pinjt = false;
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
    arrhead(ctx, v2x, v2y, -ang2, 3, "black");
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
        ctx.arc(origx, origy, 30, 0, (Math.PI/180) * -ang1, false);
    }
    ctx.moveTo(origx + 70, origy);
    ctx.arc(origx, origy, 70, 0, -(Math.PI/180) * ang2, true);
    ctx.stroke();
    ctx.font = "15px Comic Sans MS";
    if(ang1 < 0) {
        ctx.textAlign = "right";
        ctx.fillText("V\u2081 " + v1 + " N ", origx + 0.5 * (v1x - origx), origy + 20 + 0.5 * (v1y - origy));
        ctx.textAlign = "left";
        ctx.fillText((ang1) + "\xB0", origx + (40 * Math.cos((Math.PI/180) * ang1)), origy + 14);
        arrhead(ctx, v1x, v1y, -ang1, 3, "black");
    } else {
        ctx.textAlign = "left";
        ctx.fillText("V\u2081 " + v1 + " N ", origx + 0.5 * (v1x - origx), origy + 20 + 0.5 * (v1y - origy));
        if(ang1 > 0) {
            ctx.textAlign = "left";
            ctx.fillText(ang1 + "\xB0", origx + (35 * Math.cos((Math.PI/180) * ang1)), origy - 2);
            arrhead(ctx, v1x, v1y, -ang1, 3, "black");
        } else if (ang1 === 0) {
            
        arrhead(ctx, v1x, v1y, 0, 3, "black");
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
    
    notesLink = "images/Sci Bk2 Statics v1.10.pdf#page=8";
    return [sumq, suma, notesLink];

}

// Show-me-how for space diagram
function animsolnspace() {

    //Runs animation when 'Show me how' clicked
    $(':button').prop('disabled', true);
    ctx2.clearRect(0, 0, myCanvas2.width, myCanvas2.height);
    drawline(ctx2, v1x, v1y, rx, ry, 1, "red", true);
    setTimeout(function() {drawline(ctx2, v2x, v2y, rx, ry, 1, "red", true)}, 600);
    setTimeout(function() {drawline(ctx2, origx, origy, rx, ry, 3, "red", false)}, 1200);
    setTimeout(function() {drawarc(ctx2, origx, origy, 110, 0, -(Math.PI/180) * angr, true)}, 1800);
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
        $(':button').prop('disabled', false);
    }

}

// ===========================================================================
// 2. Jet climb (weight / thrust / lift resolution)
// ===========================================================================
function jetclimb(ctx2) {

    sumq = "";
    suma = "";
    wt = rndgen(300, 450, 0, 25, -1);
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
    
    notesLink = "images/Sci Bk2 Statics v1.10.pdf#page=14";
    return [sumq, suma, notesLink];

}

// Show-me-how for jet climb
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

// ===========================================================================
// 3. Jet bank (weight / CF / lift)
// ===========================================================================
function jetbank(ctx2) {

    sumq = "";
    suma = "";
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
    
    notesLink = "images/Sci Bk2 Statics v1.10.pdf#page=15";
    return [sumq, suma, notesLink];

}

// Show-me-how for jet bank
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

// ===========================================================================
// 4. Pin-jointed structure (FA / FB)
// ===========================================================================
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
    
    ctx.drawImage(images.pinjoint, 0, 0, 650, 550);

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
    
    notesLink = "images/Sci Bk2 Statics v1.10.pdf#page=13";
    return [sumq, suma, notesLink];

}

// Show-me-how for pin joint
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

// ===========================================================================
// Router + public API
// ===========================================================================
function pickVectorQuestion(ctxArg, ctx2Arg) {
  bindContexts(ctxArg, ctx2Arg);
  resetTypeFlags();
  recentIds = QLimitRepeats(recentIds, 4);
  const sum = recentIds[recentIds.length - 1];

  switch (sum) {
    case TYPE.SPACE:
      return spacediag();
    case TYPE.CLIMB:
      return jetclimb(ctx2);
    case TYPE.BANK:
      return jetbank(ctx2);
    case TYPE.PIN:
      return pinjoint(ctx, ctx2);
    default:
      return spacediag();
  }
}

/**
 * @returns {{ question: string, solution: string, notesLink: string, canvas?: object, showHow?: boolean }}
 */
export function generate() {
  const off1 = document.createElement('canvas');
  off1.width = CANVAS_W;
  off1.height = CANVAS_H;
  const off2 = document.createElement('canvas');
  off2.width = CANVAS_W;
  off2.height = CANVAS_H;
  const c1 = off1.getContext('2d');
  const c2 = off2.getContext('2d');

  const result = pickVectorQuestion(c1, c2);
  const url1 = off1.toDataURL();
  const url2 = off2.toDataURL();

  // Flags for Show me how (read by animsel on the live solution canvas)
  publishTypeFlags();

  return {
    question: result[0],
    solution: result[1] + '<br>'.repeat(8),
    notesLink: result[2] || NOTES_SPACE,
    canvas: {
      width: CANVAS_W,
      height: CANVAS_H,
      withSolution: true,
      draw: (c) => {
        const img = new Image();
        img.onload = () => c.drawImage(img, 0, 0);
        img.src = url2;
        if (img.complete) c.drawImage(img, 0, 0);
      },
      questionDraw: (c) => {
        const img = new Image();
        img.onload = () => c.drawImage(img, 0, 0);
        img.src = url1;
        if (img.complete) c.drawImage(img, 0, 0);
      }
    },
    showHow: true
  };
}

/**
 * Route "Show me how" to the matching animation on the live solution canvas.
 * Exposed on window so the UI button can call it without an import cycle.
 */
function animsel() {
  const live = document.getElementById('myCanvas2');
  if (!live) return;
  ctx2 = live.getContext('2d');
  window.myCanvas2 = live;

  if (jetup || window.jetup) animsolnclimb();
  else if (jetroll || window.jetroll) animsolnroll();
  else if (space || window.space) animsolnspace();
  else if (pinjt || window.pinjt) animsolnpin();
}
window.animsel = animsel;
