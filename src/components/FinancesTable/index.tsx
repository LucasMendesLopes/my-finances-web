import { useState } from 'react';

import { DeleteFinance } from '-services/finances';
import { IFinancesTable } from '-src/types';
import { formatNumber } from '-src/utils';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ArrowCircleDown, ArrowCircleUp, Trash } from 'phosphor-react';

import { Loading } from '../Loading';
import { DeleteButton, EmptyTableSpan, TableElementsContainer } from './styles';

export const FinancesTable = ({ rows, isLoadingValues }: IFinancesTable) => {
  const [deleteOpacity, setDeleteOpacity] = useState(false);

  const columns = [
    { id: 'date', label: 'Data', minWidth: 170 },
    { id: 'description', label: 'Descrição', minWidth: 100 },
    { id: 'value', label: 'Valor', minWidth: 100 },
    { id: 'type', label: 'Tipo', minWidth: 100 },
  ];

  const deleteFinance = (id: string) => {
    void DeleteFinance(id);
  };

  const handleRenderIcon = (type: string) => {
    if (type === 'entrada') return <ArrowCircleUp color="#21b53e" size={25} />;
    else if (type === 'saida')
      return <ArrowCircleDown color="#b52121" size={25} />;
  };

  const handleRenderValue = (column: string, value: string, id: string) => {
    if (column === 'type') {
      return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {handleRenderIcon(value)}

          <DeleteButton
            key={id}
            deleteOpacity={deleteOpacity}
            onClick={() => {
              deleteFinance(id);
            }}
          >
            {<Trash color="#39393A" size={25} />}
          </DeleteButton>
        </div>
      );
    } else if (column === 'value') return `R$ ${formatNumber(Number(value))}`;
    else return value;
  };

  const handleRenderTable = () => {
    if (isLoadingValues)
      return <Loading type="bubbles" width={70} height={70} />;
    else if (rows?.length > 0)
      return (
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                  >
                    {column.label}
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
                    key={row.id}
                  >
                    {columns.map((column) => {
                      const value = (row as { [k in string]: any })[column.id];
                      return (
                        <TableCell key={column.id} className="test">
                          {handleRenderValue(column.id, value, row.id)}
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
        <EmptyTableSpan>Não há dados para serem mostrados.</EmptyTableSpan>
      );
  };

  return (
    <TableElementsContainer isLoadingValues={isLoadingValues}>
      {handleRenderTable()}
    </TableElementsContainer>
  );
};
