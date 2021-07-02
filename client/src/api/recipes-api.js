import { apiEndpoint } from '../config'
import { Recipe } from '../types/Recipe';
import { CreateRecipeRequest } from '../types/CreateRecipeRequest';
import { UpdateRecipeRequest } from '../types/UpdateRecipeRequest';
import Axios from 'axios'

/*
export async function searchRecipes(searchQuery?: string): Promise<Recipe> {
  console.log(`Searching recipes with query [${searchQuery}]`)

  const response = await Axios.get(`${apiEndpoint}/search-recipe${searchQuery ? ('?q='+searchQuery) : ''}`, {
    headers: {
      'Content-Type': 'application/json'
    },
  })
  console.log('searching response:', response.data)
  return response.data?.item
}

export async function createRecipe(
  idToken: string,
  newTodo: CreateRecipeRequest
): Promise<Recipe> {
  const response = await Axios.post(`${apiEndpoint}/recipes`,  JSON.stringify(newTodo), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.item
}

export async function patchRecipe(
  idToken: string,
  recipeId: string,
  updatedTodo: UpdateRecipeRequest
): Promise<void> {
  await Axios.patch(`${apiEndpoint}/recipes/${recipeId}`, JSON.stringify(updatedTodo), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function deleteRecipe(
  idToken: string,
  recipeId: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/recipes/${recipeId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function getUploadUrl(
  idToken: string,
  recipeId: string
): Promise<string> {
  const response = await Axios.post(`${apiEndpoint}/recipes/${recipeId}/attachment`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.uploadUrl
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
  await Axios.put(uploadUrl, file)
}
 */
