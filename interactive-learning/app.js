const LABS = [
  { file: "../Lab-01 - Introduction and Overview.md", title: "Lab 1: Introduction & Executive Overview" },
  { file: "../Lab-02 - Designing the Data Map.md", title: "Lab 2: Designing the Data Map" },
  { file: "../Lab-03 - Managing Data Sources.md", title: "Lab 3: Managing Data Sources" },
  { file: "../Lab-04 - Governance Domains and Terms.md", title: "Lab 4: Governance Domains and Terms" },
  { file: "../Lab-05 - Curating Data Assets.md", title: "Lab 5: Curating Data Assets" },
  { file: "../Lab-06 - Data Products and Access.md", title: "Lab 6: Data Products and Access" },
  { file: "../Lab-07 - OKRs.md", title: "Lab 7: OKRs" },
  { file: "../Lab-08 - Health Management Controls.md", title: "Lab 8: Health Management Controls" },
  { file: "../Lab-09 - Data Quality Management.md", title: "Lab 9: Data Quality Management" },
  { file: "../Lab-10 - Health Management Actions.md", title: "Lab 10: Health Management Actions" },
  { file: "../Lab-11 - Health Management Reports.md", title: "Lab 11: Health Management Reports" },
  { file: "../Lab-12 - Observability.md", title: "Lab 12: Observability" },
  { file: "../Lab-13 - Business Continuity.md", title: "Lab 13: Business Continuity" },
  { file: "../Lab-14 - Custom API Functionality.md", title: "Lab 14: Custom API Functionality" },
  { file: "../Lab-15 - Pricing and Licensing.md", title: "Lab 15: Pricing and Licensing" }
];

const STORAGE_KEY = "purview-masterclass-progress-v1";

const state = {
  selectedLabIndex: 0,
  searchQuery: "",
  markdownCache: {},
  progress: loadProgress()
};

const elements = {
  labList: document.getElementById("lab-list"),
  content: document.getElementById("content"),
  taskList: document.getElementById("task-list"),
  notes: document.getElementById("lab-notes"),
  progressSummary: document.getElementById("progress-summary"),
  progressFill: document.getElementById("overall-progress"),
  btnComplete: document.getElementById("toggle-complete"),
  btnPrev: document.getElementById("prev-lab"),
  btnNext: document.getElementById("next-lab"),
  search: document.getElementById("lab-search")
};

if (!window.marked) {
  elements.content.innerHTML = "<div class=\"error-box\"><strong>Fout:</strong> Markdown-renderer kon niet worden geladen.</div>";
} else {
  initialize();
}

function initialize() {
  wireEvents();
  renderLabList();
  loadLab(0);
}

function wireEvents() {
  elements.btnPrev.addEventListener("click", () => loadLab(Math.max(0, state.selectedLabIndex - 1)));
  elements.btnNext.addEventListener("click", () => loadLab(Math.min(LABS.length - 1, state.selectedLabIndex + 1)));

  elements.btnComplete.addEventListener("click", () => {
    const lab = LABS[state.selectedLabIndex];
    const current = isLabCompleted(lab.file);
    setLabCompleted(lab.file, !current);
    renderLabList();
    updateProgressUI();
    updateToolbar();
  });

  elements.notes.addEventListener("input", () => {
    const file = LABS[state.selectedLabIndex].file;
    state.progress.notes[file] = elements.notes.value;
    persistProgress();
  });

  elements.search.addEventListener("input", () => {
    state.searchQuery = elements.search.value.trim().toLowerCase();
    renderLabList();
  });
}

function renderLabList() {
  const fragment = document.createDocumentFragment();
  const visibleLabs = getVisibleLabs();

  elements.labList.innerHTML = "";

  visibleLabs.forEach(({ lab, index }) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    const complete = isLabCompleted(lab.file);

    button.className = [
      index === state.selectedLabIndex ? "active" : "",
      complete ? "completed" : ""
    ]
      .filter(Boolean)
      .join(" ");

    button.type = "button";
    button.innerHTML = `
      <div class="lab-meta">
        <span class="lab-index">Lab ${index + 1}</span>
        <span class="pill">${complete ? "Voltooid" : "Open"}</span>
      </div>
      <strong>${escapeHtml(lab.title)}</strong>
    `;

    button.addEventListener("click", () => loadLab(index));

    li.appendChild(button);
    fragment.appendChild(li);
  });

  if (!visibleLabs.length) {
    const li = document.createElement("li");
    li.textContent = "Geen labs gevonden voor deze zoekterm.";
    fragment.appendChild(li);
  }

  elements.labList.appendChild(fragment);
  updateProgressUI();
}

function getVisibleLabs() {
  if (!state.searchQuery) {
    return LABS.map((lab, index) => ({ lab, index }));
  }

  return LABS.map((lab, index) => ({ lab, index })).filter(({ lab }) =>
    lab.title.toLowerCase().includes(state.searchQuery)
  );
}

