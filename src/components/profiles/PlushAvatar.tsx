import type {PlushShape} from "@/features/profiles/types";

export function PlushAvatar({shape="round",theme="coral",size=56}:{shape?:PlushShape;theme?:string;size?:number}){
  const fill=theme==="mint"?"#9fc8b0":theme==="lemon"?"#e8cf73":"#f2a08d";
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 100 100" role="img"><ellipse cx="50" cy="56" rx={shape==="longEar"?30:shape==="humanoid"?25:34} ry="34" fill={fill}/>{shape==="longEar"&&<><ellipse cx="27" cy="25" rx="10" ry="25" fill={fill}/><ellipse cx="73" cy="25" rx="10" ry="25" fill={fill}/></>}{shape==="humanoid"&&<><path d="M35 78v16M65 78v16" stroke="#493c38" strokeWidth="7" strokeLinecap="round"/></>}<circle cx="39" cy="52" r="3" fill="#493c38"/><circle cx="61" cy="52" r="3" fill="#493c38"/><path d="M44 65q6 5 12 0" fill="none" stroke="#493c38" strokeWidth="3" strokeLinecap="round"/></svg>
}
