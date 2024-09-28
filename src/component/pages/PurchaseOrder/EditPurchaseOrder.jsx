import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { formatDate, formatErrorObject, objectToFormData } from "../../../helpers";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../config/AxiosInstancePaths";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import { showErrorMessage, showSuccessMessage } from "../../../helpers/notificationService";
import { updatePurchaseOrderSchema, validateSchema } from "../../../validation/validationSchema";
import { useTheme } from "@mui/material";
import FilledInput from "../../Basic/FilledInput";
import SelectInput from "../../Form/SelectInput";
import TextInput from "../../Form/TextInput";
import ImageWithPreview from "../../Basic/ImagePreview";
import FileUpload from "../../Form/FileUpload";
import BackNavigate from "../../Basic/BackNavigate";

function EditPurchaseOrder() {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [order, setOrder] = useState({});
  const [errors, setErrors] = useState({});
  const [vendor, setVendor] = useState({});
  const [products, setProducts] = useState([]);

  const handleSelectChange = (name, value) => {
    const keys = name.split(".");
    setFormData((prevData) => {
      let newData = { ...prevData };
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = current[keys[i]] || {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });

    setErrors((prevErrors) => {
      let newErrors = { ...prevErrors };
      let current = newErrors;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = current[keys[i]] || {};
        current = current[keys[i]];
      }
      delete current[keys[keys.length - 1]];
      return newErrors;
    });
  };

  const updateOrder = async () => {
    try {

      const newFormData = new FormData();
      let documents = {}
      let tempFormData = { ...formData };
      if (formData?.purchase_invoice) {
        documents.purchase_invoice = formData.purchase_invoice
        delete tempFormData.purchase_invoice
      }

      const isValid = await validateSchema(updatePurchaseOrderSchema, formData, setErrors);
      if (!isValid) {
        return;
      }
      dispatch(startLoading());

      objectToFormData(newFormData, documents);

      const response = await axiosInstance.put(
        AxiosInstancePaths.PurchseOrders.UPDATE_BY_ID + id,
        newFormData, {
        params: {
          payload: JSON.stringify(tempFormData)
        },
      }
      );
      showSuccessMessage(response?.data?.message);
      dispatch(stopLoading());
      navigate('/purchase_orders')
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.errors) {
        setErrors(formatErrorObject(error?.response?.data?.errors))
      }
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  const fetUserData = async (vendor_id) => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.Vendors.GET_BY_ID + vendor_id
      );
      if (response.data?.payload) {
        setVendor(response.data?.payload?.result);
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
      if (error?.response?.data?.errors) {
        setErrors(formatErrorObject(error?.response?.data?.errors))
      }
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
      if (error?.response?.data?.errors) {
        setErrors(formatErrorObject(error?.response?.data?.errors))
      }
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    fetchProductsData()
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
                  label={"vendor"}
                  value={vendor?.name}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FilledInput label={"invoice_no"} value={order?.invoice_no} />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FilledInput label={"discount_amount"} value={order?.discount_amount} />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FilledInput label={"billing_amount"} value={order?.billing_amount} />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FilledInput label={"order_amount"} value={order?.order_amount} />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FilledInput label={"tax_amount"} value={order?.tax_amount} />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FilledInput label={"advance_payment_amount"} value={order?.advance_payment_amount} />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FilledInput label={"Order Creditable"} value={order?.is_creditable ? "Yes" : 'No'} />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FilledInput label={"credit_duration"} value={order?.credit_duration} />
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
              Discount
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Price
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Gst Rt.
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Gst Amt
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Total Amt
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Lot No
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Man. Date
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Exp. Date
            </div>
          </div>
        </div>
        {order?.products?.length > 0 ? order?.products.map((item, index) => (
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
              {products.find(
                (product) => product?._id === item.product_id
              )?.product_name}
            </div>
            <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
              {item.quantity}
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              {item.offer_discount}
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              {item.purchase_price}
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              {item.gst_rate}
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              {item.gst_amount}
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              {item.total_amount}
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              {item.lot_no}
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              {formatDate(new Date(item?.manufacture_date))}
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              {formatDate(new Date(item?.expiry_date))}
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



      <Grid item xs={12} md={6}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: 1 }}>
            <Typography variant="h4" style={{ fontWeight: "bold" }} sx={{ marginBottom: "0.5rem" }}>
              Order Update
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <SelectInput
                  name="payment_status"
                  startEdit={true}
                  defaultValue={formData?.payment_status || order?.payment_status}
                  error={errors?.payment_status?.message}
                  options={[
                    { label: "Unpaid", value: "unpaid" },
                    { label: "Paid", value: "paid" },
                  ]}
                  handleChange={(name, value) => handleSelectChange('payment_status', value)}
                  seperatedLabel={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <SelectInput
                  name="status"
                  startEdit={true}
                  defaultValue={formData?.status || order?.status}
                  error={errors?.status?.message}
                  options={[
                    { label: "Transit", value: "transit" },
                    { label: "Completed", value: "completed" },
                    { label: "Due", value: "due" },
                    { label: "Routing Payment", value: "routing_payment" },
                    { label: "Advance Payment", value: "advance_payment" },
                  ]}
                  handleChange={(name, value) => handleSelectChange('status', value)}
                  seperatedLabel={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextInput
                  type="date"
                  name={"purchase_date"}
                  error={errors?.purchase_date?.message}
                  seperatedLabel={false}
                  startEdit={true}
                  defaultValue={formatDate(new Date(formData?.purchase_date || order?.purchase_date))}
                  handleChange={(name, value) => { handleSelectChange("purchase_date", new Date(value)) }}
                />
              </Grid>
              <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
                <div>
                  <FileUpload
                    inputName="Purchase Invoice"
                    defaultFiles={formData.purchase_invoice}
                    error={errors?.purchase_invoice?.message}
                    handleChange={(name, value) => handleSelectChange('purchase_invoice', value)}
                  />
                </div>
              </Grid>
              <Grid item xs={12} >
                <TextInput
                  name="order_notes"
                  type="number"
                  defaultValue={formData?.order_notes}
                  error={errors?.order_notes?.message}
                  startEdit={true}
                  handleChange={(name, value) => handleSelectChange('order_notes', value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} display="flex" flexDirection="column" alignItems="center">
                <ImageWithPreview
                  src={formData?.purchase_invoice?.length > 0
                    ? URL.createObjectURL(formData.purchase_invoice[0]) : order?.purchase_invoice ? AxiosInstancePaths.base_url + order?.purchase_invoice : ""}
                  alt="purchase_invoice"
                  height="102px"
                  width="102px"
                />
              </Grid>

            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
          }}
        >
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
            onClick={updateOrder}
          >
            Save
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default EditPurchaseOrder;
