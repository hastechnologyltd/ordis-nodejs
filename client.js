var net = require('net');

var client = new net.Socket();
client.connect(28028, "localhost", function(){
   console.log("connceted");
   client.write("Hello Jeff");
});

client.on('data', function(data) {
   console.log("Recieved");
   client.destroy();
});

client.on('close', function() {
    console.log("disconnected");
});
