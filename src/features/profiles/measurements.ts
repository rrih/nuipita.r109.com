import type {Measurements} from "./types";

export type MeasurementKey = keyof Measurements;

export const measurementRegistry: readonly {key:MeasurementKey;label:string;group:"basic"|"clothing"|"pouch";required:boolean}[]=[
  {key:"height",label:"全高",group:"basic",required:true},
  {key:"headCircumference",label:"頭",group:"basic",required:true},
  {key:"bodyCircumference",label:"胴",group:"basic",required:true},
  {key:"torsoLength",label:"胴丈",group:"basic",required:true},
  {key:"neckCircumference",label:"首",group:"clothing",required:false},
  {key:"hipCircumference",label:"腰",group:"clothing",required:false},
  {key:"armLength",label:"腕",group:"clothing",required:false},
  {key:"legLength",label:"脚",group:"clothing",required:false},
  {key:"headHeight",label:"頭高",group:"clothing",required:false},
  {key:"maxWidth",label:"最大幅",group:"pouch",required:false},
  {key:"maxDepth",label:"最大奥行",group:"pouch",required:false},
] as const;

export function normalizeCentimeters(value:string|number){
  const text=String(value).trim().replaceAll("，",",").replaceAll("．",".").replaceAll(",",".").replace(/[０-９]/g,char=>String.fromCharCode(char.charCodeAt(0)-0xff10+48));
  if(!text)return undefined;
  const number=Number(text);
  return Number.isFinite(number)&&number>=0.1&&number<=200?Math.round(number*10)/10:undefined;
}

export function measurementCompletion(measurements:Measurements){
  const required=measurementRegistry.filter(item=>item.required);
  return Math.round(required.filter(item=>measurements[item.key]!==undefined).length/required.length*100);
}
