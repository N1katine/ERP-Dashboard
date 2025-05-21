export type ClientSegment = 'retail' | 'wholesale' | 'corporate'

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  segment: ClientSegment
  lastPurchase: string
  value: string
  address?: string
  notes?: string
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
