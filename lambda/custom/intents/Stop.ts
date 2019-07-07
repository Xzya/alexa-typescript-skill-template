import { RequestHandler } from "ask-sdk-core";
import { IntentTypes, Strings } from "../lib/constants";
import { IsIntent, GetRequestAttributes } from "../lib/helpers";

export const Stop: RequestHandler = {
  canHandle(handlerInput) {
    return IsIntent(handlerInput, IntentTypes.AmazonStop, IntentTypes.AmazonCancel);
  },
  handle(handlerInput) {
    const { t } = GetRequestAttributes(handlerInput);

    const speechText = t(Strings.GOODBYE_MSG);

    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(true)
      .getResponse();
  }
};
