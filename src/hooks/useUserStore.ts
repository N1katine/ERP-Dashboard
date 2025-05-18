import type { User } from '../types/user'
import { useLocalStorage } from './useLocalStorage'

export function useUserStore() {
  const [users, setUsers] = useLocalStorage<User[]>('users', [])

  const addUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      id: crypto.randomUUID(),
      ...userData,
      createdAt: new Date().toISOString(),
    }
    setUsers([...users, newUser])
    return newUser
  }

  const updateUser = (id: string, userData: Omit<User, 'id' | 'createdAt'>) => {
    const updatedUsers = users.map((user) =>
      user.id === id
        ? {
            ...user,
            ...userData,
          }
        : user,
    )
    setUsers(updatedUsers)
  }

  const deleteUser = (id: string) => {
    const filteredUsers = users.filter((user) => user.id !== id)
    setUsers(filteredUsers)
  }

  const getUserById = (id: string) => {
    return users.find((user) => user.id === id) || null
  }

  return {
    users,
    addUser,
    updateUser,
    deleteUser,
    getUserById,
  }
}
