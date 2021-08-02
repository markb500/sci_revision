var prevsum = 0, prev2sum = 0;
function vectors() {
    var sum;
    do {
        sum = rndgen(1, 3, 0, 1, -1);
    } while(sum === prevsum || sum === prev2sum)
    prev2sum = prevsum;
    prevsum = sum;
    switch(sum) {
        case 1:
            spacediag();
            break;
        case 2:
            jetclimb();
            break;
        case 3:
            jetbank();
            break;
    }
}