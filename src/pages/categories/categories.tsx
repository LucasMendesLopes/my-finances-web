import { CategoriesTable, CustomButton } from '-src/components';


import * as s from './styled-categories';

export const Categories = () => {


    return (
        <s.Container>
            <CustomButton
                text="Nova categoria"
                size='large'
                sx={{ width: "14rem", height: "3rem" }}
            />

            <CategoriesTable />
        </s.Container>
    );
};
