import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { I18nTitle } from './Texts';

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level }) => {
  const theme = useTheme();

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps = {
    component: forwardRef((props, ref) => (
      <Link
        ref={ref}
        {...props}
        // to={`${config.basename}${item.url}`}
        target={itemTarget}
      />
    )),
  };

  return (
    <ListItemButton
      LinkComponent={() => {
        return <Link to={item.title} />;
      }}
      disabled={item.disabled}
      sx={{
        borderRadius: `12px`,
        mb: 0.5,
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        py: 0.4,
        display: 'flex',
        alignItems: 'center',
        ml: '10px',
        mr: '10px',
        pl: `${24}px`,
      }}
      selected={true}
    >
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M8.14917 3.14393C9.2045 2.32293 10.6641 2.28723 11.7545 3.0368L11.9008 3.14388L16.3446 6.60026C17.0398 7.14034 17.4656 7.95194 17.5193 8.82463L17.525 9.0125V15.0125C17.525 16.3439 16.4843 17.4322 15.1719 17.5083L15.025 17.5125H5.02503C3.69363 17.5125 2.60531 16.4717 2.52927 15.1594L2.52502 15.0125V9.01289C2.52461 8.13269 2.90374 7.29839 3.55956 6.72036L3.70429 6.6005L8.14917 3.14393ZM10.8775 4.4594C10.4095 4.09535 9.76667 4.07107 9.27528 4.38667L9.17243 4.4595L4.72743 7.91616C4.4268 8.14995 4.23716 8.49553 4.19888 8.87062L4.19169 9.0125V15.0125C4.19169 15.4399 4.51339 15.7921 4.92784 15.8402L5.02503 15.8458H15.025C15.4524 15.8458 15.8046 15.5241 15.8528 15.1097L15.8584 15.0125V9.0125C15.8584 8.63145 15.702 8.26946 15.4296 8.0091L15.3221 7.9164L10.8775 4.4594ZM14.0469 12.0696C13.8092 11.6755 13.2971 11.5487 12.903 11.7864C11.3261 12.7375 8.67257 12.7375 7.09739 11.7866C6.70338 11.5487 6.19115 11.6753 5.95329 12.0693C5.71542 12.4633 5.842 12.9755 6.236 13.2134C8.34082 14.4841 11.6573 14.4841 13.7638 13.2136C14.1579 12.9759 14.2846 12.4637 14.0469 12.0696Z'
          fill='#323232'
        />
      </svg>

      <ListItemText
        sx={{ ml: 1 }}
        primary={<I18nTitle sx={{ pb: 0 }} title={item.title} />}
        secondary={
          item.caption && (
            <Typography
              variant='caption'
              sx={{ ...theme.typography.subMenuCaption }}
              display='block'
              gutterBottom
            >
              {item.caption}
            </Typography>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
};

export default NavItem;
