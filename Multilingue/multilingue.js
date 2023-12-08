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
        const response = yield fetch(`Multilingue/lang/${lang}.json`);
        return response.json();
    });
}
function afficherSelection() {
    const selectElement = document.getElementById('options');
    const choix = selectElement.value;
    changeLanguage(choix);
}
function setLanguageCookie(lang) {
    document.cookie = `lang=${lang};path=/;max-age=31536000`;
}
function getLanguageFromCookie() {
    const match = document.cookie.match(/(^|;) ?lang=([^;]*)(;|$)/);
    return match ? match[2] : null;
}
function changeLanguage(lang) {
    return __awaiter(this, void 0, void 0, function* () {
        setLanguageCookie(lang);
        const translations = yield loadLanguageFile(lang);
        const navbarBrandElement = document.getElementById('navbar-brand');
        if (navbarBrandElement) {
            navbarBrandElement.textContent = translations.navbar.brand;
        }
        const navbarHomeElement = document.getElementById('navbar-home');
        if (navbarHomeElement) {
            navbarHomeElement.textContent = translations.navbar.home;
        }
        const navabarTransportsElement = document.getElementById('navbar-transport');
        if (navabarTransportsElement) {
            navabarTransportsElement.textContent = translations.navbar.transport;
        }
        const navbarPersonalImpactElement = document.getElementById('navbar-personalImpact');
        if (navbarPersonalImpactElement) {
            navbarPersonalImpactElement.textContent = translations.navbar.personalImpact;
        }
        const navabarIncomeImportanceElement = document.getElementById('navbar-incomeImportance');
        if (navabarIncomeImportanceElement) {
            navabarIncomeImportanceElement.textContent = translations.navbar.incomeImportance;
        }
        const navbarOneDegreeLimitElement = document.getElementById('navbar-oneDegreeLimit');
        if (navbarOneDegreeLimitElement) {
            navbarOneDegreeLimitElement.textContent = translations.navbar.oneDegreeLimit;
        }
        const navbarCountryActionElement = document.getElementById('navbar-countryAction');
        if (navbarCountryActionElement) {
            navbarCountryActionElement.textContent = translations.navbar.countryAction;
        }
        const climateChangeTitleElement = document.getElementById('climateChange-title');
        if (climateChangeTitleElement) {
            climateChangeTitleElement.textContent = translations.content.climateChange.title;
        }
        const climateChangeDescriptionElement = document.getElementById('climateChange-description');
        if (climateChangeDescriptionElement) {
            climateChangeDescriptionElement.textContent = translations.content.climateChange.description;
        }
        const transportTitleElement = document.getElementById('transport-title');
        if (transportTitleElement) {
            transportTitleElement.textContent = translations.content.transport.title;
        }
        const transportDescriptionElement = document.getElementById('transport-description');
        if (transportDescriptionElement) {
            transportDescriptionElement.textContent = translations.content.transport.description;
        }
        const personalImpactTitleElement = document.getElementById('personalImpact-title');
        if (personalImpactTitleElement) {
            personalImpactTitleElement.textContent = translations.content.personalImpact.title;
        }
        const personalImpactDescriptionElement = document.getElementById('personalImpact-description');
        if (personalImpactDescriptionElement) {
            personalImpactDescriptionElement.textContent = translations.content.personalImpact.description;
        }
        const incomeImportanceTitleElement = document.getElementById('incomeImportance-title');
        if (incomeImportanceTitleElement) {
            incomeImportanceTitleElement.textContent = translations.content.incomeImportance.title;
        }
        const incomeImportanceDescriptionElement = document.getElementById('incomeImportance-description');
        if (incomeImportanceDescriptionElement) {
            incomeImportanceDescriptionElement.textContent = translations.content.incomeImportance.description;
        }
        const oneDegreeLimitTitleElement = document.getElementById('oneDegreeLimit-title');
        if (oneDegreeLimitTitleElement) {
            oneDegreeLimitTitleElement.textContent = translations.content.oneDegreeLimit.title;
        }
        const oneDegreeLimitDescriptionElement = document.getElementById('oneDegreeLimit-description');
        if (oneDegreeLimitDescriptionElement) {
            oneDegreeLimitDescriptionElement.textContent = translations.content.oneDegreeLimit.description;
        }
        const countryActionTitleElement = document.getElementById('countryAction-title');
        if (countryActionTitleElement) {
            countryActionTitleElement.textContent = translations.content.countryAction.title;
        }
        const countryActionDescriptionElement = document.getElementById('countryAction-description');
        if (countryActionDescriptionElement) {
            countryActionDescriptionElement.textContent = translations.content.countryAction.description;
        }
        const errorPageTitleElement = document.getElementById('errorPage-title');
        if (errorPageTitleElement) {
            errorPageTitleElement.textContent = translations.errorPage.title;
        }
        const errorPageMessageElement = document.getElementById('errorPage-message');
        if (errorPageMessageElement) {
            errorPageMessageElement.textContent = translations.errorPage.message;
        }
        const errorPagesubTitleElement = document.getElementById('errorPage-subTitle');
        if (errorPagesubTitleElement) {
            errorPagesubTitleElement.textContent = translations.errorPage.subTitle;
        }
        const selectElement = document.getElementById('options');
        if (selectElement) {
            selectElement.value = lang;
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
