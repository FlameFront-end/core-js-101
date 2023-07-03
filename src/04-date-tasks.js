/* *******************************************************************************************
 *                                                                                           *
 * Please read the following tutorial before implementing tasks:                              *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#Date_object
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date     *
 *                                                                                           *
 ******************************************************************************************* */


/**
 * Parses a rfc2822 string date representation into date value
 * For rfc2822 date specification refer to : http://tools.ietf.org/html/rfc2822#page-14
 *
 * @param {string} value
 * @return {Date}
 *
 * @example:
 *    'December 17, 1995 03:24:00'    => Date()
 *    'Tue, 26 Jan 2016 13:48:02 GMT' => Date()
 *    'Sun, 17 May 1998 03:00:00 GMT+01' => Date()
 */
function parseDataFromRfc2822(value) {
  const timestamp = Date.parse(value);
  return new Date(timestamp);
}


/**
 * Parses an ISO 8601 string date representation into date value
 * For ISO 8601 date specification refer to : https://en.wikipedia.org/wiki/ISO_8601
 *
 * @param {string} value
 * @return {date}
 *
 * @example :
 *    '2016-01-19T16:07:37+00:00'    => Date()
 *    '2016-01-19T08:07:37Z' => Date()
 */
function parseDataFromIso8601(value) {
  const timestamp = Date.parse(value);
  return new Date(timestamp);
}


/**
 * Returns true if specified date is leap year and false otherwise
 * Please find algorithm here: https://en.wikipedia.org/wiki/Leap_year#Algorithm
 *
 * @param {date} date
 * @return {boolean}
 *
 * @example :
 *    Date(1900,1,1)    => false
 *    Date(2000,1,1)    => true
 *    Date(2001,1,1)    => false
 *    Date(2012,1,1)    => true
 *    Date(2015,1,1)    => false
 */
function isLeapYear(date) {
  const year = date.getFullYear();

  if (year % 4 !== 0) {
    return false;
  } if (year % 100 !== 0) {
    return true;
  } return year % 400 === 0;
}


function timeSpanToString(startDate, endDate) {
  const timespan = endDate - startDate;

  const hours = Math.floor(timespan / (1000 * 60 * 60)).toString().padStart(2, '0');
  const minutes = Math.floor((timespan / (1000 * 60)) % 60).toString().padStart(2, '0');
  const seconds = Math.floor((timespan / 1000) % 60).toString().padStart(2, '0');
  const milliseconds = Math.floor(timespan % 1000).toString().padStart(3, '0');

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}


/**
 * Returns the angle (in radians) between the hands of an analog clock
 * for the specified Greenwich time.
 * If you have problem with solution please read: https://en.wikipedia.org/wiki/Clock_angle_problem
 *
 * SMALL TIP: convert to radians just once, before return in order to not lost precision
 *
 * @param {date} date
 * @return {number}
 *
 * @example:
 *    Date.UTC(2016,2,5, 0, 0) => 0
 *    Date.UTC(2016,3,5, 3, 0) => Math.PI/2
 *    Date.UTC(2016,3,5,18, 0) => Math.PI
 *    Date.UTC(2016,3,5,21, 0) => Math.PI/2
 */
function angleBetweenClockHands(date) {
  const hour = date.getUTCHours() % 12;
  const minute = date.getUTCMinutes();

  const hourHandAngle = (hour * 30) + (minute * 0.5);
  const minuteHandAngle = minute * 6;

  let angle = Math.abs(hourHandAngle - minuteHandAngle);
  if (angle > 180) {
    angle = 360 - angle;
  }

  return (angle * Math.PI) / 180;
}


module.exports = {
  parseDataFromRfc2822,
  parseDataFromIso8601,
  isLeapYear,
  timeSpanToString,
  angleBetweenClockHands,
};
