import configJson from "./auth_config.json";


const apiId = '2b1ha2nwv8'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export function getConfig() {

    return {
        domain: configJson.domain,
        clientId: configJson.clientId,
        callbackUrl: configJson.callbackUrl
    };
}


