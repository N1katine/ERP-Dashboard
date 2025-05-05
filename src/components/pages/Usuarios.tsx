import * as React from 'react'
import styles from './Usuarios.module.css'
import Table from '../common/Table'

const Usuarios: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gerenciar Usuários</h2>
      <div className={styles.addButtonContainer}>
        <button className={styles.addButton}>
          Adicionar Usuário
        </button>
      </div>
      
      <Table>
        <Table.Head>
          <tr>
            <Table.HeaderCell>Nome</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Ações</Table.HeaderCell>
          </tr>
        </Table.Head>
        <Table.Body>
          {/* Aqui você vai mapear os usuários da sua lista */}
          <Table.Row>
            <Table.Cell>Usuário 1</Table.Cell>
            <Table.Cell>usuario1@empresa.com</Table.Cell>
            <Table.Cell isActions>
              <Table.EditButton>Editar</Table.EditButton>
              <Table.DeleteButton>Excluir</Table.DeleteButton>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Usuário 2</Table.Cell>
            <Table.Cell>usuario2@empresa.com</Table.Cell>
            <Table.Cell isActions>
              <Table.EditButton>Editar</Table.EditButton>
              <Table.DeleteButton>Excluir</Table.DeleteButton>
            </Table.Cell>
          </Table.Row>
          <Table.Row isLast>
            <Table.Cell>Usuário 3</Table.Cell>
            <Table.Cell>usuario3@empresa.com</Table.Cell>
            <Table.Cell isActions>
              <Table.EditButton>Editar</Table.EditButton>
              <Table.DeleteButton>Excluir</Table.DeleteButton>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  )
}

export default Usuarios
