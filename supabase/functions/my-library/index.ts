import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const headers={"Access-Control-Allow-Origin":Deno.env.get("FRONTEND_URL")??"*","Access-Control-Allow-Headers":"authorization, apikey, content-type","Access-Control-Allow-Methods":"POST, OPTIONS","Content-Type":"application/json"};
const out=(s:number,b:unknown)=>new Response(JSON.stringify(b),{status:s,headers});
Deno.serve(async(req)=>{
 if(req.method==="OPTIONS")return new Response("ok",{headers});
 if(req.method!=="POST")return out(405,{error:"Method not allowed"});
 try{
  const token=req.headers.get("Authorization")?.replace(/^Bearer\s+/i,"");
  if(!token)return out(401,{error:"Faça login para acessar sua biblioteca."});
  const publishMap=JSON.parse(Deno.env.get("SUPABASE_PUBLISHABLE_KEYS")??"{}");
  const secretMap=JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS")??"{}");
  const publish=publishMap.default||Deno.env.get("SUPABASE_ANON_KEY");
  const secret=secretMap.default||Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")||Deno.env.get("SUPABASE_SECRET_KEY");
  const url=Deno.env.get("SUPABASE_URL")??"";
  if(!publish||!secret||!url)return out(500,{error:"Supabase não configurado."});
  const userClient=createClient(url,publish,{global:{headers:{Authorization:`Bearer ${token}`}},auth:{persistSession:false}});
  const {data:userData,error:userError}=await userClient.auth.getUser(token);
  if(userError||!userData.user)return out(401,{error:"Sessão inválida."});
  const db=createClient(url,secret,{auth:{persistSession:false,autoRefreshToken:false}});
  const {data:rows,error}=await db.from("order_items").select("id,access_type,rental_days,access_expires_at,books(title,slug,cover_url,pdf_storage_path),orders!inner(status,user_id)").eq("orders.user_id",userData.user.id).eq("orders.status","paid");
  if(error)throw error;
  const now=Date.now();
  const library=[];
  for(const row of rows??[]){
   const active=row.access_type==="purchase"||!!row.access_expires_at&&new Date(row.access_expires_at).getTime()>now;
   let fileUrl=null;
   if(active&&row.access_type==="purchase"&&row.books?.pdf_storage_path){
    const {data:signed}=await db.storage.from("books").createSignedUrl(row.books.pdf_storage_path,60);
    fileUrl=signed?.signedUrl??null;
   }
   library.push({id:row.id,title:row.books?.title??"Livro",slug:row.books?.slug,access_type:row.access_type,rental_days:row.rental_days,expires_at:row.access_expires_at,active,download_url:fileUrl,reader_status:row.access_type==="rental"?"Leitor protegido será disponibilizado na próxima etapa":null});
  }
  return out(200,{library});
 }catch(e){console.error(e);return out(500,{error:"Não foi possível carregar sua biblioteca."});}
});