import {NextResponse} from "next/server";

const allowedTopics=new Set(["使い方","不具合","ご意見・ご提案","その他"]);
export async function POST(request:Request){
  const webhook=process.env.DISCORD_WEBHOOK_URL;
  if(!webhook)return NextResponse.json({error:"送信できません"},{status:503});
  try{
    const body=await request.json() as {topic?:unknown;message?:unknown};
    const topic=allowedTopics.has(String(body.topic))?String(body.topic):"その他";
    const message=String(body.message??"").trim().slice(0,3000);
    if(!message)return NextResponse.json({error:"内容を入力してください"},{status:400});
    const response=await fetch(webhook,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({username:"ぬいぴたお問い合わせ",content:`【${topic}】\n${message}`})});
    if(!response.ok)return NextResponse.json({error:"送信できません"},{status:502});
    return NextResponse.json({ok:true});
  }catch{return NextResponse.json({error:"送信できません"},{status:400});}
}
