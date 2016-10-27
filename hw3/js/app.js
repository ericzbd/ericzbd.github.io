function newStartup(){
    var startupX = ['Teabags', 'String Cheesewhiz', 'Grenade Launchers', 'Ebola Virus', 'Crazy Pillz', 'Purple Drank'];
    var startupY = ['Played Out Suckerz', 'Ghetto Booties', 'MC Hammer Britches', 'Gimme My Money Trick', ];

    var random1 = Math.floor((Math.random() * startupX.length));
    var random2 = Math.floor((Math.random() * startupY.length));

   // add content to div
    document.getElementById('xForY').innerHTML = 'A startup that is ' + startupX[random1] + ', but for ' + startupY[random2];

}
var x=0;
var arr = [];
function saveToArray(){

    arr[x] = document.getElementById("xForY").textContent;
    alert(arr[x] + " ~ added at index " + x + ", sucker");
    x++;
}
function printArray() {
    var e = "<hr/>";
    for (var i = 0; i < arr.length; i++) {
        document.getElementById('favorites').innerHTML = e += "Element " + i + " = " + arr[i] + "<br/>";

    }
}

