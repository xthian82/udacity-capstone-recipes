import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from 'aws-lambda'

import {UpdateRecipeRequest} from '../../requests/UpdateRecipeRequest'
import {createLogger} from "../../utils/logger";
import {updateRecipe} from "../../businessLogic/recipes";
import {getUserId} from "../utils";

const logger = createLogger('updateRecipeFunc')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const recipeId = event.pathParameters.recipeId
    const updatedRecipe: UpdateRecipeRequest = JSON.parse(event.body)
    const userId = getUserId(event)

    logger.info('update recipe ', JSON.stringify(updatedRecipe), ' for id ', recipeId, ' for user ', userId)
    const updatedItem = await updateRecipe(updatedRecipe, recipeId, userId)

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
            ...updatedItem
        })
    }
}
