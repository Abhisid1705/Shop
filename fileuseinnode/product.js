//we want to store the users input in our file
const fs = require('fs');

const path =require('path');
const Cart = require('./cart');


// const p=path.join(__dirname,'models','products.json');//joining path to form a exact path to file
const p=path.join(path.dirname(process.mainModule.filename),'data','products.json');

const cart=require('./cart');

const getproductsFromFile=(cb)=>{
         fs.readFile(p,(err,filecontent)=>{
            if(!err)
            {
              cb(JSON.parse(filecontent));
            }
            else
            {
                cb([]);
            }
            
        }) 
    };

module.exports=class product{
    
    constructor(id,title,imageurl,description,price){
        this.id=id;
        this.title=title;
        this.imageUrl=imageurl;
        this.description=description;
        this.price=price;
    }
    save(){
      getproductsFromFile(products=>{
          if(this.id){
            const existingproductindex= products.findIndex (prod=>prod.id===this.id);
            const updatedproducts = [...products];
            updatedproducts[existingproductindex]=this;
            fs.writeFile(p, JSON.stringify(updatedproducts),err => {
              console.log(err);});
          }
          else{
            this.id=Math.random().toString();
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
            console.log(err);
            });
          };
        
    });
  }
  
  static deleteByid(id) {
    getproductsFromFile(products=>{
      const todeleteproduct=products.find(prod=>prod.id===id);
      
      const updatedproduct=products.filter(prod=>prod.id !==id);
      
      fs.writeFile(p,JSON.stringify(updatedproduct),err=>{
        if(!err){
           Cart.deleteCart(id,todeleteproduct.price);
        }

      });
    });
  }

  static fetchAll(cb){
    getproductsFromFile(cb);
        
};
static findbyid(id,cb){
  getproductsFromFile(products=>{
    const product=products.find(p=>(p.id===id))
  cb(product);  
  })
};
}
        
















