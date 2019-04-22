const puppeteer = require('puppeteer');
const db = require('../database/db.js');
const linkForGold = 'https://www.investing.com/commodities/gold-historical-data';
const linkForSilver = 'https://www.investing.com/commodities/silver-historical-data';
const months = {
  'Jan': '01',
  'Feb': '02',
  'Mar': '03',
  'Apr': '04',
  'May': '05',
  'Jun': '06',
  'Jul': '07',
  'Aug': '08',
  'Sep': '09',
  'Oct': '10',
  'Nov': '11',
  'Dec': '12'
};
let startDate = "";
let endDate = "";

let convertDate = (date) => {
  let temp = date.split(",");
  let year = temp[1];
  let monthAndDay = temp[0].split(" ");
  let month = months[monthAndDay[0]];
  let day = monthAndDay[1];
  let result = year + month + day;
  return parseInt(result);
}

let scrape = async (link, hasDate = false) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(link);

  const result = await page.evaluate(() => {
    let data = [];
    var tds = document.querySelectorAll('#curr_table tbody tr');
    for (let i = tds.length - 1; i >= 0; --i) {
      data.push(tds[i].innerText);
    }
    return data;
  });

  browser.close();
  return result;
}

// calling scrape function  extract the Date and Price fields
scrape(linkForGold).then((value) => {
  for (let i = 0; i < value.length; i++) {
    let temp = value[i].split('\t');
    let date = convertDate(temp[0]);
    let price = parseFloat(temp[1].replace(/,/g, ''));
    db.insertPricetoGold(date, price, (err, result) => {
      if (err) return console.error(err.message);
    })
  }
})

setTimeout(() => {
  // calling scrape function  extract the Date and Price fields
  scrape(linkForSilver).then((value) => {
    for (let i = 0; i < value.length; i++) {
      let temp = value[i].split('\t');
      let date = convertDate(temp[0]);
      let price = parseFloat(temp[1].replace(/,/g, ''));
      db.insertPricetoSilver(date, price, (err, result) => {
        if (err) return console.error(err.message);
      })
    }
    db.connection.end();
  })
}, 1000);







