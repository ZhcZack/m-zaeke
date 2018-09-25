export const log = window.console.log.bind(console);
export const get = sel => document.querySelector(sel);
export const getAll = sel => document.querySelectorAll(sel);

/**
 * 格式化时间
 * @param timestamp {number} 时间戳
 * @returns {string|string} 格式化之后的时间表达式
 */
export function formatTime(timestamp) {
  let timeString = '';
  let timeGap = (new Date().getTime() - timestamp) / 1000 / 60;

  if (timeGap < 0) {
    let time = new Date(timestamp),
      year = time.getFullYear(),
      month = (time.getMonth() + 1) > 9 ? (time.getMonth() + 1) : '0' + (time.getMonth() + 1),
      date = time.getDate() > 9 ? time.getDate() : '0' + time.getDate();
    timeString = year + '.' + month + '.' + date;
  } else if (timeGap < 2) {
    timeString = '刚刚';
  } else if (timeGap < 60) {
    timeString = parseInt(timeGap, 10) + '分钟前';
  } else if (timeGap < 60 * 24) {
    let hour = parseInt(timeGap / 60, 10);
    timeString = hour + '小时前';
  } else {
    let time = new Date(timestamp),
      year = time.getFullYear(),
      month = (time.getMonth() + 1) > 9 ? (time.getMonth() + 1) : '0' + (time.getMonth() + 1),
      date = time.getDate() > 9 ? time.getDate() : '0' + time.getDate();
    timeString = year + '.' + month + '.' + date;
  }

  return timeString;
}

/**
 * 多久之前时间处理
 * @param {number} timestamp 时间戳
 * @returns {string} 时间字符串
 */
export function getDateDiff(timestamp) {
  let minute = 1000 * 60,
    hour = minute * 60,
    day = hour * 24,
    month = day * 30,
    year = month * 12,
    now = new Date().getTime(),
    diffValue = now - timestamp,
    yearC = diffValue / year,
    monthC = diffValue / month,
    weekC = diffValue / (7 * day),
    dayC = diffValue / day,
    hourC = diffValue / hour,
    minC = diffValue / minute;

  let result = '';
  if (yearC >= 1) {
    result = parseInt(yearC) + '年前';
  } else if (monthC >= 1) {
    result = parseInt(monthC) + '个月前';
  } else if (weekC >= 1) {
    result = parseInt(weekC) + '周前';
  } else if (dayC >= 1) {
    result = parseInt(dayC) + '天前';
  } else if (hourC >= 1) {
    result = parseInt(hourC) + '个小时前';
  } else if (minC >= 1) {
    result = parseInt(minC) + '分钟前';
  } else {
    result = '刚刚';
  }
  return result;
}

/**
 * 返回格式化之后的文章信息
 * @param info 原本的文章信息
 * @returns {{authorName: (string|undefined), authorImage: (string|undefined), title: (string), type: number, description: string, time: (number), comments: number, views: number, articleID: number, authorID: number, coverImage: (string)}}
 */
export function formatArticleInfomation(info) {
  let member = info.member_info ? info.member_info : null;
  return {
    authorName: info.author ? info.author : undefined,
    authorImage: member ? member.img : undefined,
    title: info.title,
    type: info.type,
    description: info.abstract,
    time: info.created,
    comments: info.reply,
    views: info.pv,
    articleID: info.id,
    authorID: member ? member.id : info.author_id,
    coverImage: info.img
  };
}

export function checkValidPhoneNumber(phone) {
  return /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/.test(phone) === true;
}