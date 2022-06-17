import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Chip,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

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

  // active menu item on page load
  //   useEffect(() => {
  //     const currentIndex = document.location.pathname
  //       .toString()
  //       .split('/')
  //       .findIndex((id) => id === item.id);
  //     if (currentIndex > -1) {
  //       dispatch({ type: MENU_OPEN, id: item.id });
  //     }
  //     // eslint-disable-next-line
  //   }, []);

  return (
    <ListItemButton
      LinkComponent={() => {
        return <Link to={item.title} />;
      }}
      disabled={item.disabled}
      sx={{
        borderRadius: `12px`,
        mb: 0.5,
        alignItems: 'flex-start',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        py: 0.4,
       
        ml: '10px',
        mr: '10px',
        pl: `${24}px`,
      }}
      selected={true}
    >
      <ListItemText
        primary={
          <Typography variant={'body1'} color='inherit'>
            {item.title}
          </Typography>
        }
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
