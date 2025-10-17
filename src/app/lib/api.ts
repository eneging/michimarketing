// lib/api.ts
export async function requestDownload(productId: number, token: string) {
  if (!token) throw new Error("Token no presente");

  const url = `${process.env.NEXT_PUBLIC_API_URL}api/drive/files/${productId}/download`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      // credentials: 'include', // descomenta si usas cookies/Sanctum
    });

    // Si hay fallo de red (CORS bloqueado) este bloque puede ser alcanzado:
    if (!res.ok) {
      // intenta parsear JSON de error, sino devuelve texto
      const contentType = res.headers.get("content-type") || "";
      const body = contentType.includes("application/json")
        ? await res.json().catch(() => null)
        : await res.text().catch(() => null);

      const msg = (body && (body.message || JSON.stringify(body))) || `${res.status} ${res.statusText}`;
      throw new Error(msg);
    }

    const data = await res.json();
    return data;
  } catch (err: any) {
    // Distinción clara: si es un TypeError de fetch => probable CORS o no reachable
    if (err instanceof TypeError) {
      console.error("[requestDownload] network/Fetch TypeError:", err);
      throw new Error("Network error: no se pudo conectar al backend (CORS / backend no iniciado).");
    }
    throw err;
  }
}
