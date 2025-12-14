
export interface AddProductDto {
 userId: string | null | undefined ;
  prodcutName: string;  
  provinceId: string;  
  description: string;
  price: string;
  contact: string;
  categoryId: string;
  addressDescription: string;
  imagesList: { id : string,uri: string }[];
}
