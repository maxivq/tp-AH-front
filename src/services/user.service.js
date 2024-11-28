import { call } from "./api.service";

export async function getUserProfile() {
  return call({ uri: "users/profile" });
}

export async function updateUserProfile(userData) {
  return call({
    uri: "users/profile",
    method: "PUT",
    body: userData,
  });
}