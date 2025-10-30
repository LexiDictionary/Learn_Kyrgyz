let lessons = [];

function renderSidebar() {
  const list = document.getElementById("lesson-list");
  list.innerHTML = "";
  lessons.forEach((lesson, index) => {
    const li = document.createElement("li");
    li.textContent = lesson.title;
    li.onclick = () => showLesson(index);
    if (index === 0) li.classList.add("active");
    list.appendChild(li);
  });
}

function showLesson(index) {
  document.querySelectorAll("#lesson-list li").forEach((li, i) => {
    li.classList.toggle("active", i === index);
  });

  const lesson = lessons[index];
  if (!lesson) return;

  const vocabHTML = `
    <table class="vocab-table">
      <tbody>
        ${lesson.vocab
          .map((pair, i) =>
            i % 2 === 0
              ? `<tr>
                  <td class="kyrgyz">${pair[0]}</td>
                  <td class="english">${pair[1]}</td>
                  ${
                    lesson.vocab[i + 1]
                      ? `<td class="kyrgyz">${lesson.vocab[i + 1][0]}</td>
                         <td class="english">${lesson.vocab[i + 1][1]}</td>`
                      : `<td></td><td></td>`
                  }
                </tr>`
              : ""
          )
          .join("")}
      </tbody>
    </table>
  `;

  document.getElementById("lesson-container").innerHTML = `
    <h1>${lesson.title}</h1>
    <h3 class="section-title">Text</h3>
    <div class="text-block">${lesson.text}</div>
    <h3 class="section-title">Vocabulary</h3>
    ${vocabHTML}
    <h3 class="section-title">Grammar</h3>
    <div class="text-block">${lesson.grammar}</div>
  `;
}

fetch('lessons.json')
  .then(response => {
    if (!response.ok) throw new Error('lessons.json not found or failed to load');
    return response.json();
  })
  .then(data => {
    lessons = data;
    renderSidebar();
    showLesson(0);
  })
  .catch(error => {
    console.error("Error loading lessons:", error);
    document.getElementById("lesson-container").innerHTML = `
      <p style="color: #c70000;">Failed to load course content.</p>
      <p>Please ensure <code>lessons.json</code> is in the same folder.</p>
    `;
  });
