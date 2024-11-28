import { call } from './api.service';

export async function login({ email, password }) {
  const response = await call({
    uri: 'users/login',
    method: 'POST',
    body: { email, password },
  });
  return response;
}

export async function register(name, email, password) {
  return call({
    uri: 'users/register',
    method: 'POST',
    body: { name, email, password }
  });
}