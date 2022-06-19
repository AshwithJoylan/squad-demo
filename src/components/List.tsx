import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import {
  CardHeader,
  Avatar,
  Skeleton,
  SxProps,
  Theme,
  IconButton,
} from '@mui/material';
import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Divider from '@mui/material/Divider';
import { RegularText, Title, SmallText, I18nTitle } from './Texts';
import { useTranslation } from 'react-i18next';
import { DefaultRootState, shallowEqual, useSelector } from 'react-redux';
import { dispatch } from '../store';
import { Api } from '../store/features/config';
import {
  getJobs,
  jobsLoadingSelector,
  jobsOffsetSelector,
  jobsSelector,
  jobsLoadLess,
} from '../store/features/jobs';
import {
  getAnnouncements,
  announcementsLoadingSelector,
  announcementsSelector,
  announcementsOffsetSelector,
  announcementsLoadLess,
} from '../store/features/announcements';
import {
  articlesLoadingSelector,
  articlesOffsetSelector,
  articlesSelector,
  getArticles,
  articlesLoadLess,
} from '../store/features/articles';

const ListItem: FC<{ children: JSX.Element | JSX.Element[] }> = ({
  children,
}) => {
  return (
    <Grid item md={3} xs={6}>
      <Card
        sx={{
          width: '100%',
          borderRadius: '10px',
          boxShadow:
            '0px 0px 0px rgba(48, 49, 51, 0.04), 0px 4px 8px rgba(48, 49, 51, 0.08)',
        }}
      >
        <CardActionArea>{children}</CardActionArea>
      </Card>
    </Grid>
  );
};
/**
 * ListProps
 */
type ListProps = {
  url: string;
  height?: number;
  title: string;
  getAction: any;
  loadLess: any;
  sx?: SxProps<Theme>;
  offsetSelector: any;
  loadingSelector: (state: DefaultRootState) => any;
  dataSelector: (state: DefaultRootState) => any;
  renderItem: (item: any, index: number) => React.ReactNode;
};

const TitleText: FC<{ title: string; description: string }> = ({
  title,
  description,
}) => {
  const { t } = useTranslation();
  return (
    <Grid
      xs={6}
      item
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Avatar
        sx={{ bgcolor: '#F5F5F5', width: 30, height: 30 }}
        aria-label='recipe'
      >
        <svg
          width='14'
          height='14'
          viewBox='0 0 14 14'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M7.00001 0.333344C3.31811 0.333344 0.333344 3.31811 0.333344 7.00001C0.333344 10.6819 3.31811 13.6667 7.00001 13.6667C10.6819 13.6667 13.6667 10.6819 13.6667 7.00001C13.6667 3.31811 10.6819 0.333344 7.00001 0.333344ZM7.00001 1.66668C9.94553 1.66668 12.3333 4.05449 12.3333 7.00001C12.3333 9.94553 9.94553 12.3333 7.00001 12.3333C4.05449 12.3333 1.66668 9.94553 1.66668 7.00001C1.66668 4.05449 4.05449 1.66668 7.00001 1.66668ZM7.66219 3.58893C7.62368 3.25737 7.3419 3.00001 7.00001 3.00001C6.63182 3.00001 6.33334 3.29849 6.33334 3.66668V7.00001L6.33913 7.08764C6.35828 7.23211 6.42442 7.36723 6.52861 7.47141L8.52861 9.47141L8.59141 9.52687C8.85294 9.73022 9.23109 9.71174 9.47141 9.47141L9.52687 9.40861C9.73022 9.14708 9.71174 8.76893 9.47141 8.52861L7.66668 6.72334V3.66668L7.66219 3.58893Z'
            fill='#162447'
          />
        </svg>
      </Avatar>
      <Box sx={{ ml: 1 }}>
        <SmallText color='text.secondary' sx={{ display: 'block' }}>
          {t(title)}
        </SmallText>
        <RegularText sx={{ display: 'block', lineHeight: undefined }}>
          {description}
        </RegularText>
      </Box>
    </Grid>
  );
};

const Loader: FC<{ height?: number }> = ({ height }) => {
  return (
    <Grid spacing={2} container>
      {[1, 2, 3, 4].map((key) => (
        <Grid {...{ key }} md={3} xs={6} item>
          <Skeleton
            sx={{ borderRadius: '12px' }}
            variant='rectangular'
            width={'100%'}
            height={height || 130}
          />
        </Grid>
      ))}
    </Grid>
  );
};

// context
const ListContext = createContext<{
  offsetSelector: any;
  loadLess: () => any;
  getAction: (data: { initial?: boolean; url?: string }) => any;
  loading: boolean;
}>({
  offsetSelector: () => {},
  getAction: () => {},
  loadLess: () => {},
  loading: false,
});

