import { useLanguage } from "@/context/LanguageContext";
import { translations } from "./translations";

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (path: string): string => {
    const keys = path.split(".");
    let value: any = translations[language];

    for (const key of keys) {
      value = value?.[key];
    }

    return value || path;
  };

  return { t, language };
};
