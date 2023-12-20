import { Console } from '@woowacourse/mission-utils';
import { inputWorkDayPeople } from '../view/inputView.js';

class ValidWorkdayName {
  #workDayList;

  async validWorkDayName() {
    let valid = true;

    while (valid) {
      try {
        const work = await inputWorkDayPeople();
        this.#splitWork(work);
        this.#workValidCheck();
        valid = false;
      } catch (error) {}
    }
    return this.#workDayList;
  }

  #splitWork(input) {
    const workArray = input.split(',').map((element) => element.trim());
    this.#workDayList = workArray;
  }

  #workValidCheck() {
    if (this.#isDupel()) {
      Console.print(`[ERROR] 근무자 이름은 중복될 수 없습니다. 다시 입력해 주세요.`);
      throw new Error('[ERROR]');
    }
    if (this.#isRightNameLength()) {
      Console.print(`[ERROR] 근무자 이름은 5글자 이내여야 합니다. 다시 입력해 주세요.`);
      throw new Error('[ERROR]');
    }
    if (this.#isRightPepleNum()) {
      Console.print(`[ERROR] 근무자는 3~35명 사이만 가능합니다. 다시 입력해 주세요.`);
      throw new Error('[ERROR]');
    }
  }

  #isDupel() {
    const workSet = new Set(this.#workDayList);
    if (this.#workDayList.length !== workSet.size) return true;
  }

  #isRightNameLength() {
    const MIN = 1;
    const MAX = 5;
    return this.#workDayList.some((name) => name.length < MIN || name.length > MAX);
  }

  #isRightPepleNum() {
    const MIN = 3;
    const MAX = 35;
    if (this.#workDayList.length < MIN || this.#workDayList.length > MAX) return true;
  }
}
export default ValidWorkdayName;
