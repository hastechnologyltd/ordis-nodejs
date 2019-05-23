var net = require('net');

var client = new net.Socket();
client.connect(48202, "localhost", function(){
   console.log("connected");

   var command = parseInt("F2" , 16);
   var username = getBytes("jeff");
   var passowrd = getBytes("password1");

    var bytes = ([command]).concat(username).concat(0).concat(passowrd).concat(0);
    var buff = new Buffer.from(bytes);
    //var data = buff.toString('utf8');
    //var bufStream = new BufferStream(buf);

    client.write(buff);

    client.write("data");
   //client.write("Additional data.\n");
});

client.on('data', function(data) {
   console.log("Recieved");
   client.destroy();
});

client.on('close', function() {
    console.log("disconnected");
});

client.on('error', function(error) {
    console.log("Error: " + error);
    client.destroy();
});

function getBytes(str) {
    var bytes = [], char;
    str = encodeURI(str);

    while (str.length) {
        char = str.slice(0, 1);
        str = str.slice(1);

        if ('%' !== char) {
            bytes.push(char.charCodeAt(0));
        } else {
            char = str.slice(0, 2);
            str = str.slice(2);

            bytes.push(parseInt(char, 16));
        }
    }

    return bytes;
}
