(function(){
  const STORAGE_KEY = 'lt_visitors_count';
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
  if(!stored){ stored = baseCount + randomInt(0, 50); }

  const inc = randomInt(minInc, maxInc);
  const newVal = stored + inc;
  localStorage.setItem(STORAGE_KEY, String(newVal));

  if(visitorEl){ animateCount(visitorEl, stored, newVal, 700); }

  setInterval(()=>{
    const add = randomInt(minInc, maxInc);
    const current = parseInt(localStorage.getItem(STORAGE_KEY) || String(baseCount),10) + add;
    localStorage.setItem(STORAGE_KEY, String(current));
    if(visitorEl) animateCount(visitorEl, current-add, current, 600);
  }, randomInt(8000, 20000));
})();
