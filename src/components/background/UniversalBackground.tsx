"use client";

import { useEffect, useRef, type ReactNode } from "react";


type Props = {
    children?: ReactNode;
    className?: string;
};

const CSS = `
.ub-page{
  --ub-amber:242,179,92; --ub-copper:200,105,63; --ub-cream:244,232,214; --ub-teal:63,143,154;
  position:relative;min-height:100vh;min-height:100svh;background:#0e0c0b;
}
.ub-bg{position:absolute;inset:0;z-index:0;overflow:hidden;pointer-events:none}
.ub-bg > *{position:absolute}
.ub-content{position:relative;z-index:1}

.ub-base{
  inset:0;
  background:
    radial-gradient(60% 35% at 12% 0%,rgba(var(--ub-amber),.20),transparent 70%),
    radial-gradient(50% 35% at 92% 18%,rgba(var(--ub-copper),.16),transparent 70%),
    linear-gradient(180deg,#0e0c0b,#1b1410 55%,#0e0c0b);
}

.ub-beam{
  top:-10%;height:min(90%,900px);width:160px;filter:blur(26px);
  background:linear-gradient(180deg,rgba(var(--ub-cream),.55),transparent 80%);
  mix-blend-mode:screen;transform-origin:50% 0;
  animation:ub-sway 12s ease-in-out infinite alternate;
}
.ub-beam.ub-a{left:14%;--r:-16deg;opacity:.20}
.ub-beam.ub-b{left:52%;width:240px;--r:6deg;opacity:.12;animation-duration:17s}
.ub-beam.ub-c{left:80%;--r:20deg;opacity:.18;animation-duration:14s}
@keyframes ub-sway{from{transform:rotate(var(--r))}to{transform:rotate(calc(var(--r) + 12deg))}}

.ub-glow{border-radius:50%;filter:blur(100px);background:rgb(var(--c));animation:ub-drift 22s ease-in-out infinite alternate}
@keyframes ub-drift{from{transform:translate(0,0) scale(1)}to{transform:translate(50px,-40px) scale(1.15)}}

.ub-bokeh{
  border-radius:50%;
  background:radial-gradient(circle,rgba(var(--c),.18) 0,rgba(var(--c),.22) 60%,rgba(var(--c),.5) 70%,rgba(var(--c),0) 73%);
  filter:blur(var(--b));
  animation:ub-float var(--d) ease-in-out var(--delay) infinite alternate;
}

.ub-frame{
  border:1.5px solid rgba(var(--ub-cream),.4);border-radius:4px;
  animation:ub-frameMove var(--d) ease-in-out var(--delay) infinite alternate;
}
.ub-frame::after{
  content:"";position:absolute;inset:18%;
  background:
    linear-gradient(rgba(var(--ub-amber),.7),rgba(var(--ub-amber),.7)) 0 0/8px 1.5px no-repeat,
    linear-gradient(rgba(var(--ub-amber),.7),rgba(var(--ub-amber),.7)) 0 0/1.5px 8px no-repeat,
    linear-gradient(rgba(var(--ub-amber),.7),rgba(var(--ub-amber),.7)) 100% 100%/8px 1.5px no-repeat,
    linear-gradient(rgba(var(--ub-amber),.7),rgba(var(--ub-amber),.7)) 100% 100%/1.5px 8px no-repeat;
}

.ub-lens{
  border-radius:50%;
  background:repeating-conic-gradient(rgba(var(--ub-cream),.7) 0 .6deg,transparent .6deg 6deg);
  -webkit-mask:radial-gradient(circle,transparent 63%,#000 64% 71%,transparent 72%);
          mask:radial-gradient(circle,transparent 63%,#000 64% 71%,transparent 72%);
  animation:ub-spin var(--d) linear infinite;
}
.ub-aperture{animation:ub-spin var(--d) linear infinite;overflow:visible}

@keyframes ub-float{from{transform:translate(0,0)}to{transform:translate(var(--dx),var(--dy))}}
@keyframes ub-frameMove{
  from{transform:translate(0,0) rotate(var(--r0))}
  to{transform:translate(var(--dx),var(--dy)) rotate(calc(var(--r0) + var(--rot)))}
}
@keyframes ub-spin{to{transform:rotate(360deg)}}

.ub-dust{inset:0;width:100%;height:100%}

.ub-grain{
  inset:0;opacity:.13;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
.ub-vignette{inset:0;background:radial-gradient(ellipse at 50% 50%,transparent 55%,rgba(0,0,0,.5))}

@media (prefers-reduced-motion:reduce){
  .ub-bg *,.ub-bg *::before,.ub-bg *::after{animation:none!important}
}
`;

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const WARM = ["242,179,92", "244,232,214", "200,105,63", "244,232,214", "242,179,92"];
const COOL = "63,143,154";

