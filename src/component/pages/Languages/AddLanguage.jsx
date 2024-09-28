import React, { useState } from "react";
import {
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import TextInput from "../../Form/TextInput";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import axiosInstance from "../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../config/AxiosInstancePaths";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../helpers/notificationService";
import { languageSchema, validateSchema } from "../../../validation/validationSchema";
import { useNavigate } from "react-router-dom";
import BackNavigate from "../../Basic/BackNavigate";
import { formatErrorObject } from "../../../helpers";

function AddLanguage() {
  const theme = useTheme();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };

  const addLanguage = async () => {
    try {
      const isValid = await validateSchema(languageSchema, formData, setErrors);
      if (!isValid) {
        return;
      }
      dispatch(startLoading());
      const response = await axiosInstance.post(
        AxiosInstancePaths.Languages.ADD,
        formData
      );
      showSuccessMessage(response?.data?.message);
      dispatch(stopLoading());
      navigate('/languages');
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.errors) {
        setErrors(formatErrorObject(error?.response?.data?.errors))
      }
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  return (
    <Grid container spacing={2} display="flex" justifyContent="end">
      <Grid item xs={12} sx={{ paddingTop: { xs: '0.5rem !important', sx: '0.5rem !important', md: '0px !important' } }} >
        <BackNavigate />
      </Grid>
      <Grid item xs={12} md={6}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: 1 }}>
            <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: '0.75rem' }}>
              Language Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextInput
                  name={"lang_name*"}
                  defaultValue={formData?.lang_name}
                  startEdit={true}
                  error={errors?.lang_name?.message}
                  handleChange={(name, value) => handleSelectChange("lang_name", value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextInput
                  name={"lang_code*"}
                  defaultValue={formData?.lang_code}
                  error={errors?.lang_code?.message}
                  startEdit={true}
                  handleChange={(name, value) => handleSelectChange("lang_code", value)}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Button
              fullWidth
              variant="contained"
              onClick={addLanguage}
              sx={{
                color: theme.palette.common.white,
                width: "max-content",
                backgroundColor: theme.palette.success.main,
                "&:hover": {
                  backgroundColor: theme.palette.success.main,
                },
              }}
            >
              Add Language
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AddLanguage;
