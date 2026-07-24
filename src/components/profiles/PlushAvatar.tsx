import type {PlushShape} from "@/features/profiles/types";

const palette={coral:{body:"#f2a08d",shadow:"#d77a6c",inner:"#fff1eb"},mint:{body:"#9fc8b0",shadow:"#6fa88a",inner:"#edf8f0"},lemon:{body:"#e8cf73",shadow:"#c1a84c",inner:"#fff8d9"}} as const;
function customPalette(theme:string){
  if(!/^#[0-9a-f]{6}$/i.test(theme))return null;
  const number=parseInt(theme.slice(1),16);const r=number>>16,g=(number>>8)&255,b=number&255;
  const mix=(target:number,amount:number)=>Math.round(target+(target>128?-255:255)*amount);
  const hex=(red:number,green:number,blue:number)=>`#${[red,green,blue].map(value=>Math.max(0,Math.min(255,value)).toString(16).padStart(2,"0")).join("")}`;
  return {body:theme,shadow:hex(mix(r,.22),mix(g,.22),mix(b,.22)),inner:hex(mix(r,.82),mix(g,.82),mix(b,.82))};
}

export function PlushAvatar({shape="round",theme="coral",size=56}:{shape?:PlushShape;theme?:string;size?:number}){
  const colors=palette[theme as keyof typeof palette]??customPalette(theme)??palette.coral;
  const humanoid=shape==="humanoid";
  const longEar=shape==="longEar";
  return <svg aria-label={longEar?"耳ながのぬい":humanoid?"人型のぬい":"まるいぬい"} width={size} height={size} viewBox="0 0 120 120" role="img">
    <defs><linearGradient id={`plush-${shape}-${theme}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={colors.inner}/><stop offset=".55" stopColor={colors.body}/><stop offset="1" stopColor={colors.shadow}/></linearGradient></defs>
    {longEar&&<><path d="M31 47C18 36 17 10 29 7c12-3 20 22 18 39" fill={colors.body} stroke="#493c38" strokeWidth="3"/><path d="M89 47c13-11 14-37 2-40-12-3-20 22-18 39" fill={colors.body} stroke="#493c38" strokeWidth="3"/><path d="M31 36c-5-8-5-17-2-20 5 4 8 12 8 20" fill={colors.inner}/><path d="M89 36c5-8 5-17 2-20-5 4-8 12-8 20" fill={colors.inner}/></>}
    <path d={humanoid?"M37 28c7-9 39-9 46 0l8 17v34c0 17-12 27-31 27S29 96 29 79V45Z":longEar?"M37 31c8-9 38-9 46 0l10 18v31c0 20-15 31-38 31S17 100 17 80V49Z":"M20 58c0-24 13-40 40-40s40 16 40 40c0 28-15 46-40 46S20 86 20 58Z"} fill={`url(#plush-${shape}-${theme})`} stroke="#493c38" strokeWidth="3" strokeLinejoin="round"/>
    {humanoid&&<><path d="M37 77v28M83 77v28" stroke="#493c38" strokeWidth="8" strokeLinecap="round"/><path d="M27 53h-8M93 53h8" stroke="#493c38" strokeWidth="7" strokeLinecap="round"/></>}
    {!humanoid&&<><path d="M20 58c-10-8-16-3-14 5 2 7 9 11 16 8M100 58c10-8 16-3 14 5-2 7-9 11-16 8" fill={colors.body} stroke="#493c38" strokeWidth="3"/></>}
    <circle cx="43" cy="59" r="4" fill="#493c38"/><circle cx="77" cy="59" r="4" fill="#493c38"/>
    <ellipse cx="31" cy="70" rx="8" ry="4" fill="#ec8177" opacity=".75"/><ellipse cx="89" cy="70" rx="8" ry="4" fill="#ec8177" opacity=".75"/>
    <path d="M48 75q12 10 24 0" fill="none" stroke="#493c38" strokeWidth="3" strokeLinecap="round"/>
    <path d="M28 88q32 14 64 0" fill="none" stroke="#fff9f4" strokeWidth="2" opacity=".7"/>
  </svg>
}
