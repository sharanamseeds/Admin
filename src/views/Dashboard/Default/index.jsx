import React, { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Card, CardHeader, CardContent, Typography, Divider, LinearProgress } from '@mui/material';

import SalesLineCard from '../../../views/Dashboard/card/SalesLineCard';
import SalesLineCardData from '../../../views/Dashboard/card/sale-chart-1';
// import RevenuChartCard from '../../../views/Dashboard/card/RevenuChartCard';
// import RevenuChartCardData from '../../../views/Dashboard/card/revenu-chart';
import ReportCard from './ReportCard';

// import { gridSpacing } from '../../../config/config.js';

// assets
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import MonetizationOnTwoTone from '@mui/icons-material/MonetizationOnTwoTone';
import DescriptionTwoTone from '@mui/icons-material/DescriptionTwoTone';
import ThumbUpAltTwoTone from '@mui/icons-material/ThumbUpAltTwoTone';
import CalendarTodayTwoTone from '@mui/icons-material/CalendarTodayTwoTone';
import { showErrorMessage } from '../../../helpers/notificationService.js';
import { startLoading, stopLoading } from '../../../redux/slices/loadingSlice.js';
import { useDispatch } from 'react-redux';
import axiosInstance from '../../../config/AxiosConfig.js';
import AxiosInstancePaths from '../../../config/AxiosInstancePaths.js';
import { useNavigate } from 'react-router-dom';


// custom style
// const FlatCardBlock = styled((props) => <Grid item sm={6} xs={12} {...props} />)(({ theme }) => ({
//   padding: '25px 25px',
//   borderLeft: '1px solid' + theme.palette.background.default,
//   [theme.breakpoints.down('sm')]: {
//     borderLeft: 'none',
//     borderBottom: '1px solid' + theme.palette.background.default
//   },
//   [theme.breakpoints.down('md')]: {
//     borderBottom: '1px solid' + theme.palette.background.default
//   }
// }));

// ==============================|| DASHBOARD DEFAULT ||============================== //

