import type {Measurements,Softness} from "@/features/profiles/types";
import {garmentRegistry,type GarmentField, type GarmentType} from "./garment-registry";

export type Status="blocked"|"tight"|"fit"|"roomy"|"unknown";
export type PartStatus=Status|"short"|"long";
export type Stretch="none"|"low"|"medium"|"high";
export type FitReasonCode="HEAD_OPENING_TOO_SMALL"|"HEAD_OPENING_TIGHT"|"HEAD_ROOMY"|"BODY_TIGHT"|"BODY_ROOMY"|"LENGTH_SHORT"|"LENGTH_LONG"|"MISSING_HEAD"|"MISSING_BODY"|"MISSING_LENGTH"|"MISSING_COMPARISON";
export const stretchFactors:Record<Stretch,number>={none:1,low:1.03,medium:1.07,high:1.12};
export const softnessHeadFactors:Record<Softness,number>={firm:1,balanced:.96,soft:.91};
export const softnessBodyFactors:Record<Softness,number>={firm:1,balanced:.98,soft:.95};

export function classify(r:number,kind:"head"|"body"|"hat"):Status{const [a,b,c]=kind==="head"?[.94,1.02,1.15]:kind==="hat"?[.96,1.02,1.12]:[.97,1.03,1.2];return r<a?"blocked":r<b?"tight":r<=c?"fit":"roomy";}
export function fitRatio(garment:number,plush:number,mode:"circumference"|"flat",factor:number){return garment*(mode==="flat"?2:1)*factor/plush;}
export function fitScore(ratios:number[],status:Status){if(!ratios.length)return 0;const raw=ratios.reduce((sum,ratio)=>sum+Math.max(0,100-Math.abs(ratio-1.08)*180),0)/ratios.length;const rounded=Math.round(raw/5)*5;return Math.min(status==="blocked"?35:status==="tight"?60:100,Math.max(0,rounded));}

type LegacyFit={opening?:number;chest?:number;length?:number;plushHead?:number;plushBody?:number;plushLength?:number;stretch:Stretch;softness:Softness};
export type GarmentFitInput={garmentType:GarmentType;garment:Partial<Record<GarmentField,number>>;modes?:Partial<Record<GarmentField,"circumference"|"flat">>;plush:Measurements;stretch:Stretch;softness:Softness};
export type FitInput=LegacyFit|GarmentFitInput;
export type FitPart={name:string;field?:GarmentField;status:PartStatus;ratio:number;reasonCode:FitReasonCode;critical?:boolean};

const plushField:Record<GarmentField,keyof Measurements|undefined>={openingCircumference:"headCircumference",neckCircumference:"neckCircumference",chestCircumference:"bodyCircumference",waistCircumference:"bodyCircumference",hipCircumference:"hipCircumference",bodyLength:"torsoLength",sleeveLength:"armLength",legLength:"legLength",headwearCircumference:"headCircumference",crownHeight:"headHeight"};
function fieldName(field:GarmentField){return {openingCircumference:"開口",neckCircumference:"首",chestCircumference:"胴",waistCircumference:"腰",hipCircumference:"腰まわり",bodyLength:"丈",sleeveLength:"腕",legLength:"脚",headwearCircumference:"頭まわり",crownHeight:"高さ"}[field];}
function reason(field:GarmentField,status:PartStatus):FitReasonCode{if(status==="short")return "LENGTH_SHORT";if(status==="long")return "LENGTH_LONG";if(status==="blocked"||status==="tight")return field.includes("head")||field==="openingCircumference"?"HEAD_OPENING_TOO_SMALL":"BODY_TIGHT";if(status==="roomy")return field.includes("head")||field==="openingCircumference"?"HEAD_ROOMY":"BODY_ROOMY";return field.includes("head")?"MISSING_HEAD":field.includes("Length")||field.includes("length")?"MISSING_LENGTH":"MISSING_BODY";}
function isLength(field:GarmentField){return ["bodyLength","sleeveLength","legLength","crownHeight"].includes(field);}
function kind(field:GarmentField,garmentType:GarmentType){return field==="headwearCircumference"?"hat":field==="openingCircumference"||garmentType==="headwear"?"head":"body" as const;}

export function judgeFit(input:FitInput){
  if(!("garmentType" in input)){
    const parts:FitPart[]=[];if(input.opening&&input.plushHead){const ratio=fitRatio(input.opening,input.plushHead,"circumference",stretchFactors[input.stretch]);parts.push({name:"頭",status:classify(ratio,"head"),ratio,reasonCode:reason("openingCircumference",classify(ratio,"head"))})}if(input.chest&&input.plushBody){const ratio=fitRatio(input.chest,input.plushBody,"circumference",stretchFactors[input.stretch]);parts.push({name:"胴",status:classify(ratio,"body"),ratio,reasonCode:reason("chestCircumference",classify(ratio,"body"))})}if(input.length&&input.plushLength){const ratio=input.length/input.plushLength;const status:PartStatus=ratio<.82?"short":ratio>1.15?"long":"fit";parts.push({name:"丈",status,ratio,reasonCode:reason("bodyLength",status)})}return summarize(parts,2);}
  const {garmentType,garment,plush}=input;const {fields,critical}=garmentRegistry[garmentType];const parts:FitPart[]=[];for(const field of fields){const garmentValue=garment[field];const plushKey=plushField[field];const plushValue=plushKey?plush[plushKey]:undefined;if(garmentValue===undefined||plushValue===undefined){parts.push({name:fieldName(field),field,status:"unknown",ratio:0,reasonCode:reason(field,"unknown"),critical:critical.includes(field)});continue}const mode=input.modes?.[field]??"circumference";const ratio=isLength(field)?garmentValue/plushValue:fitRatio(garmentValue,plushValue,mode,stretchFactors[input.stretch]*(field.includes("head")||field==="openingCircumference"?softnessHeadFactors[input.softness]:softnessBodyFactors[input.softness]));const status:PartStatus=isLength(field)?ratio<.82?"short":ratio>1.15?"long":"fit":classify(ratio,kind(field,garmentType));parts.push({name:fieldName(field),field,status,ratio,reasonCode:reason(field,status),critical:critical.includes(field)});}return summarize(parts,fields.length);
}
function summarize(parts:FitPart[],expected:number){const known=parts.filter(part=>part.status!=="unknown");const hasMissing=parts.some(part=>part.status==="unknown");const overall:Status=parts.some(part=>part.critical&&part.status==="blocked")||(!parts.some(part=>part.critical)&&parts.some(part=>part.status==="blocked"))?"blocked":parts.some(part=>part.critical&&part.status==="tight")||parts.some(part=>part.status==="tight"||part.status==="short"||part.status==="long")?"tight":known.length===0||hasMissing?"unknown":known.every(part=>part.status==="fit")?"fit":known.filter(part=>part.status==="roomy").length>known.length/2?"roomy":"fit";const ratios=known.filter(part=>part.ratio>0).map(part=>part.ratio);return {overall,parts,score:fitScore(ratios,overall),confidence:known.length/expected>=.85?"high":known.length/expected>=.55?"medium":"low"} as const;}
