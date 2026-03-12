/**
 * Ultra-detailed SVG hero illustrations for each meal type.
 * Each illustration uses gradients, highlights, shadows and layered shapes
 * to create a rich, food-magazine quality feel.
 */

import React from 'react';
import type { MealType } from '../../types';

interface Props {
  mealId: MealType;
  size?: number;
}

// ─── Pizza ───────────────────────────────────────────────────────────────────
const PizzaHero = () => (
  <svg width={260} height={260} viewBox="0 0 260 260">
    <defs>
      <radialGradient id="ph_plate" cx="50%" cy="42%" r="50%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="75%" stopColor="#f5f5f5" />
        <stop offset="100%" stopColor="#e0ddd8" />
      </radialGradient>
      <radialGradient id="ph_crust" cx="50%" cy="50%" r="50%">
        <stop offset="0%"  stopColor="#e8a84a" />
        <stop offset="60%" stopColor="#c97d2a" />
        <stop offset="100%" stopColor="#8b4a14" />
      </radialGradient>
      <radialGradient id="ph_cheese" cx="48%" cy="45%" r="52%">
        <stop offset="0%"  stopColor="#f9e04a" />
        <stop offset="45%" stopColor="#f0c030" />
        <stop offset="100%" stopColor="#d4960a" />
      </radialGradient>
      <radialGradient id="ph_sauce_spot" cx="50%" cy="50%" r="50%">
        <stop offset="0%"  stopColor="#e85030" />
        <stop offset="100%" stopColor="#b02010" />
      </radialGradient>
      <radialGradient id="ph_pepperoni" cx="38%" cy="35%" r="55%">
        <stop offset="0%"  stopColor="#c84040" />
        <stop offset="55%" stopColor="#a01818" />
        <stop offset="100%" stopColor="#700808" />
      </radialGradient>
      <radialGradient id="ph_pep_shine" cx="35%" cy="30%" r="40%">
        <stop offset="0%"  stopColor="rgba(255,255,255,0.45)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </radialGradient>
      <filter id="ph_shadow" x="-15%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="rgba(0,0,0,0.28)" />
      </filter>
      <filter id="ph_plate_shadow" x="-8%" y="-5%" width="116%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,0.18)" />
      </filter>
    </defs>

    {/* Plate */}
    <ellipse cx={130} cy={138} rx={122} ry={14} fill="rgba(0,0,0,0.10)" />
    <circle cx={130} cy={130} r={122} fill="url(#ph_plate)" filter="url(#ph_plate_shadow)" />
    <circle cx={130} cy={130} r={118} fill="none" stroke="#ddd" strokeWidth="3" />
    <circle cx={130} cy={130} r={113} fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />

    {/* Pizza crust */}
    <circle cx={130} cy={130} r={108} fill="url(#ph_crust)" filter="url(#ph_shadow)" />

    {/* Crust texture bumps */}
    {[0,36,72,108,144,180,216,252,288,324].map((deg, i) => {
      const a = (deg * Math.PI) / 180;
      return (
        <ellipse key={i}
          cx={130 + Math.cos(a) * 100} cy={130 + Math.sin(a) * 100}
          rx={6} ry={4} fill="rgba(255,255,255,0.12)"
          transform={`rotate(${deg} ${130 + Math.cos(a) * 100} ${130 + Math.sin(a) * 100})`}
        />
      );
    })}

    {/* Sauce base */}
    <circle cx={130} cy={130} r={88} fill="#c83020" />
    <circle cx={130} cy={130} r={86} fill="#d94020" opacity={0.7} />

    {/* Cheese layer */}
    <circle cx={130} cy={130} r={86} fill="url(#ph_cheese)" />

    {/* Cheese bubbles / blistered spots */}
    {[[100,108,9],[148,102,7],[162,138,8],[144,158,6],[110,162,7],[85,148,8],[88,112,6],[130,90,7],[168,118,5]].map(([cx,cy,r],i) => (
      <circle key={i} cx={cx} cy={cy} r={r}
        fill={i%3===0 ? '#d4960a' : i%3===1 ? '#f0e060' : '#c07808'} opacity={0.55} />
    ))}

    {/* Sauce peek-through spots */}
    {[[118,118,5],[142,144,4],[106,142,4],[154,118,4]].map(([cx,cy,r],i) => (
      <circle key={i} cx={cx} cy={cy} r={r} fill="url(#ph_sauce_spot)" opacity={0.6} />
    ))}

    {/* Pepperoni slices */}
    {[[105,105,16],[155,105,15],[168,138,15],[152,165,14],[108,165,15],[85,138,16],[130,95,13],[130,160,14]].map(([cx,cy,r],i) => (
      <g key={i}>
        <circle cx={cx} cy={cy} r={r} fill="url(#ph_pepperoni)" />
        <circle cx={cx} cy={cy} r={r} fill="url(#ph_pep_shine)" />
        {/* White fat flecks */}
        {[[-3,-3],[3,-2],[-2,3],[3,3]].map(([dx,dy],j) => (
          <circle key={j} cx={cx+dx} cy={cy+dy} r={1.5} fill="rgba(255,255,255,0.35)" />
        ))}
      </g>
    ))}

    {/* Fresh basil leaves */}
    {[[130,118],[110,140],[148,148]].map(([cx,cy],i) => (
      <g key={i} transform={`rotate(${i*40-20} ${cx} ${cy})`}>
        <ellipse cx={cx} cy={cy} rx={7} ry={10} fill="#2d8a2d" opacity={0.88} />
        <line x1={cx} y1={cy-9} x2={cx} y2={cy+8} stroke="#1a5c1a" strokeWidth="0.8" />
      </g>
    ))}

    {/* Cheese pull highlights */}
    <circle cx={130} cy={130} r={85} fill="none" stroke="rgba(255,240,150,0.2)" strokeWidth="3" />

    {/* Plate rim shine */}
    <ellipse cx={100} cy={62} rx={28} ry={9} fill="rgba(255,255,255,0.35)" transform="rotate(-28 100 62)" />
  </svg>
);