const Default = () => {
  const theme = useTheme();
  const [data, setData] = useState()
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const fetchDashboardData = async () => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.Dashboard.GET_DATA
      );
      if (response.data?.payload) {
        setData(response.data?.payload?.result?.data);
      }
      dispatch(stopLoading());
    } catch (error) {
      console.error("Error fetching user data:", error);
      showErrorMessage(error?.response?.data?.message || "Failed to fetch user data");
      dispatch(stopLoading());
    }
  }

  useEffect(() => {
    fetchDashboardData()
    // eslint-disable-next-line
  }, [])

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={12} md={6} >
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardHeader
            title={
              <Typography component="div" className="card-header">
                User Status Metrics
              </Typography>
            }
          />
          <Divider />
          <CardContent style={{ cursor: 'pointer' }} onClick={() => navigate('/users')}>
            <Grid container spacing={2} >
              <Grid item xs={12}>
                <Typography variant="body2">Active Users</Typography>
                <LinearProgress variant="determinate" value={data?.user?.statusMetrics?.activeRatio * 100 || 0} color="primary" />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Blocked Users</Typography>
                <LinearProgress variant="determinate" value={data?.user?.statusMetrics?.blockedRatio * 100 || 0} color="secondary" />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Verified Users</Typography>
                <LinearProgress variant="determinate" value={data?.user?.statusMetrics?.verifiedRatio * 100 || 0} color="primary" />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Deactivated Users</Typography>
                <LinearProgress variant="determinate" value={data?.user?.statusMetrics?.deactiveRatio * 100 || 0} color="secondary" />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6} >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} style={{ cursor: 'pointer' }} onClick={() => navigate('/users')}>
              <ReportCard
                primary={`${data?.user?.totalUsers || 0}`}
                secondary="Total Users"
                color={theme.palette.warning.main}
                footerData={`Count: ${data?.user?.roleWiseUsers?.[0]?.count || 0}`}
                iconPrimary={DescriptionTwoTone}
                iconFooter={TrendingUpIcon}
              />
            </Grid>
            <Grid item xs={12} md={6} style={{ cursor: 'pointer' }} onClick={() => navigate('/brands')}>
              <ReportCard
                primary={`${data?.brands || 0}`}
                secondary="Total Brands"
                color={theme.palette.primary.main}
                footerData={`Count: ${data?.brands || 0}`}
                iconPrimary={DescriptionTwoTone}
                iconFooter={TrendingUpIcon}
              />
            </Grid>
            <Grid item xs={12} md={6} style={{ cursor: 'pointer' }} onClick={() => navigate('/category')}>
              <ReportCard
                primary={`${data?.category || 0}`}
                secondary="Total Category"
                color={theme.palette.success.main}
                footerData={`Count: ${data?.category || 0}`}
                iconPrimary={DescriptionTwoTone}
                iconFooter={TrendingUpIcon}
              />
            </Grid>
            <Grid item xs={12} md={6} style={{ cursor: 'pointer' }} onClick={() => navigate('/languages')}>
              <ReportCard
                primary={`${data?.totalLanguages || 0}`}
                secondary="Total Languages"
                color={theme.palette.info.main}
                footerData={`All Languages`}
                iconPrimary={MonetizationOnTwoTone}
                iconFooter={TrendingUpIcon}
              />
            </Grid>
          </Grid>
        </div>
      </Grid>

      <Grid item xs={12} md={6} >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} style={{ cursor: 'pointer' }} onClick={() => navigate('/bills')}>
              <ReportCard
                primary={`${data?.bill?.totalBills || 0}`}
                secondary="Total Bills"
                color={theme.palette.warning.main}
                footerData="View all bills"
                iconPrimary={MonetizationOnTwoTone}
                iconFooter={TrendingUpIcon}
              />
            </Grid>
            <Grid item xs={12} md={6} style={{ cursor: 'pointer' }} onClick={() => navigate('/orders')}>
              <ReportCard
                primary={`${data?.order?.totalOrders || 0}`}
                secondary="Total Orders"
                color={theme.palette.error.main}
                footerData="View all orders"
                iconPrimary={CalendarTodayTwoTone}
                iconFooter={TrendingDownIcon}
              />
            </Grid>
            <Grid item xs={12} md={6} style={{ cursor: 'pointer' }} onClick={() => navigate('/products')}>
              <ReportCard
                primary={`${data?.product?.totalProducts || 0}`}
                secondary="Total Products"
                color={theme.palette.primary.main}
                footerData="View all products"
                iconPrimary={ThumbUpAltTwoTone}
                iconFooter={TrendingUpIcon}
              />
            </Grid>
            <Grid item xs={12} md={6} style={{ cursor: 'pointer' }} onClick={() => navigate('/offers')}>
              <ReportCard
                primary={`${data?.offer?.totalOffers || 0}`}
                secondary="Total Offers"
                color={theme.palette.info.main}
                footerData={`Active: ${data?.offer?.activeOffers || 0}, Inactive: ${data?.offer?.inactiveOffers || 0}`}
                iconPrimary={MonetizationOnTwoTone}
                iconFooter={TrendingUpIcon}
              />
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Grid item xs={12} md={6} >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }} onClick={() => navigate('/orders')}>
          <SalesLineCard
            chartData={SalesLineCardData}
            title="Sales Per Day"
            percentage="3%"
            icon={<TrendingDownIcon />}
            footerData={[
              {
                value: `$${data?.order?.averageOrderAmount || 0}`,
                label: 'Average Order Amount'
              },
              {
                value: `${data?.order?.avgOrdersPerDay || 0}`,
                label: 'Average Orders Per Day'
              }
            ]}
          />

        </div>
      </Grid>

      <Grid item lg={6} xs={12}>
        <Card style={{ cursor: 'pointer' }} onClick={() => navigate('/bills')}>
          <CardHeader
            title={
              <Typography component="div" className="card-header">
                Payment Method Metrics
              </Typography>
            }
          />
          <Divider />
          <CardContent>
            <Grid container spacing={2}>
              {data?.bill?.paymentMethodMetrics?.map((method, index) => (
                <Grid item xs={12} key={index}>
                  <Typography variant="body2">{method?.method || "N/A"}</Typography>
                  <LinearProgress variant="determinate" value={method.ratio * 100 || 0} color="primary" />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item lg={6} xs={12}>
        <Card style={{ cursor: 'pointer' }} onClick={() => navigate('/bills')}>
          <CardHeader
            title={
              <Typography component="div" className="card-header">
                Payment Status Metrics
              </Typography>
            }
          />
          <Divider />
          <CardContent>
            <Grid container spacing={2}>
              {data?.bill?.paymentStatusMetrics?.map((status, index) => (
                <Grid item xs={12} key={index}>
                  <Typography variant="body2">{status.status || 'N/A'}</Typography>
                  <LinearProgress variant="determinate" value={status.ratio * 100 || 0} color="secondary" />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Default;
