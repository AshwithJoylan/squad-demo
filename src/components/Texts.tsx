import React, { FC } from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

/**
 * I18nTitleProps
 */
type I18nTitleProps = TypographyProps & {
  title: string;
};

/**
 * Title
 */
export const I18nTitle: FC<I18nTitleProps> = ({ title, sx, ...rest }) => {
  const { t } = useTranslation();
  return (
    <Typography
      sx={{ pb: 2, fontWeight: '400', fontSize: '16px', ...(sx || {}) }}
      {...rest}
    >
      {t(title)}
    </Typography>
  );
};

/**
 * TitleProps
 */
type TitleProps = TypographyProps & {
  children: React.ReactNode;
};

/**
 * Title
 */
export const Title: FC<TitleProps> = ({ children, sx, ...rest }) => {
  return (
    <Typography
      sx={{ fontWeight: '400', fontSize: '16px', ...(sx || {}) }}
      {...rest}
    >
      {children}
    </Typography>
  );
};

/**
 * SmallText
 */
export const SmallText: FC<TitleProps> = ({ children, sx, ...rest }) => {
  return (
    <Typography
      variant='body2'
      sx={{ fontWeight: '400', fontSize: '12px', ...(sx || {}) }}
      {...rest}
    >
      {children}
    </Typography>
  );
};

/**
 * RegularText
 */
export const RegularText: FC<TitleProps> = ({ children, sx, ...rest }) => {
  return (
    <Typography
      variant='caption'
      sx={{ fontWeight: '400', fontSize: '14px', ...(sx || {}) }}
      {...rest}
    >
      {children}
    </Typography>
  );
};
