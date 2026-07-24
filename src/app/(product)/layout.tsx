"use client";
import Link from "next/link";
import Image from "next/image";
import {useEffect,useRef,useState} from "react";
import {usePathname} from "next/navigation";
import {ManualAd} from "@/components/ads/ManualAd";
import {adsConfig} from "@/config/ads";

export default function ProductLayout({children}:{children:React.ReactNode}){
  const [open,setOpen]=useState(false);const pathname=usePathname();const trigger=useRef<HTMLButtonElement>(null);const drawer=useRef<HTMLElement>(null);
  useEffect(()=>{if(!open)return;const returnFocus=trigger.current;const previous=document.body.style.overflow;document.body.style.overflow="hidden";drawer.current?.focus();const onKey=(event:KeyboardEvent)=>{if(event.key==="Escape"){setOpen(false);return}if(event.key!=="Tab"||!drawer.current)return;const focusable=drawer.current.querySelectorAll<HTMLElement>("a,button");const first=focusable[0],last=focusable[focusable.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}};document.addEventListener("keydown",onKey);return()=>{document.body.style.overflow=previous;document.removeEventListener("keydown",onKey);returnFocus?.focus()}},[open]);
  const adSlot=pathname==="/"?adsConfig.slots.product:pathname==="/pouch"?adsConfig.slots.pouch:"";
  const tabs=[["/nui","カルテ"],["/","服"],["/pouch","ポーチ"]] as const;const activeIndex=pathname==="/nui"?0:pathname==="/pouch"?2:1;
  return <div className="shell"><header className="top"><button ref={trigger} aria-label="メニュー" aria-expanded={open} aria-controls="product-menu" className="secondary menu-button" onClick={()=>setOpen(true)}>☰<span className="sr-only">メニュー</span></button><span className="brand">ぬいぴた</span><Link href="/nui" className="header-profile" aria-label="カルテを開く"><Image src="/mascot.png" alt="" width={30} height={30}/><span>カルテ</span></Link></header>{open&&<div className="drawer" onClick={()=>setOpen(false)}><aside id="product-menu" ref={drawer} tabIndex={-1} onClick={event=>event.stopPropagation()} role="dialog" aria-modal="true" aria-label="メニュー"><button className="secondary" onClick={()=>setOpen(false)}>閉じる</button>{[["/install","インストール"],["/guide","使い方"],["/about","このサイトについて"],["/privacy","プライバシー"],["/terms","利用規約"],["/contact","お問い合わせ"]].map(([href,label])=><Link key={href} href={href} onClick={()=>setOpen(false)}>{label}</Link>)}</aside></div>}<main className="main">{children}<ManualAd slot={adSlot}/></main><nav className="nav" aria-label="機能"><span className="nav-indicator" style={{transform:`translateX(${activeIndex*100}%)`}} aria-hidden="true"/>{tabs.map(([href,label],index)=><Link key={href} href={href} aria-current={activeIndex===index?"page":undefined}><span>{label}</span><small>{index===0?"登録":"判定"}</small></Link>)}</nav></div>
}
