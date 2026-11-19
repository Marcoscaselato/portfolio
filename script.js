/* 1. Efeito decifrar no título do Hero */
(function () {
  const el = document.getElementById("nome-hero");
  if (!el) return;

  const prefereMovimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finalText = el.dataset.nome || el.textContent.trim();

  if (prefereMovimentoReduzido) {
    el.textContent = finalText;
    return;
  }

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*";
  let frame = 0;
  const totalFrames = 28;

  const interval = setInterval(() => {
    let out = "";
    for (let i = 0; i < finalText.length; i++) {
      if (finalText[i] === " ") {
        out += " ";
      } else if (i < (frame / totalFrames) * finalText.length) {
        out += finalText[i];
      } else {
        out += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    el.textContent = out;
    frame++;

    if (frame > totalFrames) {
      el.textContent = finalText;
      clearInterval(interval);
    }
  }, 35);
})();

/* 2. Barra de progresso de leitura */
(function () {
  const bar = document.getElementById("barra-progresso");
  if (!bar) return;

  function atualizarBarra() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progresso = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${Math.min(100, Math.max(0, progresso))}%`;
  }

  window.addEventListener("scroll", atualizarBarra, { passive: true });
  atualizarBarra();
})();

/* 3. Animação de revelação das seções ao rolar a página */
(function () {
  const secoes = document.querySelectorAll(".revela");
  if (!secoes.length) return;

  if (!("IntersectionObserver" in window)) {
    secoes.forEach((sec) => sec.classList.add("visivel"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visivel");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  secoes.forEach((sec) => observer.observe(sec));
})();

/* 4. Interação dos flip-cards na linha do tempo */
(function () {
  const botoesCard = document.querySelectorAll(".flip-card-inner");

  botoesCard.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".flip-card");
      if (!card) return;

      const virou = card.classList.toggle("flipped");
      btn.setAttribute("aria-pressed", String(virou));
    });
  });
})();

/* 5. Contador de tempo na página */
(function () {
  const spanSegundos = document.getElementById("segundos-pagina");
  if (!spanSegundos) return;

  let segundos = 0;
  setInterval(() => {
    segundos++;
    spanSegundos.textContent = String(segundos);
  }, 1000);
})();