// ─── Hamburger ───────────────────────────────────────────────────────────────
const HamburgerHero = () => (
  <svg width={260} height={280} viewBox="0 0 260 280">
    <defs>
      <radialGradient id="hh_bun_top" cx="46%" cy="30%" r="60%">
        <stop offset="0%"  stopColor="#f5d070" />
        <stop offset="50%" stopColor="#d4943a" />
        <stop offset="100%" stopColor="#9a5a14" />
      </radialGradient>
      <radialGradient id="hh_bun_bot" cx="48%" cy="20%" r="55%">
        <stop offset="0%"  stopColor="#f0c858" />
        <stop offset="60%" stopColor="#c88a28" />
        <stop offset="100%" stopColor="#8a5010" />
      </radialGradient>
      <linearGradient id="hh_patty" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"  stopColor="#7a4018" />
        <stop offset="40%" stopColor="#5a2c0c" />
        <stop offset="100%" stopColor="#3c1a06" />
      </linearGradient>
      <linearGradient id="hh_cheese" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"  stopColor="#fce060" />
        <stop offset="100%" stopColor="#e8b020" />
      </linearGradient>
      <filter id="hh_shadow">
        <feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="rgba(0,0,0,0.3)" />
      </filter>
    </defs>

    {/* Plate */}
    <ellipse cx={130} cy={268} rx={114} ry={12} fill="rgba(0,0,0,0.10)" />
    <ellipse cx={130} cy={263} rx={110} ry={10} fill="#f5ede3" stroke="#d5c9bc" strokeWidth="2" />

    {/* Bottom bun */}
    <ellipse cx={130} cy={248} rx={100} ry={14} fill="#9a5a14" />
    <ellipse cx={130} cy={242} rx={98} ry={17} fill="url(#hh_bun_bot)" />
    <ellipse cx={130} cy={236} rx={94} ry={12} fill="#f0d480" opacity={0.5} />

    {/* Ketchup drizzle */}
    <path d="M50,230 Q70,222 90,230 Q110,238 130,230 Q150,222 170,230 Q190,238 210,230"
      fill="none" stroke="#d03020" strokeWidth={5} strokeLinecap="round" opacity={0.88} />

    {/* Lettuce ruffles */}
    {[-1,0,1].map(row => {
      const y = 220 + row * 2;
      return <path key={row}
        d={`M36,${y} Q52,${y-10} 68,${y} Q84,${y+8} 100,${y} Q116,${y-10} 130,${y} Q144,${y+8} 160,${y} Q176,${y-10} 192,${y} Q208,${y+8} 224,${y}`}
        fill="none" stroke={row === 0 ? '#4caf50' : '#2e7d32'}
        strokeWidth={row === 0 ? 8 : 5} strokeLinecap="round" opacity={row === 0 ? 1 : 0.6} />;
    })}

    {/* Tomato slices */}
    <ellipse cx={130} cy={208} rx={92} ry={8} fill="#e53535" />
    <ellipse cx={130} cy={207} rx={92} ry={8} fill="none" stroke="#b01818" strokeWidth="1" opacity={0.4} />
    {[-44,-15,14,43].map((dx,i) => (
      <ellipse key={i} cx={130+dx} cy={208} rx={13} ry={6} fill="#ef9a9a" opacity={0.45} />
    ))}

    {/* Cheese slice */}
    <path d="M36,200 L224,200 L230,195 L42,195 Z" fill="url(#hh_cheese)" />
    <path d="M36,200 L28,208 L224,208 L224,200 Z" fill="#e8b020" opacity={0.7} />
    {/* Cheese drip corners */}
    {[48,90,170,210].map((x,i) => (
      <ellipse key={i} cx={x} cy={210} rx={5} ry={8} fill="#fce060" opacity={0.7} />
    ))}

    {/* Beef patty */}
    <ellipse cx={130} cy={195} rx={95} ry={13} fill="rgba(0,0,0,0.15)" />
    <rect x={35} y={178} width={190} height={22} rx={9} fill="url(#hh_patty)" />
    <rect x={35} y={178} width={190} height={11} rx={9} fill="rgba(120,80,40,0.35)" />
    {/* Sear marks */}
    {[0.2,0.45,0.7].map((t,i) => (
      <line key={i}
        x1={35+190*t-6} y1={180} x2={35+190*t+6} y2={198}
        stroke="rgba(30,10,0,0.5)" strokeWidth={3} strokeLinecap="round" />
    ))}

    {/* Onion ring */}
    <ellipse cx={130} cy={176} rx={88} ry={6} fill="#e1bee7" opacity={0.85} />
    {[-30,5,40].map((dx,i) => (
      <ellipse key={i} cx={130+dx} cy={176} rx={22} ry={5}
        fill="none" stroke="#7b1fa2" strokeWidth={1.2} opacity={0.5} />
    ))}

    {/* Top bun */}
    <g filter="url(#hh_shadow)">
      <ellipse cx={130} cy={172} rx={100} ry={12} fill="#9a5a14" />
      <ellipse cx={130} cy={163} rx={98} ry={22} fill="#c07828" />
      <ellipse cx={130} cy={145} rx={94} ry={30} fill="#d49040" />
      <ellipse cx={130} cy={128} rx={88} ry={26} fill="url(#hh_bun_top)" />
      {/* Sesame seeds */}
      {[[108,118,10],[130,110,10],[152,118,10],[120,130,10],[142,130,10],[130,140,10]].map(([cx,cy,rot],i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={5} ry={2.5}
          fill="#c89060" transform={`rotate(${rot} ${cx} ${cy})`} />
      ))}
      {/* Bun shine */}
      <ellipse cx={105} cy={116} rx={24} ry={9} fill="rgba(255,255,255,0.22)" transform="rotate(-22 105 116)" />
    </g>
  </svg>
);

