import React, { useState } from "react";
import TextInput from "../../Form/TextInput";
import { Button, Grid, Card, CardContent, Typography, useTheme, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import axiosInstance from "../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../config/AxiosInstancePaths";
import { formatErrorObject } from "../../../helpers";
import { showErrorMessage, showSuccessMessage } from "../../../helpers/notificationService";
import { addVendorSchema, validateSchema } from "../../../validation/validationSchema";
import { useNavigate } from "react-router-dom";
import BackNavigate from "../../Basic/BackNavigate";

function AddVendor() {
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
      const isValid = await validateSchema(addVendorSchema, formData, setErrors);
      if (!isValid) {
        return;
      }
      dispatch(startLoading());
      setIsLoading(true)


      let tempFormData = { ...formData };

      const response = await axiosInstance.post(
        AxiosInstancePaths.Vendors.ADD,
        {}, {
        params: { payload: JSON.stringify(tempFormData) }
      }
      );
      showSuccessMessage(response?.data?.message);
      dispatch(stopLoading());
      setIsLoading(false)
      navigate('/vendors');
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.errors) {
        setErrors(formatErrorObject(error?.response?.data?.errors))
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
                  name={"name*"}
                  startEdit={true}
                  error={errors?.name?.message}
                  handleChange={(name, value) => handleSelectChange('name', value)}
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
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"gst_number"}
                  startEdit={true}
                  error={errors?.gst_number?.message}
                  handleChange={handleSelectChange}
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

            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: 1 }}>
            <Typography variant="h4" style={{ fontWeight: "bold" }}>
              License Details
            </Typography>
            <Grid container justifyContent={"space-between"} >
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"pesticide_license_no"}
                  startEdit={true}
                  error={errors?.pesticide_license_no?.message}
                  handleChange={handleSelectChange}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"seed_license_no"}
                  startEdit={true}
                  error={errors?.seed_license_no?.message}
                  handleChange={handleSelectChange}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"fertilizer_license_no"}
                  startEdit={true}
                  error={errors?.fertilizer_license_no?.message}
                  handleChange={handleSelectChange}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"pan_number"}
                  startEdit={true}
                  error={errors?.pan_number?.message}
                  handleChange={handleSelectChange}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent >
            <Typography variant="h4" style={{ fontWeight: "bold" }}>
              Address Details
            </Typography>
            <Grid container justifyContent={"space-between"} >
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"Address_line"}
                  startEdit={true}
                  defaultValue={formData?.address?.address_line}
                  error={errors?.address?.address_line?.message}
                  handleChange={(name, value) => handleSelectChange("address.address_line", value)}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"City"}
                  startEdit={true}
                  error={errors?.address?.city?.message}
                  defaultValue={formData?.address?.city}
                  handleChange={(name, value) => handleSelectChange("address.city", value)}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"State"}
                  startEdit={true}
                  error={errors?.address?.state?.message}
                  defaultValue={formData?.address?.state}
                  handleChange={(name, value) => handleSelectChange("address.state", value)}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"Pincode"}
                  startEdit={true}
                  error={errors?.address?.pincode?.message}
                  defaultValue={formData?.address?.pincode}
                  handleChange={(name, value) => handleSelectChange("address.pincode", value)}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent >
            <Typography variant="h4" style={{ fontWeight: "bold" }}>
              Bank Details
            </Typography>
            <Grid container justifyContent={"space-between"} >
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"Bank Name*"}
                  startEdit={true}
                  defaultValue={formData?.bank_details?.bankName}
                  error={errors?.bank_details?.bankName?.message}
                  handleChange={(name, value) => handleSelectChange("bank_details.bankName", value)}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"Account Number*"}
                  startEdit={true}
                  error={errors?.bank_details?.accountNumber?.message}
                  defaultValue={formData?.bank_details?.accountNumber}
                  handleChange={(name, value) => handleSelectChange("bank_details.accountNumber", value)}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"Ifsc Code*"}
                  startEdit={true}
                  error={errors?.bank_details?.ifscCode?.message}
                  defaultValue={formData?.bank_details?.ifscCode}
                  handleChange={(name, value) => handleSelectChange("bank_details.ifscCode", value)}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"Branch Name*"}
                  startEdit={true}
                  error={errors?.bank_details?.branchName?.message}
                  defaultValue={formData?.bank_details?.branchName}
                  handleChange={(name, value) => handleSelectChange("bank_details.branchName", value)}
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
          {isLoading ? <CircularProgress size={20} style={{ color: "white" }} /> : "Add Vendor"}
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddVendor;
