//import randomItem from 'random-item';
const jsonfile = require('jsonfile')
const randomExt = require('random-ext');

var finalDataSet = {"data" : []};
var dataSetSize = 10;
var noOfOrders = 4;
var maxOrderSize = 10;
var orderIdBegin = 1234;

var products = [];
products = [{
	"productId" : "random generated string",
	"productName" : "IPhone 13 Pro",
	"price" : 10000
},
{
	"productId" : "random generated string",
	"productName" : "Samsung S20 FE",
	"price" : 8500
},
{
	"productId" : "random generated string",
	"productName" : "Vivo V11 Pro",
	"price" : 4000
},
{
	"productId" : "Samsung M21",
	"productName" : "Samsung M21",
	"price" : 2000
},
{
	"productId" : "random generated string",
	"productName" : "RealMe 5A",
	"price" : 1000
},
{
	"productId" : "random generated string",
	"productName" : "Blackberry Z Ultra",
	"price" : 11000
},
{
	"productId" : "random generated string",
	"productName" : "IPhone 12 Pro",
	"price" : 9000
},
{
	"productId" : "random generated string",
	"productName" : "IPhone 13",
	"price" : 9500
},
{
	"productId" : "random generated string",
	"productName" : "IPhone 12",
	"price" : 8500
}];

var sampleObject = {
    "id" : 1,
    "orderId" : "ORD1234",
	"orderDate" : new Date(),
    "productId" : "23",
    "productName" : "",
	"quantity" : 12,    
    "productPrice" : 1500,
	"totalOrderAmount" : 21342
}

const file = 'C:/Users/p.kumar.garamidde/Accenture/Projects/DANTE/PoC/testing_automation/src/data.json'

for(i=0; i<dataSetSize; i++) {
    
    sampleObject.id = i+1;
    sampleObject.orderId = "ORD"+(orderIdBegin++);
    sampleObject.orderDate = randomExt.date(new Date());

    var product = getRandomProduct();

    sampleObject.productId = randomExt.string(6,6);
    sampleObject.productName = product.productName;
    sampleObject.productPrice = product.productPrice;
    sampleObject.quantity = randomExt.integer(10, 1);

    finalDataSet.data.push(JSON.parse(JSON.stringify(sampleObject)));
}

jsonfile.writeFile(file, finalDataSet, function (err) {
  if (err) console.error(err)
})

console.log("Done!")

function getRandomProduct() {
    return randomExt.pick(products);
}