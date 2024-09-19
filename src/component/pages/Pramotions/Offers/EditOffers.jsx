import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import FileUpload from "../../../Form/FileUpload";
import Editor from "../../../Form/Editor";
import { createGeneralOptions, objectToFormData } from "../../../../helpers";
import SelectInput from "../../../Form/SelectInput";
import TextInput from "../../../Form/TextInput";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../../../redux/slices/loadingSlice";
import axiosInstance from "../../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../../config/AxiosInstancePaths";
import { showErrorMessage, showSuccessMessage } from "../../../../helpers/notificationService";
import { UpdateOfferSchema, validateSchema } from "../../../../validation/validationSchema";
import { useTheme } from "@mui/material";
import ImageWithPreview from "../../../Basic/ImagePreview";
import { couponType, offerType } from "../../../../constant/Options";
import SwitchInput from "../../../Form/SwitchInput";
import FilledInput from "../../../Basic/FilledInput";
import BackNavigate from "../../../Basic/BackNavigate";
// import SelectMultipleInput from "../../../Form/SelectMultipleInput";

function EditOffers() {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [offer, setOffer] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [langCode, setLangCode] = useState("")
  const [languages, setLanguages] = useState([]);
  const [categories, setCategories] = useState([]);


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

  const updateOffer = async () => {
    try {
      const isValid = await validateSchema(UpdateOfferSchema, formData, setErrors);
      if (!isValid) {
        return;
      }

      const newFormData = new FormData();
      let documents = {}
      let tempFormData = { ...formData };
      if (formData?.image) {
        documents.image = formData.image
        delete tempFormData.image
      }

      objectToFormData(newFormData, documents);
      dispatch(startLoading());
      const response = await axiosInstance.put(
        AxiosInstancePaths.Offers.UPDATE_BY_ID + id,
        newFormData, {
        params: {
          lang_code: langCode || 'en',
          payload: JSON.stringify(tempFormData)
        },
      }
      );

      showSuccessMessage(response?.data?.message);
      dispatch(stopLoading());
      navigate('/offers')
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  const fetOfferData = async () => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.Offers.GET_BY_ID + id, {
        params: {
          lang_code: langCode || 'en'
        },
      }
      );
      if (response.data?.payload) {
        setOffer(response.data?.payload?.result);
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
      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.Products.GET_LIST, {
        params: {
          lang_code: langCode || 'en'
        },
      }
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


  useEffect(() => {
    fetchLanguageData()
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchProductsData()
    fetOfferData();
    fetchCategoryList()
    // eslint-disable-next-line
  }, [id, langCode]);

  return (
    <Grid container spacing={2} alignItems="stretch" justifyContent="end">
      <Grid item xs={12} sx={{ paddingTop: { xs: '0.5rem !important', sx: '0.5rem !important', md: '0px !important' } }} >
        <BackNavigate />
      </Grid>
      <Grid item xs={12} md={6}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: 1 }}>
            <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: '0.75rem' }}>
              Offer Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} display="flex" flexDirection="column" alignItems="center">
                <ImageWithPreview
                  src={
                    formData?.image?.length > 0
                      ? URL.createObjectURL(formData.image[0])
                      : offer?.image ? AxiosInstancePaths.base_url + offer.image : ""
                  }
                  alt="User Profile"
                  height="102px"
                  width="102px"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
                <div>
                  <FileUpload inputName="image" handleChange={handleSelectChange} error={errors?.image?.message} />
                </div>
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <FilledInput label={"offer_type"} value={offer?.offer_type ? offerType.find(item => item.value === offer?.offer_type).label : ""} />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <TextInput
                  name={"offer_name"}
                  error={errors?.offer_name?.message}
                  startEdit={true}
                  defaultValue={formData?.offer_name || offer?.offer_name}
                  handleChange={handleSelectChange}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <FilledInput label={"offer_code"} value={offer?.offer_code} />
              </Grid>
              <Grid item xs={12} md={6}>
                <SelectInput
                  name="language"
                  startEdit={true}
                  seperatedLabel={false}
                  defaultValue={langCode}
                  options={createGeneralOptions(languages, "lang_name", "lang_code")}
                  handleChange={(name, value) => setLangCode(value)}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <SwitchInput
                  name="is_active"
                  startEdit={true}
                  error={errors?.is_active?.message}
                  handleChange={handleSelectChange}
                  defaultValue={formData?.is_active || offer?.is_active}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: 1 }}>
            <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: '0.75rem' }}>
              Other Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <SwitchInput
                  name="product_specified"
                  startEdit={true}
                  error={errors?.product_specified?.message}
                  // handleChange={handleSelectChange}
                  defaultValue={offer?.product_specified}
                  isDisabel={true}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <SwitchInput
                  name="category_specified"
                  startEdit={true}
                  error={errors?.category_specified?.message}
                  // handleChange={handleSelectChange}
                  defaultValue={offer?.category_specified}
                  isDisabel={true}
                />
              </Grid>

              {offer?.offer_type && offer.offer_type === "percentage" ?
                <Grid item xs={12} md={6} lg={6} sm={12}>
                  <FilledInput label={"percentage_discount"} value={offer?.percentage_discount} />
                </Grid> : ''}

              {offer?.offer_type && offer.offer_type === "fixed_amount" ?
                <Grid item xs={12} md={6} lg={6} sm={12}>
                  <FilledInput label={"fixed_amount_discount"} value={offer?.fixed_amount_discount} />
                </Grid> : ''}

              {offer?.offer_type && offer.offer_type === "buy_x_get_y" ?
                <Grid item xs={12} md={6} lg={6} sm={12}>
                  <FilledInput label={"buy_quantity"} value={offer?.buy_quantity} />
                </Grid> : ''}
              {offer?.offer_type && offer.offer_type === "buy_x_get_y" ?
                <Grid item xs={12} md={6} lg={6} sm={12}>
                  <FilledInput label={"get_quantity"} value={offer?.get_quantity} />
                </Grid> : ''}

              {offer?.offer_type && offer.offer_type === "referral" ?
                <Grid item xs={12} md={6} lg={6} sm={12}>
                  <FilledInput label={"referral_code"} value={offer?.referral_code} />
                </Grid> : ''}
              {offer?.offer_type && offer.offer_type === "referral" ?
                <Grid item xs={12} md={6} lg={6} sm={12}>
                  <FilledInput label={"referral_amount"} value={offer?.referral_amount} />
                </Grid> : ''}

              {offer?.offer_type && offer.offer_type === "coupon" ?
                <Grid item xs={12}>
                  <FilledInput label={"coupon_code"} value={offer?.coupon_code} />
                </Grid> : ''}
              {offer?.offer_type && offer.offer_type === "coupon" ?
                <Grid item xs={12} md={6} lg={6} sm={12}>
                  <FilledInput label={"coupon_type"} value={offer?.coupon_details?.coupon_type ? couponType.find(item => item.value === offer?.coupon_details?.coupon_type).label : ''} />
                </Grid> : ''}
              {offer?.offer_type && offer.offer_type === "coupon" ?
                <Grid item xs={12} md={6} lg={6} sm={12}>
                  <FilledInput label={"value"} value={offer?.coupon_details?.value} />
                </Grid> : ''}
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {offer?.offer_type && offer.offer_type === "tiered" ? <Grid item xs={12}>
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
              Sr. No.
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Min Order Value
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Discount
            </div>
          </div>
        </div>
        {offer?.tiers?.length > 0 ? offer?.tiers
          .map((tier, tierIndex) => (
            <div
              key={tierIndex}
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
                  tierIndex + 1
                }
              </div>
              <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
                {tier.min_order_value}
              </div>
              <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
                {tier.discount}
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
            No Tiers Added
          </div>
        )}
      </Grid> : ""}

      {offer?.offer_type && offer.offer_type === "bundle" ? <Grid item xs={12}>
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
              Sr. No.
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Product
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Quantity
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Price
            </div>
          </div>
        </div>
        {offer?.bundle_items?.length > 0 ? offer?.bundle_items
          .map((bundel, bundelIndex) => (
            <div
              key={bundelIndex}
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
                  bundelIndex + 1
                }
              </div>
              <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
                {products.find(item => item._id === bundel.product_id)?.product_name}
              </div>
              <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
                {bundel.quantity}
              </div>
              <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
                {bundel.price}
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
            No Bundels Added
          </div>
        )}
      </Grid> : ""}

      {offer?.products?.length > 0 ?
        <Grid item xs={12}>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            Selected Products
          </Typography>
        </Grid>
        : ""}

      {offer?.products?.length > 0 ? <Grid item xs={12}>
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
              Sr. No.
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Product Name
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Code
            </div>
          </div>
        </div>
        {offer?.products
          .map((product, productIndex) => (
            <div
              key={productIndex}
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
                  productIndex + 1
                }
              </div>
              <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
                {products.find(item => item._id === product)?.product_name}
              </div>
              <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
                {products.find(item => item._id === product)?.product_code}
              </div>
            </div>
          ))}
      </Grid> : ""}

      {offer?.categories?.length > 0 ?
        <Grid item xs={12}>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            Selected Categories
          </Typography>
        </Grid>
        : ""}

      {offer?.categories?.length > 0 ? <Grid item xs={12}>
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
              Sr. No.
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Category Name
            </div>
          </div>
        </div>
        {offer?.categories
          .map((category, categoryIndex) => (
            <div
              key={categoryIndex}
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
                  categoryIndex + 1
                }
              </div>
              <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
                {categories.find(item => item._id === category)?.category_name}
              </div>
            </div>
          ))}
      </Grid> : ""}

      <Grid item xs={12} md={12} lg={12} sm={12}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: 1 }}>
            <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: '0.75rem' }}>
              Description
            </Typography>
            <Editor
              name={"description"}
              defaultValue={formData?.description || offer?.description}
              handleChange={handleSelectChange}
            />
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
            onClick={updateOffer}
          >
            Save
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default EditOffers;
