import { useLocalStorage } from './useLocalStorage'
import type { Client } from '../types/client'

export function useClientStore() {
  const [clients, setClients] = useLocalStorage<Client[]>('clients', [
    { 
      id: '1', 
      name: 'Empresa ABC Ltda', 
      email: 'contato@abc.com', 
      phone: '(11) 9999-8888', 
      segment: 'corporate', 
      lastPurchase: '15/04/2025', 
      value: 'R$ 12.500',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: '2', 
      name: 'Comércio XYZ', 
      email: 'contato@xyz.com', 
      phone: '(11) 7777-6666', 
      segment: 'retail', 
      lastPurchase: '10/04/2025', 
      value: 'R$ 3.200',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: '3', 
      name: 'Distribuidora 123', 
      email: 'vendas@123.com', 
      phone: '(11) 5555-4444', 
      segment: 'wholesale', 
      lastPurchase: '05/04/2025', 
      value: 'R$ 8.750',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: '4', 
      name: 'Loja FastShop', 
      email: 'atendimento@fastshop.com', 
      phone: '(11) 3333-2222', 
      segment: 'retail', 
      lastPurchase: '01/04/2025', 
      value: 'R$ 2.100',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: '5', 
      name: 'Corporação Global', 
      email: 'contato@global.com', 
      phone: '(11) 1111-0000', 
      segment: 'corporate', 
      lastPurchase: '28/03/2025', 
      value: 'R$ 15.800',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])

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
  const getClient = (id: string) => {
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
