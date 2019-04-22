const mysql = require('mysql');
const mysqlConfig = require('./config.js');
const connection = mysql.createConnection(mysqlConfig);

const insertPricetoGold = (date, price, callback) => {
  connection.query(`insert into goldPrice (date,price) values (${date}, ${price})`, callback);
}

const insertPricetoSilver = (date, price, callback) => {
  connection.query(`insert into silverPrice (date,price) values (${date}, ${price})`, callback);
}

const postPriceFromGold = (startDate, endDate, callback) => {
  connection.query(`select price from goldPrice where date >= ${startDate} and date <= ${endDate}`, callback);
}

const postPriceFromSilver = (startDate, endDate, callback) => {
  connection.query(`select price from silverPrice where date > ${startDate} and date < ${endDate}`, callback);
}

module.exports = {
  insertPricetoGold,
  insertPricetoSilver,
  postPriceFromGold,
  postPriceFromSilver,
  connection
};