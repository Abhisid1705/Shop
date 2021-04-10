const mongodb=require('mongodb');
let _db;
const MongoClient=mongodb.MongoClient;

const MongoConnect= (callback)=>{
  MongoClient.connect('mongodb+srv://abhi:9430259109@cluster0.mxivb.mongodb.net/shop?retryWrites=true&w=majority')
  .then(client=>
    {console.log(client)
    _db=client.db();
    callback();
    })
  .catch(error=>{
    throw error;
    console.log(error)})
}
getDb=()=>{
  if(_db){
    return _db;
  }
  else{
    throw "not connected to database";
  }
}
exports.MongoConnect=MongoConnect;
exports.getdb=getDb;















// const Sqlize=require('sequelize');//initialising the variable Sqlize to installed sequelize

// const sqlize= new Sqlize('node-complete','root','123456789', {   //now creating sqlize as a instance of Sqlize we can cosider this as mysql in this case
//     dialect:'mysql',
//     host:'localhost'});

//   module.exports=sqlize;









// const mysql= require('mysql2');

// const pool = mysql.createPool({//creates pool of queries and we dont need to close query all the time with poolpool
//     host:'localhost',
//     user: 'root',
//     database:'node-complete',
//     password:'123456789'
// })

// module.exports = pool.promise(); 
//with sequelize connecting to database

