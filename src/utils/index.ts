import moment from 'moment';

moment.locale('zh-cn');

/**
 * 格式化时间
 * @param datetime
 * @param type
 */
export function formatDate(datetime: any, type: string) {
  return moment(datetime).format(type);
}

/**
 * 获取年(years)、月(months)、日(days)、周(weeks)的上n个时间
 * @param number
 * @param mdate
 * @param type
 */
export function lastDate(number: number, mdate: any, type: string) {
  return moment()
    .subtract(number, mdate)
    .format(type);
}

/**
 * 获取当前 年(YYYY) 月(MM) 日(DD)
 * @param type
 */
export function getDate(type: string) {
  return parseInt(moment().format(type));
}

/**
 * 延迟
 * @param time
 */
export function delay(time: number) {
  return new Promise(function(resolve, _reject) {
    window.setTimeout(function() {
      resolve(time);
    }, time);
  });
}

/**
 * 将形如url?(page=1&sort=4)param转换为{page:'1',sort:'4'}
 * @param url
 */
export function param2Obj(url: string) {
  const search = url.split('?')[1];
  if (!search) return {};
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}

/**
 * 将形如{page:'1',sort:'4'}JSON转换为(page=1&sort=4)param
 * @param json
 */
export function obj2Param(json: any) {
  if (!json) return '';
  return Object.keys(json)
    .map((key) => {
      if (json[key] === undefined) return '';
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
    })
    .join('&');
}
