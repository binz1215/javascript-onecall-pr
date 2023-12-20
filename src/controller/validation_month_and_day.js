import { Console } from '@woowacourse/mission-utils';
import { inputMonthNstart } from '../view/inputView.js';
import { DOW } from '../constants/contants.js';

class ValidMonthAndDay {
  #month;

  // day_of_week
  #dow;

  async validMonth() {
    let valid = true;

    while (valid) {
      try {
        const input = await inputMonthNstart();
        this.#splitMonthDoW(input);
        this.#validCheck();
        valid = false;
      } catch (error) {}
    }
    return [this.#month, this.#dow];
  }

  #splitMonthDoW(input) {
    const [month, dow] = input.split(',');
    this.#month = Number(month);
    this.#dow = dow.trim();
  }

  #validCheck() {
    if (this.#isMonthNum()) {
      Console.print(`[ERROR] 월에는 숫자만 입력받을 수 있습니다. 다시 입력해 주세요.`);
      throw new Error('[ERROR]');
    }
    if (this.#isMonthRightArange()) {
      Console.print(`[ERROR] 1~12사이의 숫자만 입력받을 수 있습니다. 다시 입력해 주세요.`);
      throw new Error('[ERROR]');
    }
    if (this.#isDowRight()) {
      Console.print(`[ERROR] 올바른 요일만 입력할 수 있습니다. 다시 입력해 주세요.`);
      throw new Error('[ERROR]');
    }
  }

  #isMonthNum() {
    if (Number.isNaN(this.#month)) return true;
  }

  #isMonthRightArange() {
    const ONE = 1;
    const TWELVE = 12;
    if (this.#month < ONE || this.#month > TWELVE) return true;
  }

  #isDowRight() {
    if (!DOW.includes(this.#dow)) return true;
  }
}
export default ValidMonthAndDay;
