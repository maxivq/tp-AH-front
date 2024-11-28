export async function call({ uri, method = 'GET', body }) {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    const response = await fetch(`http://localhost:3333/api/${uri}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
  
    return response.json();
  }