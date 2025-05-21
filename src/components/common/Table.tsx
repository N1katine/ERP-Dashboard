import * as React from "react";
import styles from "./Table.module.css";

interface TableProps {
  children: React.ReactNode;
}

interface TableHeadProps {
  children: React.ReactNode;
}

interface TableBodyProps {
  children: React.ReactNode;
}

interface TableRowProps {
  children: React.ReactNode;
  isLast?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

interface TableCellProps {
  children: React.ReactNode;
  isActions?: boolean;
}

interface TableHeaderCellProps {
  children: React.ReactNode;
}

interface EditButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

interface DeleteButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

type TableComponent = React.FC<TableProps> & {
  Head: React.FC<TableHeadProps>;
  Body: React.FC<TableBodyProps>;
  Row: React.FC<TableRowProps>;
  Cell: React.FC<TableCellProps>;
  HeaderCell: React.FC<TableHeaderCellProps>;
  EditButton: React.FC<EditButtonProps>;
  DeleteButton: React.FC<DeleteButtonProps>;
  ActionButton: React.FC<ActionButtonProps>;
};

const TableContainer: React.FC<TableProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <table className={styles.table}>{children}</table>
      </div>
    </div>
  );
};

const TableHead: React.FC<TableHeadProps> = ({ children }) => {
  return <thead className={styles.tableHead}>{children}</thead>;
};

const TableBody: React.FC<TableBodyProps> = ({ children }) => {
  return <tbody>{children}</tbody>;
};

const TableRow: React.FC<TableRowProps> = ({ children, isLast = false, isSelected = false, onClick }) => {
  return (
    <tr 
      className={`${isLast ? styles.rowLast : styles.row} ${isSelected ? styles.rowSelected : ''}`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

const TableCell: React.FC<TableCellProps> = ({
  children,
  isActions = false,
}) => {
  return (
    <td className={isActions ? styles.cellActions : styles.cell}>{children}</td>
  );
};

const TableHeaderCell: React.FC<TableHeaderCellProps> = ({ children }) => {
  return <th className={styles.headerCell}>{children}</th>;
};

const EditButton: React.FC<EditButtonProps> = ({ children, onClick }) => {
  return (
    <button className={styles.editButton} onClick={onClick}>
      {children}
    </button>
  );
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ children, onClick }) => {
  return (
    <button className={styles.deleteButton} onClick={onClick}>
      {children}
    </button>
  );
};

const ActionButton: React.FC<ActionButtonProps> = ({ children, onClick }) => {
  return (
    <button className={styles.actionButton} onClick={onClick}>
      {children}
    </button>
  );
};

const Table: TableComponent = Object.assign(TableContainer, {
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  HeaderCell: TableHeaderCell,
  EditButton: EditButton,
  DeleteButton: DeleteButton,
  ActionButton: ActionButton,
});

export default Table;