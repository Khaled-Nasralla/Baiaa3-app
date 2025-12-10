// constants/myFavorites.ts

export type FavoriteProduct = {
  id: string;
  name: string;
  price: string;
  image?: string;
};

// مثال للمنتجات المفضلة
export const myFavorites: FavoriteProduct[] = [
  {
    id: "1",
    name: "منتج 1",
    price: "100 ريال",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    name: "منتج 2",
    price: "250 ريال",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    name: "منتج 3",
    price: "75 ريال",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "4",
    name: "منتج 4",
    price: "150 ريال",
    image: "https://via.placeholder.com/150",
  },
];
