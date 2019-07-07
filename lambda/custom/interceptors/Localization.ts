import { RequestInterceptor } from "ask-sdk-core";
import i18n from "i18next";
import * as sprintf from "i18next-sprintf-postprocessor";
import { strings } from "../lib/strings";
import { RequestAttributes } from "../interfaces";

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
