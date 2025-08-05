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
    const query = searchInput?.value.toLowerCase().trim() || "";
    const selectedFilters = getSelectedFilters();
    let totalVisible = 0;

    // Filter cards
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const passesSearch = matchesSearch(card, query);
      const passesFilter = matchesFilters(card, selectedFilters);
      const show = passesSearch && passesFilter;

      card.style.display = show ? "block" : "none";
      if (show) totalVisible++;
    }

    // Section-level "no materials" messages
    document.querySelectorAll(".course-section").forEach(section => {
      const grid = section.querySelector(".course-grid");
      const message = section.querySelector(".no-results-message");
      const isOpen = section.closest(".collapsible-content")?.parentElement?.classList.contains("active");

      const visibleCards = Array.from(grid.querySelectorAll(".course-card"))
        .filter(card => card.offsetParent !== null);

      if (message) {
        const empty = isOpen && visibleCards.length === 0;   // ← keep previous test
        message.style.display = empty ? "block" : "none";    // show / hide banner
        grid.style.display    = empty ? "none"  : "flex";    // hide / show cards grid
      }
    });

    // Global fallback
    const noResultsGlobal = document.getElementById("no-results");
    if (noResultsGlobal) {
      noResultsGlobal.style.display = totalVisible === 0 ? "block" : "none";
    }

    // Fix collapsible section heights after filtering
    document.querySelectorAll(".collapsible-content").forEach(section => {
      const container = section.parentElement;
      if (container.classList.contains("active")) {
        section.style.height = "auto";
        const height = section.scrollHeight;
        section.style.height = height + "px";
      }
    });
  }

  function resetSectionHeight(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    const container = section.parentElement;
    if (container.classList.contains("active")) {
      section.style.height = "auto";
      const newHeight = section.scrollHeight;
      section.style.height = newHeight + 'px';
    }
  }

  // Event listeners
  if (searchInput) {
    searchInput.addEventListener("input", filterAndSearchCourses);
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      searchInput.value = "";
      filterAndSearchCourses();
    });
  }

  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("change", filterAndSearchCourses);
  }

  // Run once at page load (in case filters are pre-set)
  filterAndSearchCourses();
});
