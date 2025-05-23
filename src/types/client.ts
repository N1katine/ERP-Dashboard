export type ClientSegment = 'Varejo' | 'Atacado' | 'Corporativo'

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  segment: ClientSegment
  value: string
  address?: string
  notes?: string
  productId?: string
  quantity?: number
  birthDate?: string
  createdAt: Date
  updatedAt: Date
}

export interface Interaction {
  id: string
  clientId: string
  type: string
  date: string
  details: string
  createdAt: Date
}
