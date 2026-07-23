import {describe,expect,it} from "vitest";
import {posts} from "@/content/blog/posts";

const requiredSlugs=["nui-fuku-size-10cm-15cm","nui-measurement-guide","nui-fuku-head-wont-fit","nui-fuku-flat-measurement","nui-fuku-stretch","nui-pants-overall-size","nui-pouch-inner-size","nui-pouch-falls-over","two-nui-one-pouch","nui-pouch-depth","handmade-nui-fuku-size-card","nui-size-card"];

describe("blog content",()=>{
  it("contains the twelve requested slugs",()=>{
    expect(posts).toHaveLength(12);
    expect(posts.map(post=>post.slug)).toEqual(requiredSlugs);
  });
  it("has substantive article bodies",()=>{
    for(const post of posts){
      const body=post.blocks.map(block=>[block.text,...(block.items??[])].filter(Boolean).join(" ")).join(" ");
      expect(body.length,post.slug).toBeGreaterThan(1500);
    }
  });
});
