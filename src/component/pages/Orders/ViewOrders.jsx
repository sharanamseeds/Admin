import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import FilledInput from "../../Basic/FilledInput";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../config/AxiosInstancePaths";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import { showErrorMessage } from "../../../helpers/notificationService";
import { useTheme } from "@mui/material";
import BackNavigate from "../../Basic/BackNavigate";
import ImageWithPreview from "../../Basic/ImagePreview";

function ViewOrders() {
  const { id } = useParams();
  const theme = useTheme();
  const [order, setOrder] = useState({});
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  // eslint-disable-next-line
  const [offers, setOffers] = useState([]);

  const fetchUserData = async (userId) => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.Users.GET_BY_ID + userId
      );
      if (response.data?.payload) {
        setUser(response.data?.payload?.result);
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);

      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  }


  const fetchOrderData = async () => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.Orders.GET_BY_ID + id
      );
      if (response.data?.payload) {
        setOrder(response.data?.payload?.result);
        if (response.data?.payload?.result?.user_id) {
          fetchUserData(response.data?.payload?.result?.user_id)
        }
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);

      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };
  const fetchProductsData = async () => {
    try {
      let query = {
        pagination: false,
        in_stock: true,
        is_active: true,
        is_verified: true,
      };
      const queryString = new URLSearchParams(query).toString();

      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.Products.GET_LIST + `?${queryString}`
      );
      if (response.data?.payload) {
        setProducts(response.data?.payload?.result?.data);
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);

      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  const fetchOffersData = async () => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.Offers.GET_LIST + `?pagination=false`
      );
      if (response.data?.payload) {
        setOffers(response.data?.payload?.result?.data);
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);

      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    fetchProductsData()
    fetchOffersData()
    fetchOrderData();
    // eslint-disable-next-line
  }, [id]);

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={12} sx={{ paddingTop: { xs: '0.5rem !important', sx: '0.5rem !important', md: '0px !important' } }} >
        <BackNavigate />
      </Grid>
      <Grid item xs={12} >
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: 1 }}>
            <Typography variant="h4" style={{ fontWeight: "bold" }} sx={{ marginBottom: "0.5rem" }}>
              Order Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={4}>
                <FilledInput
                  label={"user"}
                  value={user?.name}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FilledInput label={"Status"} value={order?.status} />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FilledInput label={"Bill Id"} value={order?.bill_id} />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FilledInput label={"Order Amount"} value={order?.order_amount} />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FilledInput label={"Discount Amount"} value={order?.discount_amount} />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FilledInput label={"Billing Amount"} value={order?.billing_amount} />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FilledInput label={"Creditable"} value={order?.is_creditable ? "Yes" : "No"} />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FilledInput label={"Credit Days"} value={order?.credit_duration} />
              </Grid>
              <Grid item xs={12} >
                <FilledInput label={"Order Notes"} value={order?.order_notes} />
              </Grid>
              <Grid item xs={12} >
                <FilledInput label={"Reason"} value={order?.reason} />
              </Grid>
              <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                <p style={{ marginTop: '0px' }}>
                  Document
                </p>
                <div>
                  <ImageWithPreview
                    src={order?.document ? AxiosInstancePaths.base_url + order?.document : ""}
                    alt="document"
                    height="102px"
                    width="102px"
                  />
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <div style={{ width: "100%" }}>
          <div style={{
            fontWeight: "bold",
            color: theme.palette.text.primary,
            display: "flex",
            justifyContent: "space-between",
            padding: "15px",
            backgroundColor: theme.palette.background.paper,
            borderRadius: "10px",
            boxShadow: theme.shadows[1],
          }}>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Product Name
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Quantity
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Total Amount
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Offer Code
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Offer Discount
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Gst Rate
            </div>
          </div>
        </div>
        {order?.products?.length > 0 ? order?.products
          .map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px",
                marginTop: "1rem",
                backgroundColor: theme.palette.background.paper,
                borderRadius: "10px",
                boxShadow: theme.shadows[1],
              }}
            >
              <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
                {
                  products.find(
                    (product) => product._id === item.product_id
                  )?.product_name
                }
              </div>

              <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
                {item.quantity}
              </div>
              <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
                {item?.total_amount}
              </div>
              <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
                {item?.offer_id ? offers.find(offer => offer?._id === item?.offer_id)?.offer_code : "No Offer"}
              </div>
              <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
                {item.offer_discount}
              </div>
              <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
                {item.gst_rate}%
              </div>
            </div>
          )) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "15px",
              marginTop: "1rem",
              backgroundColor: theme.palette.background.paper,
              borderRadius: "10px",
              boxShadow: theme.shadows[1],
            }}
          >
            No Products Added
          </div>
        )}
      </Grid>
    </Grid>
  );
}

export default ViewOrders;
