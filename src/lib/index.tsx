const DeveloperMode = true;
const localeFunc = (number, index, totalSec) => {
  return [
    ["just now", "right now"],
    ["%s secs ago", "in %s seconds"],
    ["1 min ago", "in 1 minute"],
    ["%s min ago", "in %s minutes"],
    ["1 hour ago", "in 1 hour"],
    ["%s hours ago", "in %s hours"],
    ["1 day ago", "in 1 day"],
    ["%s days ago", "in %s days"],
    ["1 week ago", "in 1 week"],
    ["%s weeks ago", "in %s weeks"],
    ["1 month ago", "in 1 month"],
    ["%s months ago", "in %s months"],
    ["1 year ago", "in 1 year"],
    ["%s years ago", "in %s years"],
  ][index];
};
const devLogger = (title = "", log = "") => {
  if (__DEV__ && DeveloperMode) {
    console.log(title + (log ? " :" : ""), log ? JSON.stringify(log) : "");
  }
};
const littleConverter = (thisDate) => {
  console.log("Date", thisDate);
  // const thisoDate=thisDate.split(' ')
  const arrDate = thisDate.split("-");
  return arrDate[1] + "-" + arrDate[0] + "-" + arrDate[2];
};
const getMonth = (monthId) => {
  let mon = "";
  switch (monthId) {
    case 1:
      mon = "Jan";
      break;
    case 2:
      mon = "Feb";
      break;
    case 3:
      mon = "Mar";
      break;
    case 4:
      mon = "Apr";
      break;
    case 5:
      mon = "May";
      break;
    case 6:
      mon = "Jun";
      break;
    case 7:
      mon = "Jul";
      break;
    case 8:
      mon = "Aug";
      break;
    case 9:
      mon = "Sep";
      break;
    case 10:
      mon = "Oct";
      break;
    case 11:
      mon = "Nov";
      break;
    case 12:
      mon = "Dec";
      break;
    default:
      return;
  }
  return mon;
};

