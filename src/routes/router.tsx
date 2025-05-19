import * as React from 'react'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import Dashboard from '../components/pages/Dashboard'
import Vendas from '../components/pages/Vendas'
import Produtos from '../components/pages/Produtos'
import Clientes from '../components/pages/Clientes'
import Usuarios from '../components/pages/Usuarios'
import Relatorios from '../components/pages/Relatorios'
import { createRootRoute, createRoute } from '@tanstack/react-router'
import MainLayout from '../components/layout/MainLayout'

const rootRoute = createRootRoute({
  component: MainLayout
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Dashboard
})

const vendasRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/vendas',
  component: Vendas
})

const produtosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/produtos',
  component: Produtos
})

const clientesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/clientes',
  component: Clientes
})

const usuariosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/usuarios',
  component: Usuarios
})

const relatoriosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/relatorios',
  component: Relatorios
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  vendasRoute,
  produtosRoute,
  clientesRoute,
  usuariosRoute,
  relatoriosRoute
])

// Set up a Router instance
export const router = createRouter({
  routeTree
})

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
