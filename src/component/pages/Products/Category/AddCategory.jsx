import React, { useEffect, useState } from "react";
import TextInput from "../../../Form/TextInput";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import FileUpload from "../../../Form/FileUpload";
import Editor from "../../../Form/Editor";
import { useDispatch } from "react-redux";
import { CategorySchema, validateSchema } from "../../../../validation/validationSchema";
import { createGeneralOptions, formatErrorObject, objectToFormData } from "../../../../helpers";
import { startLoading, stopLoading } from "../../../../redux/slices/loadingSlice";
import { showErrorMessage, showSuccessMessage } from "../../../../helpers/notificationService";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../../config/AxiosInstancePaths";
import SelectInput from "../../../Form/SelectInput";
import { useTheme } from "@mui/material";
import ImageWithPreview from "../../../Basic/ImagePreview";
import BackNavigate from "../../../Basic/BackNavigate";


function AddCategory() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const theme = useTheme();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [langCode, setLangCode] = useState("")
  const [languages, setLanguages] = useState([]);

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

  const addCategory = async () => {
    try {
      const isValid = await validateSchema(CategorySchema, formData, setErrors);
      if (!isValid) {
        return;
      }

      const newFormData = new FormData();
      let documents = {}
      let tempFormData = { ...formData };
      if (formData?.logo) {
        documents.logo = formData.logo
        delete tempFormData.logo
      }

      objectToFormData(newFormData, documents);
      dispatch(startLoading());
      const response = await axiosInstance.post(
        AxiosInstancePaths.Categories.ADD,
        newFormData, {
        params: {
          lang_code: langCode || 'en',
          payload: JSON.stringify(tempFormData)
        },
      }
      );

      showSuccessMessage(response?.data?.message);
      dispatch(stopLoading());
      navigate('/category')
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.errors) {
        setErrors(formatErrorObject(error?.response?.data?.errors))
      }
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
      if (error?.response?.data?.errors) {
        setErrors(formatErrorObject(error?.response?.data?.errors))
      }
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    fetchLanguageData()
    //eslint-disable-next-line  
  }, [])
  return (
    <Grid container spacing={2} alignItems="stretch" style={{ display: 'flex', justifyContent: 'end' }}>
      <Grid item xs={12} sx={{ paddingTop: { xs: '0.5rem !important', sx: '0.5rem !important', md: '0px !important' } }} >
        <BackNavigate />
      </Grid>
      <Grid item xs={12} md={6}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: 1 }}>
            <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: '0.75rem' }}>
              Category Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <ImageWithPreview
                  src={
                    formData?.logo?.length > 0
                      ? URL.createObjectURL(formData.logo[0])
                      : ""
                  }
                  alt="Brand Logo"
                  height="145px"
                  width="145px"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <FileUpload inputName="logo*" handleChange={(name, value) => handleSelectChange('logo', value)} error={errors?.logo?.message} />
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
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <TextInput
                  name={"category_name*"}
                  error={errors?.category_name?.message}
                  startEdit={true}
                  handleChange={(name, value) => handleSelectChange('category_name', value)}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12} sm={12}>
                <Editor
                  name={"description*"}
                  error={errors?.description?.message}
                  defaultValue={formData?.description || ""}
                  handleChange={(name, value) => handleSelectChange('description', value)}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} display="flex" gap={"1rem"} justifyContent="end">
        <Button
          fullWidth
          variant="contained"
          onClick={addCategory}
          sx={{
            color: theme.palette.common.white,
            width: "max-content",
            backgroundColor: theme.palette.success.main,
            "&:hover": {
              backgroundColor: theme.palette.success.main,
            },
          }}
        >
          Add Category
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddCategory;
