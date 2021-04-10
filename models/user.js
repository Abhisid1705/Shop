const mongodb=require('mongodb');
const getdb=require('../util/database').getdb;
const ObjectId=mongodb.ObjectId;
class User{
    constructor(username,emailid,cart,id){
        this.name=username;
        this.emailid=emailid;
        this.cart=cart;
        this._id=id;
    }
    save(){
        const db=getdb();
        return db.collection('Users').insertOne(this);
    };
    addtoCart(product){
        //this.cart={items:[{}]};
        
        const cartproductIndex=this.cart.items.findIndex(cp=>{return (cp.productid.toString()===product._id.toString())});
        let newquantity=1;
        let updatedcartitems=[...this.cart.items];
        if(cartproductIndex>=0){ 
           
            newquantity=this.cart.items[cartproductIndex].quantity+1;
            updatedcartitems[cartproductIndex].quantity=newquantity;
        }
        else{
            updatedcartitems.push({
                productid:new ObjectId(product._id),
                quantity:newquantity
            })
        }
        const updatedcartproduct={
            items:updatedcartitems,

        }
    
        const db=getdb();
        return db.collection('Users').updateOne({_id:new ObjectId(this._id)},{$set:{cart:updatedcartproduct}})

    }
    getCart(){
        const db=getdb();
        const productids=this.cart.items.map(item=>{
            return item.productid;
        })
        return db.collection('products').find({_id:{$in:productids}}).toArray().then(products=>{
            return products.map(item=>{
                  return{
                      ...item,
                      quantity:this.cart.items.find(items=>{
                          return items.productid.toString()===item._id.toString();
                      }).quantity
                  }
            })


        });
    }
    deleteitemfromcart(productid){
        const updatedcartitem=this.cart.items.filter(item=>{
            return item.productid.toString() !==productid.toString();
        });
        const db=getdb();
        return db.collection('Users').updateOne({_id:new ObjectId(this._id)},{$set:{cart:{items:updatedcartitem}}})
    }
    addOrder(){
        const db=getdb();
        return this.getCart().then(products=>{
            const order={
                items:products,
                user:{
                    _id:new ObjectId(this._id),
                    name:this.name
                }
            }
            return db.collection('orders').insertOne(order);
        }).then(result=>{
            this.cart={items:[]};
            return db.collection('Users').updateOne({_id:new ObjectId(this._id)},{$set:{cart:{items:[]}}})

        });
    }
    fetchorders(){
        const db =getdb();
        return db.collection('orders').find({'user._id':new ObjectId(this._id)}).toArray();
    }
static findbyId(userid){
    const db=getdb();
    return db.collection('Users').findOne({_id:new ObjectId(userid)});
    };
};
module.exports=User;