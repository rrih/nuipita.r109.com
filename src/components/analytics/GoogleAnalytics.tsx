"use client";

import Script from "next/script";
import {usePathname} from "next/navigation";
import {useEffect} from "react";
import {siteConfig} from "@/config/site";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAnalytics(){
  const pathname=usePathname();
  const measurementId=siteConfig.googleAnalyticsMeasurementId;

  useEffect(()=>{
    if(typeof window.gtag!=="function") return;
    window.gtag("config",measurementId,{page_path:pathname||"/"});
  },[measurementId,pathname]);

  return <>
    <Script async src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive"/>
    <Script id="google-analytics" strategy="afterInteractive">
      {`window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};window.gtag('js',new Date());window.gtag('config','${measurementId}',{send_page_view:false});`}
    </Script>
  </>;
}
