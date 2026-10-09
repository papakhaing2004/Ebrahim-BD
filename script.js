(function(){

  var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  var q=new URLSearchParams(location.search),name=q.get("name");
  function set(id,v){if(v)document.getElementById(id).textContent=v}
  set("name",name);set("gName",name);set("cName",name);set("age",q.get("age"));
  if(name){document.title="Happy Birthday, "+name+"!";$("#chatMsg").textContent="Happy Birthday "+name.split(" ")[0]+"! 🎂 Barakallahu fee umrik, legend! 🦸🏻‍♂️"}
  $("#yr").textContent=new Date().getFullYear();
  function store(k,v){try{if(v===undefined)return JSON.parse(localStorage.getItem(k)||"null");localStorage.setItem(k,JSON.stringify(v))}catch(e){return null}}

  /* envelopes */
  function envs(list,box,pre){
    list.forEach(function(w,i){
      var d=document.createElement("div");d.className="card env";
      d.innerHTML='<div class="wax">☪</div><div class="from"></div><div class="hint">Tap to open</div><p class="letter"></p>';
      $(".from",d).textContent="From "+w.from;$(".letter",d).textContent=w.text;
      d.onclick=function(){d.classList.toggle("open");if(d.classList.contains("open")){var r=d.getBoundingClientRect();burst(r.left+r.width/2,r.top+20,30)}};
      box.appendChild(d);
    });
  }
  envs(PARENTS,$("#parents"));envs(FRIENDS,$("#friends"));
  $("#openAll").onclick=function(){$$(".env").forEach(function(e){e.classList.add("open")});burst(innerWidth/2,innerHeight/3,80)};

  /* missions */
  $$("[data-list]").forEach(function(card){
    var key=card.getAttribute("data-list"),items=MISSIONS[key],list=$(".list",card),bar=$(".bar div",card),cnt=$(".cnt",card),saved=store("bd_"+key)||[];
    function upd(){var done=$$(".done",list).map(function(e){return +e.getAttribute("data-i")});bar.style.width=done.length/items.length*100+"%";cnt.textContent=done.length+" of "+items.length+" completed";store("bd_"+key,done)}
    items.forEach(function(it,i){
      var d=document.createElement("div");d.className="item"+(saved.indexOf(i)>-1?" done":"");d.setAttribute("data-i",i);
      d.innerHTML='<div class="ck"></div><div><span></span><i></i></div>';
      $("span",d).textContent=it[0];$("i",d).textContent=it[1];
      d.onclick=function(){d.classList.toggle("done");upd();if(d.classList.contains("done")){var r=d.getBoundingClientRect();burst(r.left+30,r.top,22)}};
      list.appendChild(d);
    });
    upd();
  });
  $("#copy").onclick=function(){
    var t=$("#chatMsg").textContent,b=this;
    function ok(){b.textContent="Copied ✔";setTimeout(function(){b.textContent="Copy chat message"},1800)}
    function fb(){try{var a=document.createElement("textarea");a.value=t;document.body.appendChild(a);a.select();document.execCommand("copy");a.remove();ok()}catch(e){b.textContent="Select the text above"}}
    try{navigator.clipboard.writeText(t).then(ok,fb)}catch(e){fb()}
  };
  var am=0;$("#ameen").onclick=function(){am++;$("#amc").textContent="× "+am;burst(innerWidth/2,innerHeight*.6,60)};

  /* countdown to 16 October */
  var cd=$("#cd");
  function tickCd(){
    var n=new Date(),t=new Date(n.getFullYear(),9,16),td=new Date(n.getFullYear(),n.getMonth(),n.getDate());
    if(td.getTime()===t.getTime()){cd.innerHTML="<b>Today is the day! 🎉</b>";return}
    if(td>t){cd.style.display="none";return}
    var d=t-n;cd.innerHTML="<small>The celebration begins in</small><b>"+Math.floor(d/864e5)+"d "+Math.floor(d/36e5)%24+"h "+Math.floor(d/6e4)%60+"m "+Math.floor(d/1e3)%60+"s</b>";
  }
  tickCd();setInterval(tickCd,1000);

  /* pages */
  var order=["menu","wishes","missions","dua"],opened=false;
  $$(".nav2").forEach(function(r,i){
    var p=order[i+1],n=order[i+2];
    r.innerHTML='<button class="btn line" data-go="menu">← Menu</button>'+(n?'<button class="btn" data-go="'+n+'">Next →</button>':'<button class="btn" id="again">More confetti 🎉</button>');
  });
  document.addEventListener("click",function(e){var g=e.target.closest("[data-go]");if(g){location.hash=g.getAttribute("data-go")}});
  var ag=$("#again");if(ag)ag.onclick=function(){burst(innerWidth/2,innerHeight/2,160)};
  function show(){
    if(!opened)return;
    var p=location.hash.slice(1);if(order.indexOf(p)<0)p="menu";
    $$(".page").forEach(function(s){s.classList.toggle("on",s.id==="p-"+p)});
    $$("#nav button").forEach(function(b){b.classList.toggle("on",b.getAttribute("data-go")===p)});
    scrollTo(0,0);if(p==="dua")burst(innerWidth/2,innerHeight/3,70);
  }
  addEventListener("hashchange",show);

  /* confetti */
  var c=$("#fx"),x=c.getContext("2d"),P=[],run=false;
  function size(){c.width=innerWidth;c.height=innerHeight}size();addEventListener("resize",size);
  var cols=["#d4af37","#f1d77a","#fffaf0","#7a1f2b","#2a4a7a"];
  function burst(cx,cy,n){
    for(var i=0;i<n;i++){var a=Math.random()*Math.PI*2,s=4+Math.random()*7;
      P.push({x:cx,y:cy,vx:Math.cos(a)*s,vy:Math.sin(a)*s-6,w:5+Math.random()*5,h:7+Math.random()*8,r:Math.random()*6,vr:(Math.random()-.5)*.4,c:cols[i%cols.length],l:120+Math.random()*60})}
    if(!run){run=true;requestAnimationFrame(tick)}
  }
  function tick(){
    x.clearRect(0,0,c.width,c.height);P=P.filter(function(p){return p.l>0&&p.y<c.height+20});
    P.forEach(function(p){p.x+=p.vx;p.y+=p.vy;p.vy+=.22;p.vx*=.99;p.r+=p.vr;p.l--;x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillStyle=p.c;x.fillRect(-p.w/2,-p.h/2,p.w,p.h);x.restore()});
    if(P.length)requestAnimationFrame(tick);else run=false;
  }
  $("#open").onclick=function(){
    opened=true;$("#gate").classList.add("gone");$("#nav").classList.add("on");show();
    burst(innerWidth/2,innerHeight/3,110);
    setTimeout(function(){burst(innerWidth*.2,innerHeight/2,60);burst(innerWidth*.8,innerHeight/2,60)},500);
  };
})();
