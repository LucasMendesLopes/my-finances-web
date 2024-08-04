import { Dispatch, SetStateAction, useState } from 'react';
import toast from 'react-hot-toast';
import ReactLoading from 'react-loading';

import { useCategories } from '-src/hooks';
import { deleteCategory } from '-src/services';
import { colors } from '-src/styles/theme';
import { ICategory } from '-src/types';
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

import { ModalEditCategory } from '../modal-edit-category/modal-edit-category';
import {
  ButtonsContainer,
  CategoryCircle,
  EmptyTableText,
  TableElementsContainer,
} from './styled-categories-table';
interface ICategoriesTable {
  rows: ICategory[] | [];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export const CategoriesTable = ({ rows,
  page,
  setPage, }: ICategoriesTable) => {
  const [modalEditCategoryIsOpen, setModalEditCategoryIsOpen] = useState(false);
  const [modalDefaultValues, setModalDefaultValues] = useState({
    _id: '',
    name: '',
    color: '',
    type: '',
  });

  const { handleGetCategories, totalPages, isLoadingGetCategories } = useCategories();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    handleGetCategories(value);
  };

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

  const handleDeleteCategory = async (id: string) => {
    await deleteCategory(id)
      .then((resp) => {
        toast.success(resp);

        setPage(1);
        handleGetCategories(1);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleRenderValue = (column: string, value: string, row: ICategory) => {
    if (column === 'type') {
      return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {handleRenderIcon(value)}

          <ButtonsContainer>
            <button
              onClick={() => {
                setModalDefaultValues(row);
                setModalEditCategoryIsOpen(true);
              }}
            >
              {<PencilSimple color={colors.grey200} size={30} />}
            </button>

            <button>
              {<Trash color={colors.grey200} size={30} onClick={() => handleDeleteCategory(row._id)} />}
            </button>
          </ButtonsContainer>
        </div>
      );
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    } else if (column === 'color') return <CategoryCircle color={row.color} />;

    return value;
  };

  const handleRenderTable = () => {
    if (isLoadingGetCategories)
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
    else if (!isLoadingGetCategories)
      return (
        <EmptyTableText>Não há dados para serem mostrados.</EmptyTableText>
      );
  };

  return (
    <>
      <TableElementsContainer isLoadingValues={isLoadingGetCategories}>
        {handleRenderTable()}
      </TableElementsContainer>

      {Object.values(modalDefaultValues).some((value) => value !== '') && (
        <ModalEditCategory
          isOpen={modalEditCategoryIsOpen}
          setIsOpen={setModalEditCategoryIsOpen}
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
