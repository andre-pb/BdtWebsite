export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
