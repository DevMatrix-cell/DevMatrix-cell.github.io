const projects = window.PORTFOLIO_PROJECTS;
const params = new URLSearchParams(window.location.search);
const project = projects[params.get("project")] || projects["ai-navigator"];
const detail = document.querySelector("#project-detail");
const themeToggle = document.querySelector("#theme-toggle");
const body = document.body;

const applyTheme = (dark) => {
  body.classList.toggle("dark", dark);
  themeToggle.textContent = dark ? "☾" : "☼";
  themeToggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
};

applyTheme(localStorage.getItem("portfolio-theme") === "dark");
themeToggle.addEventListener("click", () => {
  const dark = !body.classList.contains("dark");
  applyTheme(dark);
  localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
});

document.title = `${project.title} — The Manojkumar Archive`;
const liveLink = project.live ? `<a class="button" href="${project.live}" target="_blank" rel="noreferrer">Open live demo <span>↗</span></a>` : "";
detail.innerHTML = `
  <div class="project-detail-heading">
    <p class="eyebrow">${project.type} · ${project.status}</p>
    <h1>${project.title}</h1>
    <p class="project-detail-overview">${project.overview}</p>
  </div>
  <div class="project-detail-layout">
    <div class="project-detail-art">
      <span>THE MANOJKUMAR ARCHIVE</span>
      <strong>${project.title}</strong>
      <small>CASE STUDY / VERIFIED REPOSITORY EVIDENCE</small>
    </div>
    <div class="project-detail-copy">
      <div class="case-study-grid">
        <div><h2>Problem</h2><p>${project.problem}</p></div>
        <div><h2>Solution</h2><p>${project.solution}</p></div>
        <div><h2>Architecture</h2><p>${project.architecture}</p></div>
        <div><h2>Engineering decisions</h2><p>${project.decisions}</p></div>
        <div><h2>Technology stack</h2><p>${project.stack}</p></div>
        <div><h2>Challenges</h2><p>${project.challenges}</p></div>
      </div>
      <p class="dialog-evidence"><strong>Visual evidence:</strong> No screenshot assets are committed in the source repository, so this case study does not invent a project image.</p>
      <div class="dialog-actions">${liveLink}<a class="text-link" href="${project.link}" target="_blank" rel="noreferrer">View repository <span>↗</span></a></div>
    </div>
  </div>
`;
document.querySelector("#year").textContent = new Date().getFullYear();
