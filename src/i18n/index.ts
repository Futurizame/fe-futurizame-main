import enLayout from "./res/en/layout.json";
import esLayout from "./res/es/layout.json";
import enHeader from "./res/en/header.json";
import esHeader from "./res/es/header.json";
import enFooter from "./res/en/footer.json";
import esFooter from "./res/es/footer.json";
import enRoutes from "./res/en/routes.json";
import esRoutes from "./res/es/routes.json";
import enHome from "./res/en/home.json";
import esHome from "./res/es/home.json";
import enEye from "./res/en/eye.json";
import esEye from "./res/es/eye.json";

const resources = {
  en: {
    layout: enLayout,
    header: enHeader,
    footer: enFooter,
    routes: enRoutes,
    home: enHome,
    eye: enEye,
  },
  es: {
    layout: esLayout,
    header: esHeader,
    footer: esFooter,
    routes: esRoutes,
    home: esHome,
    eye: esEye,
  },
};

export const getTranslator = (locale: string) => (res: string, key: string) => {
  return resources[locale]?.[res]?.[key] || key;
};
