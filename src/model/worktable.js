import { CALENDER, DOW, HOLIDAY } from '../constants/contants.js';

class Worktable {
  #calinder;

  #month;

  #dow;

  #workdaylist;

  #weekdaylist;

  setObject(month, dow, workdaylist, weekdaylist) {
    this.#month = month;
    this.#dow = dow;
    this.#workdaylist = workdaylist;
    this.#weekdaylist = weekdaylist;
  }

  allMonthobject() {
    this.#makeMonthObject();
    this.#findWeek();
    this.#findHoilday();
    this.#repeatPeople();
    return this.#calinder;
  }

  getWorkTable() {
    return this.#calinder;
  }

  // 달, 날짜, 요일 추가
  #makeMonthObject() {
    const calender = [];
    const day = this.#getDaysforMonth();
    const dow = this.#repeatDow(day.length);
    day.forEach((item, index) => {
      calender.push({
        month: this.#month,
        day: item,
        dow: dow[index],
      });
    });
    this.#calinder = calender;
  }

  #getDaysforMonth() {
    const dayOfMonth = CALENDER.find((mon) => mon.month === this.#month).days;
    // 해당 달 날짜 배열
    return dayOfMonth;
  }

  /**
   *
   * @param {Number} repeatCount : dayofmonth.lenth
   */
  #repeatDow(repeatCount) {
    const startDayIndex = DOW.indexOf(this.#dow);
    const repeatDowArray = [];
    for (let i = 0; i < repeatCount; i++) {
      const currentDayIndex = (startDayIndex + i) % DOW.length;
      repeatDowArray.push(DOW[currentDayIndex]);
    }
    return repeatDowArray;
  }

  // 휴일 찾기
  #findWeek() {
    this.#calinder.forEach((item) => {
      if (item.dow === '토' || item.dow === '일') {
        item.week = true;
      } else {
        item.week = false;
      }
    });
  }

  // 공휴일 찾기
  #findHoilday() {
    this.#calinder.forEach((day) => {
      HOLIDAY.forEach((holiday) => {
        if (day.month === holiday.month && day.day === holiday.days && !day.week) {
          day.holiday = true;
        }
      });
    });
  }

  #repeatPeople() {
    let workIndex = 0;
    let weekIndex = 0;
    this.#calinder.forEach((item) => {
      if (item.week || item.holiday) {
        item.name = this.#weekdaylist[weekIndex % this.#weekdaylist.length];
        item.index = ['week', weekIndex];
        weekIndex++;
      } else {
        item.name = this.#workdaylist[workIndex % this.#workdaylist.length];
        item.index = ['work', workIndex];
        workIndex++;
      }
    });
  }
}

export default Worktable;
