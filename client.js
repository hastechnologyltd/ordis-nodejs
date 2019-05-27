var net = require('net');

var client = new net.Socket();
client.connect(48202, "localhost", function(){
   console.log("connected");

    var command = parseInt("F2" , 16);
    var username = getBytes("jeff");
    var passowrd = getBytes("password1");

    var bytes = ([command]).concat(username).concat(0).concat(passowrd).concat(0);
    var buff = new Buffer.from(bytes);
    client.write(buff);


    var correlationId = getBytes("123456789")
    var headerBytes = (correlationId).concat(0);
    var headerBuff = new Buffer.from(headerBytes);
    client.write(headerBuff);

    var who = getBytes("Jeff")
    var whoBytes = (who).concat(0);
    var whoBuff = new Buffer.from(whoBytes);
    client.write(whoBuff);

    var dataHeader = new Int8Array(5);
    dataHeader[0] = 1;
    dataHeader[1] = 2;
    dataHeader[2] = 3;
    dataHeader[3] = 4;
    dataHeader[4] = 5;
    var dataHeaderBuff = new Buffer.from(dataHeader);
    client.write(dataHeaderBuff);

    var what = getBytes("elemt.column")
    var whatBytes = (who).concat(0);
    var whatBuff = new Buffer.from(whatBytes);
    client.write(whatBuff);


    var extraDataBytes = getBytes("Load of extra data")

    var extraDataLength = new Int8Array(1);
    extraDataLength[0] = extraDataBytes.length;
    var extraDataLengthBuff = new Buffer.from(extraDataLength);
    client.write(extraDataLengthBuff);

    var extraDataBuff = new Buffer.from(extraDataBytes);
    client.write(extraDataBuff);
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
