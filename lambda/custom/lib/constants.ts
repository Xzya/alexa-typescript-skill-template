export enum RequestTypes {
  Launch = "LaunchRequest",
  Intent = "IntentRequest",
  SessionEnded = "SessionEndedRequest",
  SystemExceptionEncountered = "System.ExceptionEncountered",
}

export enum IntentTypes {
  AmazonHelp = "AMAZON.HelpIntent",
  AmazonStop = "AMAZON.StopIntent",
  AmazonCancel = "AMAZON.CancelIntent",
  AmazonFallback = "AMAZON.FallbackIntent",

  HelloWorld = "HelloWorldIntent",
}

export enum ErrorTypes {
  Unknown = "UnknownError",
  Unexpected = "UnexpectedError",
}

export enum SlotTypes {
}

export enum LocaleTypes {
  deDE = "de-DE",
  enAU = "en-AU",
  enCA = "en-CA",
  enGB = "en-GB",
  enIN = "en-IN",
  enUS = "en-US",
  esES = "es-ES",
  esMX = "es-MX",
  esUS = "es-US",
  frCA = "fr-CA",
  frFR = "fr-FR",
  itIT = "it-IT",
  jaJP = "ja-JP",
  ptBR = "pt-BR",
}

export enum Strings {
  WELCOME_MSG = "WELCOME_MSG",
  GOODBYE_MSG = "GOODBYE_MSG",
  HELP_MSG = "HELP_MSG",
  ERROR_MSG = "ERROR_MSG",
  ERROR_UNEXPECTED_MSG = "ERROR_UNEXPECTED_MSG",
  FALLBACK_MSG = "FALLBACK_MSG",
  FALLBACK_REPROMPT = "FALLBACK_REPROMPT",
  HELLO_MSG = "HELLO_MSG",
}
