import type {Metadata} from "next";
import {siteConfig} from "@/config/site";
import {ContactForm} from "@/components/contact/ContactForm";
export const metadata:Metadata={title:"お問い合わせ",description:"ぬいぴたへのご意見や不具合を連絡できます。"};
export default function Contact(){return <article><h1>お問い合わせ</h1><p>使い方の疑問や不具合、ご提案をお聞かせください。内容を入力して送信すると、確認のうえ対応します。</p><ContactForm/><p className="small">フォームが使えない場合：{siteConfig.contactEmail}</p></article>}
