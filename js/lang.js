document.addEventListener("DOMContentLoaded", () => {
  const langButtons = document.querySelectorAll(".lang-btn");

  function getValueByPath(obj, path) {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  }

function translatePage(translations) {
  document.querySelectorAll("[data-u18n]").forEach(el => {
    const key = el.getAttribute("data-u18n");
    const value = getValueByPath(translations, key);

    if (value !== undefined) {
      if (Array.isArray(value) && (el.tagName === "UL" || el.tagName === "OL")) {
        el.innerHTML = value.map(item => `<li>${item}</li>`).join("");
      } else {
        el.textContent = value;
      }
    }
  });
  
    // Перевод плейсхолдеров
    document.querySelectorAll("[data-u18n-placeholder]").forEach(el => {
      const key = el.getAttribute("data-u18n-placeholder");
      const value = getValueByPath(translations, key);
      if (value !== undefined) {
        el.setAttribute("placeholder", value);
      }
    });

    // Перевод заголовка окна
    if (translations.title) {
      document.title = translations.title;
    }
  }

  function setLanguage(lang) {
    fetch(`./assets/lang/${lang}.json`)
      .then(res => {
        if (!res.ok) throw new Error("Translation file not found");
        return res.json();
      })
      .then(translations => {
        translatePage(translations);
        localStorage.setItem("language", lang);
      })
      .catch(err => {
        console.error("Translation loading error:", err);
      });
  }

  langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      setLanguage(lang);
    });
  });

  const savedLang = localStorage.getItem("language") || "uk";
  setLanguage(savedLang);
});
