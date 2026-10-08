export type Product = {
  id: number
  title: string
  description: string
  price: number
  stock: number
  category: string
  thumbnail: string
}

const API_BASE = "https://dummyjson.com"

export async function getProducts(limit = 12): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products?limit=${limit}`, {
    cache: "no-store",
  })
  if (!res.ok) throw new Error("Failed to fetch products")
  const data = await res.json()
  return data.products
}

export async function getProduct(id: string | number): Promise<Product | null> {
  const res = await fetch(`${API_BASE}/products/${id}`, { cache: "no-store" })
  if (res.status === 404) return null
  if (!res.ok) throw new Error("Failed to fetch product")
  return res.json()
}

export async function searchProducts(q: string): Promise<Product[]> {
  const res = await fetch(
    `${API_BASE}/products/search?q=${encodeURIComponent(q)}`,
    { cache: "no-store" }
  )
  if (!res.ok) throw new Error("Failed to search products")
  const data = await res.json()
  return data.products
}

export async function updateProduct(
  id: string | number,
  values: Partial<Pick<Product, "title" | "price" | "description" | "stock">>
) {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  })
  if (!res.ok) throw new Error("Failed to update product")
  return res.json()
}

export async function deleteProduct(id: string | number) {
  const res = await fetch(`${API_BASE}/products/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error("Failed to delete product")
  return res.json()
}