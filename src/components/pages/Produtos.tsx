import * as React from 'react'
import styles from './Produtos.module.css'
import Table from '../common/Table'

const Produtos: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gerenciar Produtos</h2>
      <div className={styles.addButtonContainer}>
        <button className={styles.addButton}>
          Adicionar Produto
        </button>
      </div>
      
      <Table>
        <Table.Head>
          <tr>
            <Table.HeaderCell>Nome</Table.HeaderCell>
            <Table.HeaderCell>Preço</Table.HeaderCell>
            <Table.HeaderCell>Ações</Table.HeaderCell>
          </tr>
        </Table.Head>
        <Table.Body>
          {/* Aqui você vai mapear os produtos da sua lista */}
          <Table.Row>
            <Table.Cell>Produto 1</Table.Cell>
            <Table.Cell>R$ 10,00</Table.Cell>
            <Table.Cell isActions>
              <Table.EditButton>Editar</Table.EditButton>
              <Table.DeleteButton>Excluir</Table.DeleteButton>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Produto 2</Table.Cell>
            <Table.Cell>R$ 25,00</Table.Cell>
            <Table.Cell isActions>
              <Table.EditButton>Editar</Table.EditButton>
              <Table.DeleteButton>Excluir</Table.DeleteButton>
            </Table.Cell>
          </Table.Row>
          <Table.Row isLast>
            <Table.Cell>Produto 3</Table.Cell>
            <Table.Cell>R$ 35,50</Table.Cell>
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

export default Produtos
