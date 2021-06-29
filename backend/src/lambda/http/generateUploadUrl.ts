import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from 'aws-lambda'
import {createLogger} from "../../utils/logger";
import {getUserId} from "../utils";
import {generateUrlImage} from "../../businessLogic/recipes";

const logger = createLogger('imageRecipeFunc')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const recipeId = event.pathParameters.recipeId
    const userId = getUserId(event)

    logger.info('creating image for recipe ', recipeId, ' for user ', userId)
    const uploadUrl = await generateUrlImage(userId, recipeId)

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
            uploadUrl: uploadUrl
        })
    }
}
