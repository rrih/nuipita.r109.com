export type PlushShape="humanoid"|"round"|"longEar";
export type Softness="firm"|"balanced"|"soft";
export type Measurements={height?:number;headCircumference?:number;bodyCircumference?:number;torsoLength?:number;neckCircumference?:number;hipCircumference?:number;armLength?:number;legLength?:number;headHeight?:number;maxWidth?:number;maxDepth?:number};
export type Profile={id:string;name:string;shape:PlushShape;softness:Softness;avatarTheme:string;measurements:Measurements;createdAt:string;updatedAt:string;dataVersion:1};
