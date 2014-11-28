var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('answer', function(itsRight){
    var data = {
      msg: (itsRight ? 'Boa garoto!' : 'Então, não é bem assim...'),
      itsRight: itsRight
    };

    io.emit('answer', data);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});