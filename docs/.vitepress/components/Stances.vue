<template>
  <div class="stances">
    <div class="stance-row">
      <!-- 极端一：拒绝 AI -->
      <figure class="stance-card">
        <div class="bubble">AI？<br />不，谢谢。</div>
        <svg viewBox="0 0 140 150" class="fig" aria-hidden="true">
          <circle cx="70" cy="42" r="24" />
          <path d="M34 150 v-34 a36 36 0 0 1 72 0" />
          <g class="hand">
            <rect x="98" y="56" width="30" height="34" rx="13" />
            <rect x="100" y="36" width="6" height="26" rx="3" />
            <rect x="108" y="32" width="6" height="30" rx="3" />
            <rect x="116" y="34" width="6" height="28" rx="3" />
            <rect x="124" y="40" width="6" height="24" rx="3" />
          </g>
        </svg>
        <div class="reject">
          <span class="chip">AI</span>
          <span class="slash"></span>
        </div>
        <figcaption>拒绝工具</figcaption>
      </figure>

      <!-- 极端二：拒绝思考 -->
      <figure class="stance-card">
        <div class="bubble">动脑？<br />不用，我有 AI。</div>
        <svg viewBox="0 0 140 150" class="fig" aria-hidden="true">
          <circle cx="70" cy="42" r="24" />
          <path d="M34 150 v-34 a36 36 0 0 1 72 0" />
          <g class="hand">
            <rect x="98" y="56" width="30" height="34" rx="13" />
            <rect x="100" y="36" width="6" height="26" rx="3" />
            <rect x="108" y="32" width="6" height="30" rx="3" />
            <rect x="116" y="34" width="6" height="28" rx="3" />
            <rect x="124" y="40" width="6" height="24" rx="3" />
          </g>
        </svg>
        <div class="reject">
          <span class="brain">🧠</span>
          <span class="slash"></span>
        </div>
        <figcaption>拒绝思考</figcaption>
      </figure>
    </div>

    <p class="ask">哪个是你？</p>
    <p class="ask-sub">我在找第三种。</p>
  </div>
</template>

<style scoped>
.stances {
  margin: 2.5rem 0 1rem;
}
.stance-row {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}
.stance-card {
  position: relative;
  width: 220px;
  margin: 0;
  padding: 1.25rem 1rem 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  text-align: center;
}
.bubble {
  display: inline-block;
  position: relative;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 0.5rem 0.8rem;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.35;
  margin-bottom: 0.5rem;
}
.bubble::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -8px;
  transform: translateX(-50%);
  border-width: 8px 7px 0;
  border-style: solid;
  border-color: var(--vp-c-divider) transparent transparent;
}
.fig {
  width: 120px;
  height: 130px;
  display: block;
  margin: 0 auto;
  fill: none;
  stroke: var(--vp-c-text-2);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.reject {
  position: absolute;
  top: 92px;
  left: 24px;
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
}
.chip {
  font-size: 0.8rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-text-3);
  border-radius: 8px;
  padding: 2px 6px;
}
.brain { font-size: 1.6rem; line-height: 1; }
.slash {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 3px solid #e5484d;
}
.slash::after {
  content: "";
  position: absolute;
  top: 50%;
  left: -4px;
  right: -4px;
  height: 3px;
  background: #e5484d;
  transform: rotate(-45deg);
  transform-origin: center;
}
figcaption {
  margin-top: 0.6rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  letter-spacing: 0.04em;
}
.ask {
  text-align: center;
  font-size: 1.35rem;
  font-weight: 700;
  margin: 2rem 0 0.2rem;
}
.ask-sub {
  text-align: center;
  font-size: 1rem;
  color: var(--vp-c-brand-1);
  font-weight: 600;
  margin: 0;
}
</style>
