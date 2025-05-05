export async function getProducts() {
    const res = await fetch('/api/products')
    if (!res.ok) throw new Error('Erro ao carregar produtos')
    return res.json()
  }
  