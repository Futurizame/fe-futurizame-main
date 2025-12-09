import enLayout from "./res/en/layout.json";
import esLayout from "./res/es/layout.json";
import enFooter from "./res/en/footer.json";
import esFooter from "./res/es/footer.json";
import enRoutes from "./res/en/routes.json";
import esRoutes from "./res/es/routes.json";
import enEye from "./res/en/eye.json";
import esEye from "./res/es/eye.json";

const resources = {
  en: {
    layout: enLayout,
    footer: enFooter,
    routes: enRoutes,
    eye: enEye,
  },
  es: {
    layout: esLayout,
    footer: esFooter,
    routes: esRoutes,
    eye: esEye,
  },
};

export const getTranslator = (locale: string) => (res: string, key: string) => {
  return resources[locale]?.[res]?.[key] || key;
};
