import React, { useState } from "react";
import TextInput from "../../Form/TextInput";
import { Button, Grid, Card, CardContent, Typography, useTheme, CircularProgress } from "@mui/material";
import SwitchInput from "../../Form/SwitchInput";
import FileUpload from "../../Form/FileUpload";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import axiosInstance from "../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../config/AxiosInstancePaths";
import { formatErrorObject, objectToFormData } from "../../../helpers";
import { showErrorMessage, showSuccessMessage } from "../../../helpers/notificationService";
import { UserSchema, validateSchema } from "../../../validation/validationSchema";
import { useNavigate } from "react-router-dom";
import ImageWithPreview from "../../Basic/ImagePreview";
import BackNavigate from "../../Basic/BackNavigate";

function AddUser() {
  const theme = useTheme();
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)

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

  const addUser = async () => {
    try {
      const isValid = await validateSchema(UserSchema, formData, setErrors);
      if (!isValid) {
        return;
      }
      dispatch(startLoading());
      setIsLoading(true)

      const newFormData = new FormData();
      let documents = {}
      let tempFormData = { ...formData };
      if (formData?.profile) {
        documents.profile = formData.profile
        delete tempFormData.profile
      }
      if (formData?.aadhar_card) {
        documents.aadhar_card = formData.aadhar_card
        delete tempFormData.aadhar_card
      }
      if (formData?.gst_certificate) {
        documents.gst_certificate = formData.gst_certificate
        delete tempFormData.gst_certificate
      }
      if (formData?.bank_details) {
        documents.bank_details = formData.bank_details
        delete tempFormData.bank_details
      }
      if (formData?.other_document) {
        documents.other_document = formData.other_document
        delete tempFormData.other_document
      }


      objectToFormData(newFormData, documents);

      const response = await axiosInstance.post(
        AxiosInstancePaths.Users.ADD,
        newFormData, {
        params: { payload: JSON.stringify(tempFormData) }
      }
      );
      showSuccessMessage(response?.data?.message);
      dispatch(stopLoading());
      setIsLoading(false)
      navigate('/users');
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.error === "Validation failed" && error?.response?.data?.errorObject) {
        setErrors(formatErrorObject(error?.response?.data?.errorObject))
      }
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
      setIsLoading(false)
    }
  };

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={12} sx={{ paddingTop: { xs: '0.5rem !important', sx: '0.5rem !important', md: '0px !important' } }} >
        <BackNavigate />
      </Grid>
      <Grid item xs={12} md={6}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: 1 }}>
            <Typography variant="h4" style={{ fontWeight: "bold" }}>
              Personal Details
            </Typography>
            <Grid container justifyContent={"space-between"} >
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"name"}
                  startEdit={true}
                  error={errors?.name?.message}
                  handleChange={handleSelectChange}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"agro_name*"}
                  startEdit={true}
                  error={errors?.agro_name?.message}
                  handleChange={(name, value) => handleSelectChange('agro_name', value)}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"contact_number*"}
                  type="number"
                  startEdit={true}
                  error={errors?.contact_number?.message}
                  handleChange={(name, value) => handleSelectChange('contact_number', value)}
                />
              </Grid>
              <Grid item xs={12} >
                <TextInput
                  name={"email*"}
                  type="email"
                  startEdit={true}
                  error={errors?.email?.message}
                  handleChange={(name, value) => handleSelectChange('email', value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  name={"gst_number"}
                  startEdit={true}
                  error={errors?.gst_number?.message}
                  handleChange={handleSelectChange}
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
                  src={formData?.profile?.length > 0
                    ? URL.createObjectURL(formData.profile[0]) : ""}
                  alt="User Profile"
                  height="200px"
                  width="200px"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FileUpload
                  inputName="profile"
                  handleChange={handleSelectChange}
                  error={errors?.profile?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SwitchInput
                  name="App User"
                  startEdit={true}
                  handleChange={(name, value) => handleSelectChange('is_app_user', value)}
                  error={errors?.is_app_user?.message}
                  defaultValue={formData?.is_app_user}
                />
              </Grid>
              <Grid item xs={12} >
                <TextInput
                  name={"password*"}
                  type="password"
                  startEdit={true}
                  error={errors?.password?.message}
                  handleChange={(name, value) => handleSelectChange('password', value)}
                />
              </Grid>
            </Grid>
            {/* <Grid container style={{ marginTop: '0.3rem' }}>
              <Grid item xs={12} sm={6}>
                <SwitchInput
                  name="is_verified"
                  startEdit={true}
                  handleChange={handleSelectChange}
                  error={errors?.is_verified?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SwitchInput
                  name="is_blocked"
                  startEdit={true}
                  handleChange={handleSelectChange}
                  error={errors?.is_blocked?.message}
                />
              </Grid>
            </Grid> */}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent >
            <Typography variant="h4" style={{ fontWeight: "bold" }}>
              Address Details
            </Typography>
            <Typography variant="h5" style={{ textAlign: 'center' }}>
              Billing Address
            </Typography>
            <Grid container justifyContent={"space-between"} >
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"Address_line"}
                  startEdit={true}
                  defaultValue={formData?.billing_address?.address_line}
                  error={errors?.billing_address?.address_line?.message}
                  handleChange={(name, value) => handleSelectChange("billing_address.address_line", value)}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"City"}
                  startEdit={true}
                  error={errors?.billing_address?.city?.message}
                  defaultValue={formData?.billing_address?.city}
                  handleChange={(name, value) => handleSelectChange("billing_address.city", value)}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"State"}
                  startEdit={true}
                  error={errors?.billing_address?.state?.message}
                  defaultValue={formData?.billing_address?.state}
                  handleChange={(name, value) => handleSelectChange("billing_address.state", value)}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"Pincode"}
                  startEdit={true}
                  error={errors?.billing_address?.pincode?.message}
                  defaultValue={formData?.billing_address?.pincode}
                  handleChange={(name, value) => handleSelectChange("billing_address.pincode", value)}
                />
              </Grid>
            </Grid>
            <Grid container  >
              <Grid item xs={12} sm={5.8} style={{ marginTop: '0.5rem' }}>
                <SwitchInput
                  name="Use Shipping Address for Billing"
                  startEdit={true}
                  handleChange={(name, value) => handleSelectChange('billing_equals_shipping', value)}
                  error={errors?.billing_equals_shipping?.message}
                  defaultValue={formData?.billing_equals_shipping}
                />
              </Grid>
            </Grid>
            {!formData?.billing_equals_shipping ? <Typography variant="h5" style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              Shipping Address
            </Typography> : ""}

            {!formData?.billing_equals_shipping ? <Grid container justifyContent={"space-between"} >
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"Address_line"}
                  startEdit={true}
                  error={errors?.shipping_address?.address_line?.message}
                  defaultValue={formData?.shipping_address?.address_line}
                  handleChange={(name, value) => handleSelectChange("shipping_address.address_line", value)}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"City"}
                  startEdit={true}
                  error={errors?.shipping_address?.city?.message}
                  handleChange={(name, value) => handleSelectChange("shipping_address.city", value)}
                  defaultValue={formData?.shipping_address?.city}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"State"}
                  startEdit={true}
                  error={errors?.shipping_address?.state?.message}
                  handleChange={(name, value) => handleSelectChange("shipping_address.state", value)}
                  defaultValue={formData?.shipping_address?.state}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"Pincode"}
                  startEdit={true}
                  error={errors?.shipping_address?.pincode?.message}
                  handleChange={(name, value) => handleSelectChange("shipping_address.pincode", value)}
                  defaultValue={formData?.shipping_address?.pincode}
                />
              </Grid>
            </Grid> : ""}

          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent >
            <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: '0.75rem' }}>
              Documents Details
            </Typography>
            <Grid container spacing={2}>
              {["aadhar_card", "gst_certificate", "bank_details", "other_document"].map((doc, index) => (
                <Grid item xs={6} md={3} key={index} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <ImageWithPreview
                      src={formData[doc]?.length > 0
                        ? URL.createObjectURL(formData[doc][0]) : ""}
                      alt={doc}
                      height={"200px"}
                      width={"100%"}
                    />
                  </div>
                  <FileUpload
                    inputName={doc}
                    handleChange={handleSelectChange}
                    error={errors?.[doc]?.message}
                  />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} display="flex" gap={"1rem"} justifyContent="end">

        <Button
          fullWidth
          variant="contained"
          onClick={addUser}
          disabled={isLoading}
          sx={{
            color: theme.palette.common.white,
            width: "max-content",
            minWidth: '104px',
            backgroundColor: theme.palette.success.main,
            "&:hover": {
              backgroundColor: theme.palette.success.main,
            },
            "&.Mui-disabled": {
              backgroundColor: theme.palette.success.main,
              opacity: 1,  // Ensures the color remains fully opaque
            },
          }}
        >
          {isLoading ? <CircularProgress size={20} style={{ color: "white" }} /> : "Add User"}
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddUser;
