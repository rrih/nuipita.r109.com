import type {Metadata} from "next";
import {InstallButton} from "@/components/pwa/InstallButton";
export const metadata:Metadata={title:"ぬいぴたをホーム画面へ追加",description:"ぬいぴたをホーム画面へ追加する方法を案内します。"};
export default function Install(){return <article><h1>ぬいぴたをホーム画面へ追加</h1><p>ブラウザーの共有メニューから「ホーム画面に追加」を選ぶと、いつでもすぐ開けます。</p><div className="card"><InstallButton/></div></article>}
