import { FC } from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import type { SvgIconProps } from '@mui/material/SvgIcon';

export const LeftIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <svg
        width='10'
        height='18'
        viewBox='0 0 10 18'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M9 1L1 9L9 17'
          stroke='black'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </svg>
    </SvgIcon>
  );
};

export const RightIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <svg
        width='10'
        height='18'
        viewBox='0 0 10 18'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M1 1L9 9L1 17'
          stroke='black'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </svg>
    </SvgIcon>
  );
};
