import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import TextInput from "../../Form/TextInput";
import SelectInput from "../../Form/SelectInput";
import { createProductOptions, formatDate, formatErrorObject, objectToFormData } from "../../../helpers";
import { MdDelete } from "react-icons/md";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { addPurchaseOrderSchema, productSchema, validateSchema } from "../../../validation/validationSchema";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import axiosInstance from "../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../config/AxiosInstancePaths";
import { showErrorMessage, showSuccessMessage } from "../../../helpers/notificationService";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import BackNavigate from "../../Basic/BackNavigate";
import InputError from "../../Basic/InputError";


function AddOrders() {
  const navigate = useNavigate()
  const theme = useTheme();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({})

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

  const handleProductChange = (name, value) => {
    const keys = name.split(".");
    setProductForm((prevData) => {
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


  const addOrder = async () => {
    try {

      const newFormData = new FormData();
      let documents = {}
      let tempFormData = { ...formData };
      if (formData?.purchase_invoice) {
        documents.purchase_invoice = formData.purchase_invoice
        delete tempFormData.purchase_invoice
      }

      const isValid = await validateSchema(addPurchaseOrderSchema, tempFormData, setErrors);
      if (!isValid) {
        return;
      }

      objectToFormData(newFormData, documents);

      dispatch(startLoading());
      const response = await axiosInstance.post(
        AxiosInstancePaths.PurchseOrders.ADD,
        newFormData,
        {
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
  const removeItem = (index) => {
    let array = formData?.products || [];
    array.splice(index, 1);
    handleSelectChange("products", array);
  };


  const addProduct = async () => {

    const isValid = await validateSchema(productSchema, productForm, setErrors);
    if (!isValid) {
      return;
    }

    // const areDatesEqual = (date1, date2) => {
    //   return (
    //     date1.getFullYear() === date2.getFullYear() &&
    //     date1.getMonth() === date2.getMonth() &&
    //     date1.getDate() === date2.getDate()
    //   );
    // };

    // compare two products except for quantity
    // const areProductsEqual = (product1, product2) => {
    //   return (
    //     product1.product_id === product2.product_id &&
    //     product1.lot_no === product2.lot_no &&
    //     areDatesEqual(product1.manufacture_date, product2.manufacture_date) &&
    //     areDatesEqual(product1.expiry_date, product2.expiry_date)
    //   );
    // };

    // const isAddedQuantity = allProducts.find(item =>
    //   areProductsEqual(item, productForm)
    // );

    // if (isAddedQuantity) {
    //   const productIndex = allProducts.findIndex(item =>
    //     areProductsEqual(item, productForm)
    //   );

    //   const newQuantity = Number(isAddedQuantity.quantity) + Number(productForm.quantity)

    //   const updatedProduct = {
    //     product_id: productForm.product_id,
    //     quantity: newQuantity,
    //     lot_no: productForm.lot_no,
    //     manufacture_date: new Date(productForm.manufacture_date),
    //     expiry_date: new Date(productForm.expiry_date),
    //   };

    //   allProducts[productIndex] = updatedProduct;
    // } else {
    //   const product = {
    //     product_id: productForm.product_id,
    //     quantity: productForm.quantity,
    //     lot_no: productForm.lot_no,
    //     manufacture_date: new Date(productForm.manufacture_date),
    //     expiry_date: new Date(productForm.expiry_date),
    //   };
    //   allProducts.push(product);
    // }

    const allProducts = formData?.products || [];

    const product = {
      product_id: productForm.product_id,
      quantity: productForm.quantity,
      lot_no: productForm.lot_no,
      manufacture_date: new Date(productForm.manufacture_date),
      expiry_date: new Date(productForm.expiry_date),
    };
    allProducts.push(product);
    handleSelectChange("products", allProducts);
    setProductForm({})
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
        // setOffers(response.data?.payload?.result?.meta?.offers);

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



  const fetchUserList = async () => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.Vendors.GET_LIST + `?pagination=false`
      );
      if (response.data?.payload) {
        setUsers(response.data?.payload?.result?.data);
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

  useEffect(() => {
    fetchProductsData()
    fetchUserList();
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={12} sx={{ paddingTop: { xs: '0.5rem !important', sx: '0.5rem !important', md: '0px !important' } }} >
        <BackNavigate />
      </Grid>
      <Grid item xs={12} md={6}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent>
            <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: '0.75rem' }}>
              Purchase Order Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <SelectInput
                  name="Vendor*"
                  error={errors?.vendor_id?.message}
                  startEdit={true}
                  options={createProductOptions(users, "name")}
                  handleChange={(name, value) => handleSelectChange('vendor_id', value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <SelectInput
                  name="status*"
                  startEdit={true}
                  defaultValue={formData?.status}
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
                <SelectInput
                  name="payment_status*"
                  startEdit={true}
                  defaultValue={formData?.payment_status}
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
                <TextInput
                  name="advance_payment_amount"
                  type="number"
                  defaultValue={formData?.advance_payment_amount}
                  error={errors?.advance_payment_amount?.message}
                  startEdit={true}
                  handleChange={(name, value) => handleSelectChange('advance_payment_amount', value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextInput
                  name="contact_name*"
                  defaultValue={formData?.contact_name}
                  error={errors?.contact_name?.message}
                  startEdit={true}
                  handleChange={(name, value) => handleSelectChange('contact_name', value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextInput
                  name="contact_number*"
                  defaultValue={formData?.contact_number}
                  error={errors?.contact_number?.message}
                  startEdit={true}
                  handleChange={(name, value) => handleSelectChange('contact_number', value)}
                />
              </Grid>
              <Grid item xs={12} >
                <TextInput
                  name="order_notes"
                  defaultValue={formData?.order_notes}
                  error={errors?.order_notes?.message}
                  startEdit={true}
                  handleChange={(name, value) => handleSelectChange('order_notes', value)}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>


      <Grid item xs={12} md={6}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent>
            <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: '0.75rem' }}>
              Add Product
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <SelectInput
                  name="Product*"
                  startEdit={true}
                  defaultValue={productForm?.product_id}
                  error={errors?.product_id?.message}
                  options={createProductOptions(products, "product_name")}
                  handleChange={(name, value) => handleProductChange('product_id', value)}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <TextInput
                  name="quantity*"
                  type="number"
                  defaultValue={productForm?.quantity}
                  error={errors?.quantity?.message}
                  startEdit={true}
                  handleChange={(name, value) => handleProductChange('quantity', value)}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={6} sm={12}>
                <TextInput
                  name="lot_no*"
                  defaultValue={productForm?.lot_no}
                  error={errors?.lot_no?.message}
                  startEdit={true}
                  handleChange={(name, value) => handleProductChange('lot_no', value)}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <TextInput
                  type="date"
                  name={"manufacture_date*"}
                  error={errors?.manufacture_date?.message}
                  seperatedLabel={false}
                  startEdit={true}
                  defaultValue={formatDate(new Date(productForm?.manufacture_date))}
                  handleChange={(name, value) => { handleProductChange("manufacture_date", new Date(value)) }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <TextInput
                  type="date"
                  name={"expiry_date*"}
                  error={errors?.expiry_date?.message}
                  seperatedLabel={false}
                  startEdit={true}
                  defaultValue={formatDate(new Date(productForm?.expiry_date))}
                  handleChange={(name, value) => { handleProductChange("expiry_date", new Date(value)) }}
                />
              </Grid>

              <Grid item xs={12} display="flex" gap={"1rem"} justifyContent="end">
                <Button
                  fullWidth
                  variant="contained"
                  onClick={addProduct}
                  sx={{
                    color: theme.palette.common.white,
                    width: "max-content",
                    backgroundColor: theme.palette.warning.main,
                    "&:hover": {
                      backgroundColor: theme.palette.warning.main,
                    },
                  }}
                >
                  Add Product
                </Button>
              </Grid>
              {errors?.products?.message ? <Grid item xs={12} display="flex" gap={"1rem"} justifyContent="end">
                <InputError message={errors?.products?.message} />
              </Grid> : ""}

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
              Lot No
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Man. Date
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Exp. Date
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Action
            </div>
          </div>
        </div>
        {formData?.products?.length > 0 ? formData?.products.map((item, index) => (
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

            <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
              <IconButton
                size="small"
                onClick={() => removeItem(index)}
                style={{ color: theme.palette.error.main }}
              >
                <MdDelete />
              </IconButton>
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

      <Grid item xs={12} display="flex" gap={"1rem"} justifyContent="end">
        <Button
          fullWidth
          variant="contained"
          onClick={addOrder}
          sx={{
            color: theme.palette.common.white,
            width: "max-content",
            backgroundColor: theme.palette.success.main,
            "&:hover": {
              backgroundColor: theme.palette.success.main,
            },
          }}
        >
          Add Order
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddOrders;
