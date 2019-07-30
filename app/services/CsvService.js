'use strict';

const fs = require('fs');
const csv = require('csv'); // http://csv.adaltas.com/

class CsvService {
  static readData(path, opt, parseOpt) {
    // parseOpt 請參考 http://csv.adaltas.com/parse/
    parseOpt = parseOpt || {};
    const data = fs.readFileSync(path, opt);
    return new Promise(function (resolve, reject) {
      csv.parse(data, parseOpt, function (err, data) {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }

  /**
   * This is a promise wrapper for csv.parse()
   * @param {String}} data      String
   * @param {Object}  parseOpt  CSV parse options. Doc-ref: http://csv.adaltas.com/parse/
   */
  static parseFromString(data, parseOpt = {}) {
    return new Promise(function (resolve, reject) {
      csv.parse(data, parseOpt, function (err, data) {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }

  static formatListToCsv(listData) {
    let str = '';
    _.forEach(listData, function (data) {
      if (!Array.isArray(data)) data = _.values(data);
      str += data.map(function (field) {
          // 轉換每筆資料裡的欄位
        if (field === undefined) return '';
        return '"' + String(field).replace(/\"/g, '""') + '"'; // eslint-disable-line
      }).join(',') + '\r\n';
    });
    return str;
  }
  // 轉換成excel的csv專屬格式
  static formatListToCsvForExcel(listData) {
    let str = '';
    _.forEach(listData, function (data) {
      if (!Array.isArray(data)) data = _.values(data);
      str += data.map(function (field) {
        // 轉換每筆資料裡的欄位
        if (field === undefined) return '';
        // excel 有專門處理字串是0開頭0會被移除的問題, 故所有欄位格式都改為 ="xxxx"
        return '="' + String(field).replace(/\"/g, '""') + '"'; // eslint-disable-line
      }).join(',') + '\r\n';
    });
    return str;
  }
}

module.exports = CsvService;
