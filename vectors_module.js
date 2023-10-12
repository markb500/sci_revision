var sumarrvectors = [];
function vectors(ctx, ctx2) {
    var sum;
    sumarrvectors = QLimitRepeats(sumarrvectors, 4);   //Ensures no repeat question until at least 50% of questions shown
    sum = sumarrvectors[sumarrvectors.length - 1];
    switch(sum) {
        case 1:
            var sumArray = spacediag(ctx, ctx2);
            break;
        case 2:
            var sumArray = jetclimb(ctx2);
            break;
        case 3:
            var sumArray = jetbank(ctx2);
            break;
        case 4:
            var sumArray = pinjoint(ctx, ctx2);
            break;
    }
    return sumArray;
}