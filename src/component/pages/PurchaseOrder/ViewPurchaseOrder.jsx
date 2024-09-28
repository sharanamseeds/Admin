import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import FilledInput from "../../Basic/FilledInput";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../config/AxiosInstancePaths";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import { showErrorMessage } from "../../../helpers/notificationService";
import { useTheme } from "@mui/material";
import BackNavigate from "../../Basic/BackNavigate";
import html2pdf from 'html2pdf.js';
import { formatDate, snakeToTitleCase } from '../../../helpers';
import ImageWithPreview from "../../Basic/ImagePreview";

function ViewPurchaseOrder() {
  const { id } = useParams();
  const theme = useTheme();
  const [order, setOrder] = useState({});
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  // eslint-disable-next-line

  const formatAddress = (address) => {
    if (!address) return "";
    const { address_line, city, state, pincode } = address;

    // Create an array of available values
    const parts = [];

    if (address_line) parts.push(address_line);
    if (city) parts.push(city);
    if (state) parts.push(state);
    if (pincode) parts.push(pincode);

    // Join the parts with a comma and return
    return parts.length > 0 ? parts.join(", ") : "";
  };


  const fetUserData = async (vendor_id) => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.Vendors.GET_BY_ID + vendor_id
      );
      if (response.data?.payload) {
        setUser(response.data?.payload?.result);
      }
      dispatch(stopLoading());
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  const fetchOrderData = async () => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.PurchseOrders.GET_BY_ID + id
      );
      if (response.data?.payload) {
        setOrder(response.data?.payload?.result);
        fetUserData(response.data?.payload?.result?.vendor_id)
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

  const downloadBill = async () => {
    try {
      dispatch(startLoading());

      const response = await axiosInstance.get(AxiosInstancePaths.PurchseOrders.DOWNLOAD_BILL + id, {
        responseType: 'text',
      });

      const tempContainer = document.createElement('div');
      tempContainer.innerHTML = response.data;

      const opt = {
        margin: 0.1,
        filename: 'purchaseInvoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      // Convert and download the PDF
      html2pdf().from(tempContainer).set(opt).save();

      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  }

  useEffect(() => {
    fetchProductsData()
    fetchOrderData();
    // eslint-disable-next-line
  }, [id]);

  return (
    <Grid container spacing={2} alignItems="stretch" justifyContent={'end'}>
      <Grid item xs={12} sx={{ paddingTop: { xs: '0.5rem !important', sx: '0.5rem !important', md: '0px !important' } }} >
        <BackNavigate />
      </Grid>
      <Grid item xs={12} >
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: 1 }}>
            <Typography variant="h4" style={{ fontWeight: "bold", }}>
              Invoice No : {order?.invoice_no}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: 1 }}>
            <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: '0.75rem' }} sx={{ marginBottom: "0.5rem" }}>
              Seller Details
            </Typography>
            <p>Name: {user?.name}</p>
            <p>Address: {formatAddress(user?.address)}</p>
            <p>Email: {user?.email}</p>
            <p>Phone: {user?.contact_number}</p>
            <p>GST No.: {user?.gst_number}</p>
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
              Item Name
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Product Code
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Man. Date
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Exe. Date
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Quantity
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Rate
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              GST Rate
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              GST Amount
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Discount
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
              <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                {
                  products.find(
                    (product) => product._id === item.product_id
                  )?.product_name
                }
              </div>
              <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                {
                  products.find(
                    (product) => product._id === item.product_id
                  )?.product_code
                }
              </div>
              <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                {formatDate(new Date(item?.manufacture_date))}
              </div>
              <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                {formatDate(new Date(item?.expiry_date))}
              </div>
              <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                {item.quantity}
              </div>
              <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                {item.purchase_price}
              </div>
              <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                {item.gst_rate}%
              </div>
              <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                {item.gst_amount}
              </div>
              <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                {item.offer_discount}
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
      <Grid item xs={12} >
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: 1, textAlign: 'right' }}>
            <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: '0.75rem' }} sx={{ marginBottom: "0.5rem" }}>
              Amount Details
            </Typography>
            <p>Advance Payment: {order?.advance_payment_amount}</p>
            <p>Order Amount: {order?.order_amount}</p>
            <p>Discount Amount: {order?.discount_amount}</p>
            <p>Tax Amount: {order?.tax_amount}</p>
            <p>Billing Amount: {order?.billing_amount}</p>
            <p>Final Amount: {order?.billing_amount - order?.advance_payment_amount}</p>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: 1 }}>
            <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: '0.75rem' }} sx={{ marginBottom: "0.5rem" }}>
              Basic Info
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FilledInput label="payment_status" value={snakeToTitleCase(order?.payment_status) || "Not Set"} disabled />
              </Grid>
              <Grid item xs={12} md={6}>
                <FilledInput label="status" value={snakeToTitleCase(order?.status) || "Not Set"} disabled />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center", margin: "1rem 0px" }}>
              <ImageWithPreview
                src={order?.purchase_invoice ? AxiosInstancePaths.base_url + order?.purchase_invoice : ""}
                alt="User Profile"
                height="145px"
                width="145px"
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: '1rem' }}>
          <Button
            variant="contained"
            sx={{
              color: theme.palette.common.white,
              width: "max-content",
              backgroundColor: theme.palette.success.main,
              "&:hover": {
                backgroundColor: theme.palette.success.main,
              },
            }}
            onClick={downloadBill}
          >
            Download Pdf
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ViewPurchaseOrder;
