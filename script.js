"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function loadLanguageFile(lang) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${lang}.json`);
        return response.json();
    });
}
const enButton = document.getElementById('en');
const frButton = document.getElementById('fr');
if (enButton) {
    enButton.addEventListener('click', () => changeLanguage('en'));
}
if (frButton) {
    frButton.addEventListener('click', () => changeLanguage('fr'));
}
function afficherSelection() {
    const selectElement = document.getElementById('options');
    const choix = selectElement.value;
    changeLanguage(choix);
}
function setLanguageCookie(lang) {
    document.cookie = `lang=${lang};path=/;max-age=31536000`; // max-age est fixé à un an
}
function getLanguageFromCookie() {
    const match = document.cookie.match(/(^|;) ?lang=([^;]*)(;|$)/);
    return match ? match[2] : null;
}
function changeLanguage(lang) {
    return __awaiter(this, void 0, void 0, function* () {
        setLanguageCookie(lang); // Met à jour le cookie
        const translations = yield loadLanguageFile(lang);
        const greetingElement = document.getElementById('greeting');
        if (greetingElement) {
            greetingElement.textContent = translations.title;
        }
    });
}
function initializeLanguage() {
    const savedLang = getLanguageFromCookie();
    if (savedLang) {
        changeLanguage(savedLang);
    }
    else {
        changeLanguage('fr');
    }
}
initializeLanguage();
