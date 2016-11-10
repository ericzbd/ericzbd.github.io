/********************************

 Author: John McSwain
 Date: 10:51 PM


 ********************************/


module.exports = function(robot) {
  //  YOUR CODE HERE
  robot.hear(/Wha had happened wuz/, function(res) {
    return res.send("Wtf was wha ha happened?")

  });
  robot.hear(/I like (.*)/i, function(msg){
    var zombieTurtle=msg.match[1]
    if (zombieTurtle=="zombies"){
      return msg.send("I like turtles");
      if (zombieTurtle=="turtles"){
        return msg.send("I like zombies");
      }
    }
  });

  var classmates = ['Chris', 'Jason', 'Khai', 'Eric', 'Shaun', 'Rachel', 'Fletcher', 'Alex', 'Kin', 'Kim', 'Aarom', 'Bryan'];
  var randClassmate = classmates[Math.floor(Math.random() * classmates.length)];
  robot.hear(/Red Rover/, function(res){
    return res.send("Red rover");
  //  return res.send("Red rover, red rover, send " + randClassmate + "right over");
  });
  //  Example

  //`.hear` command listens for a specific phrase anywhere in the Slack room. You don't have to mention
  //your Hubot in order to get a response.
  robot.hear(/Hello!/, function(res) {
    return res.send("Hi there!");
  });
//`.respond` is similar to `.hear`, except it will only be triggered when someone specifically mentions
//the Hubot using `@`, or sends a direct message
  robot.respond(/What's your favorite food?/, function(res) {
    return res.send("I'm a robot--I don't eat food!");
  });

  robot.respond(/Hi Hubot! My name is (.*)/i, function(msg) {
    var name;
    name = msg.match[1];
    if (name == "Hubot") {
      return msg.send("You're not Hubot--I'm Hubot!");
    } else {
      return msg.reply("Nice to meet you, " + name + "!");
    }
  });

};

