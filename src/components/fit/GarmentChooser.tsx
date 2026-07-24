"use client";
import Image from "next/image";
import {garmentRegistry,type GarmentType} from "@/features/fit/garment-registry";

const descriptions:Record<GarmentType,string>={pullover:"頭からかぶせる服",frontOpen:"前を開いて着せる服",bottoms:"パンツ・スカート",onePiece:"上下一体の服",headwear:"帽子やフード"};
const images:Record<GarmentType,string>={pullover:"/garments-jpg/pullover.jpg",frontOpen:"/garments-jpg/front-open.jpg",bottoms:"/garments-jpg/bottoms.jpg",onePiece:"/garments-jpg/one-piece.jpg",headwear:"/garments-jpg/hat.jpg"};

export function GarmentChooser({selected,onChange}:{selected:GarmentType;onChange:(type:GarmentType)=>void}){
  return <fieldset className="card garment-chooser"><legend>どんな服を見たい？</legend><p className="small">服のイメージを選ぶと、入力する寸法が切り替わります。</p><div className="grid">{(Object.keys(garmentRegistry) as GarmentType[]).map(type=><button type="button" className={`garment-choice ${selected===type?"":"secondary"}`} aria-pressed={selected===type} key={type} onClick={()=>onChange(type)}><Image src={images[type]} alt={`${garmentRegistry[type].label}のイメージ`} width={96} height={96} priority={selected===type}/><span>{garmentRegistry[type].label}</span><small>{descriptions[type]}</small></button>)}</div></fieldset>;
}
