const getdb=require('../util/database').getdb;

const MongoDb=require('mongodb')


class Product{
constructor(title,price,description,imageUrl,id,userid){
  this.title=title;
  this.price=price;
  this.description=description;
  this.imageUrl=imageUrl;
  this._id=id;
  this.userid=userid;  
}
  save(){
    const db=getdb();
    let dbop;
    if(this._id){
      dbop=db.collection('products').updateOne({_id: new MongoDb.ObjectID(this._id)},{$set:this});
    }
    else{
      
       dbop=db.collection('products').insertOne(this)
    }
    
    return dbop.then(result=>{
        console.log(result);
    }).catch(err=>{console.log(err)})
  }
  static fetchAll(){
    const db=getdb();
    return db.collection('products').find().toArray()
    .then(products=>{
       return products;
    })
    .catch(err=>{console.log(err)})
 };
 static findbyId(prodid){
   const db=getdb();
   return db.collection('products').find({_id: new MongoDb.ObjectID(prodid)})
   .next()
   .then(product=>product)
   .catch(err=>{console.log(err)})
 };
 static deletebyId(prodid){
   const db=getdb();
   return db.collection('products').deleteOne({_id:new MongoDb.ObjectID(prodid)})
   .then(result=>{console.log("deleted")})
   .catch(err=>{console.log(err)})
 };
}
module.exports=Product;