(function () {
  "use strict";

  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("menu-principal");

  if (toggle && nav) {
    var setMenu = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      nav.classList.toggle("is-open", open);
    };
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".site-header")) setMenu(false);
    });
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setMenu(false);
        toggle.focus();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) setMenu(false);
    });
  }

  function showFeedback(el, message, isError) {
    if (!el) return;
    el.textContent = message;
    el.classList.toggle("is-error", !!isError);
    el.classList.add("is-visible");
  }

  function setFieldError(field, message) {
    var wrap = field.closest(".field");
    if (!wrap) return;
    var err = wrap.querySelector(".field-error");
    wrap.classList.toggle("has-error", !!message);
    field.setAttribute("aria-invalid", message ? "true" : "false");
    if (err) err.textContent = message || "";
  }

  function enableNativeValidation(form) {
    form.noValidate = true;
    function validateText(field) {
      if (!field.matches('input[type="text"], textarea')) return;
      var value = field.value.trim();
      field.setCustomValidity(field.required && !value ? "Preencha este campo." :
        value && field.minLength > 0 && value.length < field.minLength ?
          "Escreva pelo menos " + field.minLength + " caracteres." : "");
    }
    form.addEventListener("submit", function () {
      form.querySelectorAll('input[type="text"], textarea').forEach(validateText);
    });
    form.addEventListener(
      "invalid",
      function (e) {
        e.preventDefault(); 
        setFieldError(e.target, e.target.validationMessage);
      },
      true
    );
    form.addEventListener("input", function (e) {
      validateText(e.target);
      if (e.target.validity && e.target.validity.valid) setFieldError(e.target, "");
    });
    form.addEventListener("change", function (e) {
      if (e.target.validity && e.target.validity.valid) setFieldError(e.target, "");
    });
  }

  function focusFirstInvalid(form) {
    var first = form.querySelector(":invalid");
    if (first) first.focus();
  }

  var formPlan = document.getElementById("form-planejamento");
  if (formPlan) {
    enableNativeValidation(formPlan);
    var planFeedback = document.getElementById("feedback-planejamento");
    var hidePlanSummary = function () {
      planFeedback.classList.remove("is-visible");
    };
    formPlan.addEventListener("input", hidePlanSummary);
    formPlan.addEventListener("change", hidePlanSummary);

    formPlan.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!formPlan.checkValidity()) {
        hidePlanSummary();
        focusFirstInvalid(formPlan);
        return;
      }
      var cultura = formPlan.cultura.options[formPlan.cultura.selectedIndex].text;
      var area = Number(formPlan.area.value).toLocaleString("pt-BR");
      var local = formPlan.localizacao.value.trim();
      document.getElementById("resumo-cultura").textContent = cultura;
      document.getElementById("resumo-area").textContent = area + " ha";
      document.getElementById("resumo-localizacao").textContent = local;
      planFeedback.classList.add("is-visible");
      formPlan.querySelector('button[type="submit"] span').textContent = "Atualizar resumo";
      planFeedback.focus({ preventScroll: true });
      planFeedback.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
  }

  var formObs = document.getElementById("form-observacoes");
  if (formObs) {
    var obsField = document.getElementById("observacao");
    var obsFeedback = document.getElementById("feedback-observacoes");
    var obsList = document.getElementById("lista-observacoes");

    formObs.addEventListener("submit", function (e) {
      e.preventDefault();
      var text = obsField.value.trim();
      if (!text) {
        setFieldError(obsField, "Escreva uma observação antes de registrar.");
        showFeedback(obsFeedback, "Não foi possível registrar: o campo está vazio.", true);
        obsField.focus();
        return;
      }
      setFieldError(obsField, "");

      var li = document.createElement("li");
      var time = document.createElement("time");
      var now = new Date();
      time.dateTime = now.toISOString();
      time.textContent = now.toLocaleString("pt-BR");
      li.appendChild(time);
      li.appendChild(document.createTextNode(text)); 
      obsList.prepend(li);
      var count = obsList.children.length;
      document.getElementById("obs-count").textContent = count + (count === 1 ? " anotação" : " anotações");
      document.getElementById("obs-empty").hidden = true;

      obsField.value = "";
      showFeedback(
        obsFeedback,
        "Anotação guardada nesta página. Ela será apagada se você recarregar."
      );
    });

    obsField.addEventListener("input", function () {
      if (obsField.value.trim()) setFieldError(obsField, "");
    });
  }

  var analysisButton = document.getElementById("btn-nova-analise");
  if (analysisButton) {
    var analyses = [
      {
        level: "",
        symbol: "✓",
        title: "Sua plantação está saudável!",
        text: "Continue monitorando as condições para manter uma boa produção.",
        tips: ["Mantenha a umidade do solo adequada.", "Fique atento a possíveis pragas."]
      },
      {
        level: "is-warn",
        symbol: "!",
        title: "Atenção à umidade do solo",
        text: "A umidade merece uma verificação mais atenta antes de ajustar a irrigação.",
        tips: ["Observe os trechos mais secos da área.", "Registre as chuvas recentes e a última irrigação."]
      },
      {
        level: "is-warn",
        symbol: "!",
        title: "Observe as folhas da plantação",
        text: "Mudanças na cor ou manchas nas folhas merecem acompanhamento.",
        tips: ["Fotografe as plantas que chamaram sua atenção.", "Procure apoio técnico antes de escolher um tratamento."]
      }
    ];
    var analysisIndex = 0;
    analysisButton.addEventListener("click", function () {
      analysisIndex = (analysisIndex + 1) % analyses.length;
      var analysis = analyses[analysisIndex];
      document.getElementById("status-card").className = "recommendation-result " + analysis.level;
      document.getElementById("status-simbolo").textContent = analysis.symbol;
      document.getElementById("status-titulo").textContent = analysis.title;
      document.getElementById("status-texto").textContent = analysis.text;
      var tips = document.getElementById("lista-dicas");
      tips.replaceChildren();
      analysis.tips.forEach(function (tip) {
        var li = document.createElement("li");
        li.textContent = tip;
        tips.appendChild(li);
      });
    });
  }

  var formContato = document.getElementById("form-contato");
  if (formContato) {
    enableNativeValidation(formContato);
    var contatoFeedback = document.getElementById("feedback-contato");

    formContato.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!formContato.checkValidity()) {
        showFeedback(contatoFeedback, "Revise os campos destacados antes de enviar.", true);
        focusFirstInvalid(formContato);
        return;
      }
      var nome = formContato.nome.value.trim().split(/\s+/)[0];
      showFeedback(
        contatoFeedback,
        "Tudo certo com o preenchimento, " + nome + ". Como este formulário é uma demonstração, nenhuma mensagem foi enviada."
      );
    });
  }

  var heroVideo = document.getElementById("video-header");
  if (heroVideo) {
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    var applyMotionPreference = function () {
      heroVideo.autoplay = !reducedMotion.matches;
      if (reducedMotion.matches) {
        heroVideo.pause();
      } else {
        heroVideo.play().catch(function () {});
      }
    };
    applyMotionPreference();
    reducedMotion.addEventListener("change", applyMotionPreference);
  }
})();
