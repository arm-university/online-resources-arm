document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("course-search");
  const clearBtn = document.getElementById("clear-search");
  const checkboxes = document.querySelectorAll(".filter-checkbox");
  const cards = document.querySelectorAll(".course-card");

  function getSelectedFilters() {
    const selected = {};
    for (let i = 0; i < checkboxes.length; i++) {
      const cb = checkboxes[i];
      if (cb.checked) {
        const cat = cb.dataset.category;
        if (!selected[cat]) selected[cat] = [];
        selected[cat].push(cb.value.toLowerCase());
      }
    }
    return selected;
  }

  function matchesFilters(card, selectedFilters) {
    const keywords = (card.dataset.keywords || "").toLowerCase();
    for (let category in selectedFilters) {
      const values = selectedFilters[category];
      let match = false;
      for (let i = 0; i < values.length; i++) {
        if (keywords.includes(values[i])) {
          match = true;
          break;
        }
      }
      if (!match) return false;
    }
    return true;
  }

  function matchesSearch(card, query) {
    const title = (card.dataset.title || "").toLowerCase();
    const description = (card.dataset.description || "").toLowerCase();
    return title.includes(query) || description.includes(query);
  }

  function filterAndSearchCourses() {
    const query = searchInput.value.toLowerCase().trim();
    const selectedFilters = getSelectedFilters();
    let visibleCount = 0;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const passesSearch = matchesSearch(card, query);
      const passesFilter = matchesFilters(card, selectedFilters);

       const show = passesSearch && passesFilter;
       card.style.display = show ? "block" : "none";
       if (show) visibleCount++;
    }
    const noResultsMsg = document.getElementById("no-results");
    noResultsMsg.style.display = visibleCount === 0 ? "block" : "none";
  }

  searchInput.addEventListener("input", filterAndSearchCourses);
  clearBtn.addEventListener("click", function () {
    searchInput.value = "";
    filterAndSearchCourses();
  });
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("change", filterAndSearchCourses);
  }

});