// ─── Burrito ─────────────────────────────────────────────────────────────────
const BurritoHero = () => (
  <svg width={260} height={260} viewBox="0 0 260 260">
    <defs>
      <linearGradient id="bh_tortilla" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"  stopColor="#f5e0a0" />
        <stop offset="40%" stopColor="#e8c870" />
        <stop offset="100%" stopColor="#c89840" />
      </linearGradient>
      <linearGradient id="bh_tortilla_side" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"  stopColor="#d4a850" />
        <stop offset="100%" stopColor="#a07828" />
      </linearGradient>
      <radialGradient id="bh_end" cx="50%" cy="50%" r="50%">
        <stop offset="0%"  stopColor="#f8f2e0" />
        <stop offset="100%" stopColor="#d4c080" />
      </radialGradient>
      <filter id="bh_shadow">
        <feDropShadow dx="3" dy="6" stdDeviation="8" floodColor="rgba(0,0,0,0.3)" />
      </filter>
      <filter id="bh_glow">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>

    {/* Shadow */}
    <ellipse cx={135} cy={230} rx={90} ry={14} fill="rgba(0,0,0,0.18)" />

    {/* Foil wrapper at bottom */}
    <rect x={68} y={198} width={130} height={26} rx={4} fill="#c8d8e0" />
    <rect x={68} y={198} width={130} height={13} rx={4} fill="#d8e8f0" opacity={0.7} />
    {/* Foil creases */}
    {[88,108,128,148,168].map((x,i) => (
      <line key={i} x1={x} y1={198} x2={x+4} y2={224} stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
    ))}

    {/* Main burrito cylinder */}
    <g filter="url(#bh_shadow)">
      {/* Bottom curved surface */}
      <ellipse cx={133} cy={218} rx={65} ry={12} fill="#a07828" />
      {/* Main body */}
      <rect x={68} y={80} width={130} height={138} rx={12} fill="url(#bh_tortilla)" />
      {/* Side shade */}
      <rect x={68} y={80} width={18} height={138} rx={8} fill="url(#bh_tortilla_side)" opacity={0.7} />
      <rect x={180} y={80} width={18} height={138} rx={8} fill="url(#bh_tortilla_side)" opacity={0.5} />

      {/* Char spots on tortilla */}
      {[[90,100,8,6],[170,115,10,7],[95,155,7,5],[175,160,9,6],[120,90,6,4],[155,180,8,5]].map(([cx,cy,rx,ry],i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry}
          fill="#7a5818" opacity={0.45}
          transform={`rotate(${i*22} ${cx} ${cy})`} />
      ))}

      {/* Tortilla fold lines */}
      <path d="M80,130 Q133,125 186,130" fill="none" stroke="rgba(180,130,50,0.4)" strokeWidth="1.5" />
      <path d="M80,150 Q133,145 186,150" fill="none" stroke="rgba(180,130,50,0.3)" strokeWidth="1.5" />

      {/* Top twisted/sealed end */}
      <ellipse cx={133} cy={80} rx={65} ry={12} fill="#c89840" />
      {/* Twisted folds */}
      {[-18,-9,0,9,18].map((dx,i) => (
        <line key={i}
          x1={133+dx} y1={68} x2={133+dx*0.6} y2={92}
          stroke={i%2===0 ? '#d4a850' : '#a07828'} strokeWidth={i%2===0 ? 3 : 2}
          strokeLinecap="round" opacity={0.7} />
      ))}
    </g>

    {/* Cross-section view at cut end (bottom) — shows fillings */}
    <ellipse cx={133} cy={218} rx={62} ry={11} fill="url(#bh_end)" />
    {/* Rice layer */}
    <ellipse cx={133} cy={218} rx={54} ry={8} fill="#f8f5ee" opacity={0.9} />
    {/* Beans */}
    {[-22,-8,8,22].map((dx,i) => (
      <ellipse key={i} cx={133+dx} cy={218} rx={7} ry={4} fill="#3d2b1f" opacity={0.8} />
    ))}
    {/* Corn specks */}
    {[-30,-15,0,15,30,-22,22].map((dx,i) => (
      <circle key={i} cx={133+dx} cy={216+((i%3)-1)*2} r={2} fill="#f5c518" opacity={0.9} />
    ))}
    {/* Salsa red */}
    <ellipse cx={133} cy={220} rx={20} ry={4} fill="#d03020" opacity={0.6} />
    {/* Sour cream */}
    <ellipse cx={133} cy={214} rx={15} ry={3} fill="#fafafa" opacity={0.8} />

    {/* Lime wedge garnish */}
    <g transform="translate(195,195) rotate(35)">
      <path d="M0,0 L-16,0 Q-20,8 -10,14 Q0,18 8,10 Z" fill="#8bc34a" />
      <path d="M0,0 L-16,0 Q-18,6 -10,10 Q0,14 6,8 Z" fill="#aed868" opacity={0.6} />
      <line x1={0} y1={0} x2={-10} y2={12} stroke="#558b2f" strokeWidth="0.8" opacity={0.5} />
    </g>

    {/* Label tag */}
    <ellipse cx={133} cy={84} rx={24} ry={8} fill="rgba(255,255,255,0.18)" />
  </svg>
);

