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

var api = new Library();
api.searchAllProducts().then(function(value){
  updateTable('allTable',value);
});