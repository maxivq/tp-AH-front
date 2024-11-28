import { call } from "./api.service";

export async function createOrder(orderData) {
  return call({
    uri: "orders",
    method: "POST",
    body: orderData,
  });
}

export async function getUserOrders() {
  return call({ uri: "orders" });
}

export async function getOrderById(orderId) {
  return call({ uri: `orders/${orderId}` });
}