function apertureSVG(size: number): string {
    let lines = "";
    for (let i = 0; i < 6; i++) {
        const a1 = (i * 60 * Math.PI) / 180;
        const a2 = ((i * 60 + 50) * Math.PI) / 180;
        lines += `<line x1="${50 + 24 * Math.cos(a1)}" y1="${50 + 24 * Math.sin(a1)}" x2="${50 + 46 * Math.cos(a2)}" y2="${50 + 46 * Math.sin(a2)}"/>`;
    }
    const hex = [0, 1, 2, 3, 4, 5]
        .map((i) => `${50 + 24 * Math.cos((i * Math.PI) / 3)},${50 + 24 * Math.sin((i * Math.PI) / 3)}`)
        .join(" ");
    return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" fill="none" stroke="rgb(244,232,214)" stroke-width=".7">
    <circle cx="50" cy="50" r="46"/><circle cx="50" cy="50" r="48.5" stroke-opacity=".5"/>
    <polygon points="${hex}"/>${lines}</svg>`;
}

type Dust = { x: number; y: number; r: number; vx: number; vy: number; a: number; t: number; ts: number; c: string };

export default function UniversalBackground({ children, className = "" }: Props) {
    const bgRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const bg = bgRef.current;
        const scene = sceneRef.current;
        const cv = canvasRef.current;
        if (!bg || !scene || !cv) return;
        const ctx = cv.getContext("2d");
        if (!ctx) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let dust: Dust[] = [];
        let W = 0;
        let H = 0;
        let raf = 0;
        let timer: ReturnType<typeof setTimeout> | undefined;
        let lastW = 0;
        let lastH = 0;

        const add = (cls: string, css: string, html?: string) => {
            const el = document.createElement("div");
            el.className = cls;
            el.style.cssText = "position:absolute;" + css;
            if (html) el.innerHTML = html;
            scene.appendChild(el);
        };

        const motion = () =>
            `--d:${rand(14, 30).toFixed(1)}s;--delay:${-rand(0, 15).toFixed(1)}s;--dx:${rand(-70, 70).toFixed(0)}px;--dy:${rand(-90, 90).toFixed(0)}px;`;

        const draw = (still: boolean) => {
            ctx.clearRect(0, 0, W, H);
            for (const p of dust) {
                if (!still) {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.t += p.ts;
                }
                if (p.y < -4) {
                    p.y = H + 4;
                    p.x = rand(0, W);
                }
                if (p.x < -4) p.x = W + 4;
                if (p.x > W + 4) p.x = -4;
                ctx.globalAlpha = p.a * (0.55 + 0.45 * Math.sin(p.t));
                ctx.fillStyle = `rgb(${p.c})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const loop = () => {
            draw(false);
            raf = requestAnimationFrame(loop);
        };

        // Everything scales with the page's current height
        const build = () => {
            W = bg.clientWidth;
            H = bg.clientHeight;
            scene.innerHTML = "";

            // Large soft light pools
            const glows = Math.max(2, Math.round(H / 600));
            for (let i = 0; i < glows; i++) {
                const s = rand(360, 620);
                const c = i % 5 === 4 ? COOL : pick(WARM.slice(0, 3));
                add(
                    "ub-glow",
                    `width:${s}px;height:${s}px;left:${rand(-10, 75)}%;top:${rand(0, H) - s / 2}px;--c:${c};opacity:${rand(0.1, 0.24).toFixed(2)};animation-duration:${rand(18, 32).toFixed(0)}s`
                );
            }

            // Bokeh discs at different depths
            const bokeh = Math.min(80, Math.max(10, Math.round((W * H) / 45000)));
            for (let i = 0; i < bokeh; i++) {
                const s = rand(14, 120);
                const blur = s > 60 ? rand(6, 14) : rand(1, 5);
                const c = Math.random() < 0.1 ? COOL : pick(WARM);
                add(
                    "ub-bokeh",
                    `width:${s}px;height:${s}px;left:${rand(0, 97)}%;top:${rand(0, Math.max(0, H - s))}px;--c:${c};--b:${blur.toFixed(1)}px;opacity:${rand(0.3, 0.9).toFixed(2)};${motion()}`
                );
            }

            // Floating film frames
            const frames = Math.max(3, Math.round(H / 420));
            for (let i = 0; i < frames; i++) {
                const w = rand(80, 170);
                add(
                    "ub-frame",
                    `width:${w}px;height:${w * 0.667}px;left:${rand(2, 90)}%;top:${rand(0, Math.max(0, H - w))}px;opacity:${rand(0.15, 0.4).toFixed(2)};--r0:${rand(-25, 25).toFixed(0)}deg;--rot:${rand(-40, 40).toFixed(0)}deg;${motion()}`
                );
            }

            // Rotating lens rings and apertures
            const optics = Math.max(2, Math.round(H / 750));
            for (let i = 0; i < optics; i++) {
                const s = rand(220, 380);
                const left = i % 2 ? rand(-6, 14) : rand(62, 84);
                const top = Math.min(H - s * 0.5, (i + 0.4) * (H / optics) + rand(-60, 60));
                const spin = `--d:${rand(70, 110).toFixed(0)}s;`;
                if (i % 2) {
                    add("ub-aperture", `width:${s}px;height:${s}px;left:${left}%;top:${top}px;opacity:${rand(0.14, 0.28).toFixed(2)};${spin}`, apertureSVG(s));
                } else {
                    add("ub-lens", `width:${s}px;height:${s}px;left:${left}%;top:${top}px;opacity:${rand(0.14, 0.3).toFixed(2)};${spin}`);
                }
            }

            // Dust motes drifting through the light
            cv.width = W * dpr;
            cv.height = H * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const n = Math.min(260, Math.round((W * H) / 16000));
            dust = Array.from({ length: n }, () => ({
                x: rand(0, W),
                y: rand(0, H),
                r: rand(0.5, 1.8),
                vy: -rand(0.05, 0.28),
                vx: rand(-0.1, 0.1),
                a: rand(0.2, 0.7),
                t: rand(0, 6.28),
                ts: rand(0.008, 0.028),
                c: pick(WARM),
            }));
            draw(true);
        };

        // Rebuild (debounced) whenever the page size changes
        const observer = new ResizeObserver(() => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                if (Math.abs(bg.clientHeight - lastH) < 4 && Math.abs(bg.clientWidth - lastW) < 4) return;
                lastW = bg.clientWidth;
                lastH = bg.clientHeight;
                cancelAnimationFrame(raf);
                build();
                if (!reduce) loop();
            }, 200);
        });
        observer.observe(bg);

        return () => {
            observer.disconnect();
            if (timer) clearTimeout(timer);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div className={`ub-page ${className}`}>
            <style>{CSS}</style>

            <div ref={bgRef} className="ub-bg" aria-hidden="true">
                <div className="ub-base" />
                <div ref={sceneRef} style={{ position: "absolute", inset: 0 }} />
                <div className="ub-beam ub-a" />
                <div className="ub-beam ub-b" />
                <div className="ub-beam ub-c" />
                <canvas ref={canvasRef} className="ub-dust" />
                <div className="ub-grain" />
                <div className="ub-vignette" />
            </div>

            <div className="ub-content">{children}</div>
        </div>
    );
}