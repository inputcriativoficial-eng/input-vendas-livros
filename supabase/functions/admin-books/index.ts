import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const headers = { "Access-Control-Allow-Origin": Deno.env.get("FRONTEND_URL") ?? "*", "Access-Control-Allow-Headers": "authorization, apikey, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS", "Content-Type": "application/json" };
const out=(status:number,body:unknown)=>new Response(JSON.stringify(body),{status,headers});
const env=(k:string)=>Deno.env.get(k)??"";
Deno.serve(async(req)=>{
 if(req.method==="OPTIONS")return new Response("ok",{headers});
 if(req.method!=="POST")return out(405,{error:"Method not allowed"});
 try{
  const auth=req.headers.get("Authorization")?.replace(/^Bearer\s+/i,"");
  if(!auth)return out(401,{error:"Faça login."});
  const secretMap=JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS")??"{}");
  const publishMap=JSON.parse(Deno.env.get("SUPABASE_PUBLISHABLE_KEYS")??"{}");
  const secret=secretMap.default||env("SUPABASE_SERVICE_ROLE_KEY")||env("SUPABASE_SECRET_KEY");
  const publish=publishMap.default||env("SUPABASE_ANON_KEY");
  if(!secret||!publish||!env("SUPABASE_URL"))return out(500,{error:"Supabase não configurado."});
  const url=env("SUPABASE_URL");
  const userClient=createClient(url,publish,{global:{headers:{Authorization:`Bearer ${auth}`}},auth:{persistSession:false}});
  const {data:userData,error:userError}=await userClient.auth.getUser(auth);
  if(userError||!userData.user)return out(401,{error:"Sessão inválida."});
  const db=createClient(url,secret,{auth:{persistSession:false,autoRefreshToken:false}});
  const {data:profile}=await db.from("profiles").select("role").eq("id",userData.user.id).single();
  if(profile?.role!=="admin")return out(403,{error:"Acesso exclusivo da administração."});
  const input=await req.json();
  if(input.action==="list"){
   const {data,error}=await db.from("books").select("*").order("created_at",{ascending:false});
   if(error)throw error;return out(200,{books:data});
  }
  if(input.action==="save"){
   const b=input.book??{};
   const slug=String(b.slug??"").trim().toLowerCase();
   const title=String(b.title??"").trim();
   const prices=[b.purchase_price,b.rent_7_price,b.rent_15_price,b.rent_30_price].map(Number);
   if(!/^[a-z0-9-]{2,80}$/.test(slug)||!title||title.length>180||prices.some(n=>!Number.isFinite(n)||n<0))return out(400,{error:"Confira título, identificador e preços."});
   const record={slug,title,description:String(b.description??"").slice(0,3000),category:String(b.category??"Ficção").slice(0,80),cover_url:b.cover_url||null,pdf_storage_path:b.pdf_storage_path||null,purchase_price:prices[0],rent_7_price:prices[1],rent_15_price:prices[2],rent_30_price:prices[3],published:Boolean(b.published)};
   const {data,error}=await db.from("books").upsert(record,{onConflict:"slug"}).select().single();
   if(error)throw error;return out(200,{book:data});
  }
  if(input.action==="unpublish"){
   const {error}=await db.from("books").update({published:false}).eq("slug",String(input.slug??""));
   if(error)throw error;return out(200,{ok:true});
  }
  return out(400,{error:"Ação desconhecida."});
 }catch(e){console.error(e);return out(500,{error:"Falha ao executar operação administrativa."});}
});