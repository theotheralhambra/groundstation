// import dependencies
const WebSocket = require('ws');
const fs = require('fs');
const Papa = require('papaparse');

// globals
const WebSocketServer = WebSocket.Server;
const wss = new WebSocketServer({port: 1501});
// 0         1         2         3         4         5         6         7         8         9         10          11        12        13        14        15        16        17        18        19        20        21        22        23         24
// clock,    x_dist,   x_vel,    x_accel,  y_dist,   y_vel,    y_accel,  z_dist,   z_vel,    z_accel,  temp,       gyro_x,   gyro_y,   gyro_z,   unk,      unk,      unk,      unk,      unk,      unk,      unk,      unk,      unk,      lat,       lon
// 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 311.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 32.990281, -106.975009

const bst_csvInputFile  = 'data/clean_2019-04-13-13h-34m-24s.CSV';//'data/bst_2019-03-02-11_29_33.CSV';
const bst_jsonInputFile = 'data/bst_2019-03-02-11_33_59.JSON';
const sst_csvInputFile  = 'data/sst_2019-03-02-11_29_33.CSV';
const sst_jsonInputFile = 'data/sst_2019-03-02-11_33_59.JSON';
const blockElements = 24;
const clockIndex    = 0;
const x_dstIndex    = 1;
const x_velIndex    = 2;
const x_accIndex    = 3;
const y_dstIndex    = 4;
const y_velIndex    = 5;
const y_accIndex    = 6;
const z_dstIndex    = 7;
const z_velIndex    = 8;
const z_accIndex    = 9;
const s_tmpIndex    = 10;
const x_gyrIndex    = 11;
const y_gyrIndex    = 12;
const z_gyrIndex    = 13;
const s_latIndex    = 23;
const s_lonIndex    = 24;
var dataArr = [];
var idx = 1;      // skip the header

var test = 0;
var initBlock = 1;
var lastBlock = 0;

// open the data file
const file = fs.createReadStream(bst_csvInputFile);
// parse the data
Papa.parse(file, {
  complete: function(results) {
    dataArr = results.data;
    lastBlock = results.data.length - 1;
    //console.log(results.data[0]);
    //console.log(results.data[1]);
    //for (var i = initBlock; i < lastBlock; i++) {
    //  for (var j = 0; j < 14; j++) {
    //    //console.log(results.data[i]);
    //    dataArr[i].push(results.data[i][j]);
     // }
    //}
    //console.log(dataArr);
    initBlock = lastBlock;
  }
});

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};
/*
wss.on('connection', function(ws) {
   ws.on('message', function(message) {
     console.log('Received: ' + message);
     setInterval(() => wss.broadcast(test++), 100);
     //wss.broadcast(test++);
     
   });

   ws.send('You successfully connected to the websocket.');
});*/

wss.on('connection', function(ws) {
  ws.on('message', function(message) {
    console.log('Received: ' + message);
    //for (idx = 0; idx < dataArr.length; idx++) {
    //  console.log(dataArr[]);
    //}
    // Broadcast to everyone else.
    wss.clients.forEach(function(client) {
      //if (client !== ws && client.readyState === WebSocket.OPEN) {
        setInterval(() => idx < dataArr.length ? wss.broadcast(dataArr[idx++].toString()) : wss.broadcast(dataArr[idx].toString()), 50);
      //}
    });
  });
});
/*
wss.on('connection', function (ws, req) {
  
  console.log('Client connected: ' + req.connection.remoteAddress);
  
  ws.on('message', function (message) {
    console.log('received: %s', message)
  });

  //for(var i = 0; i < 10000; i++) {
  //  ws.send(i);
  //} 
  setInterval(() => ws.send(test++), 100);
});
*/
function sumXYZVectors(x_component, y_component, z_component) {
  return Math.sqrt(x_component*x_component + y_component*y_component + z_component+z_component)
} 










