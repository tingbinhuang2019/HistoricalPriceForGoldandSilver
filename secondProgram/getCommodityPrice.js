const db = require('../database/db.js');

let convertToNumber = (date) => parseInt(date.replace(/-/g, ''));

let calculateMeanAndVar = (arr, type) => {
  let getVariance = (arr, mean) => {
    return arr.reduce(function (pre, cur) {
      pre = pre + Math.pow((cur - mean), 2);
      return pre;
    }, 0)
  }

  let mean = arr.reduce((previous, current) => {
    return previous + current;
  })

  let variance = getVariance(arr, mean / arr.length);

  let result = {
    mean: mean / arr.length,
    variance: variance / arr.length
  }
  return type + " " + result.mean.toFixed(2) + " " + result.variance.toFixed(2);
}

let getGoldPrice = async (startDate, endDate) => {
  let arr = [];
  db.postPriceFromGold(startDate, endDate, (err, result) => {
    if (err) return console.error(err.message);
    for (let i = 0; i < result.length; i++) {
      arr[i] = result[i].price;
    }
    console.log('\n-------------------\n');
    console.log(calculateMeanAndVar(arr, 'gold'));
    console.log('\n-------------------\n');
  })
  db.connection.end();
}

let getSilverPrice = async (startDate, endDate) => {
  let arr = [];
  db.postPriceFromSilver(startDate, endDate, (err, result) => {
    if (err) return console.error(err.message);
    for (let i = 0; i < result.length; i++) {
      arr[i] = result[i].price;
    }
    console.log('\n-------------------\n');
    console.log(calculateMeanAndVar(arr, 'silver'));
    console.log('\n-------------------\n');
  })
  db.connection.end();
}

let getPrice = () => {
  let startDate = convertToNumber(process.argv[2]);
  let endDate = convertToNumber(process.argv[3]);
  let type = process.argv[4];
  if (type === 'gold') {
    getGoldPrice(startDate, endDate);
  } else if (type === 'silver') {
    getSilverPrice(startDate, endDate);
  } else {
    console.log('Wrong input for type(please enter gold or silver at the end)!');
  }
}

// driver function,call function 'getPrice()' to calculate result
getPrice();
