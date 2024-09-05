import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import FileUpload from "../../../Form/FileUpload";
import Editor from "../../../Form/Editor";
import { createGeneralOptions, createProductOptions, objectToFormData } from "../../../../helpers";
import SelectInput from "../../../Form/SelectInput";
import TextInput from "../../../Form/TextInput";
import { useDispatch } from "react-redux";
import { bundelSchema, OfferSchema, tierSchema, validateSchema } from "../../../../validation/validationSchema";
import { startLoading, stopLoading } from "../../../../redux/slices/loadingSlice";
import axiosInstance from "../../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../../config/AxiosInstancePaths";
import { showErrorMessage, showSuccessMessage } from "../../../../helpers/notificationService";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import ImageWithPreview from "../../../Basic/ImagePreview";
import { couponType, offerType } from "../../../../constant/Options";
import SwitchInput from "../../../Form/SwitchInput";
import SelectMultipleInput from "../../../Form/SelectMultipleInput";
import { MdDelete } from "react-icons/md";
import { IconButton } from "@mui/material";
import InputError from "../../../Basic/InputError";

function AddOffers() {
  const [formData, setFormData] = useState({});
  const [tierData, setTierData] = useState({});
  const [bundleData, setBundleData] = useState({});
  const theme = useTheme();
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [langCode, setLangCode] = useState("")
  const [languages, setLanguages] = useState([]);
  const [categories, setCategories] = useState([]);

  const removeOtherFields = (selectedOffer) => {

    const conditionalFields = [
      'percentage_discount',
      'fixed_amount_discount',
      'tiers',
      'buy_quantity', 'get_quantity',
      'bundle_items',
      "referral_code", 'referral_amount',
      "coupon_code", 'coupon_details'
    ]

    const percentage_fields = ['percentage_discount'];
    const fixed_amount_fields = ['fixed_amount_discount'];
    const tiered_fields = ['tiers'];
    const buy_x_get_y_fields = ['buy_quantity', 'get_quantity'];
    const bundle_fields = ['bundle_items'];
    const referral_fields = ["referral_code", 'referral_amount'];
    const coupon_fields = ["coupon_code", 'coupon_details'];

    let wanted_fields = [];

    switch (selectedOffer) {
      case "percentage":
        wanted_fields = percentage_fields;
        break;
      case "fixed_amount":
        wanted_fields = fixed_amount_fields
        break;
      case "tiered":
        wanted_fields = tiered_fields
        break;
      case "buy_x_get_y":
        wanted_fields = buy_x_get_y_fields
        break;
      case "bundle":
        wanted_fields = bundle_fields
        break;
      case "referral":
        wanted_fields = referral_fields
        break;
      case "coupon":
        wanted_fields = coupon_fields
        break;

      default:
        wanted_fields = []
        break;
    }

    let oldForm = { ...formData }

    const remove_fields = conditionalFields.filter(item => !wanted_fields.includes(item))
    remove_fields.forEach((field) => {
      if (oldForm[field]) delete oldForm[field]
    })
    setFormData(oldForm)
  }


  const handleSelectChange = (name, value) => {

    if (name === "offer_type") {
      removeOtherFields(value)
    }

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

  const handleTierChange = (name, value) => {
    const keys = name.split(".");
    setTierData((prevData) => {
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

  const handleBundleChange = (name, value) => {
    const keys = name.split(".");
    setBundleData((prevData) => {
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

  const deleteTierByIndex = (index) => {
    let array = formData?.tiers || []
    array.splice(index, 1);
    handleSelectChange("tiers", array)
  }

  const deleteBundelByIndex = (index) => {
    let array = formData?.bundle_items || []
    array.splice(index, 1);
    handleSelectChange("bundle_items", array)
  }


  const addTier = async () => {
    let data = {
      min_order_value: tierData?.min_order_value,
      discount: tierData?.discount,
    };

    const isValid = await validateSchema(tierSchema, data, setErrors);
    if (!isValid) {
      return;
    }

    let oldTier = formData?.tiers || []
    oldTier.push(data)
    handleSelectChange("tiers", oldTier)
    setTierData({
      min_order_value: null,
      discount: null,
    })
  }

  const addBundle = async () => {
    let data = {
      product_id: bundleData?.product_id,
      quantity: bundleData?.quantity,
      price: bundleData?.price,
    };

    const isValid = await validateSchema(bundelSchema, data, setErrors);
    if (!isValid) {
      return;
    }

    let oldBundle = formData?.bundle_items || []
    oldBundle.push(data)
    handleSelectChange("bundle_items", oldBundle)
    setBundleData({
      product_id: null,
      quantity: null,
      price: null,
    })
  }


  const addOffer = async () => {
    try {
      const isValid = await validateSchema(OfferSchema, formData, setErrors);
      if (!isValid) {
        return;
      }
      dispatch(startLoading());
      const newFormData = new FormData();
      let documents = {}
      let tempFormData = { ...formData };
      if (formData?.image) {
        documents.image = formData.image
        delete tempFormData.image
      }

      objectToFormData(newFormData, documents);
      dispatch(startLoading());
      const response = await axiosInstance.post(
        AxiosInstancePaths.Offers.ADD,
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
    fetchProductsData()
    fetchCategoryList()
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchProductsData()
    // eslint-disable-next-line
  }, [langCode]);
  return (
    <Grid container spacing={2} alignItems="stretch" justifyContent="end">
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
                      : ""
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
                <SelectInput
                  name="offer_type"
                  startEdit={true}
                  error={errors?.offer_type?.message}
                  seperatedLabel={true}
                  defaultValue={formData?.offer_type}
                  options={offerType}
                  handleChange={handleSelectChange}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <TextInput
                  name={"offer_name"}
                  error={errors?.offer_name?.message}
                  startEdit={true}
                  defaultValue={formData?.offer_name}
                  handleChange={handleSelectChange}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <TextInput
                  name={"offer_code"}
                  startEdit={true}
                  handleChange={handleSelectChange}
                  defaultValue={formData?.offer_code}
                  error={errors?.offer_code?.message}
                />
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
                  defaultValue={formData?.is_active}
                  isDisabel={true}
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
                  handleChange={handleSelectChange}
                  defaultValue={formData?.product_specified}

                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <SwitchInput
                  name="category_specified"
                  startEdit={true}
                  error={errors?.category_specified?.message}
                  handleChange={handleSelectChange}
                  defaultValue={formData?.category_specified}

                />
              </Grid>

              {formData?.product_specified && formData.product_specified === true ?
                <Grid item xs={12} md={12} lg={12} sm={12}>
                  <SelectMultipleInput
                    name="products"
                    startEdit={true}
                    defaultValue={formData?.products}
                    error={errors?.products?.message}
                    options={createProductOptions(products, "product_name")}
                    handleChange={handleSelectChange}
                    seperatedLabel={false}
                  />
                </Grid>
                : ''}
              {formData?.category_specified && formData.category_specified === true ?
                <Grid item xs={12} md={12} lg={12} sm={12}>
                  <SelectMultipleInput
                    name="categories"
                    defaultValue={formData?.categories}
                    error={errors?.categories?.message}
                    startEdit={true}
                    seperatedLabel={false}
                    options={createProductOptions(categories, "category_name")}
                    handleChange={handleSelectChange}
                  />
                </Grid> : ''}


              {formData?.offer_type && formData.offer_type === "percentage" ?
                <Grid item xs={12} md={6} lg={6} sm={12}>
                  <TextInput
                    name={"percentage_discount"}
                    type="number"
                    defaultValue={formData?.percentage_discount}
                    error={errors?.percentage_discount?.message}
                    startEdit={true}
                    handleChange={handleSelectChange}
                  />
                </Grid> : ''}

              {formData?.offer_type && formData.offer_type === "fixed_amount" ?
                <Grid item xs={12} md={6} lg={6} sm={12}>
                  <TextInput
                    name={"fixed_amount_discount"}
                    type="number"
                    defaultValue={formData?.fixed_amount_discount}
                    error={errors?.fixed_amount_discount?.message}
                    startEdit={true}
                    handleChange={handleSelectChange}
                  />
                </Grid> : ''}

              {formData?.offer_type && formData.offer_type === "buy_x_get_y" ?
                <Grid item xs={12} md={6} lg={6} sm={12}>
                  <TextInput
                    name={"buy_quantity"}
                    type="number"
                    defaultValue={formData?.buy_quantity}
                    error={errors?.buy_quantity?.message}
                    startEdit={true}
                    handleChange={handleSelectChange}
                  />
                </Grid> : ''}
              {formData?.offer_type && formData.offer_type === "buy_x_get_y" ?
                <Grid item xs={12} md={6} lg={6} sm={12}>
                  <TextInput
                    name={"get_quantity"}
                    type="number"
                    defaultValue={formData?.get_quantity}
                    error={errors?.get_quantity?.message}
                    startEdit={true}
                    handleChange={handleSelectChange}
                  />
                </Grid> : ''}

              {formData?.offer_type && formData.offer_type === "referral" ?
                <Grid item xs={12} md={6} lg={6} sm={12}>
                  <TextInput
                    name={"referral_code"}
                    defaultValue={formData?.referral_code}
                    error={errors?.referral_code?.message}
                    startEdit={true}
                    handleChange={handleSelectChange}
                  />
                </Grid> : ''}
              {formData?.offer_type && formData.offer_type === "referral" ?
                <Grid item xs={12} md={6} lg={6} sm={12}>
                  <TextInput
                    name={"referral_amount"}
                    type="number"
                    defaultValue={formData?.referral_amount}
                    error={errors?.referral_amount?.message}
                    startEdit={true}
                    handleChange={handleSelectChange}
                  />
                </Grid> : ''}

              {formData?.offer_type && formData.offer_type === "coupon" ?
                <Grid item xs={12}>
                  <TextInput
                    name={"coupon_code"}
                    defaultValue={formData?.coupon_code}
                    error={errors?.coupon_code?.message}
                    startEdit={true}
                    handleChange={handleSelectChange}
                  />
                </Grid> : ''}
              {formData?.offer_type && formData.offer_type === "coupon" ?
                <Grid item xs={12} md={6} lg={6} sm={12}>
                  <SelectInput
                    name="coupon_details.coupon_type"
                    startEdit={true}
                    error={errors?.coupon_details?.coupon_type?.message}
                    seperatedLabel={true}
                    defaultValue={formData?.coupon_details?.coupon_type}
                    options={couponType}
                    handleChange={handleSelectChange}
                  />
                </Grid> : ''}
              {formData?.offer_type && formData.offer_type === "coupon" ?
                <Grid item xs={12} md={6} lg={6} sm={12}>
                  <TextInput
                    name={"coupon_details.value"}
                    type="number"
                    defaultValue={formData?.coupon_details?.value}
                    error={errors?.coupon_details?.value?.message}
                    startEdit={true}
                    handleChange={handleSelectChange}
                  />
                </Grid> : ''}



              {formData?.offer_type && formData.offer_type === "tiered" ?
                <Grid item xs={12} md={6} lg={6} sm={12}>
                  <TextInput
                    name={"min_order_value"}
                    type="number"
                    defaultValue={tierData?.min_order_value}
                    error={errors?.min_order_value?.message}
                    startEdit={true}
                    handleChange={handleTierChange}
                  />
                </Grid> : ''}
              {formData?.offer_type && formData.offer_type === "tiered" ?
                <Grid item xs={12} md={6} lg={6} sm={12}>
                  <TextInput
                    name={"discount"}
                    type="number"
                    defaultValue={tierData?.discount}
                    error={errors?.discount?.message}
                    startEdit={true}
                    handleChange={handleTierChange}
                  />
                </Grid> : ''}
              {formData?.offer_type && formData.offer_type === "tiered" ?
                <Grid item xs={12} display="flex" gap={"1rem"} justifyContent="end">
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={addTier}
                    sx={{
                      color: theme.palette.common.white,
                      width: "max-content",
                      backgroundColor: theme.palette.success.main,
                      "&:hover": {
                        backgroundColor: theme.palette.success.main,
                      },
                    }}
                  >
                    Add Tier
                  </Button>
                </Grid> : ''}
              {errors?.tiers?.message ? <InputError message={errors?.tiers?.message} /> : ""}

              {formData?.offer_type && formData.offer_type === "bundle" ?
                <Grid item xs={12}>
                  <SelectInput
                    name="product_id"
                    startEdit={true}
                    error={errors?.product_id?.message}
                    seperatedLabel={false}
                    options={createProductOptions(products, "product_name")}
                    handleChange={handleBundleChange}
                    defaultValue={bundleData?.product_id}
                  />
                </Grid> : ''}
              {formData?.offer_type && formData.offer_type === "bundle" ?
                <Grid item xs={12} md={6} lg={6} sm={12}>
                  <TextInput
                    name={"quantity"}
                    type="number"
                    defaultValue={bundleData?.quantity}
                    error={errors?.quantity?.message}
                    startEdit={true}
                    handleChange={handleBundleChange}
                  />
                </Grid> : ''}
              {formData?.offer_type && formData.offer_type === "bundle" ?
                <Grid item xs={12} md={6} lg={6} sm={12}>
                  <TextInput
                    name={"price"}
                    type="number"
                    defaultValue={bundleData?.price}
                    error={errors?.price?.message}
                    startEdit={true}
                    handleChange={handleBundleChange}
                  />
                </Grid> : ''}
              {formData?.offer_type && formData.offer_type === "bundle" ?
                <Grid item xs={12} display="flex" gap={"1rem"} justifyContent="end">
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={addBundle}
                    sx={{
                      color: theme.palette.common.white,
                      width: "max-content",
                      backgroundColor: theme.palette.success.main,
                      "&:hover": {
                        backgroundColor: theme.palette.success.main,
                      },
                    }}
                  >
                    Add Bundle
                  </Button>
                </Grid> : ''}
              {errors?.bundle_items?.message ? <InputError message={errors?.bundle_items?.message} /> : ""}

            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {formData?.offer_type && formData.offer_type === "tiered" ? <Grid item xs={12}>
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
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Action
            </div>
          </div>
        </div>
        {formData?.tiers?.length > 0 ? formData?.tiers
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

              <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
                <IconButton
                  size="small"
                  onClick={() => deleteTierByIndex(tierIndex)}
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
            No Tiers Added
          </div>
        )}
      </Grid> : ""}

      {formData?.offer_type && formData.offer_type === "bundle" ? <Grid item xs={12}>
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
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Action
            </div>
          </div>
        </div>
        {formData?.bundle_items?.length > 0 ? formData?.bundle_items
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
              <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
                <IconButton
                  size="small"
                  onClick={() => deleteBundelByIndex(bundelIndex)}
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
            No Bundels Added
          </div>
        )}
      </Grid> : ""}

      <Grid item xs={12} md={12} lg={12} sm={12}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: 1 }}>
            <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: '0.75rem' }}>
              Description
            </Typography>
            <Editor
              name={"description"}
              defaultValue={formData?.description || ""}
              handleChange={handleSelectChange}
              error={errors?.description?.message}
            />
          </CardContent>
        </Card>
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
          onClick={() => navigate("/offers")}
        >
          Cancel
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={addOffer}
          sx={{
            color: theme.palette.common.white,
            width: "max-content",
            backgroundColor: theme.palette.success.main,
            "&:hover": {
              backgroundColor: theme.palette.success.main,
            },
          }}
        >
          Add Offer
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddOffers;
