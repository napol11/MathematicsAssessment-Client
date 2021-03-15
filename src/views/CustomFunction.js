export const date2Thai = (srcDate, isFullMonth = false, isTime = false) => {
  if (!srcDate) return srcDate;
  const date = new Date(srcDate);
  const isValidDate = Boolean(+date);
  if (!isValidDate) return srcDate;
  if (isValidDate && date.getFullYear() < 1000) return srcDate;
  const fullMonthThai = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];
  const abbrMonthThai = [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ];
  let dstYear = 0;
  if (date.getFullYear() > 2500) {
    dstYear = parseInt(date.getFullYear());
  } else {
    dstYear = parseInt(date.getFullYear() + 543);
  }
  let dstMonth = "";
  if (isFullMonth) {
    dstMonth = fullMonthThai[date.getMonth()];
  } else {
    dstMonth = abbrMonthThai[date.getMonth()];
  }
  let dstTime = "";
  if (isTime) {
    const H =
      date.getHours().toString().length === 1
        ? "0" + date.getHours()
        : date.getHours();
    const M =
      date.getMinutes().toString().length === 1
        ? "0" + date.getMinutes()
        : date.getMinutes();
    dstTime = " " + H + ":" + M + " น.";
  }
  const dsDays =
    date.getDate().toString().length === 1
      ? "0" + date.getDate()
      : date.getDate();
  return dsDays + " " + dstMonth + " " + dstYear + dstTime;
};

export const sizeFile = (byte) => {
  // 1 Byte (ไบต์) = 1 ตัวอักษร
  // 1 KB (กิโลไบต์) = 1024 ตัวอักษร
  // 1 MB (เมกกะไบต์) = 1024 KB
  // 1 GB (กิกะไบต์) = 1024 MB
  // 1 TB (เทราไบต์)= 1024 GB

  const KB = Math.pow(1024, 1);
  const MB = Math.pow(1024, 2);
  const GB = Math.pow(1024, 3);
  const TB = Math.pow(1024, 4);

  const cbyte = parseInt(byte);
  let result = "";
  if (cbyte < KB) {
    result = `${parseFloat(cbyte).toFixed(2)} ไบต์`;
  } else if (cbyte > KB && cbyte < MB) {
    result = `${parseFloat(cbyte / KB).toFixed(2)} กิโลไบต์`;
  } else if (cbyte > MB && cbyte < GB) {
    result = `${parseFloat(cbyte / MB).toFixed(2)} เมกกะไบต์`;
  } else if (cbyte > GB && cbyte < TB) {
    result = `${parseFloat(cbyte / GB).toFixed(2)} กิกะไบต์`;
  } else if (cbyte > TB) {
    result = `${parseFloat(cbyte / TB).toFixed(2)} เทราไบต์`;
  }
  return result;
};

export const ellipsisText = (input) => {
  const text = input.toString();
  if (text.length > 7) {
    return text.substring(0, 7) + "..";
  } else {
    return text;
  }
};
