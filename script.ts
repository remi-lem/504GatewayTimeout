async function loadLanguageFile(lang: string): Promise<any> {
  const response = await fetch(`${lang}.json`);
  return response.json();
}

const enButton = document.getElementById('en');
const frButton = document.getElementById('fr');

if (enButton) {
  enButton.addEventListener('click', () => changeLanguage('en'));
}

if (frButton) {
  frButton.addEventListener('click', () => changeLanguage('fr'));
}

function afficherSelection(): void {
  const selectElement: HTMLSelectElement | null = document.getElementById('options') as HTMLSelectElement;

  const choix: string = selectElement.value;
  changeLanguage(choix);
}
function setLanguageCookie(lang: string) {
  document.cookie = `lang=${lang};path=/;max-age=31536000`;
}

function getLanguageFromCookie(): string | null {
  const match = document.cookie.match(/(^|;) ?lang=([^;]*)(;|$)/);
  return match ? match[2] : null;
}

async function changeLanguage(lang: string) {
  setLanguageCookie(lang);

  const translations = await loadLanguageFile(lang);
  const greetingElement = document.getElementById('greeting');
  if (greetingElement) {
    greetingElement.textContent = translations.title;
  }

  const selectElement = document.getElementById('options') as HTMLSelectElement;
  if (selectElement) {
    selectElement.value = lang;
  }
}

function initializeLanguage() {
  const savedLang = getLanguageFromCookie();
  if (savedLang) {
    changeLanguage(savedLang);
  } else {
    changeLanguage('fr');
  }
}

initializeLanguage();
