export interface Config {

}

export enum EnvironmentTypes {
  Local = "local",
  Development = "dev",
  Production = "prod",
}

export function GetConfig(): Config {
  const env = process.env.ENV as EnvironmentTypes;
  if (env) {
    switch (env) {
      case EnvironmentTypes.Local:
        return {

        };
      case EnvironmentTypes.Development:
        return {

        };
      case EnvironmentTypes.Production:
        return {

        };
      default:
        throw new Error(`Unknown ENV value ${env}`);
    }
  }
  throw new Error("ENV environment variable not set");
}

export const config = GetConfig();
