import React, {createContext, useContext, useEffect, useState} from 'react';

export type Language = 'en' | 'ar';

const SESSION_STORAGE_KEY = 'gsd_lang_session';
const LEGACY_LOCAL_STORAGE_KEY = 'gsd_lang';

interface LanguageContextValue {
  lang: Language;
  isRtl: boolean;
  setLang: (next: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function resolveInitialLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'en';
  }
  try {
    window.localStorage.removeItem(LEGACY_LOCAL_STORAGE_KEY);
  } catch {
    // Ignore storage access errors in restricted browsing modes
  }

  const params = new URLSearchParams(window.location.search);
  const queryLang = params.get('lang');
  if (queryLang === 'ar') {
    return 'ar';
  }
  if (queryLang === 'en') {
    return 'en';
  }

  try {
    const savedSession = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (savedSession === 'ar') {
      return 'ar';
    }
  } catch {
    // Ignore storage access errors in restricted browsing modes
  }

  // Always default to English unless the user explicitly selects Arabic
  return 'en';
}

export function LanguageProvider({children}: {children: React.ReactNode}) {
  const [lang, setLangState] = useState<Language>(resolveInitialLanguage);

  useEffect(() => {
    const isRtl = lang === 'ar';
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    try {
      if (lang === 'ar') {
        window.sessionStorage.setItem(SESSION_STORAGE_KEY, 'ar');
      } else {
        window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
      }
    } catch {
      // Ignore storage access errors
    }
  }, [lang]);

  const setLang = (next: Language) => {
    setLangState(next);
  };

  const toggleLang = () => {
    setLangState((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        isRtl: lang === 'ar',
        setLang,
        toggleLang,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      lang: 'en',
      isRtl: false,
      setLang: () => {},
      toggleLang: () => {},
    };
  }
  return ctx;
}
