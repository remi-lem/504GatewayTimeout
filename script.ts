async function loadLanguageFile(lang: string): Promise<any> {
  const response = await fetch(`${lang}.json`);
  return response.json();
}

async function changeLanguage(lang: string) {
  const translations = await loadLanguageFile(lang);
  const greetingElement = document.getElementById('greeting');
  if (greetingElement) {
    greetingElement.textContent = translations.title;
  }
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

changeLanguage('fr');
