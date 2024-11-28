import { call } from "./api.service";

export async function getProductos(limit = 3) {
  return call({ uri: `productos/limited?limit=${limit}` }); // Llamar a la ruta correcta
}

export async function getProducto(id) {
  return call({ uri: `productos/${id}` });
}