const jsonfile = require("jsonfile");
const randomExt = require("random-ext");

var finalDataSet = { data: [] };
var dataSetSize = 30;
var orderIdBegin = 1234;

var products = [
  {
    productId: "random generated string",
    productName: "IPhone 13 Pro",
    unitPrice: 10000,
  },
  {
    productId: "random generated string",
    productName: "Samsung S20 FE",
    unitPrice: 8500,
  },
  {
    productId: "random generated string",
    productName: "Vivo V11 Pro",
    unitPrice: 4000,
  },
  {
    productId: "Samsung M21",
    productName: "Samsung M21",
    unitPrice: 2000,
  },
  {
    productId: "random generated string",
    productName: "RealMe 5A",
    unitPrice: 1000,
  },
  {
    productId: "random generated string",
    productName: "Blackberry Z Ultra",
    unitPrice: 11000,
  },
  {
    productId: "random generated string",
    productName: "IPhone 12 Pro",
    unitPrice: 9000,
  },
  {
    productId: "random generated string",
    productName: "IPhone 13",
    unitPrice: 9500,
  },
  {
    productId: "random generated string",
    productName: "IPhone 12",
    unitPrice: 8500,
  },
];

const file =
  "C:/Users/p.kumar.garamidde/Accenture/Projects/DANTE/PoC/testing_automation/src/data.json";

finalDataSet = createDataSet();

jsonfile.writeFile(file, finalDataSet.data, function (err) {
  if (err) console.error(err);
});

console.log("Done!");

function getRandomProduct() {
  return randomExt.pick(products);
}

function createDataSet() {
  var orders = [];
  var transaction = {};
  var transactionCount = 0;

  orders = createOrders(dataSetSize, orderIdBegin);

  console.log("No of orders generated: "+orders.length);

  for (i = 0; i < orders.length; i++) {
    for (j = 0; j < orders[i].products.length; j++) {
      transaction.id = transactionCount++;
      transaction.orderId = orders[i].orderId;
      transaction.orderDate = orders[i].orderDate;
      transaction.totalOrderAmount = orders[i].orderAmount;
      transaction.productId = orders[i].products[j].productId;
      transaction.productName = orders[i].products[j].productName;
      transaction.productPrice = orders[i].products[j].productPrice;
      transaction.quantity = orders[i].products[j].quantity;
      finalDataSet.data.push(JSON.parse(JSON.stringify(transaction)));
    }
  }

  return finalDataSet;
}

function createOrders(count, idBeginsWith) {
  let orders = [];
  console.log("Create orders method received count: "+count)
  for (let k = 0; k < count; k++) {
    let order = {};
    order = createOrder(idBeginsWith++);
    orders.push(order);
  }
  console.log("Order array created: "+ orders.length);
  return orders;
}

function createOrder(orderNo) {
  let order = {};
  order.orderAmount = 0;

  order.products = randomExt.subArray(
    products,
    randomExt.integer(products.length, 1)
  );

  order.orderId = "ORD" + orderNo;
  order.orderDate = randomExt.date(new Date(), new Date(2015, 01, 01));
  for (let i = 0; i < order.products.length; i++) {
    order.products[i].productId = randomExt.string(6, 6);
    order.products[i].quantity = randomExt.integer(10, 1);
    order.products[i].productPrice =
      order.products[i].quantity * order.products[i].unitPrice;
    order.orderAmount += order.products[i].productPrice;
  }
  return order;
}
