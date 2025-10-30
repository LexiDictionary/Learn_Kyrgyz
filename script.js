let lessons = [];

fetch('lessons.json')
  .then(response => response.json())
  .then(data => {
    lessons = data;
    showLesson(0);
  })
  .catch(error => console.error("Error loading lessons:", error));

function showLesson(index) {
  document.querySelectorAll(".lesson-list li").forEach((li, i) => {
    li.classList.toggle("active", i === index);
  });

  const lesson = lessons[index];
  if (!lesson) return;

  const vocabHTML = `
    <table class="vocab-table">
      <tbody>
        ${lesson.vocab
          .map(
            (pair, i) =>
              i % 2 === 0
                ? `<tr>
                    <td class="kyrgyz">${pair[0]}</td>
                    <td class="english">${pair[1]}</td>
                    ${lesson.vocab[i + 1]
                      ? `<td class="kyrgyz">${lesson.vocab[i + 1][0]}</td>
                         <td class="english">${lesson.vocab[i + 1][1]}</td>`
                      : `<td></td><td></td>`}
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