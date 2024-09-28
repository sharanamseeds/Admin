import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { formatErrorObject, objectToFormData } from "../../../helpers";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../config/AxiosInstancePaths";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import { showErrorMessage, showSuccessMessage } from "../../../helpers/notificationService";
import { updateOrderSchema, validateSchema } from "../../../validation/validationSchema";
import { useTheme } from "@mui/material";
import FilledInput from "../../Basic/FilledInput";
import { paymentMethodsOption } from "../../../constant/Options";
import SelectInput from "../../Form/SelectInput";
import TextInput from "../../Form/TextInput";
import SwitchInput from "../../Form/SwitchInput";
import ImageWithPreview from "../../Basic/ImagePreview";
import FileUpload from "../../Form/FileUpload";
import BackNavigate from "../../Basic/BackNavigate";

function EditOrder() {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [order, setOrder] = useState({});
  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [user, setUser] = useState({});

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
      const isValid = await validateSchema(updateOrderSchema, formData, setErrors);
      if (!isValid) {
        return;
      }
      if (order.is_creditable === false && (formData.status === 'delivered' || formData.status === "return_fulfilled")) {
        if (!formData?.payment_details || formData.payment_details.length === 0) {
          const newErrors = {
            ...errors,
            payment_details: { message: 'Payment details required' }
          };
          setErrors(newErrors);
          return;
        }
        if (!formData?.payment_method) {
          const newErrors = {
            ...errors,
            payment_method: { message: 'Payment method is required' }
          };
          setErrors(newErrors);
          return;
        }
      }
      dispatch(startLoading());

      const newFormData = new FormData();
      let documents = {}
      let tempFormData = { ...formData };

      if (formData?.payment_details) {
        documents.payment_details = formData.payment_details;
        delete tempFormData.payment_details;
      }

      objectToFormData(newFormData, documents);

      const response = await axiosInstance.put(
        AxiosInstancePaths.Orders.UPDATE_BY_ID + id,
        newFormData, {
        params: {
          payload: JSON.stringify(tempFormData)
        },
      }
      );
      showSuccessMessage(response?.data?.message);
      dispatch(stopLoading());
      navigate('/orders')
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.errors) {
        setErrors(formatErrorObject(error?.response?.data?.errors))
      }
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

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
      if (error?.response?.data?.errors) {
        setErrors(formatErrorObject(error?.response?.data?.errors))
      }
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
        // in_stock: true,
        // is_active: true,
        // is_verified: true,
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
      if (error?.response?.data?.errors) {
        setErrors(formatErrorObject(error?.response?.data?.errors))
      }
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  const getStatusOption = (orderStatus) => {
    const pendingOptions = [
      { label: "Confirm", value: "confirm" },
      { label: "Reject", value: "rejected" },
    ]
    const confirmOptions = [
      { label: "Delivered", value: "delivered" },
    ]
    const returnRequestedOption = [
      { label: "Return Accepeted", value: "return_accepeted" },
      { label: "Return Rejected", value: "return_rejected" },
    ]
    const returnAccteptedOption = [
      { label: "Return Fulfilled", value: "return_fulfilled" },
    ]

    switch (orderStatus) {
      case "pending":
        return pendingOptions
      case "confirm":
        return confirmOptions
      case "return_requested":
        return returnRequestedOption
      case "return_accepeted":
        return returnAccteptedOption
      default:
        return []
    }

  }


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
                <FilledInput label={"bill_id"} value={order?.bill_id} />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FilledInput label={"order_amount"} value={order?.order_amount} />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FilledInput label={"discount_amount"} value={order?.discount_amount} />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FilledInput label={"billing_amount"} value={order?.billing_amount} />
              </Grid>

              {order?.status === "pending" ? "" : <Grid item xs={12} md={6} lg={4}>
                <FilledInput label={"Order Creditable"} value={order?.is_creditable ? "Yes" : 'No'} />
              </Grid>}
              {order?.status === "pending" ? "" : <Grid item xs={12} md={6} lg={4}>
                <FilledInput label={"credit_duration"} value={order?.credit_duration} />
              </Grid>}
              {order?.status === "return_fulfilled" || order?.status === "delivered" ?
                <Grid item xs={12} >
                  <FilledInput label={"order_notes"} value={order?.order_notes} />
                </Grid> : ''}
              {order?.status === "return_fulfilled" || order?.status === "delivered" ?
                <Grid item xs={12} >
                  <FilledInput label={"Reason"} value={order?.reason} />
                </Grid> : ''}

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
      {order?.status === "return_fulfilled" || order?.status === "delivered" ? "" :
        <Grid item xs={12} >
          <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent style={{ flex: 1 }}>
              <Typography variant="h4" style={{ fontWeight: "bold" }} sx={{ marginBottom: "0.5rem" }}>
                Order Update
              </Typography>
              <Grid container spacing={2}>
                {["return_fulfilled", "delivered"].includes(order.status) ? '' : <Grid item xs={12} md={6} lg={4}>
                  <SelectInput
                    name="status"
                    startEdit={true}
                    defaultValue={formData?.status}
                    error={errors?.status?.message}
                    options={getStatusOption(order?.status)}
                    handleChange={handleSelectChange}
                    seperatedLabel={true}
                  />
                </Grid>}

                {formData.status === 'confirm' ?
                  <Grid item xs={12} md={6} lg={4} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
                    <div>
                      <SwitchInput
                        name="Creadit Status"
                        startEdit={true}
                        error={errors?.is_creditable?.message}
                        handleChange={(name, value) => handleSelectChange('is_creditable', value)}
                        defaultValue={formData?.is_creditable}
                      />
                    </div>
                  </Grid> : ""}
                {formData.status === 'confirm' ?
                  <Grid item xs={12} md={6} lg={4}>
                    <TextInput
                      name="Credit Days"
                      type="number"
                      defaultValue={formData?.credit_duration}
                      error={errors?.credit_duration?.message}
                      startEdit={true}
                      handleChange={(name, value) => handleSelectChange('credit_duration', value)}
                    />
                  </Grid> : ""}

                {(order.is_creditable === false && (formData.status === 'delivered' || formData.status === "return_fulfilled")) && (
                  <Grid item xs={12} sm={12} display="flex" flexDirection="column" alignItems="center">
                    <ImageWithPreview
                      src={formData?.payment_details?.length > 0
                        ? URL.createObjectURL(formData.payment_details[0]) : ""}
                      alt="payment_details"
                      height="102px"
                      width="102px"
                    />
                  </Grid>
                )}

                {(order.is_creditable === false && (formData.status === 'delivered' || formData.status === "return_fulfilled")) && (
                  <Grid item xs={12} md={6} lg={6} sm={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
                    <div>
                      <FileUpload
                        inputName="Payment Details"
                        defaultFiles={formData.payment_details}
                        error={errors?.payment_details?.message}
                        handleChange={(name, value) => handleSelectChange('payment_details', value)}
                      />
                    </div>
                  </Grid>
                )}

                {(order.is_creditable === false && (formData.status === 'delivered' || formData.status === "return_fulfilled")) && (
                  <Grid item xs={12} md={6} lg={4}>
                    <SelectInput
                      name="Select Payment Method"
                      startEdit={true}
                      defaultValue={formData?.payment_method}
                      error={errors?.payment_method?.message}
                      options={paymentMethodsOption}
                      handleChange={(name, value) => handleSelectChange('payment_method', value)}
                      seperatedLabel={true}
                    />
                  </Grid>
                )}

                <Grid item xs={12} >
                  <TextInput
                    name="Order Notes"
                    defaultValue={formData?.order_notes}
                    error={errors?.order_notes?.message}
                    startEdit={true}
                    handleChange={(name, value) => handleSelectChange('order_notes', value)}
                  />
                </Grid>
                {formData.status === 'rejected' || formData.status === "return_rejected" ?
                  <Grid item xs={12} >
                    <TextInput
                      name="Reason"
                      defaultValue={formData?.reason}
                      error={errors?.reason?.message}
                      startEdit={true}
                      handleChange={(name, value) => handleSelectChange('reason', value)}
                    />
                  </Grid> : ""}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      }
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
          }}
        >
          {order?.is_creditable && (order?.status === "return_fulfilled" || order?.status === "delivered") ?
            <Button
              variant="contained"
              sx={{
                color: theme.palette.common.white,
                width: "max-content",
                backgroundColor: theme.palette.warning.main,
                "&:hover": {
                  backgroundColor: theme.palette.warning.main,
                },
              }}
              onClick={() => navigate(`/orders/return/${order?._id}`)}
            >
              Return Order
            </Button> : ''}

          {order?.status === "return_fulfilled" || order?.status === "delivered" ? "" :
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
          }
        </Box>
      </Grid>
    </Grid>
  );
}

export default EditOrder;
