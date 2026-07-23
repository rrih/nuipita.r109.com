export type PouchStatus="noFit"|"snug"|"stable"|"moves";
export type Orientation="upright"|"sideways"|"auto";
export type PouchItem={height:number;width:number;depth:number};
export type PouchInner={height:number;width:number;depth:number};
export type PouchResult={orientation:"upright"|"sideways"|"mixed";width:number;height:number;depth:number;margins:[number,number,number];remaining:[number,number,number];status:PouchStatus;spacer:number};
const roundHalf=(value:number)=>Math.max(0,Math.round(value*2)/2);
function evaluate(items:PouchItem[],inner:PouchInner,orientations:("upright"|"sideways")[]):PouchResult{
  const width=items.reduce((sum,item,index)=>sum+(orientations[index]==="upright"?item.width:item.height),0)+Math.max(0,items.length-1)*.5;
  const height=Math.max(...items.map((item,index)=>orientations[index]==="upright"?item.height:item.width));const depth=Math.max(...items.map(item=>item.depth));
  const margins:[number,number,number]=[(inner.width-width)/inner.width,(inner.height-height)/inner.height,(inner.depth-depth)/inner.depth];const min=Math.min(...margins);const noFit=width>inner.width||height>inner.height||depth>inner.depth;const status:PouchStatus=noFit?"noFit":min<.03?"snug":margins.some(margin=>margin>.18)?"moves":"stable";
  const target=Math.max(.6,width*.06);const spacer=roundHalf((inner.width-width-target)/2);
  return {orientation:orientations.every(value=>value===orientations[0])?orientations[0]:"mixed",width,height,depth,margins,remaining:[inner.width-width,inner.height-height,inner.depth-depth],status,spacer};
}
export function judgePouch(items:PouchItem[],inner:PouchInner,orientation:Orientation):PouchResult{if(!items.length||items.length>3||Object.values(inner).some(value=>!Number.isFinite(value)||value<=0)||items.some(item=>Object.values(item).some(value=>!Number.isFinite(value)||value<=0)))return {orientation:"upright",width:0,height:0,depth:0,margins:[-1,-1,-1],remaining:[0,0,0],status:"noFit",spacer:0};const candidates: PouchResult[]=orientation==="auto"?Array.from({length:2**items.length},(_,mask)=>evaluate(items,inner,items.map((_,index)=>(mask&(1<<index))?"sideways":"upright"))):[evaluate(items,inner,items.map(()=>orientation))];const fits=candidates.filter(candidate=>candidate.status!=="noFit");return (fits.length?fits:candidates).sort((a,b)=>Math.min(...b.margins)-Math.min(...a.margins))[0];}
