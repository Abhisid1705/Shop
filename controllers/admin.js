const Product = require('../models/product');

const mongodb=require('mongodb');

const ObjectId=mongodb.ObjectID;
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true, 
    productCSS: true,
    activeAddProduct: true,
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product=new Product(title,price,description,imageUrl,null,req.user._id)
  product.save()
    .then(result=>{console.log('created product')
    console.log(req.user._id);
     res.redirect('/admin/products');
  }).catch(err=>{console.log(err);
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
       console.log("admin");
       res.render('admin/products', {
       prods: products,
       pageTitle: 'Admin Products',
       path: '/admin/products'  
      });
    }).catch(err=>{console.log(err)});
};

exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit;
  if(!editMode)
  {
    return res.redirect('/');
  }
  console.log("edittt")
  const productid=req.params.productid;
  Product.findbyId(productid)  
  .then(products=>{
    const product=products;
    if(!product){
      return res.redirect('/');
    }
    res.render('admin/edit-product',{ 
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true, 
      productCSS: true,
      activeAddProduct: true,
      editing:true,
      product:product
  });

  }).catch(err=>console.log(err))
  
};
exports.postEditProduct=(req,res,next)=>{
  const prodid= req.body.productid;//not updating id 
  const updatedtitle = req.body.title;
  const updatedimageUrl = req.body.imageUrl;
  const updatedprice = req.body.price;
  const updateddescription = req.body.description;
  
  const product=new Product(updatedtitle,updatedprice,updateddescription,updatedimageUrl,new ObjectId(prodid));
    product.save()//returing because save returns a promise and to not use nested then we can simply return it
//save()will create a new product if product doesnot exist else it will overwrite current one
  .then(result=>{console.log("update succesfull")
  res.redirect('/admin/products');
})
  
  .catch(err=>console.log(err))//for both then it will catch error now
 }


exports.postdeleteproduct=(req,res,next)=>{
  const prodid=req.body.productid;
  Product.deletebyId(prodid)
  .then(()=>{console.log("deleted")
    res.redirect('/admin/products')

}).catch(err=>{console.log(err)})
}