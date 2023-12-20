import { Console } from '@woowacourse/mission-utils';

const Print = {
  /**
   *
   * @param {Object} object : 월, 일, 요일, 근무자
   */
  printAll(object) {
    object.forEach((item) => {
      if (!item.holiday) {
        Console.print(`${item.month}월 ${item.day}일 ${item.dow} ${item.name}`);
      } else {
        Console.print(`${item.month}월 ${item.day}일 ${item.dow}(휴일) ${item.name}`);
      }
    });

    Console.print(``);
  },
};
export default Print;
