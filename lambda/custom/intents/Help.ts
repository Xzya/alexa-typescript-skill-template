import { RequestHandler } from "ask-sdk-core";
import { IsIntent, GetRequestAttributes } from "../lib/helpers";
import { IntentTypes, Strings } from "../lib/constants";

export const Help: RequestHandler = {
  canHandle(handlerInput) {
    return IsIntent(handlerInput, IntentTypes.AmazonHelp);
  },
  handle(handlerInput) {
    const { t } = GetRequestAttributes(handlerInput);

    const speechText = t(Strings.HELP_MSG);

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  }
};
