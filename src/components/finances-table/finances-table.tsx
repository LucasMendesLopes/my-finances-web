import { Dispatch, SetStateAction, useState } from 'react';
import ReactLoading from 'react-loading';

import { useFinances } from '-src/hooks';
import { deleteFinance } from '-src/services';
import { colors } from '-src/styles/theme';
import { IFinance } from '-src/types';
import { formatNumber } from '-src/utils';
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { ArrowCircleDown, ArrowCircleUp, Trash } from 'phosphor-react';

import {
  DeleteButton,
  EmptyTableText,
  TableElementsContainer,
} from './styled-finances-table';

interface IFinancesTable {
  rows: IFinance[] | [];
  isLoadingValues: boolean;
  yearAndMonth: string;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export const FinancesTable = ({
  rows,
  isLoadingValues,
  yearAndMonth,
  page,
  setPage,
}: IFinancesTable) => {
  const [deleteOpacity, setDeleteOpacity] = useState(false);
  const { handleGetFinances, totalPages } = useFinances();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    handleGetFinances(value, yearAndMonth);
  };

  const columns = [
    { id: 'date', label: 'Data', width: 170 },
    { id: 'description', label: 'Descrição', width: 100 },
    { id: 'value', label: 'Valor', width: 100 },
    { id: 'type', label: 'Tipo', width: 100 },
  ];

  const handleRenderIcon = (type: string) => {
    if (type === 'entrada')
      return <ArrowCircleUp color={colors.green} size={25} />;
    else if (type === 'saida')
      return <ArrowCircleDown color={colors.red} size={25} />;
  };

  const handleDeleteFinance = async (id: string) => {
    await deleteFinance(id);
    setPage(1);
    handleGetFinances(1, yearAndMonth);
  };

  const handleRenderValue = (column: string, value: string, id: string) => {
    if (column === 'type') {
      return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {handleRenderIcon(value)}

          <DeleteButton
            key={id}
            deleteOpacity={deleteOpacity}
            onClick={() => handleDeleteFinance(id)}
          >
            {<Trash color={colors.grey200} size={25} />}
          </DeleteButton>
        </div>
      );
    } else if (column === 'value') return `R$ ${formatNumber(Number(value))}`;
    else return value;
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
                    style={{ width: column.width, fontWeight: 'bold' }}
                  >
                    <h3>{column.label}</h3>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows?.map((row) => {
                return (
                  <TableRow
                    onMouseOver={() => {
                      setDeleteOpacity(true);
                    }}
                    onMouseOut={() => {
                      setDeleteOpacity(false);
                    }}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row._id}
                  >
                    {columns.map((column) => {
                      const value = (row as { [k in string]: any })[column.id];
                      return (
                        <TableCell key={column.id}>
                          {handleRenderValue(column.id, value, row._id)}
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

      {rows?.length > 0 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          disabled={totalPages === 1}
        />
      )}
    </>
  );
};
