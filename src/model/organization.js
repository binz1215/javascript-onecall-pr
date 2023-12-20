import ValidMonthAndDay from '../controller/validation_month_and_day.js';
import ValidWorkdayName from '../controller/valid_wokrday_name.js';
import ValidWeekdayName from '../controller/valid_weekday_name.js';
import Worktable from './\bworktable.js';
import SwitchTable from '../controller/switchTable.js';

class Organization {
  #month;

  #dow;

  #workDayList;

  #weekDayList;

  #workTable;

  // 모든 객체들을 가져옴
  async getObject() {
    await this.#getMonthDow();
    this.#workDayList = await new ValidWorkdayName().validWorkDayName();
    this.#weekDayList = await new ValidWeekdayName().validWeekDayName();
    this.#getWorktable();
    this.#getSwhitchTable();

    return this.#workTable;
  }

  async #getMonthDow() {
    const monthDow = new ValidMonthAndDay();
    const [month, dow] = await monthDow.validMonth();

    this.#month = month;
    this.#dow = dow;
  }

  #getWorktable() {
    const workTable = new Worktable();
    workTable.setObject(this.#month, this.#dow, this.#workDayList, this.#weekDayList);
    workTable.allMonthobject();
    this.#workTable = workTable.getWorkTable();
  }

  #getSwhitchTable() {
    const switchtable = new SwitchTable();
    switchtable.setSwitchTable(this.#workTable);
    this.#workTable = switchtable.getSwitchTable();
  }
}
export default Organization;
