import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';

import { colors } from '-src/styles/theme';
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  ArrowCircleDown,
  ArrowCircleUp,
  Trash,
  PencilSimple,
} from 'phosphor-react';

import {
  ButtonsContainer,
  EmptyTableText,
  TableElementsContainer,
} from './styled-categories-table';


export const CategoriesTable = () => {
  const [isLoadingValues, setIsLoadingValues] = useState(false)

  useEffect(() => {
    setIsLoadingValues(true)

    setTimeout(() => {
      setIsLoadingValues(false)
    }, 500);
  }, [])

  const columns = [
    { id: 'name', label: 'Nome', width: 200 },
    { id: 'color', label: 'Cor', width: 200 },
    { id: 'type', label: 'Tipo', width: 10 },
  ];

  const handleRenderIcon = (type: string) => {
    if (type === 'entrada')
      return <ArrowCircleUp color={colors.green} size={35} />;
    else if (type === 'saida')
      return <ArrowCircleDown color={colors.red} size={35} />;
  };


  const rowsTest = [
    { _id: "1", name: 'Salário', color: '#820263', type: 'entrada' },
    { _id: "2", name: 'Fatura cartão', color: '#FB8B24', type: 'saida' },
    { _id: "3", name: 'Lazer', color: '#04A777', type: 'saida' },

  ]

  const handleRenderValue = (column: string, value: string, row: any) => {
    if (column === 'type') {
      return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {handleRenderIcon(value)}

          <ButtonsContainer>
            <button>
              {<PencilSimple color={colors.grey200} size={30} />}
            </button>

            <button>
              {<Trash color={colors.grey200} size={30} />}
            </button>
          </ButtonsContainer>
        </div>
      );
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    } else if (column === 'color') return <div style={{ width: "40px", height: "40px", backgroundColor: `${row.color}`, borderRadius: "25px" }} />;

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
    else if (rowsTest?.length > 0)
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
              {rowsTest?.map((row) => {
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

      {rowsTest?.length > 0 && (
        <Pagination
          sx={{ margin: '0 auto' }}
          count={1}
          page={1}
          disabled={true}
        />
      )}
    </>
  );
};
