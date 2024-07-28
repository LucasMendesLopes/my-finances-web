import { useEffect, useState } from 'react';

import { CategoriesTable, CustomButton, ModalAddCategory } from '-src/components';
import { useCategories } from '-src/hooks';

import * as s from './styled-categories';

export const Categories = () => {
    const [modalAddCategoryIsOpen, setModalAddCategoryIsOpen] = useState(false)
    const [page, setPage] = useState(1);

    const {
        handleGetCategories,
        categories
    } = useCategories();

    useEffect(() => {
        handleGetCategories(page);
    }, []);

    return (
        <s.Container>
            <ModalAddCategory
                isOpen={modalAddCategoryIsOpen}
                setIsOpen={setModalAddCategoryIsOpen}
                setPage={setPage}
            />

            <CustomButton
                text="Nova categoria"
                size='large'
                sx={{ width: "14rem", height: "3rem" }}
                onClick={() => setModalAddCategoryIsOpen(true)}
            />

            <CategoriesTable
                rows={categories}
                page={page}
                setPage={setPage}
            />
        </s.Container>
    );
};
