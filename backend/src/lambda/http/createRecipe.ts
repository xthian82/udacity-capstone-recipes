import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from 'aws-lambda'

import {CreateRecipeRequest} from '../../requests/CreateRecipeRequest'
import {getUserId} from "../utils";
import {createLogger} from "../../utils/logger";
import {createRecipe} from "../../businessLogic/recipes";

const logger = createLogger('createRecipeFunc')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newRecipe: CreateRecipeRequest = JSON.parse(event.body)
    const userId = getUserId(event)

    logger.info('creating recipe ', JSON.stringify(newRecipe), ' for user ', userId)
    const newItem = await createRecipe(newRecipe, userId)

    return {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
            item: newItem
        })
    }
}