const Left: FC = () => {
  const { offsetSelector, loadLess, loading } = useContext(ListContext);
  const offset = useSelector(offsetSelector);

  if (loading) return <Box sx={{ width: '40px', height: '60px', mr: 1 }} />;
  return (
    <IconButton
      onClick={() => {
        dispatch(loadLess());
      }}
      disabled={offset === 0}
      sx={{ mr: 1, color: offset === 0 ? '#00000060' : '#000000' }}
    >
      <ArrowBackIosNew />
    </IconButton>
  );
};

const Right: FC = () => {
  const { getAction, loading } = useContext(ListContext);

  const loadMore = useCallback(() => {
    dispatch(getAction({ initial: false }));
  }, []);
  if (loading) return <Box sx={{ width: '40px', height: '60px', ml: 1 }} />;

  return (
    <IconButton onClick={loadMore} sx={{ ml: 1, color: '#000000' }}>
      <ArrowForwardIosIcon />
    </IconButton>
  );
};

/**
 * List
 */
const List: FC<ListProps> = ({
  title,
  getAction,
  height,
  loadingSelector,
  dataSelector,
  renderItem,
  offsetSelector,
  sx,
  loadLess,
}) => {
  const loading = useSelector(loadingSelector);
  const data = useSelector(dataSelector, shallowEqual);

  useEffect(() => {
    dispatch(getAction({ initial: true, url: '' }));
  }, [getAction]);

  const value = useMemo(
    () => ({ offsetSelector, getAction, loadLess, loading }),
    [offsetSelector, getAction, loadLess, loading]
  );

  return (
    <ListContext.Provider value={value}>
      <Box sx={{ ...sx, display: 'flex', alignItems: 'center' }}>
        <Left />
        <Box sx={{ width: '100%' }}>
          <I18nTitle title={title} />
          {loading ? (
            <Loader {...{ height }} />
          ) : (
            <Grid spacing={2} container>
              {data.map(renderItem)}
            </Grid>
          )}
        </Box>
        <Right />
      </Box>
    </ListContext.Provider>
  );
};

