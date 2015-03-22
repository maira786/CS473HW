var http = require("http");
var title= 'Assignment5';
var h1= "Let's play!";
var JSONObj= {outcome:"win",wins: 3,losses: 2 ,ties: 0};
var win=0;
var loss=0;
var tie=0;
function onRequest(request, response)
{
switch(request.url)
{
case '/':
response.writeHead(200);//, {"Content-Type": "text/html"});
response.write("<html>");
response.write("<head>");
response.write("<title>" +title+ "</title></head>");
response.write("<body>");
response.write("<h1>" +h1+ "</h1>");
response.write("<form method='POST' action='/play/rock'>\n");
response.write("<input type='submit' value='rock'>\n");
response.write("</form>");
response.write("<form method='POST' action='/play/paper'>");
response.write("<input type='submit' value='paper'>\n");
response.write("</form>");
response.write("<form method='POST' action='/play/scissor'>");
response.write("<input type='submit' value='scissor'>\n");
response.write("</form>");
response.write("<form method='POST' action='/play/lizard'>");
response.write("<input type='submit' value='lizard'>\n");
response.write("</form>");
response.write("<form method='POST' action='/play/spock'>");
response.write("<input type='submit' value='spock'>\n");
response.write("</form>");
response.write("</body>");
response.write("</html>");
response.end();
break;
case '/play/rock':
var userChoice='rock';
var serverChoice= ["rock","paper","scissor","lizard","spock"];
var rest= serverChoice[Math.floor(Math.random()*serverChoice.length)];
if(userChoice==="rock")
{
if(userChoice===rest)
{
response.writeHead(200);
tie=tie+1;
JSONObj.outcome='tie';
JSONObj.wins=win;
JSONObj.losses=loss;
JSONObj.ties=tie;
response.write(JSON.stringify(JSONObj));
response.end();
}
else if(rest==="paper")
{
response.writeHead(200);
loss=loss+1;
JSONObj.outcome='loss';
JSONObj.wins=win;
JSONObj.losses=loss;
JSONObj.ties=tie;
response.write(JSON.stringify(JSONObj));
response.end();
}
else if(rest==="scissor")
{
response.writeHead(200);
win=win+1;
JSONObj.outcome='win';
JSONObj.wins=win;
JSONObj.losses=loss;
JSONObj.ties=tie;
response.write(JSON.stringify(JSONObj));
response.end();
}
else if(rest==="lizard")
{
response.writeHead(200);
win=win+1;
JSONObj.outcome='win';
JSONObj.wins=win;
JSONObj.losses=loss;
JSONObj.ties=tie;
response.write(JSON.stringify(JSONObj));
response.end();
}
else(rest==="spock")
{
response.writeHead(200);
loss=loss+1;
JSONObj.outcome='loss';
JSONObj.wins=win;
JSONObj.losses=loss;
JSONObj.ties=tie;
response.write(JSON.stringify(JSONObj));
response.end();
}
}
break;
case '/play/paper':
var userChoice='paper';
var serverChoice= ["rock","paper","scissor","lizard","spock"];
var rest= serverChoice[Math.floor(Math.random()*serverChoice.length)];
if(userChoice==="paper")
{
if(userChoice===rest)
{
response.writeHead(200);
tie=tie+1;
JSONObj.outcome='tie';
JSONObj.wins=win;
JSONObj.losses=loss;
JSONObj.ties=tie;
response.write(JSON.stringify(JSONObj));
response.end();
}
else if(rest==="rock")
{
response.writeHead(200);
win=win+1;
JSONObj.outcome='win';
JSONObj.wins=win;
JSONObj.losses=loss;
JSONObj.ties=tie;
response.write(JSON.stringify(JSONObj));
response.end();
}
else if(rest==="scissor")
{
response.writeHead(200);
loss=loss+1;
JSONObj.outcome='loss';
JSONObj.wins=win;
JSONObj.losses=loss;
JSONObj.ties=tie;
response.write(JSON.stringify(JSONObj));
response.end();
}
else if(rest==="lizard")
{
response.writeHead(200);
loss=loss+1;
JSONObj.outcome='loss';
JSONObj.wins=win;
JSONObj.losses=loss;
JSONObj.ties=tie;
response.write(JSON.stringify(JSONObj));
response.end();
}
else(rest==="spock")
{
response.writeHead(200);
win=win+1;
JSONObj.outcome='win';
JSONObj.wins=win;
JSONObj.losses=loss;
JSONObj.ties=tie;
response.write(JSON.stringify(JSONObj));
response.end();
}
}
break;
case '/play/scissor':
var userChoice='scissor';
var serverChoice= ["rock","paper","scissor","lizard","spock"];
var rest= serverChoice[Math.floor(Math.random()*serverChoice.length)];
if(userChoice==="scissor")
{
if(userChoice===rest)
{
response.writeHead(200);
tie=tie+1;
JSONObj.outcome='tie';
JSONObj.wins=win;
JSONObj.losses=loss;
JSONObj.ties=tie;
response.write(JSON.stringify(JSONObj));
response.end();
}
else if(rest==="rock")
{
response.writeHead(200);
win=win+1;
JSONObj.outcome='win';
JSONObj.wins=win;
JSONObj.losses=loss;
JSONObj.ties=tie;
response.write(JSON.stringify(JSONObj));
response.end();
}
else if(rest==="paper")
{
response.writeHead(200);
win=win+1;
JSONObj.outcome='win';
JSONObj.wins=win;
JSONObj.losses=loss;
JSONObj.ties=tie;
response.write(JSON.stringify(JSONObj));
response.end();
}
else if(rest==="lizard")
{
response.writeHead(200);
win=win+1;
JSONObj.outcome='win';
JSONObj.wins=win;
JSONObj.losses=loss;
JSONObj.ties=tie;
response.write(JSON.stringify(JSONObj));
response.end();
}
else(rest==="spock")
{
response.writeHead(200);
loss=loss+1;
JSONObj.outcome='loss';
JSONObj.wins=win;
JSONObj.losses=loss;
JSONObj.ties=tie;
response.write(JSON.stringify(JSONObj));
response.end();
}
}
break;
case '/play/lizard':
var userChoice='lizard';
var serverChoice= ["rock","paper","scissor","lizard","spock"];
var rest= serverChoice[Math.floor(Math.random()*serverChoice.length)];
if(userChoice==="lizard")
{
if(userChoice===rest)
{
response.writeHead(200);
tie=tie+1;
JSONObj.outcome='tie';
JSONObj.wins=win;
JSONObj.losses=loss;
JSONObj.ties=tie;
response.write(JSON.stringify(JSONObj));
response.end();
}
else if(rest==="rock")
{
response.writeHead(200);
loss=loss+1;
JSONObj.outcome='loss';
JSONObj.wins=win;
JSONObj.losses=loss;
JSONObj.ties=tie;
response.write(JSON.stringify(JSONObj));
response.end();
}
else if(rest==="scissor")
{
response.writeHead(200);
loss=loss+1;
JSONObj.outcome='loss';
JSONObj.wins=win;
JSONObj.losses=loss;
JSONObj.ties=tie;
response.write(JSON.stringify(JSONObj));
response.end();
}
else if(rest==="paper")
{
response.writeHead(200);
win=win+1;
JSONObj.outcome='win';
JSONObj.wins=win;
JSONObj.losses=loss;
JSONObj.ties=tie;
response.write(JSON.stringify(JSONObj));
response.end();
}
else(rest==="spock")
{
response.writeHead(200);
loss=loss+1;
JSONObj.outcome='loss';
JSONObj.wins=win;
JSONObj.losses=loss;
JSONObj.ties=tie;
response.write(JSON.stringify(JSONObj));
response.end();
}
}
break;
case '/play/spock':
var userChoice='spock';
var serverChoice= ["rock","paper","scissor","lizard","spock"];
var rest= serverChoice[Math.floor(Math.random()*serverChoice.length)];
if(userChoice==="spock")
{
if(userChoice===rest)
{
response.writeHead(200);
tie=tie+1;
JSONObj.outcome='tie;'
JSONObj.wins=win;
JSONObj.losses=loss;
JSONObj.ties=tie;
response.write(JSON.stringify(JSONObj));
response.end();
}
else if(rest==="rock")
{
response.writeHead(200);
win=win+1;
JSONObj.outcome='win';
JSONObj.wins=win;
JSONObj.losses=loss;
JSONObj.ties=tie;
response.write(JSON.stringify(JSONObj));
response.end();
}
else if(rest==="scissor")
{
response.writeHead(200);
win=win+1;
JSONObj.outcome='win';
JSONObj.wins=win;
JSONObj.losses=loss;
JSONObj.ties=tie;
response.write(JSON.stringify(JSONObj));
response.end();
}
else if(rest==="lizard")
{
response.writeHead(200);
loss=loss+1;
JSONObj.outcome='loss';
JSONObj.wins=win;
JSONObj.losses=loss;
JSONObj.ties=tie;
response.write(JSON.stringify(JSONObj));
response.end();
}
else(rest==="paper")
{
response.writeHead(200);
win=win+1;
JSONObj.outcome='win';
JSONObj.wins=win;
JSONObj.losses=loss;
JSONObj.ties=tie;
response.write(JSON.stringify(JSONObj));
response.end();
}
}
break;
}
}
http.createServer(onRequest).listen(8080);
