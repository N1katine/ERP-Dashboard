import type { Sell } from '../types/sell'
import { useLocalStorage } from './useLocalStorage'

export function useSellStore() {
  const [sells, setSells] = useLocalStorage<Sell[]>('sells', [])

  // Add a new sell
  const addSell = (sell: Omit<Sell, 'id'>) => {
    const newSell: Sell = {
      ...sell,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setSells([...sells, newSell])
    return newSell
  }

  // Update an existing sell
  const updateSell = (id: string, updatedSell: Omit<Sell, 'id'>) => {
    const updatedSells = sells.map((sell) => {
      if (sell.id === id) {
        return {
          ...sell,
          ...updatedSell,
          updatedAt: new Date(),
        }
      }
      return sell
    })
    setSells(updatedSells)
  }

  // Delete a sell
  const deleteSell = (id: string) => {
    const updatedSells = sells.filter((sell) => sell.id !== id)
    setSells(updatedSells)
  }

  // Get a single sell by ID
  const getSell = (id: string) => {
    return sells.find((sell) => sell.id === id)
  }

  return {
    sells,
    addSell,
    updateSell,
    deleteSell,
    getSell,
  }
}
