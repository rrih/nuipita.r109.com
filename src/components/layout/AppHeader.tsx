"use client";
import Link from "next/link";
import {useCallback,useEffect,useRef,useState} from "react";

const menuItems=[
  ["/nui","うちのぬいを登録"],
  ["/","ぬい服のサイズを見る"],
  ["/pouch","ポーチに入るか見る"],
  ["/guide","使い方"],
  ["/blog","ぬいぴたノート"],
  ["/about","ぬいぴたについて"],
  ["/privacy","プライバシー"],
  ["/terms","利用規約"],
  ["/contact","お問い合わせ"],
] as const;

export function AppHeader(){
  const [open,setOpen]=useState(false);const [closing,setClosing]=useState(false);
  const trigger=useRef<HTMLButtonElement>(null);
  const drawer=useRef<HTMLElement>(null);
  const closingRef=useRef(false);
  function openDrawer(){closingRef.current=false;setClosing(false);setOpen(true)}
  const closeDrawer=useCallback(()=>{if(!open||closingRef.current)return;closingRef.current=true;setClosing(true);window.setTimeout(()=>{setOpen(false);setClosing(false);closingRef.current=false},220)},[open]);
  useEffect(()=>{
    if(!open)return;
    const returnFocus=trigger.current;
    const previous=document.body.style.overflow;
    document.body.style.overflow="hidden";
    drawer.current?.focus();
    const onKey=(event:KeyboardEvent)=>{
      if(event.key==="Escape"){closeDrawer();return}
      if(event.key!=="Tab"||!drawer.current)return;
      const focusable=drawer.current.querySelectorAll<HTMLElement>("a,button");
      const first=focusable[0],last=focusable[focusable.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
    };
    document.addEventListener("keydown",onKey);
    return()=>{document.body.style.overflow=previous;document.removeEventListener("keydown",onKey);returnFocus?.focus()};
  },[open,closeDrawer]);
  return <>
    <header className="top">
      <button ref={trigger} aria-label="メニューを開く" aria-expanded={open&&!closing} aria-controls="app-menu" className="menu-button secondary" onClick={openDrawer}>
        <span className="hamburger" aria-hidden="true"><i/><i/><i/></span><span className="sr-only">メニュー</span>
      </button>
      <Link href="/" className="brand" aria-label="ぬいぴた ホーム"><span className="brand-mark">ぬいぴた</span><small>ぬい活の相棒</small></Link>
      <span className="header-spacer" aria-hidden="true"/>
    </header>
    {open&&<div className={`drawer${closing?" closing":""}`} onClick={closeDrawer}><aside id="app-menu" ref={drawer} tabIndex={-1} onClick={event=>event.stopPropagation()} role="dialog" aria-modal="true" aria-label="メニュー">
      <div className="drawer-heading"><strong>ぬいぴた</strong><button className="secondary" onClick={closeDrawer}>閉じる</button></div>
      {menuItems.map(([href,label])=><Link key={href} href={href} onClick={closeDrawer}>{label}</Link>)}
      <div className="drawer-social" aria-label="公式SNS"><p>公式SNS</p><a href="https://x.com/nuipita" target="_blank" rel="noreferrer" onClick={closeDrawer}>公式X</a><a href="https://note.com/nuipita" target="_blank" rel="noreferrer" onClick={closeDrawer}>公式note</a></div>
    </aside></div>}
  </>;
}
