(function(window){

    function myLibrary(){

      // This will create a variable named catalog that will contain a list of 100 random products.
      // All of the library functions will refer to catalog when they perform their product searches.
      var catalog = createRandomCatalog(100);

      // ====================
      // Search All Products
      // ====================
      // Returns a Promise containing an array that has all of the products in the catalog.
      // The Promise will resolve in 1000ms after the function has executed.
      function searchAllProducts(){
        var promise = new Promise(function(resolve, reject) {
            setTimeout(function(){
                resolve(catalog);
            },1000);

        });
        return promise;
      }

      // ==================
      // Search By Id
      // ==================
      // Searches through the catalog array and return a Promise containing the product that matches the id argument.
      // The Promise will resolve in 1000 millisecond after the function has executed.
      // The Promise will reject if an invalid id is searched.
      function searchProductById(id){
        var promise = new Promise(function(resolve,reject){
            var i = 0;
            setTimeout(function(){
                while (i < catalog.length){
                    if (catalog[i].id == id){
                        resolve({id:id,price:catalog[i].price,type:catalog[i].type});
                    }
                    i++;
                }
                reject("Invalid ID: " + id);
            },1000);
        });
        return promise;
      }

      // ========================
      // Search By Product Type
      // ========================
      // Returns a Promise containing an array of all of the products that matched the specified type.
      // The Promise will resolve in 1000 millisecond after the function is executed.
      function searchProductsByType(type){
        var promise = new Promise(function(resolve,reject){
            var i = 0;
            var typeArray = [];
            var possibleTypes = ['Electronics','Book','Clothing','Food'];
            if(!possibleTypes.includes(type)){
                reject("Invalid Type: " + type)
            }
            else {
                setTimeout(function(){
                    while (i < catalog.length){
                        if (catalog[i].type == type){
                            typeArray.push({id:catalog[i].id,price:catalog[i].price,type:catalog[i].type});
                        }
                        i++;
                    }
                    resolve(typeArray);
                },1000);
            }
        });
        return promise;
      }

      // ========================
      // Search By Price
      // ========================
      // Returns a Promise containing an array of all of the products
      // that were within the specified difference of the specified price.
      function searchProductsByPrice(price,difference){
          var promise = new Promise(function(resolve,reject){
              var i = 0;
              var priceArray = [];
              if(!isFinite(price)){
                  reject("Invalid Price: " + price)
              }
              else{
                  setTimeout(function(){
                      while (i < catalog.length){
                          if (Math.abs(catalog[i].price - price) < difference){
                              priceArray.push({id:catalog[i].id,price:catalog[i].price,type:catalog[i].type});
                          }
                          i++;
                      }
                      resolve(priceArray);
                  },1000);
              }
          });
          return promise;
      }

      return {
          searchProductById: searchProductById,
          searchProductsByPrice: searchProductsByPrice,
          searchProductsByType: searchProductsByType,
          searchAllProducts: searchAllProducts
      }

        //function definitions go here


    }


    if(typeof(window.api) === 'undefined'){
        window.api = myLibrary();
    }

})(window);

// The above code will create an object that has a few library functions as attributes.
// It will then assign the object to the api global variable.
// After including the library.js file, the library functions can be accessed through the api global variable.
// Here are some examples:

// var promise1 = api.searchAllProducts();
// var promise2 = api.searchProductById(42);
// var promise3 = api.searchProductsByPrice(200,25);
// var promise4 = api.searchProductsByType("Book");

// ==================
// Product
// ==================
// Creates a product with a random type and price.
// The product type will be either 'Electronics', 'Book', 'Clothing' or 'Food'.
// The product price will be between 0 and 500.
function createRandomProduct(){
    var typeArray = ['Electronics','Book','Clothing','Food'];
    var price = (Math.random()*500).toFixed(2);
    var type = typeArray[Math.floor(Math.random()*4)];

    return {price:price, type:type};
}

// ==================
// Catalog
// ==================
// Returns an array containing a specified number of randomized products.
// Each product will have an id, price, and type attribute.
function createRandomCatalog(num){
    var catalog = [];
    for (var i = 0; i < num; i++){
        var obj = createRandomProduct();
        catalog.push({id:i,price:obj.price,type:obj.type});
    }
    return catalog;
}
