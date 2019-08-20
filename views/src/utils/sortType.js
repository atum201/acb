const sortType = column => {
  const sortColumn = this.state.sort;
  if (column === sortColumn.column && sortColumn.type === "asc") {
    return "th-sort-asc";
  } else if (column === sortColumn.column && sortColumn.type === "desc") {
    return "th-sort-desc";
  } else {
    return "th-sort";
  }
};
