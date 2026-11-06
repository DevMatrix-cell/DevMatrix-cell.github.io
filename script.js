const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const body = document.body;
const projects = window.PORTFOLIO_PROJECTS;
const themeToggle = $("#theme-toggle");
const mobileNav = $("#mobile-nav");

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const dark = body.classList.contains("dark");
  themeToggle.textContent = dark ? "☾" : "☼";
  themeToggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
});
if (localStorage.getItem("portfolio-theme") === "dark") {
  body.classList.add("dark");
  themeToggle.textContent = "☾";
  themeToggle.setAttribute("aria-label", "Switch to light theme");
}

$("#menu-toggle").addEventListener("click", (event) => {
  const open = mobileNav.classList.toggle("open");
  event.currentTarget.setAttribute("aria-expanded", String(open));
});
$$(".mobile-nav a").forEach((link) => link.addEventListener("click", () => mobileNav.classList.remove("open")));

$$(".filter").forEach((filter) => filter.addEventListener("click", () => {
  $$(".filter").forEach((item) => item.classList.remove("active"));
  filter.classList.add("active");
  const selected = filter.dataset.filter;
  $$(".project-card").forEach((card) => card.classList.toggle("hidden", selected !== "all" && card.dataset.category !== selected));
}));

const dialog = $("#project-dialog");
const dialogContent = $("#dialog-content");
const openProject = (card) => {
  const project = projects[card.dataset.project];
  const liveLink = project.live ? `<a class="text-link" href="${project.live}" target="_blank" rel="noreferrer">Open live demo <span>↗</span></a>` : "";
  dialogContent.innerHTML = `<div class="dialog-inner"><p class="dialog-kicker">${project.type} · ${project.status}</p><h2>${project.title}</h2><p class="dialog-overview">${project.overview}</p><div class="case-study-grid"><div><h3>Problem</h3><p>${project.problem}</p></div><div><h3>Solution</h3><p>${project.solution}</p></div><div><h3>Architecture</h3><p>${project.architecture}</p></div><div><h3>Engineering decisions</h3><p>${project.decisions}</p></div><div><h3>Stack</h3><p>${project.stack}</p></div><div><h3>Challenges</h3><p>${project.challenges}</p></div></div><p class="dialog-evidence"><strong>Visual evidence:</strong> No screenshot assets are committed in the source repository, so this case study does not invent a project image.</p><div class="dialog-actions">${liveLink}<a class="button dialog-link" href="${project.link}" target="_blank" rel="noreferrer">View repository <span>↗</span></a></div></div>`;
  dialog.showModal();
};
$$(".project-card").forEach((card) => {
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `View ${card.querySelector("h3").textContent} case study`);
  card.addEventListener("click", () => { window.location.href = `project.html?project=${encodeURIComponent(card.dataset.project)}`; });
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); window.location.href = `project.html?project=${encodeURIComponent(card.dataset.project)}`; }
  });
});
$("#dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });

$("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = $("#name").value.trim();
  const email = $("#email").value.trim();
  const message = $("#message").value.trim();
  if (!name || !email || !message) return;
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const bodyText = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
  $("#form-status").textContent = "Draft saved locally. No message was sent because a delivery endpoint is not configured.";
  localStorage.setItem("portfolio-contact-draft", JSON.stringify({subject, body: bodyText, email}));
});

$("#year").textContent = new Date().getFullYear();
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
}), {threshold:.12});
$$(".reveal").forEach((element) => observer.observe(element));
