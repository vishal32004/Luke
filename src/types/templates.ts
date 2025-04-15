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

export interface LandingPageTemplate {
  id: string
  name: string
  description: string
  thumbnail: string
  lastEdited: string
  elements: {
    logo?: string
    title?: string
    description?: string
    image?: string
    buttonText?: string
    buttonLink?: string
    additionalSettings?: Record<string, any>
  }
}
