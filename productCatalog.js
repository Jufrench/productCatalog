function createTableHeader(tableId){
    var tableHeaderRow = document.createElement('TR');
    var th1 = document.createElement('TH');
    var th2 = document.createElement('TH');
    var th3 = document.createElement('TH');
    var th4 = document.createElement('TH');
    th1.appendChild(document.createTextNode("ProductId"));
    th2.appendChild(document.createTextNode("Type"));
    th3.appendChild(document.createTextNode("Price"));
    th4.appendChild(document.createTextNode("Examine"));
    tableHeaderRow.appendChild(th1);
    tableHeaderRow.appendChild(th2);
    tableHeaderRow.appendChild(th3);
    tableHeaderRow.appendChild(th4);
    document.getElementById(tableId).appendChild(tableHeaderRow);
}

function updateTable(tableId,productArray){
    var tableBody = document.getElementById(tableId);
    //reset table
    while (tableBody.hasChildNodes()) {
        tableBody.removeChild(tableBody.firstChild);
    }
    //create table header
    createTableHeader(tableId);
    //populate table rows
    for (var i = 0; i < productArray.length; i++) {
        var tr = document.createElement('TR');
        var td1 = document.createElement('TD');
        var td2 = document.createElement('TD');
        var td3 = document.createElement('TD');
        var td4 = document.createElement('button');

        td4.addEventListener('click',function(){
            processSearch(this.parentNode.firstChild.innerHTML);
        });
        td1.appendChild(document.createTextNode(productArray[i].id));
        td2.appendChild(document.createTextNode(productArray[i].type));
        td3.appendChild(document.createTextNode(productArray[i].price));
        td4.appendChild(document.createTextNode("Examine"));
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tableBody.appendChild(tr);
    }
}


// Using the library's api.searchAllProducts() method, we call it to get a Promise
// containing an array of all of the products in the catalog.
// We will then use the updateTable(tableId,productArray) method to populate
// the "List of All Products" table with the array of catalog products.
var api;
api.searchAllProducts().then(function(value){
    updateTable('allTable',value);
});


// Edits the the HTML in the "Examined Product" section
// and fills it with the attributes of the product argument.
function updateExaminedText(product){
    var outputString = "Product Id: " + product.id;
    outputString += "<br> Price: " + product.price;
    outputString += "<br> Type: " + product.type;
    document.getElementById("productText").innerHTML = outputString;
}


// Gets the intersection of the similarly priced and similarly typed arrays.
// The searchedId argument is used to exclude the examined product
// from the intersection because the original product should not
// show up in its own similar products list.
function getIntersection(arrA,arrB,searchedId){

    var samePrice = arrA;
    var sameType = arrB;
    var similarArray = [];
    samePrice.forEach(function(obj1){
        sameType.forEach(function(obj2){
            if(obj1.id == obj2.id && obj1.id != searchedId)
                similarArray.push(obj1);
        });
    });
    return similarArray;
}


// Uses the api.searchProductById(searchId) library function to get a Promise containing the searched product.
// Once the Promise resolves, the promise then chains on an
// additional asynchronous operation by returning the Promise.all() method call.
// The Promise.all() method call is used to process three different values:

// -- a Promise returned by api.searchProductByPrice(val.price,50)
// -- a Promise returned by api.searchProductByType(val.type)
// -- the originally searched product represented by the val variable
function processSearch(searchId){
    api.searchProductById(searchId).then(function(val){
        return Promise.all([api.searchProductsByPrice(val.price,50),api.searchProductsByType(val.type),val]);
    }).then(function(val){
        var similarArray = getIntersection(val[0],val[1],val[2].id);
        updateExaminedText(val[2]);
        updateTable('similarTable',similarArray);
    }).catch(function(val){
        alert(val);
    });
}

// The Promise.all() method call returns a Promise containing an array that has a list of similarly priced products,
// a list of similarly typed products and the originally searched product.
// The getIntersection() method call is used to get the intersection of the similarly
// priced and similarly typed products while omitting the originally searched product from the intersection results.

document.getElementById("inputButton").addEventListener('click',function(){
    processSearch(document.getElementById('input').value);
});
