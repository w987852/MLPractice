var express = require('express');
var router = express.Router();

const moment = require('moment');
const rp = require('request-promise');
const cheerio = require('cheerio')
const _ = require('lodash');
const fs = require('fs');
const csv = require('csv'); // http://csv.adaltas.com/

router.get('/', function(req, res, next) {
    res.send('hi')
});

router.get('/weather', async function(req, res, next) {
    let date = req.query.date;
    console.log(date)
    let start = moment('2018-01-01T00:00:00.000Z').format('YYYY-MM-DD');
    let today = moment().format('YYYY-MM-DD');
    console.log(start);
    let csvList = [];

    while (moment(start).isBefore(moment(today))) {
        let options = {
            uri: `https://e-service.cwb.gov.tw/HistoryDataQuery/DayDataController.do?command=viewMain&station=C0AC70&stname=%25E4%25BF%25A1%25E7%25BE%25A9&datepicker=${start}`,
            method: 'GET',
        }
        let result = await rp(options);
        console.log('result:', start)
        const $ = cheerio.load(result);
        let weathers=[]
        await $('.CSSTableGenerator #MyTable tbody tr').each(function(i, elem) {
            //console.log($(this).text())
            weathers.push($(this).text().split('\n'))
          })
        //console.log(weathers)
        weathers.shift();
        weathers.shift();
        weathers.shift();

        for (let weather of weathers) {
            let time = `${start}-` + _.trim(weather[1]);
            let temperature = _.trim(weather[4]);
            let precipitation = _.trim(weather[11]);
    
            let data = [
                time,
                temperature,
                precipitation
            ]
            csvList = _.concat(csvList, [data]);
        }
        start = moment(start).add(1, 'days').format('YYYY-MM-DD')
    }
    let title = ['日期', '氣溫', '雨量'];
    csvList.unshift(title);
    csvList = await _stringify(csvList);
    fs.writeFileSync(`信義區天氣分析.csv`, csvList);

    res.send({csvList})
});


// csv轉換格式 promise化
function _stringify(data) {
  return new Promise((resolve, reject) => {
    csv.stringify(data, (err, d) => {
      if (err) return reject(err);
      console.log(d)
      resolve(d);
    });
  });
}

module.exports = router;
