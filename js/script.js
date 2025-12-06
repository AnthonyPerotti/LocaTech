// script.js - visitor counter (fictício), form handling, dark mode toggle and simple appear animations

document.addEventListener('DOMContentLoaded', function(){

  /* ---------- VISITOR COUNTER (CLIENT-SIDE, FICTÍCIO) ---------- */
  (function(){
    const STORAGE_KEY = 'lt_visitors_count_v2';
    const baseCount = 4230;
    const minInc = 1;
    const maxInc = 5;
    const visitorEl = document.getElementById('visitorCount');

    function randomInt(min,max){ return Math.floor(Math.random()*(max-min+1))+min }
    function animateCount(el, start, end, duration){
      const range = end - start;
      const startTime = performance.now();
      function step(now){
        const progress = Math.min((now - startTime)/duration,1);
        el.textContent = Math.floor(start + range*progress).toLocaleString('pt-BR');
        if(progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    let stored = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
    if(!stored || isNaN(stored)){ stored = baseCount + randomInt(0, 50); }
    const inc = randomInt(minInc, maxInc);
    const newVal = stored + inc;
    localStorage.setItem(STORAGE_KEY, String(newVal));
    if(visitorEl){ animateCount(visitorEl, stored, newVal, 700); }

    setInterval(()=>{
      const add = randomInt(minInc, maxInc);
      const current = parseInt(localStorage.getItem(STORAGE_KEY) || String(baseCount),10) + add;
      localStorage.setItem(STORAGE_KEY, String(current));
      if(visitorEl) animateCount(visitorEl, current-add, current, 600);
    }, 12000 + Math.floor(Math.random()*10000));
  })();

  /* ---------- DARK MODE TOGGLE ---------- */
  (function(){
    const btn = document.getElementById('darkToggle');
    const darkClass = 'darkmode';
    // Try load preference
    if(localStorage.getItem('lt_dark') === '1') document.documentElement.classList.add(darkClass);
    btn.addEventListener('click', function(){
      document.documentElement.classList.toggle(darkClass);
      const on = document.documentElement.classList.contains(darkClass);
      localStorage.setItem('lt_dark', on ? '1' : '0');
    });
  })();

  /* ---------- SIMPLE APPEAR ANIMATIONS ---------- */
  (function(){
    const reveal = document.querySelectorAll('.card, .lead-form, .hero-content, blockquote');
    reveal.forEach((el, i) => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(8px)';
      setTimeout(()=> {
        el.style.transition = 'opacity .6s ease, transform .6s ease';
        el.style.opacity = 1;
        el.style.transform = 'translateY(0)';
      }, 120 + i*90);
    });
  })();

  /* ---------- FORM HANDLING (simples) ---------- */
  (function(){
    const form = document.getElementById('leadForm');
    const msg = document.getElementById('formMsg');
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        university: form.university.value.trim(),
        ts: new Date().toISOString()
      };
      // Simular envio (aqui você pode integrar com Google Sheets, API, etc.)
      console.log('lead', data);
      msg.textContent = 'Obrigado! Seu interesse foi registrado — em breve entraremos em contato.';
      form.reset();
      // incrementa visitor counter para dar sensação de atividade
      try {
        const key = 'lt_visitors_count_v2';
        let cur = parseInt(localStorage.getItem(key) || '4230', 10);
        cur += 1;
        localStorage.setItem(key, String(cur));
        const vEl = document.getElementById('visitorCount');
        if(vEl) vEl.textContent = cur.toLocaleString('pt-BR');
      } catch(e){}
    });

    // Demo button action (só efeito visual)
    document.getElementById('demoBtn').addEventListener('click', function(){
      msg.textContent = 'Obrigado! Você solicitou uma demo; vamos contatar em breve.';
    });
  })();

});
