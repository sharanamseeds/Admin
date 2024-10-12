import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import TextInput from "../../../Form/TextInput";
import FileUpload from "../../../Form/FileUpload";
import SelectInput from "../../../Form/SelectInput";
import SwitchInput from "../../../Form/SwitchInput";
import { calculateStandardQty, createGeneralOptions, createProductOptions, formatDate, formatErrorObject, objectToFormData } from "../../../../helpers";
import Editor from "../../../Form/Editor";
import { useDispatch } from "react-redux";
import AxiosInstancePaths from "../../../../config/AxiosInstancePaths";
import axiosInstance from "../../../../config/AxiosConfig";
import { startLoading, stopLoading } from "../../../../redux/slices/loadingSlice";
import { showErrorMessage, showSuccessMessage } from "../../../../helpers/notificationService";
import { UpdateProductSchema, validateSchema } from "../../../../validation/validationSchema";
import { useTheme } from "@mui/material";
import ImageWithPreview from "../../../Basic/ImagePreview";
import FilledInput from "../../../Basic/FilledInput";
import BackNavigate from "../../../Basic/BackNavigate";
import { productBaseUnitOption } from "../../../../constant/Options";

function EditProduct() {
  const { id } = useParams();
  const theme = useTheme();
  const [formData, setFormData] = useState({});
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [langCode, setLangCode] = useState("")
  const [languages, setLanguages] = useState([]);
  const navigate = useNavigate()

  const calculateGstAmount = (gst_percent, price) => {
    if (!gst_percent && !price) {
      return null
    }
    if (gst_percent > 0) {
      const gst =
        (price * gst_percent) / 100;
      const new_price = price + Number(gst.toFixed(2));
      return new_price;
    } else {
      return price;
    }
  }

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


  const updateProduct = async () => {
    try {
      const isValid = await validateSchema(UpdateProductSchema, formData, setErrors);
      if (!isValid) {
        return;
      }
      dispatch(startLoading());

      const newFormData = new FormData();
      let documents = {}
      let tempFormData = { ...formData };
      if (formData?.logo) {
        documents.logo = formData.logo
        delete tempFormData.logo
      }
      if (formData?.images) {
        documents.images = formData.images
        delete tempFormData.images
      }

      objectToFormData(newFormData, documents);

      const response = await axiosInstance.put(
        AxiosInstancePaths.Products.UPDATE_BY_ID + id,
        newFormData, {
        params: {
          lang_code: langCode || 'en',
          payload: JSON.stringify(tempFormData)
        },
      }
      );

      showSuccessMessage(response?.data?.message);
      dispatch(stopLoading());
      navigate('/products')
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.errors) {
        setErrors(formatErrorObject(error?.response?.data?.errors))
      }
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  const fetchProductData = async () => {
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
      if (error?.response?.data?.errors) {
        setErrors(formatErrorObject(error?.response?.data?.errors))
      }
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

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
      if (error?.response?.data?.errors) {
        setErrors(formatErrorObject(error?.response?.data?.errors))
      }
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  }

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
      if (error?.response?.data?.errors) {
        setErrors(formatErrorObject(error?.response?.data?.errors))
      }
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  }

  const deleteProductImage = async (src) => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.put(
        AxiosInstancePaths.Documents.Delete.PRODUCTS_IMAGE + id, { src }
      );
      showSuccessMessage(response?.data?.message);
      dispatch(stopLoading());
      fetchProductData();
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.errors) {
        setErrors(formatErrorObject(error?.response?.data?.errors))
      }
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  }

  const handleRemoveImages = (index) => {
    const files = formData?.images || []
    const removedfiles = files.filter((_, i) => i !== index)
    handleSelectChange("images", removedfiles);
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
      if (error?.response?.data?.errors) {
        setErrors(formatErrorObject(error?.response?.data?.errors))
      }
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    fetchLanguageData()
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // fetchOffersData()
    fetchBrandList()
    fetchCategoryList()
    fetchProductData();
    setFormData({})
    // eslint-disable-next-line
  }, [id, langCode]);

  useEffect(() => {
    if (product) {
      if (product?.packings?.length > 0) {
        handleSelectChange("packings", product.packings);
      }
    }
    // eslint-disable-next-line
  }, [product]);

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={12} sx={{ paddingTop: { xs: '0.5rem !important', sx: '0.5rem !important', md: '0px !important' } }} >
        <BackNavigate />
      </Grid>
      <Grid item xs={12} md={6}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: 1 }}>
            <Typography variant="h4" style={{ fontWeight: "bold" }} sx={{ marginBottom: "0.5rem", width: "100%", textAlign: "left" }}>
              Product Details
            </Typography>
            <Grid container spacing={2} sx={{ width: "100%" }}>
              <Grid item xs={12} md={12} lg={12} sm={12}>
                <TextInput
                  name={"product_name"}
                  error={errors?.product_name?.message}
                  defaultValue={formData?.product_name || product?.product_name}
                  seperatedLabel={true}
                  startEdit={true}
                  handleChange={handleSelectChange}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12} sm={12}>
                <FilledInput
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                  label={"product_code"}
                  value={product?.product_code}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12} sm={12}>
                <SelectInput
                  name="Brand"
                  error={errors?.brand_id?.message}
                  startEdit={true}
                  defaultValue={formData?.brand_id || product?.brand_id}
                  seperatedLabel={false}
                  options={createProductOptions(brands, "brand_name")}
                  handleChange={(name, value) => handleSelectChange('brand_id', value)}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12} sm={12}>
                <SelectInput
                  name="Category"
                  startEdit={true}
                  error={errors?.category_id?.message}
                  defaultValue={formData?.category_id || product?.category_id}
                  seperatedLabel={false}
                  options={createProductOptions(categories, "category_name")}
                  handleChange={(name, value) => handleSelectChange('category_id', value)}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12} sm={12}>
                <TextInput
                  type="number"
                  name={"gst_percent"}
                  error={errors?.gst_percent?.message}
                  seperatedLabel={true}
                  startEdit={true}
                  handleChange={handleSelectChange}
                  defaultValue={formData?.gst_percent || product?.gst_percent}
                />
              </Grid>
              <Grid item xs={12} md={6} >
                <TextInput
                  type="number"
                  name={"price"}
                  error={errors?.price?.message}
                  seperatedLabel={true}
                  startEdit={true}
                  handleChange={handleSelectChange}
                  defaultValue={formData?.price || product?.price}
                />
              </Grid>
              <Grid item xs={12} md={6} >
                <TextInput
                  type="number"
                  name={"quantity"}
                  error={errors?.quantity?.message}
                  seperatedLabel={true}
                  startEdit={true}
                  handleChange={handleSelectChange}
                  defaultValue={formData?.quantity || product?.quantity}
                />
              </Grid>
              <Grid item xs={12} md={6} >
                <TextInput
                  type="date"
                  name={"manufacture_date"}
                  error={errors?.manufacture_date?.message}
                  seperatedLabel={true}
                  startEdit={true}
                  handleChange={(name, value) => { handleSelectChange(name, new Date(value)) }}
                  defaultValue={formData?.manufacture_date ? formatDate(new Date(formData?.manufacture_date)) : formatDate(new Date(product?.manufacture_date))}
                />
              </Grid>
              <Grid item xs={12} md={6} >
                <TextInput
                  type="date"
                  name={"expiry_date"}
                  error={errors?.expiry_date?.message}
                  seperatedLabel={true}
                  startEdit={true}
                  handleChange={(name, value) => { handleSelectChange(name, new Date(value)) }}
                  defaultValue={formData?.expiry_date ? formatDate(new Date(formData?.expiry_date)) : formatDate(new Date(product?.expiry_date))}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FilledInput label={"App Price"} value={calculateGstAmount(formData?.gst_percent || product?.gst_percent, formData?.price || product?.price) || product?.price_with_gst} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} display="flex" flexDirection="column" alignItems="center">
                <ImageWithPreview
                  src={
                    formData?.logo?.length > 0
                      ? URL.createObjectURL(formData.logo[0])
                      : AxiosInstancePaths.base_url + product?.logo || ""
                  }
                  alt="User Profile"
                  height="102px"
                  width="102px"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <FileUpload
                  inputName="logo"
                  error={errors?.logo?.message}
                  handleChange={handleSelectChange}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <FileUpload
                  inputName="images"
                  error={errors?.images?.message}
                  multiple={true}
                  handleChange={handleSelectChange}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <SwitchInput
                  name="Stock Status"
                  startEdit={true}
                  error={errors?.is_stock?.message}
                  // handleChange={handleSelectChange}
                  defaultValue={(formData?.quantity && formData.quantity > 0) || product?.in_stock}
                  isDisabel={true}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <SwitchInput
                  name="Active Status"
                  startEdit={true}
                  error={errors?.is_active?.message}
                  handleChange={(name, value) => handleSelectChange('is_active', value)}
                  defaultValue={"is_active" in formData ? formData?.is_active : product?.is_active}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <SwitchInput
                  name="Verification Status"
                  startEdit={true}
                  error={errors?.is_active?.message}
                  handleChange={(name, value) => handleSelectChange('is_verified', value)}
                  defaultValue={"is_verified" in formData ? formData?.is_verified : product?.is_verified}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <SwitchInput
                  name="Featured Product"
                  startEdit={true}
                  error={errors?.is_featured?.message}
                  handleChange={(name, value) => handleSelectChange('is_featured', value)}
                  defaultValue={"is_featured" in formData ? formData?.is_featured : product?.is_featured}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <SelectInput
                  name="base_unit"
                  startEdit={true}
                  seperatedLabel={false}
                  defaultValue={formData?.base_unit || product?.base_unit}
                  options={productBaseUnitOption}
                  handleChange={(name, value) => handleSelectChange('base_unit', value)}
                />
              </Grid>
              <Grid item xs={12} md={6} >
                <TextInput
                  type="number"
                  name={"size"}
                  error={errors?.size?.message}
                  seperatedLabel={true}
                  startEdit={true}
                  handleChange={handleSelectChange}
                  defaultValue={formData?.size || product?.size}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <FilledInput
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                  label={"std_qty"}
                  value={calculateStandardQty(formData?.base_unit || product?.base_unit, formData?.quantity || product?.quantity, formData?.size || product?.size)}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <TextInput
                  type="date"
                  name={"GRN_date"}
                  error={errors?.grn_date?.message}
                  seperatedLabel={true}
                  startEdit={true}
                  handleChange={(name, value) => { handleSelectChange("grn_date", new Date(value)) }}
                  defaultValue={formData?.grn_date ? formatDate(new Date(formData?.grn_date)) : formatDate(new Date(product?.grn_date))}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <TextInput
                  name={"lot_no"}
                  error={errors?.lot_no?.message}
                  seperatedLabel={true}
                  startEdit={true}
                  handleChange={handleSelectChange}
                  defaultValue={formData?.lot_no ? formData?.lot_no : product?.lot_no}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <TextInput
                  name={"vendor_name"}
                  error={errors?.vendor_name?.message}
                  seperatedLabel={true}
                  startEdit={true}
                  handleChange={handleSelectChange}
                  defaultValue={formData?.vendor_name ? formData?.vendor_name : product?.vendor_name}
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
      {product?.images?.length > 0 || formData?.images?.length > 0 ?
        <Grid item xs={12}>
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
                    deletePath={image}
                    deleteImage={deleteProductImage}
                    isDeletable={true}
                    alt="User Profile"
                    height="200px"
                    width="200px"
                  />
                ))}
                {formData?.images?.map((image, imageIndex) => (
                  <ImageWithPreview
                    key={imageIndex}
                    src={URL.createObjectURL(image)}
                    deletePath={image}
                    deleteImage={() => handleRemoveImages(imageIndex)}
                    isDeletable={true}
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
        <Card>
          <CardContent>
            <Typography variant="h4" style={{ fontWeight: "bold" }} sx={{ marginBottom: "0.5rem", width: "100%", textAlign: "left" }}>
              Description
            </Typography>
            <Editor
              name={"description"}
              error={errors?.description?.message}
              defaultValue={formData?.description || product?.description}
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
            onClick={updateProduct}
          >
            Save
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default EditProduct;
