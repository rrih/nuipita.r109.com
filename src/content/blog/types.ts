export type BlogBlock={type:"paragraph"|"heading"|"list"|"steps"|"callout";text?:string;items?:string[];level?:2|3};
export type BlogPost={slug:string;title:string;description:string;datePublished:string;dateModified:string;readMinutes:number;category:string;cta:{label:string;href:string};blocks:BlogBlock[]};
