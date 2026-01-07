import type { Category, GiftItem } from '../types/gifts';

export const createGiftItems = (categories: Category[]): GiftItem[] =>
  categories.flatMap((category) =>
    category.items.map((item, index) => ({
      id: `${category.name.toLowerCase()}-${index + 1}`,
      name: item,
      category: category.name,
    }))
  );
