import { Dispatch, SetStateAction, useState } from 'react';
import toast from 'react-hot-toast';
import ReactLoading from 'react-loading';

import { useFinances } from '-src/hooks';
import { deleteFinance } from '-src/services';
import { colors } from '-src/styles/theme';
import { IFinance } from '-src/types';
import {
  Chip,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Trash,
  PencilSimple,
} from 'phosphor-react';

import { ModalEditFinance } from '../modal-edit-finance/modal-edit-finance';
import {
  ButtonsContainer,
  EmptyTableText,
  TableElementsContainer,
} from './styled-finances-table';

interface IFinancesTable {
  rows: IFinance[] | [];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export const FinancesTable = ({
  rows,
  page,
  setPage,
}: IFinancesTable) => {
  const { handleGetFinances, totalPages, isLoadingValues, yearAndMonth, description, setDescription } = useFinances();
  const [modalEditFinanceIsOpen, setModalEditFinanceIsOpen] = useState(false);
  const [modalDefaultValues, setModalDefaultValues] = useState({
    _id: '',
    date: '',
    description: '',
    value: '',
    category: '',
  });

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    handleGetFinances(value, description, yearAndMonth);
  };

  const columns = [
    { id: 'date', label: 'Data', width: 170 },
    { id: 'description', label: 'Descrição', width: 100 },
    { id: 'value', label: 'Valor', width: 100 },
    { id: 'category', label: 'Categoria', width: 100 },
  ];


  const handleDeleteFinance = async (id: string) => {
    await deleteFinance(id)
      .then((resp) => {
        toast.success(resp);
      })
      .catch((error) => {
        toast.error(error);
      });

    setPage(1);
    setDescription("")
    handleGetFinances(1, "", yearAndMonth);
  };

  const handleRenderValue = (column: string, value: string, row: IFinance) => {
    if (column === 'category') {
      return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Chip label={row.category.name} sx={{ backgroundColor: row.category.color, color: "white", fontSize: '1rem', fontWeight: 'bold' }} />

          <ButtonsContainer>
            <button
              onClick={() => {
                setModalDefaultValues({
                  _id: row._id,
                  date: row.date,
                  description: row.description,
                  value: row.value,
                  category: row.category._id
                });
                setModalEditFinanceIsOpen(true);
              }}
            >
              {<PencilSimple color={colors.grey200} size={30} />}
            </button>

            <button onClick={() => handleDeleteFinance(row._id)}>
              {<Trash color={colors.grey200} size={30} />}
            </button>
          </ButtonsContainer>
        </div>
      );
    } else if (column === 'value') return <span style={{ color: row.category.type === "saida" ? colors.red : colors.green }}>{row.category.type === "saida" && "- "}R$ ${value}</span>;

    return value;
  };

  const handleRenderTable = () => {
    if (isLoadingValues)
      return (
        <ReactLoading
          type="bubbles"
          color={colors.blue}
          width={70}
          height={70}
        />
      );
    else if (rows?.length > 0)
      return (
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ width: column.width, fontWeight: 'bold', fontSize: '1.2rem' }}
                  >
                    <h3>{column.label}</h3>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows?.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = (row as { [k in string]: any })[column.id];
                      return (
                        <TableCell key={column.id} style={{ fontSize: '1.2rem' }}>
                          {handleRenderValue(column.id, value, row)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      );
    else if (!isLoadingValues)
      return (
        <EmptyTableText>Não há dados para serem mostrados.</EmptyTableText>
      );
  };

  return (
    <>
      <TableElementsContainer isLoadingValues={isLoadingValues}>
        {handleRenderTable()}
      </TableElementsContainer>

      {Object.values(modalDefaultValues).some((value) => value !== '') && (
        <ModalEditFinance
          isOpen={modalEditFinanceIsOpen}
          setIsOpen={setModalEditFinanceIsOpen}
          setPage={setPage}
          modalDefaultValues={modalDefaultValues}
          setModalDefaultValues={setModalDefaultValues}
        />
      )}

      {rows?.length > 0 && (
        <Pagination
          sx={{ margin: '0 auto' }}
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          disabled={totalPages === 1}
        />
      )}
    </>
  );
};
