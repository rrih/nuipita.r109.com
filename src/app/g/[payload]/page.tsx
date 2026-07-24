import Link from "next/link";
import {AppBottomNav} from "@/components/layout/AppBottomNav";
import {AppHeader} from "@/components/layout/AppHeader";
import {garmentFieldLabels,garmentRegistry,type GarmentType} from "@/features/fit/garment-registry";
import {decodeShare} from "@/lib/share";

type GarmentLinkData={kind?:string;name?:string;garmentType?:string;measurements?:Record<string,number>};

export async function generateMetadata({params}:{params:Promise<{payload:string}>}){
  const payload=(await params).payload;
  return {title:"服のサイズを確認",robots:{index:false,follow:true},openGraph:{images:[`/og/garment/${payload}`]},twitter:{card:"summary_large_image",images:[`/og/garment/${payload}`]}};
}

function isGarmentType(value:string|undefined):value is GarmentType{return !!value&&value in garmentRegistry;}

export default async function GarmentLink({params}:{params:Promise<{payload:string}>}){
  const source=(await params).payload;
  const decoded=decodeShare(source);
  const data=decoded&&typeof decoded==="object"?decoded as GarmentLinkData:null;
  const garmentType=isGarmentType(data?.garmentType)?data.garmentType:null;
  const garmentLabel=garmentType?garmentRegistry[garmentType].label:"ぬい服";
  const measurements=Object.entries(data?.measurements??{}).filter(([,value])=>typeof value==="number"&&Number.isFinite(value));

  return <div className="shell"><AppHeader/><main className="main">
    {!data||data.kind!=="garment"||!garmentType?<section className="hero"><h1>リンクを読み取れませんでした</h1><p className="small">共有された服の情報を確認できませんでした。</p><Link href="/"><button>ぬいぴたを使う</button></Link></section>:<>
      <section className="hero"><span className="pill">服のサイズ確認</span><h1>{data.name||"ぬい服のサイズ"}</h1><p className="small">この服の寸法を入力して、あなたのぬいに合いそうか確認できます。</p></section>
      <section className="card stitch"><div className="result-visual"><div className="result-chip"><small>服の種類</small><strong>{garmentLabel}</strong></div><div className="result-chip"><small>入力済み</small><strong>{measurements.length}項目</strong></div></div>
        <div className="garment-link-visual" aria-hidden="true"><svg role="img" viewBox="0 0 120 90" width="120" height="90"><path d="M30 10h60l20 25-14 10-10-12v45H34V33L24 45 10 35Z" fill="#f8e1d9" stroke="#a95043" strokeWidth="3"/><path d="M44 20h32" stroke="#a95043" strokeWidth="3" strokeLinecap="round"/></svg></div>
        <h2>このリンクでできること</h2><ol><li>商品ページやタグを見ながら、服の寸法を入力</li><li>あなたのぬいを選んで、各部位を比べる</li><li>ぴた度の目安を見て、気になる部分を確認</li></ol>
        {measurements.length>0?<div><h2>入力されている服の寸法</h2><div className="grid">{measurements.map(([key,value])=><div className="metric" key={key}><b>{garmentFieldLabels[key as keyof typeof garmentFieldLabels]??"寸法"}</b><small>{value}cm</small></div>)}</div></div>:<div className="onboarding"><strong>服の寸法はまだ入力されていません</strong><p className="small">次の画面で、販売ページやタグに書かれた寸法を入力できます。</p></div>}
      </section>
      <div className="actions"><Link href={`/?garment=${source}`}><button>{measurements.length>0?"あなたのぬいと比べる":"服の寸法を入力する"}</button></Link><Link href="/nui"><button className="secondary">先にぬいを登録する</button></Link></div>
      <p className="small">表示結果は、入力した寸法から見た目安です。生地の伸び方や形によって実際の着せ心地は変わります。</p>
    </>}
  </main><AppBottomNav/></div>;
}
