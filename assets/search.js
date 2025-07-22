document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("course-search");
  const clearBtn = document.getElementById("clear-search");
  const cards = document.querySelectorAll(".course-card");

  function searchCourses() {
    const query = searchInput.value.toLowerCase().trim();

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const title = card.dataset.title || "";
      const description = card.dataset.description || "";

      const matches = title.includes(query) || description.includes(query);
      card.style.display = matches ? "block" : "none";
    }
  }

  searchInput.addEventListener("input", searchCourses);

  clearBtn.addEventListener("click", function () {
    searchInput.value = "";
    searchCourses();
  });
});

//for section just like arm developer page > 
//platform,subject,sw/hw,publisher.

