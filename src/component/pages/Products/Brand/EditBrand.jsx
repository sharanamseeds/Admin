import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextInput from "../../../Form/TextInput";
import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import FileUpload from "../../../Form/FileUpload";
import { UpdateBrandSchema, validateSchema } from "../../../../validation/validationSchema";
import axiosInstance from "../../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../../config/AxiosInstancePaths";
import { showErrorMessage, showSuccessMessage } from "../../../../helpers/notificationService";
import { useDispatch } from "react-redux";
import { createGeneralOptions, formatErrorObject, objectToFormData } from "../../../../helpers";
import { startLoading, stopLoading } from "../../../../redux/slices/loadingSlice";
import SelectInput from "../../../Form/SelectInput";
import { useTheme } from "@mui/material";
import ImageWithPreview from "../../../Basic/ImagePreview";
import BackNavigate from "../../../Basic/BackNavigate";


function EditBrand() {
  const { id } = useParams();
  const theme = useTheme();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [brand, setBrand] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate()
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

  const updateBrand = async () => {
    try {
      const isValid = await validateSchema(UpdateBrandSchema, formData, setErrors);
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
      const response = await axiosInstance.put(
        AxiosInstancePaths.Brands.UPDATE_BY_ID + id,
        newFormData, {
        params: {
          lang_code: langCode || 'en',
          payload: JSON.stringify(tempFormData)
        },
      }
      );

      showSuccessMessage(response?.data?.message);
      dispatch(stopLoading());
      navigate('/brands')
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.errors) {
        setErrors(formatErrorObject(error?.response?.data?.errors))
      }
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }

  };

  const fetBrandData = async () => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.Brands.GET_BY_ID + id, {
        params: {
          lang_code: langCode || 'en'
        }
      }
      );
      if (response.data?.payload) {
        setBrand(response.data?.payload?.result);
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
    fetBrandData();

    // eslint-disable-next-line
  }, [id, langCode]);
  useEffect(() => {
    fetchLanguageData();
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container spacing={2} alignItems="stretch" style={{ display: 'flex', justifyContent: 'end' }}>
      <Grid item xs={12} sx={{ paddingTop: { xs: '0.5rem !important', sx: '0.5rem !important', md: '0px !important' } }} >
        <BackNavigate />
      </Grid>
      <Grid item xs={12} md={6}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: 1 }}>
            <Typography variant="h4" style={{ fontWeight: "bold" }} sx={{ marginBottom: "0.5rem", width: "100%", textAlign: "left" }}>
              Brand Details
            </Typography>
            <Grid container spacing={2} sx={{ width: "100%" }}>
              <Grid item xs={12} sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <ImageWithPreview
                  src={formData?.logo?.length > 0
                    ? URL.createObjectURL(formData.logo[0])
                    : brand?.logo ? AxiosInstancePaths.base_url + brand?.logo : ""}
                  alt="User Profile"
                  height="145px"
                  width="145px"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12} style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: 'end'
              }}>
                <div style={{ width: '100%' }}>
                  <FileUpload inputName="logo" handleChange={handleSelectChange} error={errors?.logo?.message} />
                </div>
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <TextInput
                  name={"brand_name"}
                  defaultValue={brand?.brand_name}
                  error={errors?.brand_name?.message}
                  startEdit={true}
                  handleChange={handleSelectChange}
                />
              </Grid>
              {/* <Grid item xs={12} md={6} lg={6} sm={12}>
                <TextInput
                  name={"tag_line"}
                  startEdit={true}
                  defaultValue={brand?.tag_line}
                  error={errors?.tag_line?.message}
                  handleChange={handleSelectChange}
                />
              </Grid> */}
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <SelectInput
                  name="language"
                  startEdit={true}
                  seperatedLabel={true}
                  defaultValue={langCode}
                  options={createGeneralOptions(languages, "lang_name", "lang_code")}
                  handleChange={(name, value) => setLangCode(value)}
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
            onClick={updateBrand}
          >
            Save
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default EditBrand;
