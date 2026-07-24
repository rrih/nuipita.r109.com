import Link from "next/link";
import {AppBottomNav} from "@/components/layout/AppBottomNav";
import {AppHeader} from "@/components/layout/AppHeader";
import {decodeShare} from "@/lib/share";

export const dynamic="force-dynamic";
export async function generateMetadata({params}:{params:Promise<{payload:string}>}){const {payload}=await params;return {robots:{index:false,follow:true},title:"共有されたぬいぴたの結果",openGraph:{images:[`/og/share/${payload}`]}}}
type Shared={kind?:string;name?:string;overall?:string;score?:number;count?:number;orientation?:string;garmentType?:string;shape?:string;measurements?:Record<string,number>};
const pouchStatusLabels:Record<string,string>={noFit:"入らないかも",snug:"ぴったりめ",stable:"ちょうどよさそう",moves:"中で動きやすいかも"};
const orientationLabels:Record<string,string>={upright:"立てる",sideways:"横向き",mixed:"向きを変えて入る"};

export default async function Share({params}:{params:Promise<{payload:string}>}){
  const value=decodeShare((await params).payload);const data=value&&typeof value==="object"?value as Shared:null;const title=data?.kind==="profile"?"採寸カルテ":data?.kind==="pouch"?"ポーチの判定":"ぬい服の判定";
  return <div className="shell"><AppHeader/><main className="main">{!data?<div className="hero"><h1>リンクを読み取れませんでした</h1><p className="small">共有された情報を確認できませんでした。</p><Link href="/"><button>ぬいぴたを使う</button></Link></div>:<><div className="hero"><span className="pill">ぬいぴた</span><h1>{data.name?`${data.name}の${title}`:title}</h1><p className="small">寸法から見た目安です。</p></div><div className="card">{data.kind==="profile"&&<><p>形：{data.shape??"記録あり"}</p>{data.measurements&&<div>{Object.entries(data.measurements).map(([key,value])=><p key={key}>{key}：{value}cm</p>)}</div>}</>}{data.kind==="fit"&&<><h2>{data.overall??"あと少し"}</h2>{data.score!==undefined&&<p>ぴた度 {data.score}</p>}</>}{data.kind==="pouch"&&<><h2>{pouchStatusLabels[data.overall??""]??"ポーチの入り方"}</h2><p>{data.count??1}体・{orientationLabels[data.orientation??""]??"向きはおまかせ"}</p></>}{data.kind==="garment"&&<><p>服の種類：{data.garmentType??"サイズ確認"}</p>{Object.entries(data.measurements??{}).map(([key,value])=><p key={key}>{key}：{value}cm</p>)}</>}</div><div className="actions"><Link href="/"><button>自分のぬいで見る</button></Link><Link href="/nui"><button className="secondary">自分のカルテを作る</button></Link><Link href="/pouch"><button className="secondary">このポーチで試す</button></Link></div></>}</main><AppBottomNav/></div>
}
