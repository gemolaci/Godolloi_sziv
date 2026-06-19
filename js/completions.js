(function () {
  var completions = [
    {
      name: "Minta teljesítő",
      date: "2026-06-10",
      time: "06:12",
      source: "geogo.hu előkészítés"
    },
    {
      name: "Teszt túrázó",
      date: "2026-06-09",
      time: "07:04",
      source: "mintaadat"
    }
  ];

  var tbody = document.getElementById("completion-list");
  var search = document.getElementById("completion-search");

  function render(rows) {
    tbody.innerHTML = "";

    if (!rows.length) {
      var emptyRow = document.createElement("tr");
      var emptyCell = document.createElement("td");
      emptyCell.colSpan = 4;
      emptyCell.className = "empty-row";
      emptyCell.textContent = "Nincs megjeleníthető teljesítés.";
      emptyRow.appendChild(emptyCell);
      tbody.appendChild(emptyRow);
      return;
    }

    rows.forEach(function (item) {
      var row = document.createElement("tr");
      [item.name, item.date, item.time, item.source].forEach(function (value) {
        var cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      });
      tbody.appendChild(row);
    });
  }

  search.addEventListener("input", function () {
    var query = search.value.trim().toLowerCase();
    var filtered = completions.filter(function (item) {
      return [item.name, item.date, item.time, item.source].join(" ").toLowerCase().includes(query);
    });

    render(filtered);
  });

  render(completions);
})();
