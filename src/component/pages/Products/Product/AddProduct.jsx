import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import TextInput from "../../../Form/TextInput";
import FileUpload from "../../../Form/FileUpload";
import SelectInput from "../../../Form/SelectInput";
import SwitchInput from "../../../Form/SwitchInput";
import { calculateStandardQty, createGeneralOptions, createProductOptions, formatDate, formatErrorObject, objectToFormData } from "../../../../helpers";
import Editor from "../../../Form/Editor";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../../../redux/slices/loadingSlice";
import axiosInstance from "../../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../../config/AxiosInstancePaths";
import { showErrorMessage, showSuccessMessage } from "../../../../helpers/notificationService";
import { ProductSchema, validateSchema } from "../../../../validation/validationSchema";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import ImageWithPreview from "../../../Basic/ImagePreview";
import BackNavigate from "../../../Basic/BackNavigate";
import { productBaseUnitOption } from "../../../../constant/Options";
import FilledInput from "../../../Basic/FilledInput";


function AddProduct() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const theme = useTheme();
  // const [packingData, setPackingData] = useState({ size: null, amount: null });
  const dispatch = useDispatch();
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [langCode, setLangCode] = useState("")
  const [languages, setLanguages] = useState([]);
  const navigate = useNavigate()

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


  const addProduct = async () => {
    try {

      const isValid = await validateSchema(ProductSchema, formData, setErrors);
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

      const response = await axiosInstance.post(
        AxiosInstancePaths.Products.ADD,
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

  const handleRemoveImages = (index) => {
    const files = formData?.images || []
    const removedfiles = files.filter((_, i) => i !== index)
    handleSelectChange("images", removedfiles);
  };

  useEffect(() => {
    fetchLanguageData()
    // eslint-disable-next-line
  }, []);

  useEffect(() => {

    fetchBrandList()
    fetchCategoryList()
    // eslint-disable-next-line
  }, [langCode]);

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={12} sx={{ paddingTop: { xs: '0.5rem !important', sx: '0.5rem !important', md: '0px !important' } }} >
        <BackNavigate />
      </Grid>
      <Grid item xs={12} md={6}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: 1 }}>
            <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: '0.75rem' }}>
              Product Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12} sm={12}>
                <TextInput
                  name={"product_name*"}
                  error={errors?.product_name?.message}
                  seperatedLabel={true}
                  startEdit={true}
                  handleChange={(name, value) => handleSelectChange('product_name', value)}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12} sm={12}>
                <TextInput
                  name={"product_code*"}
                  error={errors?.product_code?.message}
                  seperatedLabel={true}
                  startEdit={true}
                  handleChange={(name, value) => handleSelectChange('product_code', value)}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12} sm={12}>
                <SelectInput
                  name="Brand*"
                  startEdit={true}
                  error={errors?.brand_id?.message}
                  seperatedLabel={false}
                  options={createProductOptions(brands, "brand_name")}
                  handleChange={(name, value) => handleSelectChange('brand_id', value)}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12} sm={12}>
                <SelectInput
                  name="Category*"
                  error={errors?.category_id?.message}
                  startEdit={true}
                  seperatedLabel={false}
                  options={createProductOptions(categories, "category_name")}
                  handleChange={(name, value) => handleSelectChange('category_id', value)}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12} sm={12}>
                <TextInput
                  type="number"
                  name={"gst_percent*"}
                  error={errors?.gst_percent?.message}
                  seperatedLabel={true}
                  startEdit={true}
                  handleChange={(name, value) => handleSelectChange('gst_percent', value)}
                />
              </Grid>
              <Grid item xs={12} md={6} >
                <TextInput
                  type="number"
                  name={"price*"}
                  error={errors?.price?.message}
                  seperatedLabel={true}
                  startEdit={true}
                  handleChange={(name, value) => handleSelectChange('price', value)}
                />
              </Grid>
              <Grid item xs={12} md={6} >
                <TextInput
                  type="number"
                  name={"quantity*"}
                  error={errors?.quantity?.message}
                  seperatedLabel={true}
                  startEdit={true}
                  handleChange={(name, value) => handleSelectChange('quantity', value)}
                />
              </Grid>
              <Grid item xs={12} md={6} >
                <TextInput
                  type="date"
                  name={"manufacture_date"}
                  error={errors?.manufacture_date?.message}
                  seperatedLabel={true}
                  startEdit={true}
                  defaultValue={formatDate(new Date(formData?.manufacture_date))}
                  handleChange={(name, value) => { handleSelectChange("manufacture_date", new Date(value)) }}
                />
              </Grid>
              <Grid item xs={12} md={6} >
                <TextInput
                  type="date"
                  name={"expiry_date"}
                  error={errors?.expiry_date?.message}
                  seperatedLabel={true}
                  startEdit={true}
                  defaultValue={formatDate(new Date(formData?.expiry_date))}
                  handleChange={(name, value) => { handleSelectChange("expiry_date", new Date(value)) }}
                />
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
                  src={formData?.logo?.length > 0
                    ? URL.createObjectURL(formData.logo[0]) : ""}
                  alt="logo"
                  height="102px"
                  width="102px"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <FileUpload
                  inputName="logo*"
                  defaultFiles={formData.logo}
                  error={errors?.logo?.message}
                  handleChange={(name, value) => handleSelectChange('logo', value)}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <FileUpload
                  inputName="images*"
                  defaultFiles={formData.images}
                  error={errors?.images?.message}
                  multiple={true}
                  handleChange={(name, value) => handleSelectChange('images', value)}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <SwitchInput
                  name="Stock Status"
                  startEdit={true}
                  error={errors?.is_stock?.message}
                  // handleChange={handleSelectChange}
                  defaultValue={formData?.quantity && formData.quantity > 0}
                  isDisabel={true}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <SwitchInput
                  name="Active Status"
                  startEdit={true}
                  error={errors?.is_active?.message}
                  handleChange={(name, value) => handleSelectChange('is_active', value)}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <SwitchInput
                  name="Verification Status"
                  startEdit={true}
                  error={errors?.is_verified?.message}
                  handleChange={(name, value) => handleSelectChange('is_verified', value)}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <SwitchInput
                  name="Featured Product"
                  startEdit={true}
                  error={errors?.is_featured?.message}
                  handleChange={(name, value) => handleSelectChange('is_featured', value)}
                  defaultValue={formData?.is_featured}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <SelectInput
                  name="base_unit*"
                  startEdit={true}
                  error={errors?.base_unit?.message}
                  seperatedLabel={false}
                  defaultValue={formData?.base_unit}
                  options={productBaseUnitOption}
                  handleChange={(name, value) => handleSelectChange('base_unit', value)}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <TextInput
                  type="number"
                  name={"size*"}
                  error={errors?.size?.message}
                  seperatedLabel={true}
                  startEdit={true}
                  handleChange={(name, value) => handleSelectChange('size', value)}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <FilledInput
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                  label={"std_qty"}
                  value={formData?.base_unit && formData?.quantity ? calculateStandardQty(formData?.base_unit, formData?.quantity, formData?.size) : "-"}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <TextInput
                  type="date"
                  name={"GRN_date"}
                  error={errors?.grn_date?.message}
                  seperatedLabel={true}
                  startEdit={true}
                  defaultValue={formatDate(new Date(formData?.grn_date))}
                  handleChange={(name, value) => { handleSelectChange("grn_date", new Date(value)) }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <TextInput
                  name={"lot_no"}
                  error={errors?.lot_no?.message}
                  seperatedLabel={true}
                  startEdit={true}
                  handleChange={handleSelectChange}
                  defaultValue={formData?.lot_no}

                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <TextInput
                  name={"vendor_name"}
                  error={errors?.vendor_name?.message}
                  seperatedLabel={true}
                  startEdit={true}
                  handleChange={handleSelectChange}
                  defaultValue={formData?.vendor_name}
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
      {formData?.images?.length > 0 ? <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: '0.75rem' }}>
              Product Images
            </Typography>
            <div style={{ display: 'flex', overflow: 'auto', gap: '1rem' }}>
              {formData.images.map((image, imageIndex) => (
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
            <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: '0.75rem' }}>
              Description*
            </Typography>
            <Editor
              name={"description*"}
              error={errors?.description?.message}
              defaultValue={formData?.description || ""}
              handleChange={(name, value) => handleSelectChange('description', value)}
            />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} display="flex" gap={"1rem"} justifyContent="end">
        <Button
          fullWidth
          variant="contained"
          onClick={addProduct}
          sx={{
            color: theme.palette.common.white,
            width: "max-content",
            backgroundColor: theme.palette.success.main,
            "&:hover": {
              backgroundColor: theme.palette.success.main,
            },
          }}
        >
          Add Product
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddProduct;
