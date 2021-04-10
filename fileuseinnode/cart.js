const { json } = require('body-parser');
const fs=require('fs');
const path=require('path');
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );

module.exports =class Cart {
    static addproduct(id,productprice){
        fs.readFile(p,(err,filecontent)=>{
        let cart={products:[],totalprice:0};
            if(!err){
              cart=JSON.parse(filecontent);
            }
            const existingproductindex=cart.products.findIndex((prod)=>(prod.id===id));
            const existingproduct=cart.products[existingproductindex];
            let updatedproduct;
            if(existingproduct)
            {
                updatedproduct={...existingproduct};
                updatedproduct.qty=updatedproduct.qty+1;
                //cart.products=[...cart.products];
                cart.products[existingproductindex]=updatedproduct;

            }
            else{
                 updatedproduct={id:id,qty:1};
                 //cart.products=[...cart.products,updatedproduct];
                 cart.products.push(updatedproduct);
            }
            cart.totalprice=cart.totalprice+ +productprice;
            fs.writeFile(p,JSON.stringify(cart),err=>{
                console.log(err);
            });
            

        });
    }
    static deleteCart(id,price){
        fs.readFile(p,(err,fileContent)=>{ 
            if(err){
                return;
            };
        const updatedCart={...JSON.parse(fileContent)};
        const producttodelete=updatedCart.products.find(prod=>prod.id===id);
        if(!producttodelete){
            return;
        }
        const productqty=producttodelete.qty;
        updatedCart.products=updatedCart.products.filter(prod=>prod.id!==id);
        updatedCart.totalprice=updatedCart.totalprice-price*productqty;
        fs.writeFile(p,JSON.stringify(updatedCart),err=>{
            console.log(err);
        })
    })
  }
  static getcart(cb){
      fs.readFile(p,(err,fileContent)=>{
        const cart=JSON.parse(fileContent);
        if(err){
            cb(null);
        }
        else
        {
            cb(cart);
        }
      })
  }
};