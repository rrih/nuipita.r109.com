"use client";
import Image from "next/image";
import {useEffect,useRef,useState} from "react";
import {clearAllData,deleteProfile,exportBackup,importBackup,listProfiles,makeProfile,putProfile,storageUnavailable} from "@/lib/storage";
import {encodeShare} from "@/lib/share";
import {measurementCompletion,measurementRegistry,normalizeCentimeters,type MeasurementKey} from "@/features/profiles/measurements";
import {PlushAvatar} from "@/components/profiles/PlushAvatar";
import {ShareActions} from "@/components/share/ShareActions";
import {Toast} from "@/components/ui/Toast";
import {LoadingSkeleton} from "@/components/ui/LoadingSkeleton";
import type {Profile,PlushShape,Softness} from "@/features/profiles/types";

const shapeOptions:[PlushShape,string,string,string][]=[
  ["round","まるい","丸い・球体に近い","/shapes-jpg/round.jpg"],
  ["humanoid","人型","手足がはっきりある","/shapes-jpg/humanoid.jpg"],
  ["longEar","耳なが","耳や角が長い","/shapes-jpg/long-ear.jpg"],
];

export default function Nui(){
  const [name,setName]=useState("");const [shape,setShape]=useState<PlushShape>("round");const [softness,setSoftness]=useState<Softness>("balanced");const [theme,setTheme]=useState("#e98f80");
  const [measurements,setMeasurements]=useState<Record<string,string>>({});const [saved,setSaved]=useState<Profile[]>([]);const [notice,setNotice]=useState("");const [loading,setLoading]=useState(true);const [showHelp,setShowHelp]=useState(false);const [removeTarget,setRemoveTarget]=useState<Profile|null>(null);const [shareTarget,setShareTarget]=useState<Profile|null>(null);const [shareName,setShareName]=useState(true);const [shareMeasurements,setShareMeasurements]=useState(false);const [clearOpen,setClearOpen]=useState(false);const fileRef=useRef<HTMLInputElement>(null);
  useEffect(()=>{let active=true;const timer=window.setTimeout(()=>{if(storageUnavailable()&&active)setNotice("この端末では保存できません。今だけ使えます")},0);listProfiles().then(value=>{if(active){setSaved(value);setLoading(false)}}).catch(()=>{if(active){setLoading(false);setNotice("この端末では保存できません。今だけ使えます")}});return()=>{active=false;window.clearTimeout(timer)}},[]);
  function updateMeasurement(key:MeasurementKey,value:string){setMeasurements(current=>({...current,[key]:value}))}
  async function save(){const profile=makeProfile(name);profile.shape=shape;profile.softness=softness;profile.avatarTheme=theme;profile.measurements=Object.fromEntries(measurementRegistry.map(item=>[item.key,normalizeCentimeters(measurements[item.key]??"")]).filter(([,value])=>value!==undefined)) as Profile["measurements"];try{await putProfile(profile);setSaved(value=>[...value,profile]);setName("");setMeasurements({});setNotice("ぬいを登録しました")}catch{setNotice("名前と寸法を確認してください")}}
  async function remove(){if(!removeTarget)return;await deleteProfile(removeTarget.id);setSaved(value=>value.filter(item=>item.id!==removeTarget.id));setRemoveTarget(null);setNotice("ぬいの登録を削除しました")}
  async function duplicate(profile:Profile){const copy={...profile,id:crypto.randomUUID(),name:`${profile.name}のコピー`,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};try{await putProfile(copy);setSaved(value=>[...value,copy]);setNotice("ぬいの登録を複製しました")}catch{setNotice("これ以上は登録できません")}}
  async function download(){const blob=new Blob([JSON.stringify(await exportBackup(),null,2)],{type:"application/json"});const link=document.createElement("a");link.href=URL.createObjectURL(blob);link.download=`nuipita-backup-${new Date().toISOString().slice(0,10)}.json`;link.click();URL.revokeObjectURL(link.href);setNotice("バックアップを書き出しました")}
  async function restore(event:React.ChangeEvent<HTMLInputElement>){const file=event.target.files?.[0];if(!file)return;try{await importBackup(JSON.parse(await file.text()));setSaved(await listProfiles());setNotice("バックアップを読み込みました")}catch{setNotice("読み込めるデータではありません")};event.target.value=""}
  async function clearData(){await clearAllData();setSaved([]);setClearOpen(false);setNotice("端末内のデータを消去しました")}
  const shared=shareTarget?encodeShare({kind:"profile",name:shareName?shareTarget.name:undefined,shape:shareTarget.shape,softness:shareTarget.softness,avatarTheme:shareTarget.avatarTheme,measurements:shareMeasurements?shareTarget.measurements:undefined}):"";
  const selectedShapeImage=shapeOptions.find(([value])=>value===shape)?.[3]??shapeOptions[0][3];
  return <>
    <h1 className="sr-only">あなたのぬいを登録</h1>
    <section className="hero"><Image src={selectedShapeImage} alt={`${shapeOptions.find(([value])=>value===shape)?.[1]}のぬいイメージ`} width={112} height={112}/><h2>あなたのぬいを登録</h2><p className="small">最初に1体登録すると、服やポーチの判定で毎回選べます。</p></section>
    {saved.length===0&&<div className="card onboarding"><strong>まずはあなたのぬいを登録しましょう</strong><p className="small">呼び名と形を選び、「全高・頭・胴・胴丈」を入れるだけで始められます。あとから追加入力もできます。</p></div>}
    <div className="card stitch"><label className="field">呼び名<input value={name} onChange={e=>setName(e.target.value)} maxLength={40} placeholder="ぬいの名前"/><span className="field-note">例：もち、ぬいちゃん。あとで一覧から見つけやすい名前にします。</span></label>
      <fieldset><legend>形を選ぶ</legend><div className="shape-choice">{shapeOptions.map(([value,label,description,image])=><button type="button" key={value} className={shape===value?"shape-option":"shape-option secondary"} aria-pressed={shape===value} onClick={()=>setShape(value)}><Image src={image} alt={`${label}のぬいイメージ`} width={92} height={92}/><strong>{label}</strong><small>{description}</small></button>)}</div></fieldset>
      <label className="field">さわり心地<select value={softness} onChange={e=>setSoftness(e.target.value as Softness)}><option value="firm">しっかりめ</option><option value="balanced">ふつう</option><option value="soft">やわらかめ</option></select></label>
      <fieldset><legend>色</legend><div className="color-picker"><input type="color" aria-label="ぬいの色" value={theme} onChange={e=>setTheme(e.target.value)}/><span className="color-value">好きな色を選べます</span></div></fieldset>
      <div className="measurement-heading"><h2>採寸</h2><button type="button" className="info-button" aria-label="採寸の説明を表示" aria-expanded={showHelp} onClick={()=>setShowHelp(value=>!value)}>?</button>{showHelp&&<div className="tooltip" role="tooltip">単位はcm。数字はあとから直せます。<br/><span className="required">必須</span>まずはこの4項目だけで登録できます。残りは分かる範囲で大丈夫です。</div>}</div><div className="grid">{measurementRegistry.map(item=><label className="field" key={item.key}><span>{item.label}{item.required&&<span className="required">必須</span>}</span><input inputMode="decimal" value={measurements[item.key]??""} onChange={e=>updateMeasurement(item.key,e.target.value)} placeholder="cm"/></label>)}</div><button onClick={save}>保存する</button>
    </div>
    <div className="card"><h2>端末内データ</h2><div className="actions device-actions"><button className="secondary" onClick={download}>書き出す</button><button className="secondary" onClick={()=>fileRef.current?.click()}>読み込む</button><button className="secondary" onClick={()=>setClearOpen(true)}>すべて消去</button><input ref={fileRef} type="file" accept="application/json" onChange={restore} hidden/></div></div>
    {loading&&<LoadingSkeleton label="登録したぬいを読み込み中"/>}<Toast key={notice} message={notice}/>
    <section aria-label="保存したプロフィール">{saved.map(profile=>{const option=shapeOptions.find(([value])=>value===profile.shape)??shapeOptions[0];return <div className="card" key={profile.id}><div className="actions" style={{alignItems:"center"}}><Image src={option[3]} alt={`${profile.name}の${option[1]}のぬいイメージ`} width={56} height={56}/><div><strong>{profile.name}</strong><div className="small">採寸充足度 {measurementCompletion(profile.measurements)}%・更新 {profile.updatedAt.slice(0,10)}</div></div></div><div className="actions"><button className="secondary" onClick={()=>setShareTarget(profile)}>共有</button><button className="secondary" onClick={()=>duplicate(profile)}>複製</button><button className="secondary" onClick={()=>setRemoveTarget(profile)}>削除</button></div></div>})}</section>
    {removeTarget&&<div className="drawer" role="presentation"><aside role="dialog" aria-modal="true" aria-label="削除の確認"><h2>このぬいの登録を削除しますか？</h2><p className="small">削除したデータはこの端末から戻せません。</p><div className="actions"><button onClick={remove}>削除する</button><button className="secondary" onClick={()=>setRemoveTarget(null)}>やめる</button></div></aside></div>}
    {clearOpen&&<div className="drawer" role="presentation"><aside role="dialog" aria-modal="true" aria-label="データ消去の確認"><h2>端末内のデータを消去しますか？</h2><p className="small">プロフィール、判定、下書きをすべて消去します。</p><div className="actions"><button onClick={clearData}>消去する</button><button className="secondary" onClick={()=>setClearOpen(false)}>やめる</button></div></aside></div>}
    {shareTarget&&<div className="drawer" role="presentation"><aside className="card" role="dialog" aria-modal="true" aria-label="ぬいの登録を共有"><h2>ぬいの登録を共有</h2><p className="small">共有リンクを知っている人が見られます。</p><label><input type="checkbox" checked={shareName} onChange={e=>setShareName(e.target.checked)}/> 名前を載せる</label><label><input type="checkbox" checked={shareMeasurements} onChange={e=>setShareMeasurements(e.target.checked)}/> 寸法を載せる</label><div className="actions"><ShareActions title="ぬいの登録" status="寸法から見た目安" url={`${location.origin}/s/${shared}`}/><button className="secondary" onClick={()=>navigator.clipboard?.writeText(`${location.origin}/s/${shared}`)}>リンクをコピー</button><button className="secondary" onClick={()=>setShareTarget(null)}>閉じる</button></div></aside></div>}
  </>;
}
