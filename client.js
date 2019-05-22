var net = require('net');

var client = new net.Socket();
client.connect(48202, "localhost", function(){
   console.log("connected");
   client.write("STRING\n");
    client.write("Additional data.\n");
});

client.on('data', function(data) {
   console.log("Recieved");
   client.destroy();
});

client.on('close', function() {
    console.log("disconnected");
});
