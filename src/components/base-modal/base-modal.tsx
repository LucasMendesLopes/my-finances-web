import { ReactNode } from 'react';

import { colors } from '-src/styles/theme';
import { Fade, Modal, Typography } from '@mui/material';
import { XCircle } from 'phosphor-react';

import * as s from './styles';

interface IBaseModal {
  width: string;
  maxWidth?: string;
  title: string;
  children: ReactNode;
  titleRightComponent?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const BaseModal = ({
  width,
  maxWidth,
  title,
  children,
  isOpen,
  onClose,
  titleRightComponent,
}: IBaseModal) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Fade in={isOpen}>
        <s.ElementsContainer width={width} maxWidth={maxWidth}>
          <s.TitleContainer>
            <Typography variant="h5" component="h5" color={colors.grey200}>
              {title}
            </Typography>

            {titleRightComponent && titleRightComponent}

            <XCircle
              size={25}
              style={{
                cursor: 'pointer',
                marginLeft: 'auto',
              }}
              onClick={onClose}
              color={colors.blue200}
            />
          </s.TitleContainer>

          {children}
        </s.ElementsContainer>
      </Fade>
    </Modal>
  );
};
