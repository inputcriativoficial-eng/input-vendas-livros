// Configure apenas a URL e a chave anon/public do Supabase. Nunca coloque service_role ou Mercado Pago Access Token aqui.
const SUPABASE_URL="https://rgsyiusoieduzevbthwx.supabase.co";
const SUPABASE_ANON_KEY="sb_publishable_jB3mLzqbGKpNtii8UtWI5Q_lVk5uQJX"; // chave publishable/anon do projeto
const sb=SUPABASE_URL&&SUPABASE_ANON_KEY?window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY):null;
let books=[];
let cart=[],mode="login",currentSession=null;const money=n=>n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
function escapeHtml(value){return String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));}
async function loadCatalog(){
 const grid=document.querySelector("#bookGrid");
 grid.innerHTML="<p>Carregando livros...</p>";
 if(!sb){grid.innerHTML="<p>Não foi possível conectar ao catálogo. Tente novamente mais tarde.</p>";return;}
 const {data,error}=await sb.from("books").select("id,slug,title,description,category,cover_url,purchase_price,rent_7_price,rent_15_price,rent_30_price,published").eq("published",true).order("title");
 if(error){console.error("Erro ao carregar catálogo:",error);grid.innerHTML="<p>Não foi possível carregar os livros. Verifique a conexão com o catálogo.</p>";return;}
 books=(data||[]).map(b=>({id:b.slug,title:b.title,cat:b.category||"Outros",price:Number(b.purchase_price||0),rent:{7:Number(b.rent_7_price||0),15:Number(b.rent_15_price||0),30:Number(b.rent_30_price||0)},desc:b.description||"Livro digital da Input Criativo.",cover:b.cover_url||"",tone:"#174b61"}));
 const filter=document.querySelector("#categoryFilter"),selected=filter.value;
 const cats=[...new Set(books.map(b=>b.cat))].sort((a,b)=>a.localeCompare(b,"pt-BR"));
 filter.innerHTML='<option value="todos">Todas as categorias</option>'+cats.map(cat=>'<option value="'+escapeHtml(cat)+'">'+escapeHtml(cat)+'</option>').join("");
 if(cats.includes(selected))filter.value=selected;
 render();
}
function render(){
 const q=document.querySelector("#searchInput").value.toLowerCase(),cat=document.querySelector("#categoryFilter").value;
 document.querySelector("#bookGrid").innerHTML=books.filter(b=>(cat==="todos"||b.cat===cat)&&b.title.toLowerCase().includes(q)).map(b=>{
  const coverUrl=b.cover?SUPABASE_URL+"/storage/v1/object/public/covers/"+encodeURIComponent(b.cover):"";
  const cover=coverUrl?'<img src="'+escapeHtml(coverUrl)+'" alt="Capa de '+escapeHtml(b.title)+'" loading="lazy">':'<div class="cover-placeholder"><small>INPUT CRIATIVO</small><strong>'+escapeHtml(b.title.toUpperCase())+'</strong><small>'+escapeHtml(b.cat.toUpperCase())+' · EBOOK</small></div>';
  return '<article class="card"><div class="cover" style="--tone:'+b.tone+'">'+cover+'</div><h3>'+escapeHtml(b.title)+'</h3><p>'+escapeHtml(b.desc)+'</p><div class="price">Compra definitiva · '+money(b.price)+'</div><div class="actions"><button class="btn primary" data-buy="'+escapeHtml(b.id)+'">Comprar</button><button class="btn outline" data-rent="'+escapeHtml(b.id)+'">Alugar</button></div></article>';
 }).join("")||"<p>Nenhum livro encontrado.</p>";
}
function drawCart(){document.querySelector("#cartCount").textContent=cart.length;document.querySelector("#cartItems").innerHTML=cart.map((x,i)=>{let b=books.find(z=>z.id===x.id);return '<div class="row"><div><b>'+b.title+'</b><small>'+(x.days?"Aluguel · "+x.days+" dias":"Compra definitiva")+'</small></div><div>'+money(x.price)+'<br><button class="textlink" data-remove="'+i+'">Remover</button></div></div>'}).join("");document.querySelector("#cartTotal").textContent=money(cart.reduce((s,x)=>s+x.price,0));}
document.querySelector("#bookGrid").addEventListener("click",e=>{let buy=e.target.closest("[data-buy]"),rent=e.target.closest("[data-rent]");if(buy){let b=books.find(x=>x.id===buy.dataset.buy);cart.push({id:b.id,price:b.price,days:0});}if(rent){let b=books.find(x=>x.id===rent.dataset.rent),d=Number(prompt("Prazo do aluguel: 7, 15 ou 30 dias","7"));if([7,15,30].includes(d))cart.push({id:b.id,price:b.rent[d],days:d});}drawCart();if(buy||rent)document.querySelector("#cartBackdrop").classList.remove("hidden");});
document.querySelector("#cartItems").addEventListener("click",e=>{let r=e.target.closest("[data-remove]");if(r){cart.splice(Number(r.dataset.remove),1);drawCart();}});
document.querySelector("#searchInput").addEventListener("input",render);document.querySelector("#categoryFilter").addEventListener("change",render);
function auth(m){mode=m;document.querySelector("#authTitle").textContent=m==="login"?"Acesse sua conta":"Crie sua conta";document.querySelector("#authHint").textContent=m==="login"?"Entre para acessar sua biblioteca.":"Cadastre-se para acompanhar suas compras e leituras.";document.querySelector("#authSubmit").textContent=m==="login"?"Entrar":"Criar conta";document.querySelector("#authSwitch").textContent=m==="login"?"Criar uma conta":"Já tenho uma conta";document.querySelector("#authMessage").textContent=sb?"":"Configure o Supabase no app.js para habilitar contas.";document.querySelector("#authBackdrop").classList.remove("hidden");}
document.querySelector("#accountBtn").onclick=()=>auth("login");document.querySelector("#authSwitch").onclick=()=>auth(mode==="login"?"signup":"login");document.querySelector("#closeAuth").onclick=()=>document.querySelector("#authBackdrop").classList.add("hidden");document.querySelector("#cartBtn").onclick=()=>document.querySelector("#cartBackdrop").classList.remove("hidden");document.querySelector("#closeCart").onclick=()=>document.querySelector("#cartBackdrop").classList.add("hidden");
document.querySelector("#authSubmit").onclick=async()=>{let email=document.querySelector("#authEmail").value.trim(),password=document.querySelector("#authPassword").value,msg=document.querySelector("#authMessage");if(!sb){msg.textContent="Autenticação indisponível até configurar Supabase.";return;}if(!email||password.length<8){msg.textContent="Informe e-mail e senha com pelo menos 8 caracteres.";return;}let r=mode==="signup"?await sb.auth.signUp({email,password}):await sb.auth.signInWithPassword({email,password});msg.textContent=r.error?r.error.message:(mode==="signup"?"Cadastro iniciado. Verifique seu e-mail.":"Login realizado.");};
document.querySelector("#checkout").onclick=async()=>{
 if(!sb){alert("Configure o Supabase antes de ativar o checkout.");return;}
 if(!cart.length){alert("Seu carrinho está vazio.");return;}
 const {data:{session}}=await sb.auth.getSession();
 if(!session){document.querySelector("#cartBackdrop").classList.add("hidden");auth("login");document.querySelector("#authMessage").textContent="Entre na sua conta para continuar a compra.";return;}
 const button=document.querySelector("#checkout");button.disabled=true;button.textContent="Conectando ao pagamento...";
 try{
  const payload={items:cart.map(x=>({slug:x.id,access_type:x.days?"rental":"purchase",rental_days:x.days||null}))};
  const {data,error}=await sb.functions.invoke("create-checkout",{body:payload});
  if(error)throw error;
  if(!data?.checkout_url)throw new Error(data?.error||"O checkout não retornou um endereço de pagamento.");
  window.location.assign(data.checkout_url);
 }catch(error){alert(error.message||"Não foi possível iniciar o pagamento.");button.disabled=false;button.textContent="Continuar para pagamento";}
};
document.querySelector("#year").textContent=new Date().getFullYear();loadCatalog();drawCart();if(sb)sb.auth.onAuthStateChange((_e,s)=>{currentSession=s;document.querySelector("#accountBtn").textContent=s?.user?.email?.split("@")[0]||"Entrar";});