// ─── Salad ───────────────────────────────────────────────────────────────────
const SaladHero = () => (
  <svg width={260} height={260} viewBox="0 0 260 260">
    <defs>
      <radialGradient id="sh_bowl" cx="48%" cy="40%" r="55%">
        <stop offset="0%"  stopColor="#ffffff" />
        <stop offset="70%" stopColor="#f5f0eb" />
        <stop offset="100%" stopColor="#ddd5c8" />
      </radialGradient>
      <radialGradient id="sh_greens" cx="50%" cy="50%" r="50%">
        <stop offset="0%"  stopColor="#5cb85c" />
        <stop offset="100%" stopColor="#2e7d32" />
      </radialGradient>
      <filter id="sh_shadow">
        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="rgba(0,0,0,0.22)" />
      </filter>
    </defs>

    {/* Bowl shadow */}
    <ellipse cx={130} cy={232} rx={104} ry={14} fill="rgba(0,0,0,0.14)" />

    {/* Bowl outer */}
    <g filter="url(#sh_shadow)">
      <path d="M26,118 Q26,234 130,234 Q234,234 234,118 Z" fill="#ddd5c8" />
      <path d="M34,118 Q34,220 130,220 Q226,220 226,118 Z" fill="url(#sh_bowl)" />
    </g>

    {/* Greens base */}
    <ellipse cx={130} cy={148} rx={88} ry={38} fill="url(#sh_greens)" opacity={0.3} />
    {[[62,134],[92,122],[122,118],[152,122],[182,134],[74,150],[150,146],[130,160],[104,155],[162,155]].map(([cx,cy],i) => (
      <ellipse key={i} cx={cx} cy={cy} rx={22} ry={12}
        fill={i%2===0 ? '#2e7d32' : '#4caf50'} opacity={0.4}
        transform={`rotate(${(i*37)%180-60} ${cx} ${cy})`} />
    ))}

    {/* Colorful toppings */}
    {/* Cherry tomatoes */}
    {[[88,132],[145,126],[168,148],[100,162]].map(([cx,cy],i) => (
      <g key={i}>
        <circle cx={cx} cy={cy} r={9} fill="#e53535" />
        <circle cx={cx-2} cy={cy-2} r={3} fill="rgba(255,255,255,0.4)" />
        <line x1={cx} y1={cy-9} x2={cx} y2={cy-13} stroke="#2e7d32" strokeWidth="1.5" />
      </g>
    ))}
    {/* Orange carrot ribbons */}
    {[[118,142,25],[155,158,20],[80,155,18]].map(([cx,cy,len],i) => (
      <rect key={i} x={cx-len/2} y={cy-3} width={len} height={6} rx={3}
        fill="#f57c00" opacity={0.9} transform={`rotate(${i*25-12} ${cx} ${cy})`} />
    ))}
    {/* Cucumber rounds */}
    {[[140,140],[108,128],[170,130]].map(([cx,cy],i) => (
      <g key={i}>
        <circle cx={cx} cy={cy} r={9} fill="#4caf50" />
        <circle cx={cx} cy={cy} r={6.5} fill="#a5d6a7" opacity={0.8} />
        <circle cx={cx} cy={cy} r={3} fill="#c8e6c9" opacity={0.7} />
      </g>
    ))}
    {/* Purple onion rings */}
    {[[130,152],[94,145]].map(([cx,cy],i) => (
      <ellipse key={i} cx={cx} cy={cy} rx={20} ry={5}
        fill="#e1bee7" stroke="#7b1fa2" strokeWidth="1.5" opacity={0.8} />
    ))}
    {/* Crouton cubes */}
    {[[158,140],[136,126],[115,158]].map(([cx,cy],i) => (
      <g key={i} transform={`rotate(${i*15-10} ${cx} ${cy})`}>
        <rect x={cx-7} y={cy-7} width={14} height={14} rx={2.5} fill="#c9914a" />
        <rect x={cx-7} y={cy-7} width={14} height={7} rx={2.5} fill="#e0b06a" opacity={0.55} />
      </g>
    ))}
    {/* Dressing drizzle */}
    <path d="M82,138 Q105,128 128,138 Q151,148 174,138"
      fill="none" stroke="#f39c12" strokeWidth={4} strokeLinecap="round" opacity={0.85} />

    {/* Bowl rim */}
    <ellipse cx={130} cy={118} rx={110} ry={20} fill="#ddd5c8" stroke="#ccc3b5" strokeWidth="2.5" />
    <ellipse cx={130} cy={116} rx={104} ry={16} fill="#f0e8df" />
    {/* Rim highlight */}
    <path d="M32,115 Q88,102 130,100 Q172,102 228,115"
      fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

// ─── Sushi ───────────────────────────────────────────────────────────────────
const SushiHero = () => (
  <svg width={260} height={220} viewBox="0 0 260 220">
    <defs>
      <linearGradient id="suh_board" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"  stopColor="#d4b060" />
        <stop offset="100%" stopColor="#a88030" />
      </linearGradient>
      <radialGradient id="suh_plate" cx="50%" cy="35%" r="55%">
        <stop offset="0%"  stopColor="#1c2e1c" />
        <stop offset="100%" stopColor="#0a1a0a" />
      </radialGradient>
      <radialGradient id="suh_rice" cx="48%" cy="40%" r="55%">
        <stop offset="0%"  stopColor="#fafafa" />
        <stop offset="100%" stopColor="#e8e0d0" />
      </radialGradient>
      <filter id="suh_shadow">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,0.28)" />
      </filter>
    </defs>

    {/* Slate board */}
    <rect x={8} y={38} width={244} height={148} rx={12} fill="rgba(0,0,0,0.18)" />
    <rect x={6} y={34} width={248} height={148} rx={12} fill="url(#suh_plate)" filter="url(#suh_shadow)" />
    {/* Board texture grain */}
    {[0,1,2,3].map(i => (
      <line key={i} x1={8} y1={34+i*40} x2={254} y2={38+i*40}
        stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
    ))}

    {/* Sushi pieces — 4 maki rolls */}
    {[34,84,134,184].map((cx, i) => {
      const colors = ['#f08060','#c03030','#f49060','#f08060'];
      const fillingColors = colors[i];
      return (
        <g key={i} filter="url(#suh_shadow)">
          {/* Nori ring */}
          <ellipse cx={cx} cy={120} rx={28} ry={28} fill="#1a2e1a" />
          {/* Rice ring */}
          <ellipse cx={cx} cy={120} rx={24} ry={24} fill="url(#suh_rice)" />
          {/* Rice grain texture */}
          {[0,45,90,135,180,225,270,315].map((ang,j) => {
            const a = (ang*Math.PI)/180;
            return <ellipse key={j}
              cx={cx+Math.cos(a)*16} cy={120+Math.sin(a)*16}
              rx={3} ry={1.8} fill="white" opacity={0.55}
              transform={`rotate(${ang} ${cx+Math.cos(a)*16} ${120+Math.sin(a)*16})`} />;
          })}
          {/* Filling center */}
          <circle cx={cx} cy={120} r={10} fill={fillingColors} opacity={0.9} />
          <circle cx={cx-2} cy={118} r={3} fill="rgba(255,255,255,0.35)" />
          {/* Nori sheen */}
          <ellipse cx={cx-8} cy={106} rx={8} ry={4} fill="rgba(255,255,255,0.08)" transform={`rotate(-20 ${cx-8} 106)`} />
          {/* Cylinder side faces */}
          <ellipse cx={cx} cy={148} rx={28} ry={6} fill="#0a1a0a" />
          <rect x={cx-28} y={120} width={56} height={28} fill="#152515" />
          <ellipse cx={cx} cy={120} rx={28} ry={6} fill="#1a2e1a" />
        </g>
      );
    })}

    {/* Soy sauce dish */}
    <ellipse cx={228} cy={90} rx={20} ry={10} fill="#1a0a00" />
    <ellipse cx={228} cy={89} rx={17} ry={8} fill="#2c1a0a" />
    <ellipse cx={226} cy={88} rx={8} ry={4} fill="#3a2010" opacity={0.6} />

    {/* Wasabi mound */}
    <ellipse cx={224} cy={152} rx={16} ry={10} fill="#3aaa60" />
    <ellipse cx={222} cy={150} rx={9} ry={6} fill="#5ecf80" opacity={0.5} />

    {/* Ginger pile */}
    <ellipse cx={220} cy={130} rx={14} ry={8} fill="#f5b8a8" opacity={0.85} />
    <ellipse cx={218} cy={129} rx={8} ry={4} fill="#fad0c4" opacity={0.55} />

    {/* Chopsticks */}
    <rect x={18} y={166} width={7} height={52} rx={3.5} fill="#c8a060" transform="rotate(-8 21 192)" />
    <rect x={30} y={164} width={7} height={54} rx={3.5} fill="#d4aa70" transform="rotate(-5 33 191)" />

    {/* Board edge highlight */}
    <rect x={6} y={34} width={248} height={148} rx={12}
      fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
  </svg>
);

