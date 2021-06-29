import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from 'aws-lambda'
import {createLogger} from "../../utils/logger";
import {getUserId} from "../utils";
import {deleteRecipe} from "../../businessLogic/recipes";

const logger = createLogger('deleteRecipeFunc')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const recipeId = event.pathParameters.recipeId

    const userId = getUserId(event)

    logger.info('deleting recipe id ', recipeId, ' for user ', userId)
    await deleteRecipe(recipeId, userId)

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: ''
    }
}
