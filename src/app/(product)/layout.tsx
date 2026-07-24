"use client";
import {usePathname} from "next/navigation";
import {ManualAd} from "@/components/ads/ManualAd";
import {adsConfig} from "@/config/ads";
import {AppHeader} from "@/components/layout/AppHeader";
import {AppBottomNav} from "@/components/layout/AppBottomNav";

export default function ProductLayout({children}:{children:React.ReactNode}){
  const pathname=usePathname();
  const adSlot=pathname==="/"?adsConfig.slots.product:pathname==="/pouch"?adsConfig.slots.pouch:"";
  return <div className="shell"><AppHeader/><main className="main">{children}<ManualAd slot={adSlot}/></main><AppBottomNav/></div>
}
