import Organization from './model/organization.js';
import Print from './view/outputView.js';

class App {
  async run() {
    const workTable = await this.#getWorkTable();
    this.#printAll(workTable);
  }

  async #getWorkTable() {
    const workTable = await new Organization().getObject();
    return workTable;
  }

  #printAll(workTable) {
    Print.printAll(workTable);
  }
}

export default App;
