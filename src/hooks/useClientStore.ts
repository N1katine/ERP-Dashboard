import { useLocalStorage } from './useLocalStorage'
import type { Client } from '../types/client'

export function useClientStore() {
  const [clients, setClients] = useLocalStorage<Client[]>('clients', [])

  // Add a new client
  const addClient = (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newClient: Client = {
      ...client,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setClients([...clients, newClient])
    return newClient
  }

  // Update an existing client
  const updateClient = (id: string, updatedClient: Partial<Omit<Client, 'id' | 'createdAt' | 'updatedAt'>>) => {
    const updatedClients = clients.map((client) => {
      if (client.id === id) {
        return {
          ...client,
          ...updatedClient,
          updatedAt: new Date(),
        }
      }
      return client
    })
    setClients(updatedClients)
  }

  // Delete a client
  const deleteClient = (id: string) => {
    const updatedClients = clients.filter((client) => client.id !== id)
    setClients(updatedClients)
  }

  // Get a single client by ID
  const getClient = (id: string | undefined) => {
    if(id === undefined) return
    
    return clients.find((client) => client.id === id)
  }

  // Get client segments with counts
  const getClientSegments = () => {
    const segments = [
      { id: 'retail', name: 'Varejo', count: 0 },
      { id: 'wholesale', name: 'Atacado', count: 0 },
      { id: 'corporate', name: 'Corporativo', count: 0 }
    ]
    
    clients.forEach(client => {
      const segment = segments.find(s => s.id === client.segment)
      if (segment) segment.count++
    })
    
    return segments
  }

  return {
    clients,
    addClient,
    updateClient,
    deleteClient,
    getClient,
    getClientSegments
  }
}

export default useClientStore
