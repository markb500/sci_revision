var prevsum = 0, prev2sum = 0;
function vectors(ctx, ctx2) {
    var sum;
    do {
        sum = rndgen(1, 4, 0, 1, -1);
    } while(sum === prevsum || sum === prev2sum)
    prev2sum = prevsum;
    prevsum = sum;
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