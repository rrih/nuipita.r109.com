"use client";
import {useEffect,useState} from "react";

export function Toast({message}:{message:string}){
  const [visible,setVisible]=useState(Boolean(message));
  useEffect(()=>{
    if(!message)return;
    const timer=window.setTimeout(()=>setVisible(false),3600);
    return()=>window.clearTimeout(timer);
  },[message]);
  if(!message||!visible)return null;
  return <div className="toast" role="status" aria-live="polite"><span>{message}</span><button type="button" className="toast-close" aria-label="通知を消す" onClick={()=>setVisible(false)}>×</button></div>;
}
