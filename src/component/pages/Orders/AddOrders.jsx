import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import TextInput from "../../Form/TextInput";
import SelectInput from "../../Form/SelectInput";
import { createProductOptions } from "../../../helpers";
import { MdDelete } from "react-icons/md";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { orderProductSchema, OrderSchema, validateSchema } from "../../../validation/validationSchema";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import axiosInstance from "../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../config/AxiosInstancePaths";
import { showErrorMessage, showSuccessMessage } from "../../../helpers/notificationService";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";

function AddOrders() {
  const navigate = useNavigate()
  const theme = useTheme();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [allOffers, setAllOffers] = useState([]);
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
      const isValid = await validateSchema(OrderSchema, formData, setErrors);
      if (!isValid) {
        return;
      }

      dispatch(startLoading());
      const response = await axiosInstance.post(
        AxiosInstancePaths.Orders.ADD,
        {},
        {
          params: {
            payload: JSON.stringify(formData)
          },
        }
      );
      showSuccessMessage(response?.data?.message);
      dispatch(stopLoading());
      navigate('/orders')
    } catch (error) {
      console.log(error);
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

    const isValid = await validateSchema(orderProductSchema, productForm, setErrors);
    if (!isValid) {
      return;
    }

    const allProducts = formData?.products || [];
    const isAddedQuantity = allProducts.find(item =>
      item.product_id === productForm.product_id &&
      item.offer_id === productForm.offer_id
    );
    if (isAddedQuantity) {
      const productIndex = allProducts.findIndex(item =>
        item.product_id === productForm.product_id &&
        item.offer_id === productForm.offer_id
      );
      const newQuantity = Number(isAddedQuantity.quantity) + Number(productForm.quantity)

      const updatedProduct = {
        product_id: productForm.product_id,
        quantity: newQuantity,
        offer_id: productForm.offer_id,
      };

      allProducts[productIndex] = updatedProduct;
    } else {
      const product = {
        product_id: productForm.product_id, // id 
        quantity: productForm.quantity,
        offer_id: productForm.offer_id, // array of ids
      };
      allProducts.push(product);
    }
    handleSelectChange("products", allProducts);
    setProductForm({})
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
        // setOffers(response.data?.payload?.result?.meta?.offers);

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
        setAllOffers(response.data?.payload?.result?.data);
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  const fetchUserList = async () => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.Users.GET_LIST + `?pagination=false`
      );
      if (response.data?.payload) {
        setUsers(response.data?.payload?.result?.data);
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  }

  useEffect(() => {
    fetchProductsData()
    fetchUserList();
    fetchOffersData()
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={12} md={6}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent>
            <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: '0.75rem' }}>
              Order Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <SelectInput
                  name="User"
                  error={errors?.user_id?.message}
                  startEdit={true}
                  options={createProductOptions(users, "name")}
                  handleChange={(name, value) => handleSelectChange('user_id', value)}
                />
              </Grid>
              {/* <Grid item xs={12} md={6} lg={6} sm={12}>
                <SelectInput
                  name="status"
                  error={errors?.status?.message}
                  startEdit={true}
                  options={statusOption}
                  handleChange={handleSelectChange}
                />
              </Grid> */}
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
                  name="Product"
                  startEdit={true}
                  defaultValue={productForm?.product_id}
                  error={errors?.product_id?.message}
                  options={createProductOptions(products, "product_name")}
                  handleChange={(name, value) => handleProductChange('product_id', value)}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <TextInput
                  name="quantity"
                  type="number"
                  defaultValue={productForm?.quantity}
                  error={errors?.quantity?.message}
                  startEdit={true}
                  handleChange={handleProductChange}
                />
              </Grid>
              <Grid item xs={12} >
                <SelectInput
                  name="Offer"
                  startEdit={true}
                  defaultValue={productForm?.offer_id}
                  error={errors?.offer_id?.message}
                  options={
                    createProductOptions(
                      productForm?.product_id ? products.find(item => item._id === productForm?.product_id)?.offers : [],
                      "offer_name"
                    )
                  }
                  handleChange={(name, value) => handleProductChange('offer_id', value)}
                  seperatedLabel={false}
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
              Offer Code
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
            <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
              {item?.offer_id ? allOffers.find(offer => offer?._id === item?.offer_id)?.offer_code : "No Offer"}
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
          variant="contained"
          sx={{
            color: theme.palette.common.white,
            width: "max-content",
            backgroundColor: theme.palette.error.main,
            "&:hover": {
              backgroundColor: theme.palette.error.main,
            },
          }}
          onClick={() => navigate("/orders")}
        >
          Cancel
        </Button>
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