export const JobsList: FC = () => {
  return (
    <List
      loadLess={jobsLoadLess}
      offsetSelector={jobsOffsetSelector}
      loadingSelector={jobsLoadingSelector}
      dataSelector={jobsSelector}
      getAction={getJobs}
      url={Api.EndPoints.JOBS}
      title='Recommended Jobs'
      renderItem={(item, key) => (
        <ListItem key={item.id}>
          <CardHeader
            sx={{ padding: '12px' }}
            title={item.title}
            subheader={item.businessName}
            avatar={
              <Avatar
                sx={{ bgcolor: '#162447', width: 38, height: 38 }}
                aria-label='recipe'
              >
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M14.057 13.235C14.0973 13.1948 14.1376 13.1546 14.1678 13.1144L14.1577 13.1043C15.9497 10.9427 16.6342 7.82595 15.3054 4.63882C14.5805 2.88943 13.2114 1.49192 11.4697 0.737869C4.37229 -2.31855 -2.46339 4.65893 0.868878 11.7772C1.58366 13.2652 2.8018 14.4616 4.30182 15.1553C7.06026 16.4221 9.77842 16.1808 11.9127 14.9844L10.8154 13.9086C9.13412 14.723 7.05019 14.8235 4.93606 13.8382C3.68772 13.2652 2.69106 12.2497 2.12729 11.003C-0.530474 5.14153 5.16761 -0.518882 11.0167 2.13538C12.255 2.6984 13.2516 3.68369 13.8456 4.91028C15.1141 7.5947 14.6107 10.2389 13.1208 12.0888L11.8926 10.8623C12.4865 10.068 12.8389 9.0827 12.8389 8.00692C12.8389 5.35266 10.6845 3.19105 8.01665 3.19105C5.34882 3.19105 3.19442 5.34261 3.19442 7.99686C3.19442 10.6511 5.34882 12.8127 8.01665 12.8127C9.08378 12.8127 10.0704 12.4608 10.8657 11.8777L12.0939 13.1043L13.1308 14.1399C13.2919 14.0092 13.4429 13.8684 13.5939 13.7176C13.6241 13.6874 13.6543 13.6673 13.6745 13.6472C13.755 13.5668 13.8255 13.4763 13.906 13.3959C13.9563 13.3456 14.0067 13.2853 14.057 13.235ZM8.01665 11.365C6.1542 11.365 4.65418 9.85686 4.65418 8.00692C4.65418 6.15698 6.16427 4.64888 8.01665 4.64888C9.86903 4.64888 11.3791 6.15698 11.3791 8.00692C11.3791 8.67048 11.1778 9.29383 10.8456 9.81664L10.1408 9.11286C9.85896 8.83135 9.40594 8.83135 9.11398 9.11286C9.10392 9.12291 9.10392 9.12291 9.09385 9.13297C8.82203 9.41448 8.8321 9.86691 9.11398 10.1384L9.80863 10.8421C9.29519 11.1639 8.68109 11.365 8.01665 11.365Z'
                    fill='#39CEA0'
                  />
                </svg>
              </Avatar>
            }
          />
          <Divider />
          <CardContent sx={{ padding: '12px !important' }}>
            <Grid container>
              <TitleText
                title='Upto'
                description={item.price.toLocaleString()}
              />
              <TitleText title='Time' description={item.time + ' hours'} />
            </Grid>
          </CardContent>
        </ListItem>
      )}
    />
  );
};
export const Announcements: FC = () => {
  return (
    <List
      height={142}
      sx={{ mt: 3 }}
      loadLess={announcementsLoadLess}
      offsetSelector={announcementsOffsetSelector}
      loadingSelector={announcementsLoadingSelector}
      dataSelector={announcementsSelector}
      getAction={getAnnouncements}
      url={Api.EndPoints.ANNOUNCEMENTS}
      title='Announcements'
      renderItem={(item, key) => (
        <ListItem key={item.id}>
          <CardHeader
            sx={{ padding: '12px' }}
            avatar={
              <Avatar
                sx={{ bgcolor: '#162447', width: 24, height: 24 }}
                aria-label='recipe'
              >
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M14.057 13.235C14.0973 13.1948 14.1376 13.1546 14.1678 13.1144L14.1577 13.1043C15.9497 10.9427 16.6342 7.82595 15.3054 4.63882C14.5805 2.88943 13.2114 1.49192 11.4697 0.737869C4.37229 -2.31855 -2.46339 4.65893 0.868878 11.7772C1.58366 13.2652 2.8018 14.4616 4.30182 15.1553C7.06026 16.4221 9.77842 16.1808 11.9127 14.9844L10.8154 13.9086C9.13412 14.723 7.05019 14.8235 4.93606 13.8382C3.68772 13.2652 2.69106 12.2497 2.12729 11.003C-0.530474 5.14153 5.16761 -0.518882 11.0167 2.13538C12.255 2.6984 13.2516 3.68369 13.8456 4.91028C15.1141 7.5947 14.6107 10.2389 13.1208 12.0888L11.8926 10.8623C12.4865 10.068 12.8389 9.0827 12.8389 8.00692C12.8389 5.35266 10.6845 3.19105 8.01665 3.19105C5.34882 3.19105 3.19442 5.34261 3.19442 7.99686C3.19442 10.6511 5.34882 12.8127 8.01665 12.8127C9.08378 12.8127 10.0704 12.4608 10.8657 11.8777L12.0939 13.1043L13.1308 14.1399C13.2919 14.0092 13.4429 13.8684 13.5939 13.7176C13.6241 13.6874 13.6543 13.6673 13.6745 13.6472C13.755 13.5668 13.8255 13.4763 13.906 13.3959C13.9563 13.3456 14.0067 13.2853 14.057 13.235ZM8.01665 11.365C6.1542 11.365 4.65418 9.85686 4.65418 8.00692C4.65418 6.15698 6.16427 4.64888 8.01665 4.64888C9.86903 4.64888 11.3791 6.15698 11.3791 8.00692C11.3791 8.67048 11.1778 9.29383 10.8456 9.81664L10.1408 9.11286C9.85896 8.83135 9.40594 8.83135 9.11398 9.11286C9.10392 9.12291 9.10392 9.12291 9.09385 9.13297C8.82203 9.41448 8.8321 9.86691 9.11398 10.1384L9.80863 10.8421C9.29519 11.1639 8.68109 11.365 8.01665 11.365Z'
                    fill='#39CEA0'
                  />
                </svg>
              </Avatar>
            }
            title={item.title}
          />
          <CardContent
            sx={{ padding: '12px !important', pt: '0px !important' }}
          >
            <Title sx={{ fontWeight: '700' }} gutterBottom>
              {item.shortDescription}
            </Title>
            <SmallText color='text.secondary'>{item.longDescription}</SmallText>
          </CardContent>
        </ListItem>
      )}
    />
  );
};

/**
 * Community
 */
export const Community: FC = () => {
  return (
    <List
      height={142}
      loadLess={articlesLoadLess}
      sx={{ mt: 3 }}
      offsetSelector={articlesOffsetSelector}
      loadingSelector={articlesLoadingSelector}
      dataSelector={articlesSelector}
      getAction={getArticles}
      url={Api.EndPoints.ARTICLES}
      title='Community'
      renderItem={(item, key) => (
        <ListItem key={item.id}>
          <CardMedia
            component='img'
            height='120'
            image='/image1.png'
            alt='Paella dish'
          />
          <CardContent sx={{ padding: '12px !important' }}>
            <Title sx={{ fontWeight: '700' }} gutterBottom>
              This is an article title
            </Title>
            <SmallText color='text.secondary'>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint.
            </SmallText>
          </CardContent>
        </ListItem>
      )}
    />
  );
};

export default List;
