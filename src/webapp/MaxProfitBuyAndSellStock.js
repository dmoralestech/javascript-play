/**
 * Created by dmorales on 20/09/2016.
 */

function computeMaxProfit(stockPricesArr) {
    var minStockPrice = Number.MAX_VALUE; // this will store the minimum price in the array
    var maxProfit = 0.0; // this stores the current max profit per iteration
    var maxStockPriceIndex = 0;
    var minStockPriceIndex = 0;
    var mapPriceIndex = new Map(); // map of prices and its index

    stockPricesArr.forEach(function(stockPrice, index) {
        mapPriceIndex.set(stockPrice, index);
    });

    stockPricesArr.forEach(function (stockPrice, index) {

        // get the max between the current maxProfit and the difference between the current price and the current min price
        var diffBetweenCurrentPriceAndMinPrice = stockPrice - minStockPrice;
        if (diffBetweenCurrentPriceAndMinPrice > maxProfit) {
            maxProfit = diffBetweenCurrentPriceAndMinPrice;
            // i need to know which minStockPrice was used here
            minStockPriceIndex = mapPriceIndex.get(minStockPrice);
            maxStockPriceIndex = index;
        }

        if (stockPrice < minStockPrice) {
            minStockPrice = stockPrice;
        }

    });

    return {
        maxProfit: maxProfit,
        minStockPriceIndex: minStockPriceIndex,
        maxStockPriceIndex: maxStockPriceIndex
    };

}

var stockPrices = [];

stockPrices.push(10);
stockPrices.push(20);
stockPrices.push(300);
stockPrices.push(5);
stockPrices.push(100);
stockPrices.push(200);
stockPrices.push(0.5);
stockPrices.push(0.4);
stockPrices.push(400);

var x = computeMaxProfit(stockPrices);

console.log("Max profit: ", x.maxProfit);
console.log("Index where the min price is: ", x.minStockPriceIndex);
console.log("Index where the max price is: ", x.maxStockPriceIndex);



function testAsyncForLoop() {
    for (var i = 0; i < 5; i++ ) {
        (function(j) {
            setTimeout(function () {
                console.log("inside loop: " + j);
            }, 1000);
        })(i);
    }
    console.log("outside loop: ", i);
}

testAsyncForLoop()