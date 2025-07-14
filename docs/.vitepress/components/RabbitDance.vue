<template>
  <div class="rabbit-dance">
    <svg
      width="150"
      height="200"
      viewBox="0 0 150 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Ears -->
      <ellipse class="ear left-ear" cx="45" cy="40" rx="15" ry="45" fill="#fff" stroke="#aaa" stroke-width="2"/>
      <ellipse class="ear right-ear" cx="105" cy="40" rx="15" ry="45" fill="#fff" stroke="#aaa" stroke-width="2"/>
      <!-- Head -->
      <ellipse cx="75" cy="80" rx="40" ry="40" fill="#fff" stroke="#aaa" stroke-width="2"/>
      <!-- Face -->
      <ellipse cx="60" cy="85" rx="5" ry="7" fill="#333"/>
      <ellipse cx="90" cy="85" rx="5" ry="7" fill="#333"/>
      <ellipse cx="75" cy="105" rx="8" ry="5" fill="#fbb" />
      <!-- Body -->
      <ellipse class="body" cx="75" cy="145" rx="32" ry="40" fill="#fff" stroke="#aaa" stroke-width="2"/>
      <!-- Arms -->
      <rect class="arm left-arm" x="20" y="125" width="20" height="10" rx="5" fill="#fff" stroke="#aaa" stroke-width="2"/>
      <rect class="arm right-arm" x="110" y="125" width="20" height="10" rx="5" fill="#fff" stroke="#aaa" stroke-width="2"/>
      <!-- Feet -->
      <ellipse class="foot left-foot" cx="60" cy="185" rx="10" ry="6" fill="#fff" stroke="#aaa" stroke-width="2"/>
      <ellipse class="foot right-foot" cx="90" cy="185" rx="10" ry="6" fill="#fff" stroke="#aaa" stroke-width="2"/>
    </svg>
    <div class="caption">Let's dance! 🐇🎵</div>
  </div>
</template>

<style scoped>
.rabbit-dance {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.caption {
  font-size: 1.3em;
  margin-top: 10px;
  font-weight: bold;
  color: #ab47bc;
  text-shadow: 0 1px 1px #fff;
}
.ear {
  transform-origin: center bottom;
  animation: earWiggle 1.6s infinite alternate;
}
.left-ear {
  animation-delay: 0.1s;
}
.right-ear {
  animation-delay: 0.5s;
}
@keyframes earWiggle {
  0% { transform: rotate(-7deg);}
  100% { transform: rotate(7deg);}
}
.arm {
  transform-origin: center left;
  animation: armWave 1.2s infinite alternate;
}
.left-arm {
  animation-delay: 0.2s;
}
.right-arm {
  animation-delay: 0.7s;
}
@keyframes armWave {
  0% { transform: rotate(-12deg);}
  100% { transform: rotate(12deg);}
}
.body {
  animation: hop 1.1s infinite;
}
@keyframes hop {
  0%, 100% { transform: translateY(0);}
  50% { transform: translateY(-18px);}
}
.foot {
  animation: footTap 0.7s infinite alternate;
}
.left-foot {
  animation-delay: 0.3s;
}
.right-foot {
  animation-delay: 0.6s;
}
@keyframes footTap {
  0% { transform: scaleY(1);}
  100% { transform: scaleY(1.3);}
}
</style>