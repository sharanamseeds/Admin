import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
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
import BackNavigate from "../../Basic/BackNavigate";
import { AiFillEdit } from "react-icons/ai";
import InputError from "../../Basic/InputError";

function EditPurchaseOrder() {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [formProductData, setProductFormData] = useState({});
  const [order, setOrder] = useState({});
  const [errors, setErrors] = useState({});
  const [vendor, setVendor] = useState({});
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [orderProducts, setOrderProducts] = useState([]);


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

  const handleProductSelectChange = (name, value) => {
    const keys = name.split(".");
    setProductFormData((prevData) => {
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

      const oldProducts = order?.products?.map((item) => {
        let data = item;
        delete data._id;
        delete data.uom;
        delete data.final_quantity;
        return data;
      })
      const areDatesEqual = (date1, date2) => {
        // Ensure both date1 and date2 are Date objects
        const d1 = new Date(date1);
        const d2 = new Date(date2);

        return (
          d1.getFullYear() === d2.getFullYear() &&
          d1.getMonth() === d2.getMonth() &&
          d1.getDate() === d2.getDate()
        );
      };

      const areProductsEqual = (product1, product2) => {
        return (
          product1.lot_no === product2.lot_no &&
          areDatesEqual(product1.manufacture_date, product2.manufacture_date) &&
          areDatesEqual(product1.expiry_date, product2.expiry_date)
        );
      };

      const areProductArraysEqual = (arr1, arr2) => {
        if (arr1.length !== arr2.length) {
          return false;
        }
        for (let i = 0; i < arr1.length; i++) {
          if (!areProductsEqual(arr1[i], arr2[i])) {
            return false; // If any product is not equal, return false
          }
        }
        return true; // If all products are equal, return true
      };
      const isSame = areProductArraysEqual(oldProducts, orderProducts)

      if (!isSame) {
        tempFormData.products = orderProducts
      }

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
        const productWithOutIds = response.data?.payload?.result?.products?.map((item) => {
          let data = item;
          delete data._id;
          delete data.uom;
          delete data.final_quantity;
          return data;
        })
        setOrderProducts(productWithOutIds)
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

  const saveProduct = () => {

    if (editId !== null) {
      const updatedProducts = [...orderProducts];

      updatedProducts[editId] = {
        ...updatedProducts[editId],
        ...formProductData
      };
      setOrderProducts(updatedProducts);
      setEditId(null);
      setProductFormData({});
    }
  }


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
            <Typography variant="h4" style={{ fontWeight: "bold", }}>
              Invoice No : {order?.invoice_no}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: 1 }}>
            <Typography variant="h4" style={{ fontWeight: "bold" }} sx={{ marginBottom: "0.5rem" }}>
              Order Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FilledInput
                  label={"vendor"}
                  value={vendor?.name}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FilledInput label={"invoice_no"} value={order?.invoice_no} />
              </Grid>
              <Grid item xs={12} md={6}>
                <FilledInput label={"advance_payment_amount"} value={order?.advance_payment_amount || "0"} />
              </Grid>
              <Grid item xs={12} md={6}>
                <FilledInput label={"purchase_date"} value={formatDate(new Date(order?.purchase_date))} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      {editId !== null ? <Grid item xs={12} md={6}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: 1 }}>
            <Typography variant="h4" style={{ fontWeight: "bold" }} sx={{ marginBottom: "0.5rem" }}>
              Edit Product
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <TextInput
                  name="lot_no*"
                  defaultValue={formProductData?.lot_no}
                  error={errors?.lot_no?.message}
                  startEdit={true}
                  handleChange={(name, value) => handleProductSelectChange('lot_no', value)}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <TextInput
                  type="date"
                  name={"manufacture_date*"}
                  error={errors?.manufacture_date?.message}
                  seperatedLabel={false}
                  startEdit={true}
                  defaultValue={formatDate(new Date(formProductData?.manufacture_date))}
                  handleChange={(name, value) => { handleProductSelectChange("manufacture_date", new Date(value)) }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <TextInput
                  type="date"
                  name={"expiry_date*"}
                  error={errors?.expiry_date?.message}
                  seperatedLabel={false}
                  startEdit={true}
                  defaultValue={formatDate(new Date(formProductData?.expiry_date))}
                  handleChange={(name, value) => { handleProductSelectChange("expiry_date", new Date(value)) }}
                />
              </Grid>

              <Grid item xs={12} display="flex" gap={"1rem"} justifyContent="end">
                <Button
                  fullWidth
                  variant="contained"
                  onClick={saveProduct}
                  sx={{
                    color: theme.palette.common.white,
                    width: "max-content",
                    backgroundColor: theme.palette.warning.main,
                    "&:hover": {
                      backgroundColor: theme.palette.warning.main,
                    },
                  }}
                >
                  Save
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    setEditId(null);
                    setProductFormData({});
                  }}
                  sx={{
                    color: theme.palette.common.white,
                    width: "max-content",
                    backgroundColor: theme.palette.error.main,
                    "&:hover": {
                      backgroundColor: theme.palette.error.main,
                    },
                  }}
                >
                  Cancle
                </Button>
              </Grid>
              {errors?.products?.message ? <Grid item xs={12} display="flex" gap={"1rem"} justifyContent="end">
                <InputError message={errors?.products?.message} />
              </Grid> : ""}

            </Grid>
          </CardContent>
        </Card>
      </Grid> : ''}

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
              Lot No
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Man. Date
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Exp. Date
            </div>
            {order?.status !== "completed" ? <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Action
            </div> : ""}

          </div>
        </div>
        {orderProducts?.length > 0 ? orderProducts.map((item, index) => (
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
              {item.lot_no}
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              {formatDate(new Date(item?.manufacture_date))}
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              {formatDate(new Date(item?.expiry_date))}
            </div>
            {order?.status !== "completed" ? <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <IconButton
                size="small"
                onClick={() => {
                  setEditId(index);
                  handleProductSelectChange("expiry_date", new Date(item?.expiry_date));
                  handleProductSelectChange("manufacture_date", new Date(item?.manufacture_date));
                  handleProductSelectChange('lot_no', item.lot_no)
                }}
                style={{ color: theme.palette.warning.main }}
              >
                <AiFillEdit />
              </IconButton>
            </div> : ""}
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
                  name="contact_name"
                  defaultValue={formData?.contact_name || order?.contact_name}
                  error={errors?.contact_name?.message}
                  startEdit={true}
                  handleChange={(name, value) => handleSelectChange('contact_name', value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextInput
                  name="contact_number"
                  defaultValue={formData?.contact_number || order?.contact_number}
                  error={errors?.contact_number?.message}
                  startEdit={true}
                  handleChange={(name, value) => handleSelectChange('contact_number', value)}
                />
              </Grid>
              <Grid item xs={12} >
                <TextInput
                  name="order_notes"
                  type="number"
                  defaultValue={formData?.order_notes || order?.order_notes}
                  error={errors?.order_notes?.message}
                  startEdit={true}
                  handleChange={(name, value) => handleSelectChange('order_notes', value)}
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
