const express = require('express');
const fs = require('fs');
const csv = require('csv'); // http://csv.adaltas.com/
const moment = require('moment');

const DB = require('config/db')
const router = express.Router();

const WeatherService = require('app/services/WeatherService')
const CPBLService = require('app/services/baseball/CPBLService')




router.get('/', function(req, res, next) {
    res.send('hi')
});
/**
 * @param {date}      date                   start date
 */
router.get('/weather', async function(req, res, next) {
    let date = req.query.date;
    let start = moment(date ,"YYYY-MM-DDTHH:mm:ss:").format('YYYY-MM-DD');
    let csvList = await WeatherService.getWeatherData(start);
    let title = ['日期', '氣溫', '雨量'];
    csvList.unshift(title);
    csvList = await _stringify(csvList);
    //fs.writeFileSync(`信義區天氣分析222eee.csv`, csvList);

    res.send({csvList})
});

router.get('/CPBL', async function(req, res, next) {
  await CPBLService.getCPBLData()
})
// csv轉換格式 promise化
function _stringify(data) {
  return new Promise((resolve, reject) => {
    csv.stringify(data, (err, d) => {
      if (err) return reject(err);
      resolve(d);
    });
  });
}

module.exports = router;
