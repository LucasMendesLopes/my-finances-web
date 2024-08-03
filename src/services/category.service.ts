import { api } from '-src/api/api';
import { ICategory } from '-src/types';

interface ICategoryResp {
  categories: ICategory[] | [];
  totalPages: number;
}

interface IAddCategoryBody {
  name: string;
  color: string;
  type: string;
  userId: string;
}

interface IEditCategoryBody extends IAddCategoryBody {
  categoryId: string;
}

const getCategories = (
  userId: string,
  page?: number
): Promise<ICategoryResp> => {
  return new Promise((resolve, reject) => {
    const url =
      page !== undefined
        ? `/categories/${userId}?page=${page}`
        : `/categories/${userId}`;

    api
      .get(url)
      .then((resp) => {
        return resolve(resp.data);
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });
};

const addCategory = (body: IAddCategoryBody): Promise<string> => {
  const { name, color, type, userId } = body;

  return new Promise((resolve, reject) => {
    api
      .post('/categories', { name, color, type, userId })
      .then((resp) => {
        return resolve(resp.data.message);
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });
};

const editCategory = (body: IEditCategoryBody): Promise<string> => {
  const { name, color, type, categoryId, userId } = body;

  return new Promise((resolve, reject) => {
    api
      .put(`/categories/${categoryId}`, { name, color, type, userId })
      .then((resp) => {
        return resolve(resp.data.message);
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });
};

const deleteCategory = (categoryId: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    api
      .delete(`/categories/${categoryId}`)
      .then((resp) => {
        return resolve(resp.data.message);
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });
};

export { addCategory, deleteCategory, editCategory, getCategories };
