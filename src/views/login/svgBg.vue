<template>
    <svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
            <filter id="bloom" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="12" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <linearGradient id="silk-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(0, 242, 254, 0)" />
                <stop offset="30%" stop-color="rgba(0, 242, 254, 0.6)" />
                <stop offset="70%" stop-color="rgba(255, 0, 193, 0.4)" />
                <stop offset="100%" stop-color="rgba(0, 242, 254, 0)" />
            </linearGradient>

            <radialGradient id="mouseGrad">
                <stop offset="0%" stop-color="rgba(0, 242, 254, 0.15)" />
                <stop offset="100%" stop-color="rgba(0, 242, 254, 0)" />
            </radialGradient>
        </defs>

        <rect width="100%" height="100%" fill="#020617" />

        <circle
            v-for="(s, i) in stars"
            :key="'star' + i"
            :cx="s.x + parallax.px * s.depth"
            :cy="s.y + parallax.py * s.depth"
            :r="s.r"
            :fill="`rgba(255,255,255,${s.opacity})`"
        />

        <g class="fluid-layers">
            <path
                v-for="(p, i) in wavePaths"
                :key="i"
                :d="p"
                fill="none"
                stroke="url(#silk-grad)"
                stroke-width="2.5"
                filter="url(#bloom)"
                class="flowing-silk"
                :style="{
                    animationDelay: `${i * -3}s`,
                    opacity: 0.3 + i * 0.1
                }"
            />
        </g>

        <circle :cx="mouse.x" :cy="mouse.y" r="300" fill="url(#mouseGrad)" class="mouse-halo" />
    </svg>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
// 鼠标交互状态
const mouse = reactive({ x: 0, y: 0 })
const parallax = reactive({ px: 0, py: 0 })

// 随机星团：增加深度属性用于视差
const stars = Array.from({ length: 45 }, () => ({
    x: Math.random() * window.innerWidth * 1.5,
    y: Math.random() * window.innerHeight * 1.5,
    r: Math.random() * 1.5 + 0.2,
    depth: Math.random() * 0.4 + 0.1,
    opacity: Math.random() * 0.6 + 0.1
}))

// 艺术化的贝塞尔曲线路径
const wavePaths = [
    'M -200 600 C 300 400 600 800 1200 500 S 1800 700 2200 400',
    'M -200 400 C 400 800 900 200 1400 600 S 1900 300 2200 500',
    'M 400 -200 C 200 300 800 600 500 1000 S 700 1400 400 1800',
    'M 1200 -200 C 1000 400 1400 800 1100 1200 S 1300 1600 1000 2000'
]
</script>
<style lang="less">
.canvas-overlay {
    position: absolute;
    inset: -100px; /* 留出视差空间 */
    pointer-events: none;
    z-index: 0;

    .flowing-silk {
        stroke-dasharray: 2500;
        stroke-dashoffset: 2500;
        animation: silkFlow 15s ease-in-out infinite;
        mix-blend-mode: screen; /* 关键：重叠部分发光 */
    }

    .mouse-halo {
        transition:
            cx 0.5s cubic-bezier(0.1, 0.5, 0.1, 1),
            cy 0.5s cubic-bezier(0.1, 0.5, 0.1, 1);
    }
}
@keyframes silkFlow {
    0% {
        stroke-dashoffset: 2500;
        transform: translateY(0) scale(1);
    }
    50% {
        stroke-dashoffset: 0;
        transform: translateY(-20px) scale(1.05);
    }
    100% {
        stroke-dashoffset: -2500;
        transform: translateY(0) scale(1);
    }
}
</style>
