export interface Template {
  id: string
  title: string
  category: string
  subCategory: string
  imageUrl: string
  content?: string
}

export interface Category {
  name: string
  subCategories: string[]
}

