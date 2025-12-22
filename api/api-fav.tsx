import { ProductPreviewDto } from "@/dtos/product-preview-dto";
import { api } from "./api";


export async function LikedProduct(userId: string | undefined, productId: string): Promise<void> {
    return api.post("/fav/liked", {
        userId: userId,
        productId: productId
    })
}

export async function DeleteLikedProduct(userId: string | undefined, productId: string): Promise<void> {
    return api.post("/fav/unliked", {
        userId: userId,
        productId: productId
    })
}

export async function GetLikedProduects(userId: string | undefined): Promise<ProductPreviewDto[]> {
    const data = await api.get(`/fav/favorites/${userId}`, {
    })
    return data.data.data;
}


export async function Isliked(userId: string | undefined, productId: string): Promise<boolean> {
    const data = await api.get(`/fav/${userId}/isLiked/${productId}`)
    console.log(data.data.data);
    return data.data.data;
}