import { initIntl } from "minimal-intl";
import de from "./de.json";
import en from "./en.json";

export const intl = initIntl({ en, de }, "en");
