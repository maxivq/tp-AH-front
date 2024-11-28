import { call } from "./api.service";

export async function getCart() {
  return call({ uri: "cart" });
}

export async function addToCart(productId, quantity) {
  return call({
    uri: "cart",
    method: "POST",
    body: { productId, quantity },
  });
}

export async function removeFromCart(productId) {
  return call({
    uri: `cart/${productId}`,
    method: "DELETE",
  });
}