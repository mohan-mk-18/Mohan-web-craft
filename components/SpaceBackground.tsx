"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ── Canvas-based star textures ──────────────────────────────────────── */
function makeGlowTex(sz = 64): THREE.Texture {
  const c = document.createElement("canvas");
  c.width = c.height = sz;
  const ctx = c.getContext("2d")!;
  const h = sz / 2;
  const g = ctx.createRadialGradient(h, h, 0, h, h, h);
  g.addColorStop(0.00, "rgba(255,255,255,1.0)");
  g.addColorStop(0.10, "rgba(255,255,255,0.95)");
  g.addColorStop(0.30, "rgba(210,228,255,0.45)");
  g.addColorStop(0.60, "rgba(180,205,255,0.10)");
  g.addColorStop(1.00, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, sz, sz);
  return new THREE.CanvasTexture(c);
}

function makeSpikeTex(sz = 128): THREE.Texture {
  const c = document.createElement("canvas");
  c.width = c.height = sz;
  const ctx = c.getContext("2d")!;
  const h = sz / 2;

  // 4 diffraction spikes (like real astrophotography)
  for (const rot of [0, Math.PI / 2]) {
    ctx.save();
    ctx.translate(h, h);
    ctx.rotate(rot);
    const len = h * 0.98;
    const lg = ctx.createLinearGradient(-len, 0, len, 0);
    lg.addColorStop(0.00, "rgba(255,255,255,0)");
    lg.addColorStop(0.35, "rgba(255,255,255,0.18)");
    lg.addColorStop(0.50, "rgba(255,255,255,0.55)");
    lg.addColorStop(0.65, "rgba(255,255,255,0.18)");
    lg.addColorStop(1.00, "rgba(255,255,255,0)");
    ctx.strokeStyle = lg;
    ctx.lineWidth   = 1.8;
    ctx.beginPath();
    ctx.moveTo(-len, 0);
    ctx.lineTo( len, 0);
    ctx.stroke();
    ctx.restore();
  }

  // Bright circular core
  const g = ctx.createRadialGradient(h, h, 0, h, h, h * 0.55);
  g.addColorStop(0.00, "rgba(255,255,255,1.0)");
  g.addColorStop(0.18, "rgba(240,245,255,0.9)");
  g.addColorStop(0.50, "rgba(210,225,255,0.3)");
  g.addColorStop(1.00, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(h, h, h * 0.55, 0, Math.PI * 2);
  ctx.fill();

  return new THREE.CanvasTexture(c);
}

/* ── Twinkling shader for close bright-star layer ────────────────────── */
const VERT = `
  attribute float aSize;
  attribute float aPhase;
  attribute vec3  aColor;
  varying   vec3  vColor;
  uniform   float uTime;

  void main() {
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    // Per-star twinkle: size oscillates with unique phase
    float twinkle = aSize * (0.60 + 0.55 * sin(uTime * 2.0 + aPhase));
    gl_PointSize  = twinkle * (280.0 / -mv.z);
    gl_Position   = projectionMatrix * mv;
  }
`;
const FRAG = `
  uniform sampler2D uTex;
  varying vec3 vColor;

  void main() {
    vec4 t = texture2D(uTex, gl_PointCoord);
    if (t.a < 0.02) discard;
    gl_FragColor = vec4(vColor * t.rgb, t.a);
  }
`;

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth < 768;

    /* ── Renderer ─────────────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    renderer.setClearColor(new THREE.Color("#000003"), 1);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 0.1, 2000);

    /* ── Pre-build textures (once) ────────────────────────────── */
    const glowTex  = makeGlowTex(64);
    const spikeTex = makeSpikeTex(128);

    /* ── Helper: simple star layer with glow texture ─────────── */
    function makeLayer(count: number, spread: number, size: number, opacity: number): THREE.Points {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        pos[i*3]   = (Math.random()-0.5)*spread;
        pos[i*3+1] = (Math.random()-0.5)*spread;
        pos[i*3+2] = (Math.random()-0.5)*spread - 40;

        const r = Math.random();
        if      (r < 0.70) { const v=0.88+Math.random()*0.12; col[i*3]=v; col[i*3+1]=v*0.97+0.02; col[i*3+2]=v; }
        else if (r < 0.86) { col[i*3]=0.60+Math.random()*0.25; col[i*3+1]=0.72+Math.random()*0.20; col[i*3+2]=0.95+Math.random()*0.05; }
        else if (r < 0.95) { col[i*3]=0.62+Math.random()*0.25; col[i*3+1]=0.38+Math.random()*0.22; col[i*3+2]=0.90+Math.random()*0.10; }
        else               { col[i*3]=0.90+Math.random()*0.10; col[i*3+1]=0.70+Math.random()*0.20; col[i*3+2]=0.30+Math.random()*0.20; }
      }

      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("color",    new THREE.BufferAttribute(col, 3));

      const mat = new THREE.PointsMaterial({
        map: glowTex, size, transparent: true, opacity,
        vertexColors: true, sizeAttenuation: true,
        depthWrite: false, alphaTest: 0.005,
      });
      return new THREE.Points(geo, mat);
    }

    /* ── Twinkling bright-star layer (ShaderMaterial + spikes) ── */
    function makeTwinkleLayer(count: number, spread: number): THREE.Points {
      const geo   = new THREE.BufferGeometry();
      const pos   = new Float32Array(count * 3);
      const col   = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      const phase = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        pos[i*3]   = (Math.random()-0.5)*spread;
        pos[i*3+1] = (Math.random()-0.5)*spread;
        pos[i*3+2] = (Math.random()-0.5)*spread - 30;

        sizes[i] = 1.2 + Math.random() * 2.2;
        phase[i] = Math.random() * Math.PI * 2;

        const r = Math.random();
        if      (r < 0.65) { const v=0.92+Math.random()*0.08; col[i*3]=v; col[i*3+1]=v; col[i*3+2]=v; }
        else if (r < 0.82) { col[i*3]=0.55+Math.random()*0.2; col[i*3+1]=0.70+Math.random()*0.2; col[i*3+2]=0.98; }
        else if (r < 0.93) { col[i*3]=0.70+Math.random()*0.2; col[i*3+1]=0.45+Math.random()*0.2; col[i*3+2]=0.95; }
        else               { col[i*3]=1.0; col[i*3+1]=0.82+Math.random()*0.12; col[i*3+2]=0.50+Math.random()*0.2; }
      }

      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("aColor",   new THREE.BufferAttribute(col, 3));
      geo.setAttribute("aSize",    new THREE.BufferAttribute(sizes, 1));
      geo.setAttribute("aPhase",   new THREE.BufferAttribute(phase, 1));

      const mat = new THREE.ShaderMaterial({
        uniforms:       { uTime: { value: 0 }, uTex: { value: spikeTex } },
        vertexShader:   VERT,
        fragmentShader: FRAG,
        transparent:    true,
        depthWrite:     false,
        blending:       THREE.AdditiveBlending,
      });
      return new THREE.Points(geo, mat);
    }

    const sc     = isMobile ? 0.5 : 1;
    const layer1 = makeLayer(Math.floor(5500*sc), 1000, 0.28, 0.90);
    const layer2 = makeLayer(Math.floor(1800*sc),  560, 0.55, 0.80);
    const layer3 = makeTwinkleLayer(Math.floor(420*sc), 280); // twinkling spiky stars
    scene.add(layer1, layer2, layer3);

    /* ── Milky Way band ───────────────────────────────────────── */
    function makeMilkyWay(): THREE.Group {
      const g = new THREE.Group();

      // Dense warm core
      const cc  = isMobile ? 4500 : 11000;
      const pos = new Float32Array(cc*3);
      const col = new Float32Array(cc*3);
      for (let i = 0; i < cc; i++) {
        const along = (Math.random()-0.5)*680;
        const hw    = 85*(1-Math.abs(along)/340*0.60)+15;
        const perp  = (Math.random()-0.5)*2*hw;
        const normP = Math.abs(perp)/hw;
        pos[i*3]   = along; pos[i*3+1] = perp; pos[i*3+2] = (Math.random()-0.5)*30-110;
        if      (normP<0.25){ col[i*3]=0.82+Math.random()*0.18; col[i*3+1]=0.52+Math.random()*0.20; col[i*3+2]=0.10+Math.random()*0.15; }
        else if (normP<0.55){ col[i*3]=0.88+Math.random()*0.12; col[i*3+1]=0.78+Math.random()*0.15; col[i*3+2]=0.50+Math.random()*0.20; }
        else                { col[i*3]=0.72+Math.random()*0.20; col[i*3+1]=0.78+Math.random()*0.18; col[i*3+2]=0.85+Math.random()*0.15; }
      }
      const cgeo = new THREE.BufferGeometry();
      cgeo.setAttribute("position",new THREE.BufferAttribute(pos,3));
      cgeo.setAttribute("color",   new THREE.BufferAttribute(col,3));
      g.add(new THREE.Points(cgeo, new THREE.PointsMaterial({
        map:glowTex, size:0.50, transparent:true, opacity:0.68,
        vertexColors:true, sizeAttenuation:true, depthWrite:false,
        blending:THREE.AdditiveBlending, alphaTest:0.005,
      })));

      // Outer haze
      const hc   = isMobile ? 2000 : 5000;
      const hpos = new Float32Array(hc*3);
      const hcol = new Float32Array(hc*3);
      for (let i = 0; i < hc; i++) {
        const along = (Math.random()-0.5)*780;
        const hw    = 140*(1-Math.abs(along)/390*0.45)+20;
        hpos[i*3]   = along; hpos[i*3+1]=(Math.random()-0.5)*2*hw; hpos[i*3+2]=(Math.random()-0.5)*60-110;
        hcol[i*3]=0.55+Math.random()*0.30; hcol[i*3+1]=0.60+Math.random()*0.28; hcol[i*3+2]=0.72+Math.random()*0.28;
      }
      const hgeo = new THREE.BufferGeometry();
      hgeo.setAttribute("position",new THREE.BufferAttribute(hpos,3));
      hgeo.setAttribute("color",   new THREE.BufferAttribute(hcol,3));
      g.add(new THREE.Points(hgeo, new THREE.PointsMaterial({
        map:glowTex, size:1.2, transparent:true, opacity:0.12,
        vertexColors:true, sizeAttenuation:true, depthWrite:false,
        blending:THREE.AdditiveBlending, alphaTest:0.005,
      })));

      g.rotation.z = -Math.PI / 8;
      return g;
    }
    const milkyWay = makeMilkyWay();
    scene.add(milkyWay);

    /* ── Galactic core glow sprite ────────────────────────────── */
    function addGlow(x:number,y:number,z:number,r:number,g2:number,b:number,sc2:number,op:number){
      const c2=document.createElement("canvas"); c2.width=c2.height=256;
      const ctx=c2.getContext("2d")!;
      const gr=ctx.createRadialGradient(128,128,0,128,128,128);
      gr.addColorStop(0,  `rgba(${r},${g2},${b},0.9)`);
      gr.addColorStop(0.35,`rgba(${r},${g2},${b},0.3)`);
      gr.addColorStop(0.7,`rgba(${r},${g2},${b},0.06)`);
      gr.addColorStop(1,  `rgba(${r},${g2},${b},0)`);
      ctx.fillStyle=gr; ctx.fillRect(0,0,256,256);
      const s=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c2),transparent:true,opacity:op,depthWrite:false,blending:THREE.AdditiveBlending}));
      s.position.set(x,y,z); s.scale.setScalar(sc2); scene.add(s);
    }
    addGlow(-15,-8,-115,220,140,50,160,0.22);
    addGlow(-10,-5,-115,200,110,40,280,0.10);
    if(!isMobile){addGlow(-90,50,-160,60,110,200,180,0.07);addGlow(80,-20,-150,110,60,200,150,0.06);}

    /* ── Mouse + scroll ───────────────────────────────────────── */
    let mx=0,my=0,sx=0,sy=0,scrollY=0;
    const onMouse=(e:MouseEvent)=>{mx=(e.clientX/window.innerWidth-0.5)*2;my=(e.clientY/window.innerHeight-0.5)*2;};
    const onScroll=()=>{scrollY=window.scrollY;};
    const onResize=()=>{camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix();renderer.setSize(window.innerWidth,window.innerHeight);};
    window.addEventListener("mousemove",onMouse);
    window.addEventListener("scroll",onScroll,{passive:true});
    window.addEventListener("resize",onResize);

    /* ── Animation loop ───────────────────────────────────────── */
    const clock = new THREE.Clock();
    let rafId: number;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      sx += (mx-sx)*0.022; sy += (my-sy)*0.022;

      layer1.rotation.y = t*0.0035+sx*0.055; layer1.rotation.x = t*0.0020+sy*0.038;
      layer2.rotation.y = t*0.0060+sx*0.090; layer2.rotation.x = t*0.0035+sy*0.062;
      layer3.rotation.y = t*0.0100+sx*0.145; layer3.rotation.x = t*0.0055+sy*0.100;

      // Feed time to twinkle shader
      const mat3 = layer3.material as THREE.ShaderMaterial;
      mat3.uniforms.uTime.value = t;

      milkyWay.rotation.y = t*0.0014+sx*0.025;
      milkyWay.rotation.x = t*0.0006+sy*0.018;

      camera.position.x =  sx*2.5;
      camera.position.y = -sy*2.5 - scrollY*0.0012;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove",onMouse);
      window.removeEventListener("scroll",onScroll);
      window.removeEventListener("resize",onResize);
      renderer.dispose(); scene.clear();
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" style={{zIndex:-1}} aria-hidden />;
}
