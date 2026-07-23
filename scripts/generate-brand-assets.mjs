import {copyFileSync,existsSync,mkdirSync,readFileSync,writeFileSync} from "node:fs";
import {join} from "node:path";
const root=new URL("..",import.meta.url).pathname;const publicDir=join(root,"public");mkdirSync(publicDir,{recursive:true});
const icon=join(publicDir,"icon-192.png");if(!existsSync(icon))throw new Error("Run the initial icon generation first");
copyFileSync(join(publicDir,"icon.svg"),join(publicDir,"favicon.svg"));copyFileSync(icon,join(publicDir,"pwa-badge.png"));
const png=readFileSync(icon);const directory=Buffer.alloc(16);directory.writeUInt8(0,0);directory.writeUInt8(0,1);directory.writeUInt8(1,2);directory.writeUInt8(0,3);directory.writeUInt16LE(1,4);directory.writeUInt16LE(32,6);directory.writeUInt32LE(png.length,8);directory.writeUInt32LE(22,12);const header=Buffer.alloc(6);header.writeUInt16LE(0,0);header.writeUInt16LE(1,2);header.writeUInt16LE(1,4);writeFileSync(join(publicDir,"favicon.ico"),Buffer.concat([header,directory,png]));
