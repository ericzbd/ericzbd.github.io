var countdown = function(){
    for (var i=99; i>=0; i--){


            var bottles = (i == 1) ? "bottle" : "bottles";
            var passOrStore = (i != 0) ? "take one down and pass it around, " : "go to the store and buy some more, ";
            var beginning = (i != 0) ? i + " " + bottles + " of beer on the wall, " : "No more " + bottles + " of beer on the wall, ";
            var middle = (i!=0) ? i + " bottles of beer. " : "no more bottles of beer, ";
            var minusOne = i - 1;
            var end = (i!=0) ? minusOne + " " + bottles + " of beer on the wall." : "99 " + bottles + " of beer on the wall =P";
        if (i==2){
            end = minusOne + " bottle of beer on the wall."
        }
        if (i !=1) {
            $('.myDiv .list').append('<li>' + beginning + middle + passOrStore + end + '</li>');
        } else {
            $('.myDiv .list').append('<li>' + beginning + i + " bottle of beer, " + passOrStore + "no more bottles of beer on the wall." + '</li>');
        }

    }
};