async function loadLab(index) {
  state.selectedLabIndex = index;
  renderLabList();
  updateToolbar();

  const lab = LABS[index];
  const file = lab.file;

  try {
    const markdown = await getMarkdown(file);
    const preprocessed = preprocessMarkdown(markdown);

    elements.content.innerHTML = marked.parse(preprocessed);
    elements.content.scrollTop = 0;

    bindInlineLabLinks();
    renderTaskChecklist(preprocessed, file);

    elements.notes.value = state.progress.notes[file] || "";
  } catch (error) {
    elements.content.innerHTML = `
      <div class="error-box">
        <p><strong>Lab kon niet geladen worden:</strong> ${escapeHtml(file)}</p>
        <p>Open deze omgeving via een lokale webserver. Bijvoorbeeld: <code>python -m http.server 5500</code> vanaf de repository root.</p>
      </div>
    `;
    elements.taskList.innerHTML = "";
  }
}

async function getMarkdown(file) {
  if (state.markdownCache[file]) {
    return state.markdownCache[file];
  }

  const response = await fetch(file);
  if (!response.ok) {
    throw new Error(`Kan bestand niet laden: ${file}`);
  }

  const text = await response.text();
  state.markdownCache[file] = text;
  return text;
}

function preprocessMarkdown(markdown) {
  return markdown
    .replace(/\(\.\/assets\//g, "(../assets/")
    .replace(/\]\(\.\/README\.md\)/g, "](../README.md)");
}

function bindInlineLabLinks() {
  elements.content.querySelectorAll("a").forEach((anchor) => {
    const href = anchor.getAttribute("href") || "";
    const normalized = decodeURIComponent(href).replace(/^\.\//, "");

    if (!normalized.toLowerCase().endsWith(".md")) {
      return;
    }

    const matchIndex = LABS.findIndex((lab) => lab.file.includes(normalized));
    if (matchIndex < 0) {
      return;
    }

    anchor.addEventListener("click", (event) => {
      event.preventDefault();
      loadLab(matchIndex);
    });
  });
}

function renderTaskChecklist(markdown, file) {
  const taskTitles = Array.from(markdown.matchAll(/^##\s+Task\s+\d+\s*:\s*(.+)$/gim)).map((m) => m[1].trim());
  const fallback = Array.from(markdown.matchAll(/^##\s+Task\s+\d+/gim)).map((m, i) => `Task ${i + 1}`);
  const tasks = taskTitles.length ? taskTitles : fallback;

  elements.taskList.innerHTML = "";

  if (!tasks.length) {
    const li = document.createElement("li");
    li.textContent = "Geen expliciete taaksecties gevonden in dit lab.";
    elements.taskList.appendChild(li);
    return;
  }

  tasks.forEach((task, idx) => {
    const id = `${file}::task-${idx}`;
    const li = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    const span = document.createElement("span");

    checkbox.type = "checkbox";
    checkbox.checked = !!state.progress.tasks[id];
    checkbox.addEventListener("change", () => {
      state.progress.tasks[id] = checkbox.checked;
      persistProgress();
      autoSetLabCompleted(file, tasks.length);
      renderLabList();
      updateToolbar();
    });

    span.textContent = task;
    label.appendChild(checkbox);
    label.appendChild(span);
    li.appendChild(label);
    elements.taskList.appendChild(li);
  });
}

function autoSetLabCompleted(file, taskCount) {
  if (!taskCount) {
    return;
  }

  let checked = 0;
  for (let idx = 0; idx < taskCount; idx += 1) {
    if (state.progress.tasks[`${file}::task-${idx}`]) {
      checked += 1;
    }
  }

  setLabCompleted(file, checked === taskCount);
}

function setLabCompleted(file, value) {
  state.progress.completed[file] = value;
  persistProgress();
}

function isLabCompleted(file) {
  return !!state.progress.completed[file];
}

function updateToolbar() {
  const lab = LABS[state.selectedLabIndex];
  const complete = isLabCompleted(lab.file);

  elements.btnComplete.textContent = complete ? "Markeer als niet voltooid" : "Markeer als voltooid";
  elements.btnPrev.disabled = state.selectedLabIndex === 0;
  elements.btnNext.disabled = state.selectedLabIndex === LABS.length - 1;
}

function updateProgressUI() {
  const completedCount = LABS.filter((lab) => isLabCompleted(lab.file)).length;
  const pct = Math.round((completedCount / LABS.length) * 100);

  elements.progressSummary.textContent = `${completedCount}/${LABS.length} voltooid`;
  elements.progressFill.style.width = `${pct}%`;
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (!parsed) {
      return { completed: {}, tasks: {}, notes: {} };
    }

    return {
      completed: parsed.completed || {},
      tasks: parsed.tasks || {},
      notes: parsed.notes || {}
    };
  } catch {
    return { completed: {}, tasks: {}, notes: {} };
  }
}

function persistProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
