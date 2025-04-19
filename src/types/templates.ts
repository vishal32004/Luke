export interface Template {
  id: string
  title: string
  value: string
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
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  elements: {
    logo?: string;
    logoSize?: string;
    title?: string;
    titleSize?: string;
    titleWeight?: string;
    description?: string;
    descriptionSize?: string;
    buttonText?: string;
    buttonLink?: string;
    bannerImage?: string;
    footerText?: string;
    textColor?: string;
    buttonStyle?: string;
    buttonSize?: string;
    textAlignment?: string;
    contentSpacing?: string;
    animation?: string;
    overlay?: string;
  };
}