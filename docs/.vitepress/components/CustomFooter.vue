<template>
  <footer class="custom-footer">
    <div class="footer-inner">
      <div class="footer-main">
        <span class="footer-brand">CreB</span>
        <span class="footer-sep">·</span>
        <span class="footer-tagline">Creative Builder</span>
      </div>
      <nav class="footer-nav">
        <a href="/posts/">博客</a>
        <a href="/about">关于</a>
        <a href="https://github.com/kprot" target="_blank" rel="noopener">GitHub</a>
      </nav>
      <div class="footer-copyright">© 2026 CreB</div>
    </div>
  </footer>
</template>

<style scoped>
.custom-footer {
  border-top: 1px solid var(--vp-c-divider);
  padding: 2rem 1.5rem 2.5rem;
  margin-top: 4rem;
}
.footer-inner {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.9rem;
}
.footer-main {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.footer-brand {
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.footer-sep {
  color: var(--vp-c-text-3);
}
.footer-tagline {
  color: var(--vp-c-text-2);
}
.footer-nav {
  display: flex;
  gap: 1.25rem;
}
.footer-nav a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.2s;
}
.footer-nav a:hover {
  color: var(--vp-c-brand-1);
}
.footer-copyright {
  color: var(--vp-c-text-3);
}
@media (max-width: 560px) {
  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
