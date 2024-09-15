import React, { useEffect, useState } from "react";
import TextInput from "../../../Form/TextInput";
import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import FileUpload from "../../../Form/FileUpload";
import { BrandSchema, validateSchema } from "../../../../validation/validationSchema";
import { createGeneralOptions, objectToFormData } from "../../../../helpers";
import axiosInstance from "../../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../../config/AxiosInstancePaths";
import { startLoading, stopLoading } from "../../../../redux/slices/loadingSlice";
import { showErrorMessage, showSuccessMessage } from "../../../../helpers/notificationService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SelectInput from "../../../Form/SelectInput";
import ImageWithPreview from "../../../Basic/ImagePreview";
import { useTheme } from "@mui/material";


function AddBrand() {
  const [langCode, setLangCode] = useState("")
  const [languages, setLanguages] = useState([]);
  const theme = useTheme();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSelectChange = (name, value) => {
    const newErrors = { ...errors }
    delete newErrors[name]
    setErrors(newErrors);

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addBrand = async () => {
    try {
      const isValid = await validateSchema(BrandSchema, formData, setErrors);
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
        AxiosInstancePaths.Brands.ADD,
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

  useEffect(() => {
    fetchLanguageData()
    // eslint-disable-next-line
  }, [])

  return (
    <Grid container spacing={2} alignItems="stretch" style={{ display: 'flex', justifyContent: 'end' }}>
      <Grid item xs={12} md={6}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: 1 }}>
            <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: '0.75rem' }}>Brand Details</Typography>
            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
              <ImageWithPreview
                src={
                  formData?.logo?.length > 0
                    ? URL.createObjectURL(formData.logo[0])
                    : ""
                }
                alt="User Profile"
                height="145px"
                width="145px"
              />
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={6} sm={12} style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: 'end'
              }}>
                <div style={{ width: '100%' }}>
                  <FileUpload inputName="logo" handleChange={handleSelectChange} error={errors?.logo?.message} />
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextInput
                  name={"brand_name"}
                  startEdit={true}
                  error={errors?.brand_name?.message}
                  handleChange={handleSelectChange}
                />
              </Grid>
              {/* <Grid item xs={12} md={6}>
                <TextInput
                  name={"tag_line"}
                  startEdit={true}
                  error={errors?.tag_line?.message}
                  handleChange={handleSelectChange}
                />
              </Grid> */}
              <Grid item xs={12} md={6}>
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
          onClick={() => navigate("/brands")}
        >
          Cancel
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={addBrand}
          sx={{
            color: theme.palette.common.white,
            width: "max-content",
            backgroundColor: theme.palette.success.main,
            "&:hover": {
              backgroundColor: theme.palette.success.main,
            },
          }}
        >
          Add Brand
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddBrand;