// ─── Sandwich ────────────────────────────────────────────────────────────────
const SandwichHero = () => (
  <svg width={260} height={240} viewBox="0 0 260 240">
    <defs>
      <linearGradient id="swh_board" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"  stopColor="#c8a858" />
        <stop offset="100%" stopColor="#8a7030" />
      </linearGradient>
      <radialGradient id="swh_bread" cx="46%" cy="28%" r="60%">
        <stop offset="0%"  stopColor="#f0c870" />
        <stop offset="55%" stopColor="#d4953a" />
        <stop offset="100%" stopColor="#9a6018" />
      </radialGradient>
      <linearGradient id="swh_crust" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"  stopColor="#a87028" />
        <stop offset="100%" stopColor="#7a4e18" />
      </linearGradient>
      <filter id="swh_shadow">
        <feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="rgba(0,0,0,0.25)" />
      </filter>
    </defs>

    {/* Cutting board */}
    <rect x={10} y={180} width={240} height={46} rx={10} fill="rgba(0,0,0,0.12)" />
    <rect x={8} y={175} width={244} height={46} rx={10} fill="url(#swh_board)" />
    {/* Board grain lines */}
    {[0,1,2,3].map(i => (
      <line key={i} x1={10} y1={176+i*12} x2={250} y2={177+i*12}
        stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
    ))}
    <rect x={8} y={175} width={244} height={46} rx={10}
      fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />

    {/* ── Sandwich cross-section ── */}
    <g filter="url(#swh_shadow)">

      {/* Bottom bread */}
      <rect x={22} y={170} width={216} height={22} rx={7} fill="url(#swh_crust)" />
      <rect x={24} y={168} width={212} height={20} rx={6} fill="url(#swh_bread)" />
      <rect x={24} y={168} width={212} height={10} rx={6} fill="rgba(255,240,180,0.4)" />

      {/* Turkey layer */}
      <rect x={20} y={154} width={220} height={16} rx={5} fill="#c9946a" />
      <rect x={20} y={154} width={220} height={8} rx={5} fill="#d9a87c" opacity={0.5} />
      {[0.2,0.45,0.7].map((t,i) => (
        <line key={i} x1={20+220*t-5} y1={156} x2={20+220*t+5} y2={168}
          stroke="#b07850" strokeWidth="1.5" opacity={0.3} strokeLinecap="round" />
      ))}

      {/* Swiss cheese */}
      <rect x={18} y={143} width={224} height={12} rx={3} fill="#f5e990" />
      <rect x={18} y={143} width={224} height={6} rx={3} fill="rgba(255,253,220,0.6)" />
      {[-52,-18,16,50,84].map((dx,i) => (
        <ellipse key={i} cx={130+dx} cy={149} rx={8} ry={5} fill="#e6d060" opacity={0.65} />
      ))}

      {/* Lettuce */}
      {[0,1].map(row => {
        const y = 134 + row;
        const L = 12; const R = 248;
        return <path key={row}
          d={`M${L},${y} ${Array.from({length:13},(_,i)=>`Q${L+(i+0.5)*((R-L)/13)},${y+(i%2===0?-8:6)} ${L+(i+1)*((R-L)/13)},${y}`).join(' ')}`}
          fill="none"
          stroke={row===0 ? '#4caf50' : '#2e7d32'}
          strokeWidth={row===0 ? 8 : 5}
          strokeLinecap="round" opacity={row===0?1:0.65} />;
      })}

      {/* Tomato */}
      <rect x={22} y={122} width={216} height={13} rx={3} fill="#e53535" />
      {[-52,-18,16,50].map((dx,i) => (
        <ellipse key={i} cx={130+dx} cy={128} rx={14} ry={5} fill="#ef9a9a" opacity={0.45} />
      ))}

      {/* Avocado */}
      <rect x={22} y={111} width={216} height={12} rx={3} fill="#81c784" />
      <rect x={40} y={111} width={178} height={7} rx={3} fill="#a5d6a7" opacity={0.55} />

      {/* Mayo drizzle */}
      <path d="M30,108 Q80,102 130,108 Q180,114 230,108"
        fill="none" stroke="#fafafa" strokeWidth={5} strokeLinecap="round" opacity={0.88} />

      {/* Top bread — dome arch */}
      <rect x={20} y={88} width={220} height={20} rx={6} fill="url(#swh_crust)" />
      <path d="M24,108 Q24,84 130,76 Q236,84 236,108 Z" fill="url(#swh_bread)" />
      <path d="M30,108 Q30,88 130,81 Q230,88 230,108 Z" fill="rgba(255,240,180,0.35)" />
      {/* Sesame seeds */}
      {[[105,86,10],[128,80,8],[154,86,12],[118,94,10],[142,94,10]].map(([cx,cy,rot],i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={5} ry={2.5}
          fill="#c89060" transform={`rotate(${rot} ${cx} ${cy})`} />
      ))}
      {/* Bread shine */}
      <ellipse cx={102} cy={83} rx={24} ry={8} fill="rgba(255,255,255,0.2)" transform="rotate(-20 102 83)" />
    </g>

    {/* Pickle garnish */}
    <g transform="translate(220,168) rotate(-15)">
      <ellipse rx={12} ry={6} fill="#8bc34a" />
      <ellipse rx={8} ry={3.5} fill="#a5d6a7" opacity={0.6} />
      {[-3,3].map((dx,i) => <circle key={i} cx={dx} cy={0} r={1.5} fill="#33691e" opacity={0.6} />)}
    </g>
  </svg>
);

// ─── Main export ─────────────────────────────────────────────────────────────
export const MealHeroIllustration = ({ mealId, size = 1 }: Props & { size?: number }) => {
  const scale = size;
  const illustrations: Record<MealType, React.ReactElement> = {
    pizza:     <PizzaHero />,
    hamburger: <HamburgerHero />,
    burrito:   <BurritoHero />,
    salad:     <SaladHero />,
    sushi:     <SushiHero />,
    sandwich:  <SandwichHero />,
  };

  return (
    <div style={{ transform: `scale(${scale})`, transformOrigin: 'center center', display: 'inline-block' }}>
      {illustrations[mealId]}
    </div>
  );
};
