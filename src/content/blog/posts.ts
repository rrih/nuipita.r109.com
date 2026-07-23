import type {BlogPost} from "./types";
const date="2026-07-24";
const common=(title:string,description:string,category:string,href:string,topics:string[]):BlogPost=>({slug:title,title,description,datePublished:date,dateModified:date,readMinutes:4,category,cta:{label:href==="/pouch"?"ポーチで試す":href==="/nui"?"採寸カルテを作る":"フィットを確認する",href},blocks:[{type:"paragraph",text:description+" 結論からいうと、全高だけで決めず、実物の寸法を同じ測り方で比べることが近道です。ここでは購入前に確認したいポイントを、順番に整理します。"},{type:"heading",level:2,text:topics[0]},{type:"paragraph",text:"商品ページの数字は、全高、平置き幅、一周寸法などが混ざっています。まず数字がどの方向を表すかを確認し、ぬい側も同じ場所を測ります。生地の厚みや縫い目があるため、数値が近いときは余裕を少し残して考えます。"},{type:"heading",level:2,text:topics[1]},{type:"list",items:["つぶさずに、いちばん大きい場所を測る","一周と平置きを混同しない","形や素材の違いを結果へ残す"]},{type:"heading",level:2,text:topics[2]},{type:"paragraph",text:"寸法から見た判定は、着用や収納を保証するものではありません。頭の通り道、胴の張り、ファスナーや装飾の位置など、数字に出にくい要素もあります。迷うときは商品写真と実物寸法を合わせて確認してください。"},{type:"callout",text:"ぬいぴたの結果は、素材や形によって変わる寸法から見た目安です。"}]});
export const posts:BlogPost[]=[
common("ぬい服の10cm・15cmはどこを測る？サイズ表記の見方","10cmや15cmという表記だけでは、ぬい服の合い方は決まりません。","サイズ選び","/",["全高だけで選ばない","頭・胴・丈を分けて見る","購入前に実寸を比べる"]),
common("ぬいぐるみの採寸方法｜服選びで測りたい10か所","ぬいの採寸は、つぶさずに測ることと、一周・直線を分けることが基本です。","採寸","/nui",["測る順番を決める","一周と直線を分ける","ポーチ用の幅と奥行"]),
common("ぬい服の頭が入らない原因と購入前の確認方法","頭囲と服の開口部が近いと、胴が合っていても着せにくいことがあります。","服","/",["頭囲と開口部","伸縮性の見方","前開きとの違い"]),
common("ぬい服の平置きサイズとは？一周寸法への換算方法","平置き幅は、左右に広げた直線の長さです。一周へ比べるときだけ2倍にします。","採寸","/",["平置き幅の意味","一周へ換算する","丈は2倍にしない"]),
common("伸びるぬい服は何cmまで大丈夫？伸縮性を見るポイント","伸びる生地でも、縫い目や開口部が同じように伸びるとは限りません。","服","/",["生地と縫い目","伸ばし切らない","伸縮性を目安にする"]),
common("ぬい用パンツとオーバーオールのサイズを測る方法","パンツやつなぎは、腰・お尻・脚・入口を分けて見ると選びやすくなります。","服","/",["腰とお尻","脚の長さ","座った姿勢"]),
common("ぬいポーチは内寸で選ぶ｜高さ・幅・奥行の測り方","ポーチは外寸ではなく、ぬいが実際に使える内寸を測ることが大切です。","ポーチ","/pouch",["外寸と内寸","有効寸法","正面と側面"]),
common("ポーチの中でぬいが倒れるときの原因と空き幅の考え方","入るだけでなく、空き幅が大きすぎないかを見ると、倒れやすさを考えやすくなります。","ポーチ","/pouch",["余白が大きい","奥行が余る","空き幅の目安"]),
common("二体のぬいを一つのポーチへ入れるときの内寸計算","二体を横並びにするなら、幅を合計し、ぬいの間隔も加えて考えます。","ポーチ","/pouch",["幅を合計する","高さと奥行","向きを比べる"]),
common("ぬいポーチの奥行が足りないとどうなる？横顔を守る選び方","顔や鼻の出っ張りがあるぬいは、奥行の不足が見落としやすいポイントです。","ポーチ","/pouch",["出っ張りを含める","押し込みすぎない","内側の突起"]),
common("ぬい服作家向け｜伝わりやすいサイズ表の作り方","対象身長だけでなく、実寸・測り方・伸縮性を併記すると購入者が比較しやすくなります。","作り手向け","/",["対象身長だけに頼らない","実寸の書き方","サイズ確認リンク"]),
common("うちのぬいのサイズを一度だけ測って使い回す方法","採寸カルテへ残しておくと、買い物や作家への問い合わせで同じ測定を繰り返さずに済みます。","採寸","/nui",["カルテを作る","買い物で使う","共有時の注意"])
];
export function getPost(slug:string){return posts.find(post=>post.slug===slug)}
const requiredSlugs=["nui-fuku-size-10cm-15cm","nui-measurement-guide","nui-fuku-head-wont-fit","nui-fuku-flat-measurement","nui-fuku-stretch","nui-pants-overall-size","nui-pouch-inner-size","nui-pouch-falls-over","two-nui-one-pouch","nui-pouch-depth","handmade-nui-fuku-size-card","nui-size-card"];posts.forEach((post,index)=>{post.slug=requiredSlugs[index]});
