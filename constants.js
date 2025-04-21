export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_KEY = import.meta.env.VITE_API_KEY;

export const API_HEADERS = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW5uYWJyZWtrZSIsImVtYWlsIjoiYW5uYWFzMDAyMDhAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3NDUyMjQwNzV9.wF9T2y9e2cPfTC_OwPggjzxEcQ5p0TMrb9DFXHbteT0",
    "X-Noroff-API-Key": API_KEY,
  },
};
