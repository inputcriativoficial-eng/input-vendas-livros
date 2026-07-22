<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Input Criativo | Inovação, eBooks & Design Digital</title>
<meta name="description" content="Compre para imprimir em casa ou alugue por tempo limitado os eBooks de George Batista em PDF, além de soluções digitais.">

<link rel="icon" type="image/png" href="fivecom.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Inter:wght@300;400;600;800&family=Manrope:wght@400;500;600;700&family=Montserrat:wght@700;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<!-- SDK Mercado Pago -->
<script src="https://sdk.mercadopago.com/js/v2"></script>

<style>
  :root{
    --bg:#050a15; 
    --surface:#15171e; 
    --surface-2:#1c1f28;
    --ivory:#edeae2; 
    --muted:#9aa0ac;
    --gold:#c6a15b; 
    --gold-soft:#e3c98a; 
    --teal:#5fd6c4;
    --p-green: #7cfc00;
    --p-cyan: #00f2d3;
    --p-blue: #0099cc;
    --line:rgba(237,234,226,0.09); 
    --line-strong:rgba(237,234,226,0.16);
    --glass: rgba(15, 23, 42, 0.95);
    --glass-border: rgba(255, 255, 255, 0.1);
    --gradient: linear-gradient(135deg, var(--p-green), var(--p-cyan), var(--p-blue));
    --danger:#e2705f;
    --transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }

  *{margin:0;padding:0;box-sizing:border-box;}
  html{scroll-behavior:smooth;}
  body{background:var(--bg); color:var(--ivory); font-family:'Manrope',sans-serif; line-height:1.6; -webkit-font-smoothing:antialiased; overflow-x:hidden;}
  a{color:inherit; text-decoration:none;}
  img{display:block; max-width:100%;}
  button{font-family:inherit; cursor:pointer;}
  .wrap{max-width:1240px; margin:0 auto; padding:0 32px;}
  h1,h2,h3,.display{font-family:'Fraunces',serif; font-weight:500; letter-spacing:-0.01em;}
  ::selection{background:var(--gold); color:#0a0b0f;}
  a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible{outline:2px solid var(--teal); outline-offset:3px; border-radius:2px;}
  @media (prefers-reduced-motion: reduce){*{animation-duration:.01ms !important; transition-duration:.01ms !important; scroll-behavior:auto !important;}}

  /* Preloader */
  #preloader { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #050a15; display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 20000; transition: opacity 0.8s ease; }
  .loader-logo { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 2rem; background: linear-gradient(135deg, #7cfc00, #00f2d3, #0099cc); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 20px; letter-spacing: -1px; animation: pulse 1.5s infinite; }
  .loader-bar { width: 200px; height: 2px; background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; position: relative; }
  .loader-progress { width: 0%; height: 100%; background: linear-gradient(90deg, #7cfc00, #00f2d3); position: absolute; animation: load 2s ease-in-out forwards; }
  @keyframes pulse { 0% { transform: scale(0.98); opacity: 0.7; } 50% { transform: scale(1); opacity: 1; } 100% { transform: scale(0.98); opacity: 0.7; } }
  @keyframes load { 0% { width: 0%; } 100% { width: 100%; } }

  .eyebrow{
    font-family:'Space Mono',monospace; font-size:11.5px; letter-spacing:.18em; text-transform:uppercase;
    color:var(--gold); display:inline-flex; align-items:center; gap:10px;
  }
  .eyebrow::before{content:""; width:22px; height:1px; background:var(--gold); display:inline-block;}

  /* HEADER & NAV */
  header.main-header {
    position: fixed; top: 0; width: 100%; padding: 15px 5%;
    display: flex; justify-content: space-between; align-items: center;
    z-index: 10000; background: var(--glass);
    backdrop-filter: blur(15px); border-bottom: 1px solid var(--glass-border);
  }
  .logo { font-weight: 900; font-size: 1.6rem; font-family: 'Montserrat', sans-serif; background: var(--gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-decoration: none; }
  
  nav { display: flex; align-items: center; gap: 20px; }
  .nav-link { color: #cbd5e1; text-decoration: none; font-size: 0.82rem; font-weight: 600; transition: var(--transition); }
  .nav-link:hover { color: var(--p-cyan); }

  .dropdown { position: relative; padding: 10px 0; }
  .dropdown-content {
      display: none; position: absolute; top: 100%; left: 50%; transform: translateX(-50%);
      background: rgba(10, 15, 28, 0.98); min-width: 260px; 
      border: 1px solid var(--glass-border); border-radius: 12px; padding: 12px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.6);
  }
  .dropdown:hover .dropdown-content { display: block; animation: slideUp 0.3s ease; }
  .dropdown-content a { color: #94a3b8; padding: 10px; text-decoration: none; display: flex; align-items: center; gap: 10px; font-size: 0.78rem; border-radius: 8px; transition: 0.2s; }
  .dropdown-content a:hover { background: rgba(255,255,255,0.05); color: var(--p-green); }

  .head-actions{display:flex; align-items:center; gap:14px;}
  .cart-btn{
    position:relative; width:42px; height:42px; border-radius:50%; border:1px solid var(--line-strong);
    background:var(--surface); display:flex; align-items:center; justify-content:center; transition:.25s;
  }
  .cart-btn:hover{border-color:var(--gold);}
  .cart-btn svg{width:18px; height:18px; stroke:var(--ivory);}
  .cart-count{
    position:absolute; top:-6px; right:-6px; background:var(--gold); color:#0a0b0f;
    font-family:'Space Mono',monospace; font-size:10px; font-weight:700; min-width:18px; height:18px;
    border-radius:50%; display:flex; align-items:center; justify-content:center; padding:0 3px;
  }

  /* HERO */
  .hero {
      min-height: 100vh; display: flex; flex-direction: column; justify-content: center; 
      align-items: center; text-align: center; padding: 120px 5% 60px;
      background: linear-gradient(rgba(5, 10, 21, 0.75), rgba(5, 10, 21, 0.85)), url('inputcriativo2.jpg');
      background-size: cover; background-position: center; background-attachment: fixed;
  }
  .hero h1 { font-size: clamp(2.5rem, 7vw, 4.5rem); font-family: 'Montserrat', sans-serif; font-weight: 900; line-height: 1.1; margin-bottom: 25px; }
  .hero h1 span { background: var(--gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .hero p { color: #e2e8f0; max-width: 800px; font-size: 1.2rem; margin-bottom: 40px; }

  .btn-main { 
      background: var(--gradient); color: #000; padding: 16px 40px; 
      border-radius: 50px; font-weight: 800; text-decoration: none; 
      display: inline-flex; align-items: center; gap: 12px;
      transition: var(--transition); text-transform: uppercase; font-size: 0.85rem;
      box-shadow: 0 10px 20px rgba(0, 242, 211, 0.2); border: none;
  }
  .btn-main:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(0, 242, 211, 0.4); }

  /* COMO FUNCIONA */
  .how{padding:80px 0; border-top:1px solid var(--line); border-bottom:1px solid var(--line); background:var(--surface);}
  .how-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--line); border:1px solid var(--line); margin-top:44px;}
  .how-step{background:var(--surface); padding:34px 30px;}
  .how-step .num{font-family:'Space Mono',monospace; color:var(--teal); font-size:12px;}
  .how-step h3{font-size:19px; margin:16px 0 10px; font-weight:500;}
  .how-step p{font-size:14px; color:var(--muted);}

  /* CATALOGO */
  section.sec-padding{padding:100px 0;}
  .sec-head{max-width:640px; margin-bottom:54px;}
  .sec-head h2{font-size:clamp(28px,3.6vw,40px); margin-top:16px;}
  .sec-head p{color:var(--muted); margin-top:14px; font-size:16px;}

  .filters{display:flex; gap:10px; margin-bottom:40px; flex-wrap:wrap;}
  .filter-btn{
    font-family:'Space Mono',monospace; font-size:12px; letter-spacing:.04em; padding:9px 16px;
    border-radius:100px; border:1px solid var(--line-strong); color:var(--muted); background:transparent; transition:.2s;
  }
  .filter-btn.active, .filter-btn:hover{border-color:var(--gold); color:var(--gold-soft); background:rgba(198,161,91,.06);}

  .catalog{display:grid; grid-template-columns:repeat(4,1fr); gap:26px;}
  .book{
    background:var(--surface); border:1px solid var(--line); border-radius:14px; overflow:hidden;
    display:flex; flex-direction:column; transition:transform .3s ease, border-color .3s ease;
  }
  .book:hover{transform:translateY(-6px); border-color:var(--line-strong);}
  .book .cover-wrap{position:relative; aspect-ratio:3/4; overflow:hidden; cursor:pointer;}
  .book .cover-wrap img{width:100%; height:100%; object-fit:cover; transition:transform .5s ease;}
  .book .cover-wrap:hover img{transform:scale(1.05);}
  .book .tag{
    position:absolute; top:12px; left:12px; font-family:'Space Mono',monospace; font-size:9.5px;
    letter-spacing:.08em; text-transform:uppercase; background:rgba(10,11,15,.75); color:var(--gold-soft);
    padding:5px 9px; border-radius:100px; border:1px solid rgba(198,161,91,.3);
  }
  .book-body{padding:18px 18px 20px; display:flex; flex-direction:column; gap:12px; flex:1;}
  .book-body h3{font-size:16.5px; font-weight:500; line-height:1.3; cursor:pointer;}
  .book-body .desc{font-size:12.5px; color:var(--muted); line-height:1.5; flex:1;}
  .price-row{display:flex; justify-content:space-between; align-items:baseline; font-family:'Space Mono',monospace; font-size:11.5px; color:var(--muted);}
  .price-row b{color:var(--ivory); font-size:15px; font-family:'Manrope',sans-serif; font-weight:700;}
  .book-actions{display:flex; gap:8px;}
  .btn-buy, .btn-rent{
    flex:1; padding:11px 10px; border-radius:8px; font-size:12.5px; font-weight:700; text-align:center;
    border:1px solid var(--line-strong); transition:.2s; background:transparent; color:var(--ivory);
  }
  .btn-buy{background:var(--gold); color:#0a0b0f; border-color:var(--gold);}
  .btn-buy:hover{background:var(--gold-soft);}
  .btn-rent:hover{border-color:var(--teal); color:var(--teal);}

  /* FAQ */
  .faq{background:var(--surface); border-top:1px solid var(--line); border-bottom:1px solid var(--line);}
  .faq-list{margin-top:40px; display:flex; flex-direction:column;}
  .faq-item{border-bottom:1px solid var(--line);}
  .faq-q{
    width:100%; text-align:left; background:none; border:none; color:var(--ivory); padding:22px 0;
    display:flex; justify-content:space-between; align-items:center; font-size:16px; font-family:'Fraunces',serif;
  }
  .faq-q .plus{font-family:'Space Mono',monospace; color:var(--gold); transition:transform .25s;}
  .faq-item.open .plus{transform:rotate(45deg);}
  .faq-a{max-height:0; overflow:hidden; transition:max-height .35s ease;}
  .faq-a p{color:var(--muted); font-size:14.5px; padding-bottom:22px; max-width:640px;}

  /* MODAL */
  .overlay{
    position:fixed; inset:0; background:rgba(6,7,10,.72); backdrop-filter:blur(4px);
    z-index:300; display:flex; align-items:center; justify-content:center; padding:24px;
    opacity:0; visibility:hidden; transition:opacity .3s ease, visibility .3s ease;
  }
  .overlay.show{opacity:1; visibility:visible;}
  .modal{
    background:var(--surface-2); border:1px solid var(--line-strong); border-radius:18px; max-width:820px; width:100%;
    max-height:88vh; overflow:auto; display:grid; grid-template-columns:0.8fr 1.2fr;
    transform:translateY(20px) scale(.98); transition:transform .3s ease;
  }
  .overlay.show .modal{transform:translateY(0) scale(1);}
  .modal-cover{background:var(--bg);}
  .modal-cover img{width:100%; height:100%; object-fit:cover; min-height:320px;}
  .modal-body{padding:36px 34px; position:relative;}
  .modal-close{
    position:absolute; top:18px; right:18px; width:34px; height:34px; border-radius:50%;
    border:1px solid var(--line-strong); background:none; color:var(--ivory); font-size:16px;
  }
  .modal-body h2{font-size:26px; margin:10px 0 14px;}
  .modal-body .desc{color:var(--muted); font-size:14.5px; margin-bottom:24px;}
  .rent-options{display:flex; gap:10px; margin-bottom:18px; flex-wrap:wrap;}
  .rent-chip{
    font-family:'Space Mono',monospace; font-size:12px; padding:9px 14px; border-radius:100px;
    border:1px solid var(--line-strong); color:var(--muted); background:transparent; transition:.2s;
  }
  .rent-chip.active{border-color:var(--teal); color:var(--teal); background:rgba(95,214,196,.08);}
  .modal-price{font-family:'Fraunces',serif; font-size:28px; margin:6px 0 20px; color:var(--gold-soft);}
  .modal-actions{display:flex; gap:12px; flex-wrap:wrap;}

  /* CART DRAWER */
  .drawer-overlay{
    position:fixed; inset:0; background:rgba(6,7,10,.6); z-index:400;
    opacity:0; visibility:hidden; transition:opacity .3s ease, visibility .3s ease;
  }
  .drawer-overlay.show{opacity:1; visibility:visible;}
  .drawer{
    position:fixed; top:0; right:0; bottom:0; width:420px; max-width:92vw; background:var(--surface-2);
    border-left:1px solid var(--line-strong); z-index:401; display:flex; flex-direction:column;
    transform:translateX(100%); transition:transform .35s cubic-bezier(.16,1,.3,1);
  }
  .drawer.show{transform:translateX(0);}
  .drawer-head{padding:24px 26px; border-bottom:1px solid var(--line); display:flex; justify-content:space-between; align-items:center;}
  .drawer-head h3{font-size:19px;}
  .drawer-items{flex:1; overflow-y:auto; padding:10px 26px;}
  .cart-item{display:flex; gap:14px; padding:16px 0; border-bottom:1px solid var(--line);}
  .cart-item img{width:52px; height:70px; object-fit:cover; border-radius:4px;}
  .cart-item .ci-info{flex:1;}
  .cart-item .ci-title{font-size:14px; font-weight:600;}
  .cart-item .ci-meta{font-family:'Space Mono',monospace; font-size:11px; color:var(--muted); margin-top:4px;}
  .cart-item .ci-price{font-size:14px; color:var(--gold-soft); font-weight:700; margin-top:6px;}
  .ci-remove{background:none; border:none; color:var(--danger); font-size:11px; font-family:'Space Mono',monospace; margin-top:6px;}
  .empty-cart{color:var(--muted); font-size:14px; text-align:center; padding:60px 20px;}
  .drawer-foot{padding:22px 26px; border-top:1px solid var(--line); overflow-y:auto; max-height:60vh;}
  .subtotal-row{display:flex; justify-content:space-between; font-size:15px; margin-bottom:16px;}
  .subtotal-row b{font-family:'Fraunces',serif; font-size:20px; color:var(--gold-soft);}
  
  /* CHECKOUT */
  .checkout-form{display:none; flex-direction:column; gap:10px; margin-top:14px;}
  .checkout-form.show{display:flex;}
  .checkout-form input, .checkout-form select{
    background:var(--surface); border:1px solid var(--line-strong); border-radius:8px; padding:12px 14px;
    color:var(--ivory); font-family:'Manrope',sans-serif; font-size:13.5px; width:100%;
  }
  .checkout-form input::placeholder{color:var(--muted);}
  .btn-primary{
    background:var(--gold); color:#0a0b0f; padding:14px 20px; border-radius:100px; border:none;
    font-weight:700; font-size:14px; width:100%; transition:.25s;
  }
  .btn-primary:hover{background:var(--gold-soft);}
  .btn-primary:disabled{opacity:.4; cursor:not-allowed;}
  .btn-ghost-full{
    background:none; border:1px solid var(--line-strong); color:var(--ivory); padding:12px 20px;
    border-radius:100px; font-size:13px; width:100%; margin-top:8px;
  }
  .note{font-size:11.5px; color:var(--muted); margin-top:14px; line-height:1.5;}

  #cardFieldsContainer{display:none; flex-direction:column; gap:8px; margin-top:6px;}

  .pix-area{
    display:none; text-align:center; padding:16px; background:var(--surface); 
    border:1px solid var(--line-strong); border-radius:10px; margin-top:10px;
  }
  .pix-area img{margin:12px auto; width:160px; height:160px; border-radius:8px; border:2px solid var(--gold);}
  .pix-area textarea{
    width:100%; height:55px; font-size:11px; background:var(--bg); color:var(--ivory);
    border:1px solid var(--line); border-radius:6px; padding:8px; font-family:'Space Mono',monospace; resize:none;
  }

  .toast{
    position:fixed; bottom:26px; left:50%; transform:translateX(-50%) translateY(20px); z-index:500;
    background:var(--gold); color:#0a0b0f; padding:13px 22px; border-radius:100px; font-size:13.5px; font-weight:700;
    opacity:0; visibility:hidden; transition:.3s ease;
  }
  .toast.show{opacity:1; visibility:visible; transform:translateX(-50%) translateY(0);}

  /* BOTÕES FLUTUANTES */
  .floating-buttons { position: fixed; bottom: 30px; right: 30px; display: flex; flex-direction: column; gap: 15px; z-index: 9999; }
  .float-btn {
      width: 60px; height: 60px; border-radius: 50%; display: flex;
      align-items: center; justify-content: center; font-size: 1.8rem;
      color: #fff; text-decoration: none; transition: var(--transition);
      box-shadow: 0 10px 20px rgba(0,0,0,0.3); border: 2px solid rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
  }
  .btn-whatsapp { background: #25d366; }
  .btn-music { background: var(--glass); color: var(--p-cyan); }
  .float-btn:hover { transform: scale(1.1) rotate(10deg); border-color: #fff; }

  @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

  @media (max-width:1080px){ .catalog{grid-template-columns:repeat(3,1fr);} }
  @media (max-width:900px){
    .navlinks{display:none;}
    .how-grid{grid-template-columns:1fr;}
    .modal{grid-template-columns:1fr;}
    .modal-cover img{min-height:220px;}
    .hero h1 { font-size: 2.5rem; }
    .floating-buttons { bottom: 20px; right: 20px; }
    .float-btn { width: 50px; height: 50px; font-size: 1.5rem; }
  }
  @media (max-width:640px){
    .catalog{grid-template-columns:repeat(2,1fr);}
    .wrap{padding:0 20px;}
    .drawer{width:100%;}
  }
</style>
</head>
<body>

<!-- PRELOADER -->
<div id="preloader">
    <div class="loader-logo">INPUT CRIATIVO</div>
    <div class="loader-bar"><div class="loader-progress"></div></div>
</div>

<!-- BOTÕES FLUTUANTES -->
<div class="floating-buttons">
    <a href="#" class="float-btn btn-music" title="Música do Site">
        <i class="fas fa-music"></i>
    </a>
    <a href="https://wa.me/5585987784930" class="float-btn btn-whatsapp" title="WhatsApp">
        <i class="fab fa-whatsapp"></i>
    </a>
</div>

<!-- HEADER COM NAVEGAÇÃO COMPLETA + CARRINHO -->
<header class="main-header" id="siteHeader">
    <a href="index.html" class="logo">INPUT CRIATIVO</a>
    <nav>
        <a href="index.html" class="nav-link">Início</a>
        <a href="#catalogo" class="nav-link">Catálogo eBooks</a>
        <a href="logomarcas.html" class="nav-link">Logomarcas</a>

        <div class="dropdown">
            <a href="#" class="nav-link">Sites <i class="fas fa-chevron-down"></i></a>
            <div class="dropdown-content">
                <a href="Advocacia de Luxo.html">Advocacia de Luxo</a>
                <a href="clinica-odonto.html">Clínica Odontológica</a>
                <a href="pet.html">Petshop</a>
                <a href="salao_premium.html">Salão Premium</a>
                <a href="moda.html">Moda</a>
            </div>
        </div>

        <div class="dropdown">
            <a href="#" class="nav-link">Cartões Digitais <i class="fas fa-chevron-down"></i></a>
            <div class="dropdown-content">
                <a href="cartão de visita digital com NFC.html">Cartão Digital NFC</a>
                <a href="cartão de visita interativo.html">Cartão Interativo</a>
                <a href="cartão NFC.html">Cartão NFC</a>
                <a href="cartão Realidade aumentada.html">Realidade Aumentada</a>
            </div>
        </div>

        <div class="dropdown">
            <a href="#" class="nav-link">eBooks <i class="fas fa-chevron-down"></i></a>
            <div class="dropdown-content">
                <a href="segredo-tapajos.html">O Segredo do Rio Tapajós</a>
                <a href="uma-vida-roubada.html">Uma Vida Roubada</a>
                <a href="ceus-e-abismos.html">Entre Céus e Abismos</a>
                <a href="jose-do-egito.html">José do Egito</a>
                <a href="desejo-pesadelo.html">O Desejo que Virou Pesadelo</a>
                <a href="mapa-da-alma.html">O Mapa da Alma</a>
                <a href="sinfonia-do-vazio.html">A Sinfonia do Vazio</a>
            </div>
        </div>

        <div class="head-actions">
            <button class="cart-btn" id="cartOpenBtn" aria-label="Abrir carrinho">
                <svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L22 7H6"/><circle cx="9" cy="21" r="1"/><circle cx="18" cy="21" r="1"/></svg>
                <span class="cart-count" id="cartCount">0</span>
            </button>
        </div>

        <a href="https://wa.me/5585987784930" class="btn-main" style="padding: 10px 22px; font-size: 0.75rem;">Orçamento</a>
    </nav>
</header>

<!-- HERO SECTION INSTITUCIONAL -->
<section class="hero">
    <h1>Sua Presença Digital <br><span>Elevada ao Máximo.</span></h1>
    <p>Inovação, Design e Tecnologia Imersiva em Fortaleza. Obras de George Batista em PDF para ler, imprimir ou alugar online.</p>
    <div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center;">
        <a href="#catalogo" class="btn-main">Ver Catálogo de eBooks</a>
        <a href="realidade-aumentada.html" class="btn-main" style="background: transparent; color: #fff; border: 2px solid var(--p-cyan);">Tecnologia RA</a>
    </div>
</section>

<!-- COMO FUNCIONA O ALUGUEL/COMPRA -->
<section class="how" id="como-funciona">
  <div class="wrap">
    <span class="eyebrow">Como Funciona</span>
    <div class="how-grid">
      <div class="how-step">
        <span class="num">01</span>
        <h3>Escolha o título</h3>
        <p>Navegue pelo catálogo e leia a sinopse de cada obra de George Batista antes de decidir.</p>
      </div>
      <div class="how-step">
        <span class="num">02</span>
        <h3>Compre ou alugue</h3>
        <p><b style="color:var(--ivory)">Comprar:</b> PDF liberado para impressão e uso pessoal, para sempre. <b style="color:var(--ivory)">Alugar:</b> acesso digital por 7 ou 15 dias, ideal para ler na tela.</p>
      </div>
      <div class="how-step">
        <span class="num">03</span>
        <h3>Finalize o pedido</h3>
        <p>Realize o pagamento instantâneo via Pix ou Cartão de Crédito diretamente no checkout.</p>
      </div>
    </div>
  </div>
</section>

<!-- CATÁLOGO DE EBOOKS INTEGRADO -->
<section id="catalogo" class="sec-padding">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Catálogo</span>
      <h2>Sete histórias. Duas formas de viver cada uma.</h2>
      <p>Toque na capa para ver a sinopse completa, ou escolha direto entre comprar e alugar.</p>
    </div>
    <div class="filters">
      <button class="filter-btn active" data-filter="todos">Todos</button>
      <button class="filter-btn" data-filter="ficção">Ficção</button>
      <button class="filter-btn" data-filter="suspense">Suspense</button>
      <button class="filter-btn" data-filter="drama">Drama</button>
      <button class="filter-btn" data-filter="histórico">Histórico</button>
    </div>
    <div class="catalog" id="catalogGrid"></div>
  </div>
</section>

<!-- DÚVIDAS FREQUENTES -->
<section class="faq" id="faq">
  <div class="wrap" style="padding: 80px 0;">
    <span class="eyebrow">Dúvidas Frequentes</span>
    <h2 style="font-size:clamp(28px,3.6vw,36px); margin-top:16px;">Antes de finalizar, tire suas dúvidas.</h2>
    <div class="faq-list" id="faqList"></div>
  </div>
</section>

<!-- RODAPÉ UNIFICADO -->
<footer style="text-align: center; padding: 60px 8%; border-top: 1px solid var(--glass-border);">
    <p>© 2026 Input Criativo | George Batista — Fortaleza/CE</p>
</footer>

<!-- AUDIO PLAYER -->
<audio id="bgMusic" loop>
    <source src="O Pulso da Ideia.mp3" type="audio/mpeg">
</audio>

<!-- MODAL DE DETALHES DO LIVRO -->
<div class="overlay" id="bookOverlay">
  <div class="modal">
    <div class="modal-cover"><img id="modalCover" src="" alt=""></div>
    <div class="modal-body">
      <button class="modal-close" id="modalClose" aria-label="Fechar">✕</button>
      <span class="eyebrow" id="modalTag">Ficção</span>
      <h2 id="modalTitle">Título do Livro</h2>
      <p class="desc" id="modalDesc">Sinopse.</p>
      <div id="modalOptionArea">
        <div class="rent-options" id="rentOptions"></div>
      </div>
      <div class="modal-price" id="modalPrice">R$ 0,00</div>
      <div class="modal-actions">
        <button class="btn-primary" id="modalAdd" style="width:auto; flex:1;">Adicionar ao carrinho</button>
      </div>
    </div>
  </div>
</div>

<!-- CARRINHO & CHECKOUT MERCADO PAGO -->
<div class="drawer-overlay" id="drawerOverlay"></div>
<aside class="drawer" id="cartDrawer">
  <div class="drawer-head">
    <h3>Seu carrinho</h3>
    <button class="modal-close" id="drawerClose" aria-label="Fechar carrinho">✕</button>
  </div>
  <div class="drawer-items" id="drawerItems"></div>
  <div class="drawer-foot">
    <div class="subtotal-row"><span>Subtotal</span><b id="subtotalValue">R$ 0,00</b></div>
    <button class="btn-primary" id="goCheckout">Ir para o Pagamento</button>
    
    <div class="checkout-form" id="checkoutForm">
      <input type="text" id="custName" placeholder="Seu nome completo" required>
      <input type="email" id="custEmail" placeholder="Seu e-mail (para envio do livro)" required>
      <input type="tel" id="custPhone" placeholder="Seu WhatsApp (com DDD)">
      
      <label style="font-size:12px; color:var(--muted); margin-top:4px;">Meio de Pagamento:</label>
      <select id="paymentMethod">
        <option value="pix">Pix (Liberação Imediata)</option>
        <option value="card">Cartão de Crédito</option>
      </select>

      <div id="cardFieldsContainer">
        <input type="text" id="cardNum" placeholder="Número do Cartão (Ex: 4509...)">
        <div style="display:flex; gap:8px;">
          <input type="text" id="cardExp" placeholder="MM/AA" style="flex:1;">
          <input type="text" id="cardCvv" placeholder="CVV" style="flex:1;">
        </div>
        <input type="text" id="cardName" placeholder="Nome impresso no cartão">
        <input type="text" id="cardCpf" placeholder="CPF do titular">
      </div>

      <button class="btn-primary" id="processPayment" style="margin-top:6px;">Pagar Agora</button>
      <button type="button" class="btn-ghost-full" id="backToCart">Voltar ao carrinho</button>

      <div class="pix-area" id="pixResult">
        <p style="font-size:12.5px; color:var(--gold-soft);">Escaneie o QR Code ou copie o código:</p>
        <img id="pixQrCode" src="" alt="QR Code Pix">
        <textarea id="pixCopiaCola" readonly></textarea>
        <button type="button" class="btn-primary" id="copyPixBtn" style="margin-top:8px; padding:10px; font-size:12px;">Copiar Código Pix</button>
      </div>
    </div>
    
    <p class="note">Após a confirmação do pagamento via Mercado Pago, o acesso ao livro alugado ou o arquivo PDF da compra definitiva é liberado instantaneamente.</p>
  </div>
</aside>

<div class="toast" id="toast">Adicionado ao carrinho</div>

<script>
  // CONFIGURAÇÃO MERCADO PAGO
  const MP_PUBLIC_KEY = 'TEST-aaa29634-5763-4ef1-8028-36c70077b41a';
  const MP_ACCESS_TOKEN = 'TEST-6060375682721607-072209-f1e92885ec8ac84aaf271ee9622f2f32-335817238';

  const BOOKS = [
    {
      id:'tapajos', title:'O Segredo do Rio Tapajós', genre:'histórico',
      cover:'https://www.inputcriativo.com.br/livro01.png',
      desc:'Uma expedição pela Amazônia desenterra um mistério guardado há gerações às margens do Tapajós, entre lendas ribeirinhas e um segredo que pode reescrever a história da região.',
      buyPrice:29.90, rent:{7:9.90, 15:14.90}
    },
    {
      id:'jose-egito', title:'José do Egito', genre:'histórico',
      cover:'https://www.inputcriativo.com.br/02livro.png',
      desc:'Uma releitura envolvente da trajetória de José: da traição dos irmãos à ascensão no Egito antigo, uma narrativa sobre fé, perdão e propósito.',
      buyPrice:24.90, rent:{7:8.90, 15:12.90}
    },
    {
      id:'sinfonia-vazio', title:'A Sinfonia do Vazio', genre:'drama',
      cover:'https://www.inputcriativo.com.br/livro02.png',
      desc:'Um compositor em crise busca, nas notas que não consegue mais escrever, o motivo de um silêncio que tomou conta de sua vida.',
      buyPrice:26.90, rent:{7:9.90, 15:13.90}
    },
    {
      id:'ceus-abismos', title:'Entre Céus e Abismos', genre:'drama',
      cover:'https://www.inputcriativo.com.br/livro04.png',
      desc:'Duas famílias, uma tragédia em comum e décadas de silêncio: uma história sobre queda, fé e a distância entre culpa e redenção.',
      buyPrice:27.90, rent:{7:9.90, 15:14.90}
    },
    {
      id:'vida-roubada', title:'Uma Vida Roubada', genre:'suspense',
      cover:'https://www.inputcriativo.com.br/05livro.png',
      desc:'Quando descobre que sua identidade foi forjada por outra pessoa anos atrás, uma mulher precisa desvendar quem realmente é — antes que percam a verdade dela para sempre.',
      buyPrice:28.90, rent:{7:9.90, 15:14.90}
    },
    {
      id:'mapa-alma', title:'O Mapa da Alma', genre:'ficção',
      cover:'https://www.inputcriativo.com.br/livro03.png',
      desc:'Uma jornada interior guiada por cartas nunca enviadas, em busca de um caminho de volta para si mesmo depois da perda.',
      buyPrice:25.90, rent:{7:8.90, 15:12.90}
    },
    {
      id:'desejo-pesadelo', title:'O Desejo que Virou Pesadelo', genre:'suspense',
      cover:'https://www.inputcriativo.com.br/07livro.png',
      desc:'Um desejo antigo realizado da pior forma possível: um thriller psicológico sobre as consequências de querer demais.',
      buyPrice:26.90, rent:{7:9.90, 15:13.90}
    }
  ];

  const FAQS = [
    { q:'Como recebo o livro depois de comprar?', a:'Após a aprovação do pagamento, você recebe imediatamente o link para baixar seu PDF em alta resolução, liberado para leitura ou impressão.' },
    { q:'Como funciona o aluguel?', a:'O aluguel libera o acesso de leitura digital pelo prazo contratado (7 ou 15 dias). Ao término do período, o acesso expira automaticamente.' },
    { q:'Posso imprimir o livro alugado?', a:'A impressão é um benefício exclusivo da compra definitiva. No aluguel, o acesso é restrito para leitura digital na tela.' },
    { q:'Quais as formas de pagamento aceitas?', a:'Aceitamos Pix com aprovação em tempo real e cartões de crédito via integração com o Mercado Pago.' }
  ];

  let cart = [];

  // RENDER CATÁLOGO
  const grid = document.getElementById('catalogGrid');
  function tagLabel(g){ return g.charAt(0).toUpperCase()+g.slice(1); }
  function money(v){ return 'R$ ' + v.toFixed(2).replace('.', ','); }

  function renderCatalog(filter='todos'){
    grid.innerHTML = '';
    BOOKS.filter(b => filter==='todos' || b.genre===filter).forEach(b => {
      const el = document.createElement('div');
      el.className = 'book';
      el.innerHTML = `
        <div class="cover-wrap" data-open="${b.id}">
          <span class="tag">${tagLabel(b.genre)}</span>
          <img src="${b.cover}" alt="Capa: ${b.title}" loading="lazy">
        </div>
        <div class="book-body">
          <h3 data-open="${b.id}">${b.title}</h3>
          <p class="desc">${b.desc.slice(0,86)}…</p>
          <div class="price-row"><span>comprar</span><b>${money(b.buyPrice)}</b></div>
          <div class="price-row"><span>alugar 7 dias</span><b>${money(b.rent[7])}</b></div>
          <div class="book-actions">
            <button class="btn-buy" data-buy="${b.id}">Comprar</button>
            <button class="btn-rent" data-open="${b.id}">Alugar</button>
          </div>
        </div>`;
      grid.appendChild(el);
    });
  }
  renderCatalog();

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCatalog(btn.dataset.filter);
    });
  });

  // FAQ
  const faqList = document.getElementById('faqList');
  FAQS.forEach((f,i) => {
    const item = document.createElement('div');
    item.className = 'faq-item';
    item.innerHTML = `
      <button class="faq-q">${f.q}<span class="plus">+</span></button>
      <div class="faq-a"><p>${f.a}</p></div>`;
    faqList.appendChild(item);
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(fi => { fi.classList.remove('open'); fi.querySelector('.faq-a').style.maxHeight = null; });
      if(!isOpen){ item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  // MODAL DETALHES
  const overlay = document.getElementById('bookOverlay');
  let currentBook = null, currentMode = 'buy';

  function openModal(id){
    currentBook = BOOKS.find(b => b.id === id);
    currentMode = 'buy';
    document.getElementById('modalCover').src = currentBook.cover;
    document.getElementById('modalCover').alt = 'Capa: ' + currentBook.title;
    document.getElementById('modalTag').textContent = tagLabel(currentBook.genre);
    document.getElementById('modalTitle').textContent = currentBook.title;
    document.getElementById('modalDesc').textContent = currentBook.desc;
    renderRentOptions();
    updateModalPrice();
    overlay.classList.add('show');
  }

  function renderRentOptions(){
    const box = document.getElementById('rentOptions');
    box.innerHTML = `
      <button class="rent-chip ${currentMode==='buy'?'active':''}" data-mode="buy">Comprar (definitivo)</button>
      <button class="rent-chip ${currentMode==='rent7'?'active':''}" data-mode="rent7">Alugar 7 dias</button>
      <button class="rent-chip ${currentMode==='rent15'?'active':''}" data-mode="rent15">Alugar 15 dias</button>`;
    box.querySelectorAll('.rent-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        currentMode = chip.dataset.mode;
        renderRentOptions();
        updateModalPrice();
      });
    });
  }

  function updateModalPrice(){
    let price = currentBook.buyPrice;
    if(currentMode==='rent7') price = currentBook.rent[7];
    if(currentMode==='rent15') price = currentBook.rent[15];
    document.getElementById('modalPrice').textContent = money(price);
  }

  document.getElementById('modalClose').addEventListener('click', () => overlay.classList.remove('show'));
  overlay.addEventListener('click', e => { if(e.target === overlay) overlay.classList.remove('show'); });

  grid.addEventListener('click', e => {
    const openId = e.target.closest('[data-open]');
    const buyId = e.target.closest('[data-buy]');
    if(openId) openModal(openId.dataset.open);
    if(buyId) addToCart(BOOKS.find(b=>b.id===buyId.dataset.buy), 'buy');
  });

  document.getElementById('modalAdd').addEventListener('click', () => {
    addToCart(currentBook, currentMode);
    overlay.classList.remove('show');
  });

  // CARRINHO
  function addToCart(book, mode){
    let price = book.buyPrice, label = 'Compra · uso definitivo';
    if(mode==='rent7'){ price = book.rent[7]; label = 'Aluguel · 7 dias'; }
    if(mode==='rent15'){ price = book.rent[15]; label = 'Aluguel · 15 dias'; }
    cart.push({ uid: Date.now()+Math.random(), id:book.id, title:book.title, cover:book.cover, mode, label, price });
    renderCart();
    showToast(book.title + ' adicionado');
  }

  function removeFromCart(uid){
    cart = cart.filter(i => i.uid !== uid);
    renderCart();
  }

  function renderCart(){
    const itemsBox = document.getElementById('drawerItems');
    document.getElementById('cartCount').textContent = cart.length;
    if(cart.length === 0){
      itemsBox.innerHTML = '<div class="empty-cart">Seu carrinho está vazio.<br>Escolha um título no catálogo.</div>';
    } else {
      itemsBox.innerHTML = cart.map(i => `
        <div class="cart-item">
          <img src="${i.cover}" alt="">
          <div class="ci-info">
            <div class="ci-title">${i.title}</div>
            <div class="ci-meta">${i.label}</div>
            <div class="ci-price">${money(i.price)}</div>
            <button class="ci-remove" data-remove="${i.uid}">remover</button>
          </div>
        </div>`).join('');
    }
    const subtotal = cart.reduce((s,i) => s + i.price, 0);
    document.getElementById('subtotalValue').textContent = money(subtotal);
    document.getElementById('goCheckout').disabled = cart.length === 0;
    itemsBox.querySelectorAll('[data-remove]').forEach(btn => {
      btn.addEventListener('click', () => removeFromCart(Number(btn.dataset.remove)));
    });
  }
  renderCart();

  // DRAWER CONTROLES
  const drawer = document.getElementById('cartDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  function openDrawer(){ drawer.classList.add('show'); drawerOverlay.classList.add('show'); }
  function closeDrawer(){ drawer.classList.remove('show'); drawerOverlay.classList.remove('show'); document.getElementById('checkoutForm').classList.remove('show'); }
  document.getElementById('cartOpenBtn').addEventListener('click', openDrawer);
  document.getElementById('drawerClose').addEventListener('click', closeDrawer);
  drawerOverlay.addEventListener('click', closeDrawer);

  // ALTERNÂNCIA DE PAGAMENTO
  const paymentMethodSelect = document.getElementById('paymentMethod');
  const cardFields = document.getElementById('cardFieldsContainer');

  paymentMethodSelect.addEventListener('change', () => {
    document.getElementById('pixResult').style.display = 'none';
    if (paymentMethodSelect.value === 'card') {
      cardFields.style.display = 'flex';
    } else {
      cardFields.style.display = 'none';
    }
  });

  // PROCESSAR PAGAMENTO
  document.getElementById('goCheckout').addEventListener('click', () => {
    document.getElementById('checkoutForm').classList.add('show');
  });
  
  document.getElementById('backToCart').addEventListener('click', () => {
    document.getElementById('checkoutForm').classList.remove('show');
    document.getElementById('pixResult').style.display = 'none';
  });

  document.getElementById('processPayment').addEventListener('click', async () => {
    const name = document.getElementById('custName').value.trim();
    const email = document.getElementById('custEmail').value.trim();
    const method = paymentMethodSelect.value;
    const subtotal = cart.reduce((s,i) => s + i.price, 0);

    if(!name || !email){
      showToast('Preencha seu nome e e-mail');
      return;
    }

    if (method === 'pix') {
      showToast('Gerando cobrança Pix...');
      const pixString = `00020126360014BR.GOV.BCB.PIX0114InputCriativo5204000053039865405${subtotal.toFixed(2)}5802BR5915GeorgeBatista6008Fortaleza62070503***6304E2CA`;
      
      document.getElementById('pixQrCode').src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(pixString)}`;
      document.getElementById('pixCopiaCola').value = pixString;
      document.getElementById('pixResult').style.display = 'block';
      showToast('Pix gerado com sucesso!');

    } else {
      const cardNum = document.getElementById('cardNum').value.trim();
      if(!cardNum) {
        showToast('Preencha os dados do cartão');
        return;
      }
      showToast('Pagamento de teste via cartão aprovado!');
    }
  });

  document.getElementById('copyPixBtn').addEventListener('click', () => {
    const copyText = document.getElementById('pixCopiaCola');
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
    showToast('Código Pix copiado!');
  });

  function showToast(text){
    const t = document.getElementById('toast');
    t.textContent = text;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2400);
  }

  // CONTROLES DE MÚSICA E PRELOADER
  const musicBtn = document.querySelector('.btn-music');
  const audio = document.getElementById('bgMusic');
  let isPlaying = false;

  musicBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (isPlaying) {
          audio.pause();
          musicBtn.style.color = 'var(--p-cyan)';
          musicBtn.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
          musicBtn.innerHTML = '<i class="fas fa-music"></i>';
      } else {
          audio.play().catch(error => {
              console.log("Autoplay bloqueado pelo navegador.");
          });
          musicBtn.style.color = '#000';
          musicBtn.style.background = 'var(--gradient)';
          musicBtn.style.boxShadow = '0 0 20px var(--p-cyan)';
          musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
      }
      isPlaying = !isPlaying;
  });

  window.addEventListener('load', () => {
      const preloader = document.getElementById('preloader');
      setTimeout(() => {
          preloader.style.opacity = '0';
          setTimeout(() => {
              preloader.style.display = 'none';
          }, 800);
      }, 1500);
  });

  // Header Scroll Effect
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 30));
</script>

</body>
</html>
