import { RequestInterceptor } from "ask-sdk-core";
import * as i18next from "i18next";
// temporary fix until the typings are correctly made by the author
// https://github.com/i18next/i18next/issues/1271
const i18n: i18next.default.i18n = i18next as any;
import * as sprintf from "i18next-sprintf-postprocessor";
import { strings } from "../lib/strings";
import { RequestAttributes } from "../typings";

/**
 * Adds translation functions to the RequestAttributes.
 */
export const Localization: RequestInterceptor = {
  process(handlerInput) {
    i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: strings,
      returnObjects: true,
    });

    function t(...args: any[]) {
      const value = (i18n.t as any)(...args);

      if (Array.isArray(value)) {
        return value[Math.floor(Math.random() * value.length)];
      }

      return value;
    };

    const attributes = handlerInput.attributesManager.getRequestAttributes() as RequestAttributes;
    attributes.t = t;
  },
};
