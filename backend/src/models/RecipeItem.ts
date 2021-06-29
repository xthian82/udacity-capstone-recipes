export interface RecipeItem {
    userId: string
    recipeId: string
    createdAt: string
    title: string
    category?: string
    attachmentUrl?: string
    ingredients?: [string]
    socialRank?: number
}
