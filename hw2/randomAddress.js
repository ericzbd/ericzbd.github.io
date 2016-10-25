/**
 * Created by Eric on 10/22/2016.
 */
var street = ['123 Bleuballs lane', '234 Toejam rd', '6463 Funkysox pl', '7874 Rootcanal Rd', '555 Scrubdatass Cir'];
var city = ['Stankwater,', 'Turntup,', 'Whahadhappenedwuz,', 'Meetbeeter,', 'Funkyou,'];
var state = ['AL', 'GA', 'MI', 'ID', 'UT'];
var zip = ['12345', '35355', '08978', '35263', '74635'];

var randStreet = street[Math.floor(Math.random() * street.length)];
var randCity = city[Math.floor(Math.random() * city.length)];
var randState = state[Math.floor(Math.random() * state.length)];
var randZip = zip[Math.floor(Math.random() * zip.length)];

console.log(randStreet, randCity, randState, randZip);


