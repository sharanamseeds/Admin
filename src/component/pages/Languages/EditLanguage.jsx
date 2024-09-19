import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../helpers/notificationService";
import axiosInstance from "../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../config/AxiosInstancePaths";
import {
  updateLanguageSchema,
  validateSchema,
} from "../../../validation/validationSchema";
import BackNavigate from "../../Basic/BackNavigate";

function EditLanguage() {
  const theme = useTheme();

  const { id } = useParams();
  const [language, setLanguage] = useState();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
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


  const fetchLanguageData = async () => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.Languages.GET_BY_ID + id
      );
      if (response.data?.payload) {
        setLanguage(response.data?.payload?.result);
        setFormData({
          lang_name: response.data?.payload?.result?.lang_name,
        });
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  const updateLanguage = async () => {
    try {
      const isValid = await validateSchema(updateLanguageSchema, formData, setErrors);
      if (!isValid) {
        return;
      }
      dispatch(startLoading());
      const response = await axiosInstance.put(
        AxiosInstancePaths.Languages.UPDATE_BY_ID + id,
        formData
      );
      showSuccessMessage(response?.data?.message);
      dispatch(stopLoading());
      navigate('/languages')
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    fetchLanguageData();
    // eslint-disable-next-line
  }, [id]);

  return (
    <Grid container spacing={2} display="flex" justifyContent="end">
      <Grid item xs={12} sx={{ paddingTop: { xs: '0.5rem !important', sx: '0.5rem !important', md: '0px !important' } }} >
        <BackNavigate />
      </Grid>
      <Grid item xs={12} md={6}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: 1 }}>
            <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: '0.75rem' }}>
              Language Detail
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextInput
                  name={"lang_name*"}
                  defaultValue={language?.lang_name}
                  error={errors?.lang_name?.message}
                  startEdit={true}
                  handleChange={(name, value) => handleSelectChange("lang_name", value)}
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
              onClick={updateLanguage}
              sx={{
                color: theme.palette.common.white,
                width: "max-content",
                backgroundColor: theme.palette.success.main,
                "&:hover": {
                  backgroundColor: theme.palette.success.main,
                },
              }}
            >
              Update Language
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default EditLanguage;
