class SwitchTable {
  #workTable;

  setSwitchTable(workTable) {
    this.#workTable = workTable;
  }

  getSwitchTable() {
    return this.#workTable;
  }

  switchName() {
    this.#workTable.forEach((current, index) => {
      if (current.name === this.#workTable[index + 1]?.name) {
        const currentChange = this.#workTable[index + 1];
        const nextName = this.#nextName(currentChange);
        this.#swipeName(currentChange, nextName);
      }
    });
  }

  #nextName(current) {
    const weekType = current.index[0];
    const nextIndex = current.index[1] + 1;
    const nextName = this.#workTable.find((item) => item.index[0] === weekType && item.index[1] === nextIndex);
    return nextName;
  }

  #swipeName(first, second) {
    if (second) {
      const temp = first.name;
      first.name = second.name;
      second.name = temp;
    }
  }
}
export default SwitchTable;
