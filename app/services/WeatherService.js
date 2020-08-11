const rp = require('request-promise');
const moment = require('moment');
const cheerio = require('cheerio');

class WeatherService {
    static async getWeatherData(start) {
        let today = moment().format('YYYY-MM-DD');
        let csvList = [];
        while (moment(start).isBefore(moment(today))) {
          let options = {
              uri: `https://e-service.cwb.gov.tw/HistoryDataQuery/DayDataController.do?command=viewMain&station=C0AC70&stname=%25E4%25BF%25A1%25E7%25BE%25A9&datepicker=${start}`,
              method: 'GET',
          }
          let result = await rp(options);
          console.log('result:', result)
          const $ = cheerio.load(result);
          let weathers=[]
          await $('.CSSTableGenerator #MyTable tbody tr').each(function(i, elem) {
              weathers.push($(this).text().split('\n'))
            })
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
        return csvList;
    }     
}

module.exports = WeatherService;