const getShadow = (
  elevation = 1,
  backgroundColor = "#fff",
  shadowColor = "#000"
) => {
  const shadow = {
    backgroundColor,
    elevation,
    shadowColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  };
  switch (elevation) {
    case 0:
      shadow.shadowOpacity = 0;
      shadow.shadowRadius = 0;
      break;
    case 2:
      shadow.shadowOpacity = 0.2;
      shadow.shadowRadius = 1.41;
      break;
    case 3:
      shadow.shadowOpacity = 0.22;
      shadow.shadowRadius = 2.22;
      break;
    case 4:
      shadow.shadowOffset.height = 2;
      shadow.shadowOpacity = 0.23;
      shadow.shadowRadius = 2.62;
      break;
    case 5:
      shadow.shadowOffset.height = 2;
      shadow.shadowOpacity = 0.25;
      shadow.shadowRadius = 3.84;
      break;
    case 6:
      shadow.shadowOffset.height = 3;
      shadow.shadowOpacity = 0.27;
      shadow.shadowRadius = 4.65;
      break;
    case 7:
      shadow.shadowOffset.height = 3;
      shadow.shadowOpacity = 0.29;
      shadow.shadowRadius = 4.65;
      break;
    case 8:
      shadow.shadowOffset.height = 4;
      shadow.shadowOpacity = 0.3;
      shadow.shadowRadius = 4.65;
      break;
    case 9:
      shadow.shadowOffset.height = 4;
      shadow.shadowOpacity = 0.32;
      shadow.shadowRadius = 5.46;
      break;
    case 10:
      shadow.shadowOffset.height = 5;
      shadow.shadowOpacity = 0.34;
      shadow.shadowRadius = 6.27;
      break;
    case 11:
      shadow.shadowOffset.height = 5;
      shadow.shadowOpacity = 0.36;
      shadow.shadowRadius = 6.68;
      break;
    case 12:
      shadow.shadowOffset.height = 6;
      shadow.shadowOpacity = 0.37;
      shadow.shadowRadius = 7.49;
      break;
    case 13:
      shadow.shadowOffset.height = 6;
      shadow.shadowOpacity = 0.39;
      shadow.shadowRadius = 8.3;
      break;
    case 14:
      shadow.shadowOffset.height = 7;
      shadow.shadowOpacity = 0.41;
      shadow.shadowRadius = 9.11;
      break;
    case 15:
      shadow.shadowOffset.height = 7;
      shadow.shadowOpacity = 0.43;
      shadow.shadowRadius = 9.51;
      break;
    case 16:
      shadow.shadowOffset.height = 8;
      shadow.shadowOpacity = 0.44;
      shadow.shadowRadius = 10.32;
      break;
    case 17:
      shadow.shadowOffset.height = 8;
      shadow.shadowOpacity = 0.46;
      shadow.shadowRadius = 11.14;
      break;
    case 18:
      shadow.shadowOffset.height = 9;
      shadow.shadowOpacity = 0.48;
      shadow.shadowRadius = 11.95;
      break;
    case 19:
      shadow.shadowOffset.height = 9;
      shadow.shadowOpacity = 0.5;
      shadow.shadowRadius = 12.35;
      break;
    case 20:
      shadow.shadowOffset.height = 10;
      shadow.shadowOpacity = 0.51;
      shadow.shadowRadius = 13.16;
      break;
    case 21:
      shadow.shadowOffset.height = 10;
      shadow.shadowOpacity = 0.53;
      shadow.shadowRadius = 13.97;
      break;
    case 22:
      shadow.shadowOffset.height = 11;
      shadow.shadowOpacity = 0.55;
      shadow.shadowRadius = 14.78;
      break;
    case 23:
      shadow.shadowOffset.height = 11;
      shadow.shadowOpacity = 0.57;
      shadow.shadowRadius = 15.19;
      break;
    case 24:
      shadow.shadowOffset.height = 12;
      shadow.shadowOpacity = 0.58;
      shadow.shadowRadius = 16.0;
      break;
    default:
      shadow.shadowOpacity = 0.18;
      shadow.shadowRadius = 1.0;
  }
  return shadow;
};
const emailIsValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const viewsConverter = (labelValue) => {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
    : Math.abs(Number(labelValue));
};
const getTimeAgo = (dateParam) => {
  if (!dateParam) {
    return null;
  }
  const date = typeof dateParam === "object" ? dateParam : new Date(dateParam);
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  const today = new Date();
  const yesterday = new Date(today - DAY_IN_MS);
  const seconds = Math.round((today - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const isToday = today.toDateString() === date.toDateString();
  const isYesterday = yesterday.toDateString() === date.toDateString();
  const isThisYear = today.getFullYear() === date.getFullYear();
  if (seconds < 5) {
    return "now";
  } else if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (seconds < 90) {
    return "about a minute ago";
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (isToday) {
    return getFormattedDate(date, "Today"); // Today at 10:20
  } else if (isYesterday) {
    return getFormattedDate(date, "Yesterday"); // Yesterday at 10:20
  } else if (isThisYear) {
    return getFormattedDate(date, false, true); // 10. January at 10:20
  }
  return getFormattedDate(date); // 10. January 2017. at 10:20
};
const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const secondsToHms = (d) => {
  d = Number(d);
  let h = Math.floor(d / 3600);
  let m = Math.floor((d % 3600) / 60);
  let s = Math.floor((d % 3600) % 60);
  let h1 = h;
  if (h.toString().length === 1) {
    h = "0" + h.toString();
  }
  if (m.toString().length === 1) {
    m = "0" + m.toString();
  }
  if (s.toString().length === 1) {
    s = "0" + s.toString();
  }
  return h1 === 0 ? m + ":" + s : h + ":" + m + ":" + s;
};
const getCurrentTimeAndDate = () => {
  //2021-04-15 05:36:15
  const newDate = new Date();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  const day = newDate.getDate();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const seconds = newDate.getSeconds();
  const myDate =
    year +
    "-" +
    (month < 10 ? "0" + month : month) +
    "-" +
    (day < 10 ? "0" + day : day) +
    " " +
    +(hours < 10 ? "0" + hours : hours) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds);
  // ("0" + newDate.getHours()).slice(-2) +
  // ":" +
  // ("0" + newDate.getMinutes()).slice(-2) +
  // ":" +
  // ("0" + newDate.getSeconds()).slice(-2);
  devLogger("Created_at", myDate);
  return myDate;
};
const truncateString = (str, num) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};
const formatAMPM = (dateX) => {
  let hours = dateX.getHours();
  let minutes = dateX.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes + " " + ampm;
};
const getDate_time = (DATEO) => {
  const dx = new Date(DATEO);

  return (
    dx.getDate() +
    ", " +
    MONTH_NAMES[dx.getMonth()] +
    " " +
    dx.getFullYear() +
    " " +
    formatAMPM(dx)
  );
};
const getTextSizeStyle = (fontSize) => ({
  fontSize,
  lineHeight: fontSize * 1.618,
});
const fancyTimeFormat = (duration) => {
  // Hours, minutes and seconds
  //var hrs = ~~(duration / 3600);
  var mins = ~~((duration % 3600) / 60);
  var secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";

  // if (hrs > 0) {
  //     ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  // }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
};

export {
  getShadow,
  emailIsValid,
  viewsConverter,
  getDate_time,
  littleConverter,
  getTextSizeStyle,
  getCurrentTimeAndDate,
  truncateString,
  DeveloperMode,
};
