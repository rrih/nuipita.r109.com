import {AppHeader} from "@/components/layout/AppHeader";
import {AppBottomNav} from "@/components/layout/AppBottomNav";
export default function ContentLayout({children}:{children:React.ReactNode}){return <div className="shell"><AppHeader/><main className="main content">{children}</main><AppBottomNav/></div>}
