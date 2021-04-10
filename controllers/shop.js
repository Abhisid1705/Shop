const Product= require('../models/product');
const User = require('../models/user');


// const Cart=require('../models/cart');

// const User=require('../models/user');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then((products)=>{
    res.render('shop/product-list',{
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });

  })
  .catch(err=>console.log(err))
};

exports.getproductdetails = (req,res,next)=> {
   const prodid=req.params.productid;
   Product.findbyId(prodid).then((products)=>{
    res.render('shop/product-detail',{
      product:products, 
      pageTitle:'item',
      path:'/admin/products'
    });

   })

   .catch(err=>console.log(err))
     
};
exports.getIndex = (req, res, next) => {
  Product.fetchAll().then((products)=>{
      console.log(products)    
      res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err=>console.log(err));
}
exports.getCart = (req, res, next) => {
  req.user.getCart()
  .then(products=>{
    res.render('shop/cart', { 
      path: '/cart',
      pageTitle: 'Your Cart',
      products:products
      
    });

  })
  .catch(err=>{console.log(err)})
}
exports.postdeletecartproduct=(req,res,next)=>{
  const prodid=req.body.productid;
  req.user.deleteitemfromcart(prodid)
  .then(result=>{
   res.redirect('/cart')
  })
  .catch(err=>{console.log('its an error')});
  
}

exports.postcart=(req,res,next)=>{
  const prodid=req.body.productid;
  Product.findbyId(prodid).then(product=>{
    return req.user.addtoCart(product);
  }).then(result=>{console.log("added to cart");
        res.redirect('/cart');
  })
};

exports.postorder=(req,res,next)=>{
      req.user.addOrder().then(result=>{
        console.log("ordered")
    res.redirect('/orders');
  }).catch(err=>{console.log(err)});
}
exports.getOrders = (req, res, next) => {
  req.user.fetchorders().then(orders=>{
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders:orders

  })
  
  });
};

// exports.getCheckout = (req, res, next) => {
//   res.render('shop/checkout', {
//     path: '/checkout',
//     pageTitle: 'Checkout'
//   });
// };

  