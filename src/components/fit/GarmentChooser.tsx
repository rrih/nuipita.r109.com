"use client";
import {garmentRegistry,type GarmentType} from "@/features/fit/garment-registry";

const descriptions:Record<GarmentType,string>={pullover:"頭からかぶせる服",frontOpen:"前を開いて着せる服",bottoms:"パンツ・スカート",onePiece:"上下一体の服",headwear:"帽子・かぶりもの"};
function GarmentShape({type}:{type:GarmentType}){
  const common={fill:"#f8e1d9",stroke:"#a95043",strokeWidth:2.5,strokeLinejoin:"round" as const};
  if(type==="headwear")return <svg aria-hidden="true" viewBox="0 0 100 72" width="76" height="54"><path d="M16 53q8-33 34-38 26 5 34 38Z" {...common}/><path d="M13 53h74" stroke="#493c38" strokeWidth="4" strokeLinecap="round"/><path d="M30 39q20-10 40 0" fill="none" stroke="#fff9f4" strokeWidth="3"/></svg>;
  if(type==="bottoms")return <svg aria-hidden="true" viewBox="0 0 100 72" width="76" height="54"><path d="M22 12h56v22l-9 29H49V42h2v21H31l-9-29Z" {...common}/><path d="M22 25h56" stroke="#493c38" strokeWidth="2" strokeDasharray="4 4"/></svg>;
  if(type==="onePiece")return <svg aria-hidden="true" viewBox="0 0 100 72" width="76" height="54"><path d="M34 9h32l4 14 8 40H22l8-40Z" {...common}/><path d="M39 9q11 10 22 0M50 24v39" fill="none" stroke="#493c38" strokeWidth="2"/></svg>;
  return <svg aria-hidden="true" viewBox="0 0 100 72" width="76" height="54"><path d="M31 10h38l9 14 13 10-9 12-12-9v26H30V37l-12 9-9-12 13-10Z" {...common}/>{type==="frontOpen"&&<path d="M50 22v41M43 22v41M57 22v41" stroke="#493c38" strokeWidth="2" strokeDasharray="3 3"/>}<path d="M38 10q12 8 24 0" fill="none" stroke="#493c38" strokeWidth="2"/></svg>;
}
export function GarmentChooser({selected,onChange}:{selected:GarmentType;onChange:(type:GarmentType)=>void}){return <fieldset className="card garment-chooser"><legend>どんな服を見たい？</legend><p className="small">形を選ぶと、入力する寸法が切り替わります。</p><div className="grid">{(Object.keys(garmentRegistry) as GarmentType[]).map(type=><button type="button" className={`garment-choice ${selected===type?"":"secondary"}`} aria-pressed={selected===type} key={type} onClick={()=>onChange(type)}><GarmentShape type={type}/><span>{garmentRegistry[type].label}</span><small>{descriptions[type]}</small></button>)}</div></fieldset>}
