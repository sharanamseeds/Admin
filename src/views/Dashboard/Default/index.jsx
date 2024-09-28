import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Card, CardContent, Typography, } from '@mui/material';
import { showErrorMessage } from '../../../helpers/notificationService.js';
import { startLoading, stopLoading } from '../../../redux/slices/loadingSlice.js';
import { useDispatch } from 'react-redux';
import axiosInstance from '../../../config/AxiosConfig.js';
import AxiosInstancePaths from '../../../config/AxiosInstancePaths.js';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../../helpers/index.js';
import {
  FaFileInvoiceDollar,
  FaUser,
  FaBoxOpen,
  FaClipboardList,
  FaTags,
  FaLanguage,
} from 'react-icons/fa';
import { ImBook } from "react-icons/im";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import TextInputNoLabel from '../../../component/Form/TextInputNoLabel.jsx';


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


const CardComponent = ({ title, count, icon, color, subItems = [] }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" sx={{ color: color }}>
            {count}
          </Typography>
          <Typography variant="subtitle1" sx={{ marginTop: '.5rem' }}>
            {title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h2" sx={{ color: color }}>
            {icon}
          </Typography>
        </Grid>
      </Grid>
      {subItems.length > 0 ?
        subItems.map((item, itemIndex) => (
          <Grid item key={itemIndex} style={{ display: 'flex', justifyContent: 'space-between', marginTop: itemIndex === 0 ? '0.3rem' : '0px' }}>
            <Typography variant="body2" >
              {item.name}
            </Typography>
            <Typography variant="body2">
              {item.value}
            </Typography>
          </Grid>
        ))
        : ""}
    </CardContent>
  </Card>
);



const Default = () => {
  const theme = useTheme();
  const [data, setData] = useState()
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()


  const fetchDashboardData = async () => {
    try {
      let query = {}
      if (startDate) {
        query.start_date = startDate;
      }
      if (endDate) {
        query.end_date = endDate;
      }
      const queryString = new URLSearchParams(query).toString();

      dispatch(startLoading());
      const response = await axiosInstance.get(
        `${AxiosInstancePaths.Dashboard.GET_DATA}?${queryString}`
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

  useEffect(() => {
    fetchDashboardData()
    // eslint-disable-next-line
  }, [startDate, endDate])

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'end' }}>
        <Grid container spacing={2} md={5} >
          <Grid item xs={12} md={6} >
            <TextInputNoLabel
              type="date"
              name={"start"}
              seperatedLabel={true}
              startEdit={true}
              defaultValue={startDate ? formatDate(new Date(startDate)) : null}
              handleChange={(name, value) => {
                setStartDate(value ? new Date(value) : undefined)
              }}
              isDate={true}
            />
          </Grid>
          <Grid item xs={12} md={6} >
            <TextInputNoLabel
              type="date"
              name={"End"}
              seperatedLabel={true}
              startEdit={true}
              defaultValue={endDate ? formatDate(new Date(endDate)) : null}
              handleChange={(name, value) => { setEndDate(value ? new Date(value) : undefined) }}
              isDate={true}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} >
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} sm={6} md={3} style={{ cursor: 'pointer' }} onClick={() => navigate('/languages')}>
            <CardComponent title="Languages" count={data?.languages || 0} icon={<FaLanguage color={theme.palette.info.main} />} color={theme.palette.info.main} />
          </Grid>
          <Grid item xs={12} sm={6} md={3} style={{ cursor: 'pointer' }} onClick={() => navigate('/brands')}>
            <CardComponent title="Brands" count={data?.brands || 0} icon={<FaBoxOpen color={theme.palette.warning.main} />} color={theme.palette.warning.main} />
          </Grid>
          <Grid item xs={12} sm={6} md={3} style={{ cursor: 'pointer' }} onClick={() => navigate('/category')} >
            <CardComponent title="Categories" count={data?.categories || 0} icon={<FaClipboardList color={theme.palette.primary.main} />} color={theme.palette.primary.main} />
          </Grid>
          <Grid item xs={12} sm={6} md={3} style={{ cursor: 'pointer' }} onClick={() => navigate('/ledgers')}>
            <CardComponent title="Ledgers" count={data?.ledgers || 0} icon={<ImBook color={theme.palette.secondary.main} />} color={theme.palette.secondary.main} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} >
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} sm={6} md={3} style={{ cursor: 'pointer' }} onClick={() => navigate('/users')}>
            <CardComponent title="Users"
              subItems={[
                { name: 'App', value: data?.users?.appUsers || 0 },
                { name: 'Admin', value: data?.users?.adminUsers || 0 },
                { name: 'Blocked', value: data?.users?.blockedUsers || 0 },
                { name: 'Active', value: data?.users?.activeUsers || 0 },
                { name: 'Verified', value: data?.users?.verifiedUsers || 0 },
                { name: 'Unverified', value: data?.users?.unverifiedUsers || 0 }
              ]}
              count={data?.users?.total || 0}
              icon={<FaUser color={theme.palette.info.main} />}
              color={theme.palette.info.main} />
          </Grid>
          <Grid item xs={12} sm={6} md={3} style={{ cursor: 'pointer' }} onClick={() => navigate('/products')}>
            <CardComponent
              title="Products"
              subItems={[
                { name: 'Instock', value: data?.products?.inStockProducts || 0 },
                { name: 'OutofStock', value: data?.products?.outOfStockProducts || 0 },
                { name: 'Verified', value: data?.products?.verifiedProducts || 0 },
                { name: 'Featured', value: data?.products?.featuredProducts || 0 },]}
              count={data?.products?.total || 0}
              icon={<FaBoxOpen color={theme.palette.secondary.main} />}
              color={theme.palette.secondary.main} />
          </Grid>
          <Grid item xs={12} sm={6} md={3} style={{ cursor: 'pointer' }} onClick={() => navigate('/orders')}>
            <CardComponent
              title="Orders"
              subItems={[
                { name: 'Confirmed', value: data?.orders?.confirmedOrderCount || 0 },
                { name: 'Rejected', value: data?.orders?.rejectedOrderCount || 0 },
                { name: 'Pending', value: data?.orders?.pendingOrderCount || 0 },
                { name: 'Delivered', value: data?.orders?.deliveredOrderCount || 0 },
              ]}
              count={data?.orders?.total || 0}
              icon={<FaClipboardList color={theme.palette.success.main} />}
              color={theme.palette.success.main} />
          </Grid>
          <Grid item xs={12} sm={6} md={3} style={{ cursor: 'pointer' }} onClick={() => navigate('/orders')}>
            <CardComponent
              title="Orders"
              subItems={[
                { name: 'Cancelled', value: data?.orders?.cancelledOrderCount || 0 },
                { name: 'Return Requested', value: data?.orders?.returnRequestedOrderCount || 0 },
                { name: 'Return Accepeted', value: data?.orders?.returnAcceptedOrderCount || 0 },
                { name: 'Return Rejected', value: data?.orders?.returnRejectedOrderCount || 0 },
                { name: 'Return Fulfilled', value: data?.orders?.returnFulfilledOrderCount || 0 },
              ]}
              count={data?.orders?.total || 0}
              icon={<FaClipboardList color={theme.palette.error.main} />}
              color={theme.palette.error.main} />
          </Grid>


        </Grid>
      </Grid>
      <Grid item xs={12} >
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} sm={6} md={3} style={{ cursor: 'pointer' }} onClick={() => navigate('/orders')}>
            <CardComponent
              title="Orders"
              subItems={[
                { name: 'Average Order Count', value: data?.orders?.averageOrderCount || 0 },
                {
                  name: 'Average Order Amount', value: data?.orders?.averageOrderAmount || 0
                },

              ]}
              count={data?.orders?.total || 0}
              icon={<FaClipboardList color={theme.palette.secondary.main} />}
              color={theme.palette.secondary.main} />
          </Grid>
          <Grid item xs={12} sm={6} md={3} style={{ cursor: 'pointer' }} onClick={() => navigate('/offers')}>
            <CardComponent title="Offers"
              subItems={[
                { name: 'Active', value: data?.offers?.activeOffers || 0 },
                { name: 'Products Specified', value: data?.offers?.productSpecifiedOffers || 0 },
                { name: 'Category Specified', value: data?.offers?.categorySpecifiedOffers || 0 }]}
              count={data?.offers?.total || 0}
              icon={<FaTags color={theme.palette.primary.main} />}
              color={theme.palette.primary.main} />
          </Grid>
          <Grid item xs={12} sm={6} md={3} style={{ cursor: 'pointer' }} onClick={() => navigate('/bills')}>
            <CardComponent title="Bills"
              subItems={[
                { name: 'Paid', value: data?.bills?.paidBills || 0 },
                { name: 'Unpaid', value: data?.bills?.unPaidBills || 0 }
              ]}
              count={data?.bills?.total || 0}
              icon={<FaFileInvoiceDollar color={theme.palette.secondary.main} />}
              color={theme.palette.secondary.main} />
          </Grid>
          <Grid item xs={12} sm={6} md={3} >
            <CardComponent title="Account Details"
              subItems={[
                { name: 'Paid Sell Money', value: data?.accounts?.paid?.sellAmount || 0 },
                { name: 'Unpaid Sell Money', value: data?.accounts?.outstandings?.sellAmount || 0 },
                { name: 'Paid Buy Money', value: data?.accounts?.paid?.purchaseAmount || 0 },
                { name: 'Unpaid Buy Money', value: data?.accounts?.outstandings?.purchaseAmount || 0 }
              ]}
              count={data?.accounts?.on_hand || 0}
              icon={<RiMoneyRupeeCircleFill color={theme.palette.success.main} />}
              color={theme.palette.success.main} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Default;
