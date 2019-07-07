import { ErrorHandler } from "ask-sdk-core";
import { GetRequestAttributes } from "../lib/helpers";
import { Strings } from "../lib/constants";

/**
 * Handles unknown errors. Should be placed at the end, as it will catch
 * all errors.
 */
export const Unknown: ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.error(error);

    const { t } = GetRequestAttributes(handlerInput);

    const speechText = t(Strings.ERROR_MSG);

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};
