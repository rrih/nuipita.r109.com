import Link from "next/link";
import {AppHeader} from "@/components/layout/AppHeader";
import {AppBottomNav} from "@/components/layout/AppBottomNav";
export default function ContentLayout({children}:{children:React.ReactNode}){return <div className="shell"><AppHeader/><main className="main content">{children}</main><footer className="content-footer"><Link href="/">ぬいぴたを使う</Link><Link href="/blog">記事一覧</Link><Link href="/privacy">プライバシー</Link></footer><AppBottomNav/></div>}
