import * as sdk from '@ory/client';

export const OryClient = new sdk.FrontendApi(
  new sdk.Configuration({
    basePath: process.env.ORY_SDK_URL,
  }),
);
