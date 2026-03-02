export function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const clockSkewBuffer = 30;
    return payload.exp * 1000 > Date.now() - clockSkewBuffer * 1000;
  } catch {
    return false;
  }
}

export function clearAuthAndRedirect(): void {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/";
}
