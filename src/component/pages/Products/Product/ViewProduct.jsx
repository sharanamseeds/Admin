import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import SwitchInput from "../../../Form/SwitchInput";
import { createGeneralOptions, formatDate } from "../../../../helpers";
// import SelectMultipleInput from "../../../Form/SelectMultipleInput";
import FilledInput from "../../../Basic/FilledInput";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../../config/AxiosConfig";
import { startLoading, stopLoading } from "../../../../redux/slices/loadingSlice";
import AxiosInstancePaths from "../../../../config/AxiosInstancePaths";
import { showErrorMessage } from "../../../../helpers/notificationService";
import SelectInput from "../../../Form/SelectInput";
import ImageWithPreview from "../../../Basic/ImagePreview";
import ShowDescription from "../../../Form/ShowDescription";
import BackNavigate from "../../../Basic/BackNavigate";


function ViewProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [offers, setOffers] = useState([]);
  const dispatch = useDispatch();
  const [langCode, setLangCode] = useState("")
  const [languages, setLanguages] = useState([]);

  const fetProductData = async () => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.Products.GET_BY_ID + id, {
        params: {
          lang_code: langCode || 'en'
        },
      }
      );
      if (response.data?.payload) {
        setProduct(response.data?.payload?.result?.product);
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };


  const fetchCategoryList = async () => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.Categories.GET_LIST, {
        params: {
          lang_code: langCode || 'en'
        },
      }
      );
      if (response.data?.payload) {
        setCategories(response.data?.payload?.result?.data);
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  }

  const fetchBrandList = async () => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.Brands.GET_LIST, {
        params: {
          lang_code: langCode || 'en'
        },
      }
      );
      if (response.data?.payload) {
        setBrands(response.data?.payload?.result?.data);
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  }

  // const fetchOfferList = async () => {
  //   try {
  //     dispatch(startLoading());
  //     const response = await axiosInstance.get(
  //       AxiosInstancePaths.Offers.GET_LIST, {
  //       params: {
  //         lang_code: langCode || 'en'
  //       },
  //     }
  //     );
  //     if (response.data?.payload) {
  //       setOffers(response.data?.payload?.result?.data);
  //     }
  //     dispatch(stopLoading());
  //   } catch (error) {
  //     console.log(error);
  //     showErrorMessage(error?.response?.data?.message);
  //     dispatch(stopLoading());
  //   }
  // }

  const fetchLanguageData = async () => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.Languages.GET_LIST
      );
      if (response.data?.payload) {
        setLanguages(response.data?.payload?.result?.data);
        setLangCode(response.data?.payload?.result?.data[0]?.lang_code)
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    fetchLanguageData()
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchCategoryList()
    fetchBrandList()
    // fetchOfferList()
    fetProductData();
    // eslint-disable-next-line
  }, [id, langCode]);

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={12} sx={{ paddingTop: { xs: '0.5rem !important', sx: '0.5rem !important', md: '0px !important' } }} >
        <BackNavigate />
      </Grid>
      <Grid item xs={12} md={6}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: 1 }}>
            <Typography variant="h4" style={{ fontWeight: "bold" }} sx={{ marginBottom: "0.5rem" }}>
              Product Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12} sm={12}>
                <FilledInput
                  label={"product_name"}
                  value={product?.product_name || "Not Added"}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12} sm={12}>
                <FilledInput
                  label={"product_code"}
                  value={product?.product_code || "Not Added"}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FilledInput
                  label={"brand_name"}
                  value={
                    brands.find((item) => item._id === product?.brand_id)
                      ?.brand_name
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FilledInput
                  label={"category_name"}
                  value={
                    categories.find((item) => item._id === product?.category_id)
                      ?.category_name
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FilledInput
                  label={"gst_percent"}
                  value={product?.gst_percent || "Not Added"}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FilledInput
                  label={"price"}
                  value={product?.price || "Not Added"}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FilledInput
                  label={"quantity"}
                  value={product?.quantity?.toString()}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FilledInput
                  label={"manufacture_date"}
                  value={product?.manufacture_date ? formatDate(new Date(product?.manufacture_date)) : ""}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FilledInput
                  label={"expiry_date"}
                  value={product?.expiry_date ? formatDate(new Date(product?.expiry_date)) : ''}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
              <ImageWithPreview
                src={product?.logo ? AxiosInstancePaths.base_url + product?.logo : ""}
                alt="User Profile"
                height="145px"
                width="145px"
              />
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <SwitchInput
                  name="Stock Status"
                  startEdit={true}
                  defaultValue={product?.in_stock}
                  isDisabel={true}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <SwitchInput
                  name="Active Status"
                  startEdit={true}
                  defaultValue={product?.is_active}
                  isDisabel={true}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <SwitchInput
                  name="Verification Status"
                  startEdit={true}
                  defaultValue={product?.is_verified}
                  isDisabel={true}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={6} sm={12}>
                <SwitchInput
                  name="Featured Product"
                  startEdit={true}
                  defaultValue={product?.is_featured}
                  isDisabel={true}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <FilledInput
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                  label={"base_unit"}
                  value={product?.base_unit}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <FilledInput
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                  label={"std_qty"}
                  value={product?.std_qty}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <FilledInput
                  label={"GRN_date"}
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                  value={product?.grn_date ? formatDate(new Date(product?.grn_date)) : ""}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <FilledInput
                  label={"lot_no"}
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                  value={product?.lot_no}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <FilledInput
                  label={"vendor_name"}
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                  value={product?.vendor_name}
                />
              </Grid>


              <Grid item xs={12} md={6} lg={6} sm={12}>
                <SelectInput
                  name="language"
                  startEdit={true}
                  seperatedLabel={false}
                  defaultValue={langCode}
                  options={createGeneralOptions(languages, "lang_name", "lang_code")}
                  handleChange={(name, value) => setLangCode(value)}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {product?.images?.length > 0 ? <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: '0.75rem' }}>
              Product Images
            </Typography>
            <div style={{ display: 'flex', overflow: 'auto', gap: '0.5rem' }}>
              {product?.images?.map((image, imageIndex) => (
                <ImageWithPreview
                  key={imageIndex}
                  src={AxiosInstancePaths.base_url + image}
                  alt="User Profile"
                  height="200px"
                  width="200px"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </Grid> : ""}

      <Grid item xs={12}>
        <Box
          sx={{
            padding: "1.5rem",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
        >
          <Typography variant="h4" style={{ fontWeight: "bold" }} sx={{ marginBottom: "1rem" }}>
            Description
          </Typography>
          <ShowDescription description={product?.description} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default ViewProduct;
