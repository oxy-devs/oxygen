const EventEmitter = require('events');
const express = require('express');
const app = express();


async  function main(){
  const low = require('lowdb');
  const FileSync = require('lowdb/adapters/FileAsync');
  
  const adapter = new FileSync('db.json');
  const db = await low(adapter);
  db.defaults({ servers: [] }).write();
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.get('/ping', (req, res) => {
    if(global.client){
      res.send('ONLINE');
  
    }else{
      res.send('OFFLINE');
    }
  });
  app.get('/server/:id', (req, res) => {
    var server = db.get('servers')
          .find({ id: req.params.id })
          .value()
    if(!server) server = 'null';
    res.send(server);});
  app.listen(8000);
  console.log('listening');
}
main();