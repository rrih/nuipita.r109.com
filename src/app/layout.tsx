import type {Metadata,Viewport} from "next";
import {siteConfig} from "@/config/site";
import {ServiceWorkerRegister} from "@/components/pwa/ServiceWorkerRegister";
import "./globals.css";
import "./ad-extra.css";

export const metadata:Metadata={metadataBase:new URL(siteConfig.url),title:{default:"ぬい服サイズチェッカー｜ぬいぴた",template:"%s｜ぬいぴた"},description:"ぬいぐるみとぬい服の寸法から、頭・胴・丈のフィット感を確認。採寸カルテとぬいポーチ内寸シミュレーターも無料で使えます。",manifest:"/manifest.webmanifest",icons:{icon:["/favicon.ico","/favicon.svg"],apple:"/apple-touch-icon.png"},openGraph:{siteName:siteConfig.name,locale:"ja_JP",type:"website",url:siteConfig.url,images:[{url:"/og/site",width:1200,height:630,type:"image/png",alt:"ぬいぴた"}]},twitter:{card:"summary_large_image",images:["/og/site"]},alternates:{canonical:"/"},robots:{index:true,follow:true},formatDetection:{telephone:false},appleWebApp:{capable:true,title:siteConfig.name,statusBarStyle:"default"}};
export const viewport:Viewport={width:"device-width",initialScale:1,maximumScale:1,userScalable:false,viewportFit:"cover",themeColor:siteConfig.themeColor};
export default function RootLayout({children}:{children:React.ReactNode}){const jsonLd={"@context":"https://schema.org","@type":"WebApplication",name:siteConfig.name,url:siteConfig.url,applicationCategory:"LifestyleApplication",operatingSystem:"Any",browserRequirements:"JavaScript対応ブラウザー",offers:{"@type":"Offer",price:0,priceCurrency:"JPY"},featureList:["ぬい服フィットチェッカー","うちのぬい採寸カルテ","ぬいポーチ内寸シミュレーター"]};return <html lang="ja"><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/><ServiceWorkerRegister/>{children}</body></html>}
