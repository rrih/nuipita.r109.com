"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";

type NavIconProps={name:"profile"|"clothes"|"pouch"|"link"};
function NavIcon({name}:NavIconProps){
  if(name==="profile")return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c4 0 6.5 2.2 6.5 6.2V16c0 2.8-2.5 5-6.5 5s-6.5-2.2-6.5-5V9.2C5.5 5.2 8 3 12 3Z"/><path d="M8.5 11.2h.1M15.4 11.2h.1M9 15q3 2.2 6 0"/></svg>;
  if(name==="clothes")return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 4.5 12 7l3.5-2.5 4.5 4.2-3 3v8H7v-8l-3-3 4.5-4.2Z"/><path d="M9.2 4.8c.6 2.4 5 2.4 5.6 0"/></svg>;
  if(name==="pouch")return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8.5h16v10H4zM6 8.5 8 5h8l2 3.5M8 12h8"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 16 16 8M10 7h7v7M5 19h14"/></svg>;
}

export function AppBottomNav(){
  const pathname=usePathname();
  const tabs=[
    ["/nui","ぬいを登録","profile"],
    ["/","服","clothes"],
    ["/pouch","ポーチ","pouch"],
  ] as const;
  const linkTab=pathname.startsWith("/g/");const visibleTabs=linkTab?[...tabs,[pathname,"服リンク","link"] as const]:tabs;const activeIndex=linkTab?3:pathname==="/nui"?0:pathname==="/pouch"?2:pathname==="/"?1:-1;const width=100/visibleTabs.length;
  return <nav className="nav" aria-label="主な機能"><span className="nav-indicator" style={{width:`${width}%`,transform:`translateX(${Math.max(activeIndex,0)*100}%)`,opacity:activeIndex<0?0:1}} aria-hidden="true"/>{visibleTabs.map(([href,label,icon],index)=><Link key={href} href={href} aria-current={activeIndex===index?"page":undefined}><span className="nav-icon"><NavIcon name={icon}/></span><span>{label}</span></Link>)}</nav>;
}
