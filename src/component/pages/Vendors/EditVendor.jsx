import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextInput from "../../Form/TextInput";
import { Button, Grid, Box, Typography, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { formatErrorObject } from "../../../helpers";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../helpers/notificationService";
import axiosInstance from "../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../config/AxiosInstancePaths";
import {
  updateVendorSchema,
  validateSchema,
} from "../../../validation/validationSchema";
import { Card, CardContent } from "@mui/material";
import ConfirmationDialog from "../../Basic/ConfirmationDialog";
import BackNavigate from "../../Basic/BackNavigate";

function EditVendor() {
  const theme = useTheme();

  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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


  const updateUser = async () => {
    try {
      const isValid = await validateSchema(updateVendorSchema, formData, setErrors);
      if (!isValid) {
        return;
      }
      dispatch(startLoading());

      // const newFormData = new FormData();
      // let documents = {}
      // let tempFormData = { ...formData };
      // if (formData?.profile) {
      //   documents.profile = formData.profile
      //   delete tempFormData.profile
      // }
      // if (formData?.aadhar_card) {
      //   documents.aadhar_card = formData.aadhar_card
      //   delete tempFormData.aadhar_card
      // }
      // if (formData?.gst_certificate) {
      //   documents.gst_certificate = formData.gst_certificate
      //   delete tempFormData.gst_certificate
      // }
      // if (formData?.bank_details) {
      //   documents.bank_details = formData.bank_details
      //   delete tempFormData.bank_details
      // }
      // if (formData?.other_document) {
      //   documents.other_document = formData.other_document
      //   delete tempFormData.other_document
      // }

      // objectToFormData(newFormData, documents);

      const response = await axiosInstance.put(
        AxiosInstancePaths.Vendors.UPDATE_BY_ID + id,
        {}, {
        params: { payload: JSON.stringify(formData) }
      }
      );
      showSuccessMessage(response?.data?.message);
      dispatch(stopLoading());
      navigate("/vendors");
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.error === "Validation failed" && error?.response?.data?.errorObject) {
        setErrors(formatErrorObject(error?.response?.data?.errorObject))
      }
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  const fetUserData = async () => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.Vendors.GET_BY_ID + id
      );
      if (response.data?.payload) {
        setUser(response.data?.payload?.result);
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.error === "Validation failed" && error?.response?.data?.errorObject) {
        setErrors(formatErrorObject(error?.response?.data?.errorObject))
      }
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  // const handleOpenDialog = (id) => {
  //   // setDeleteId(id)
  //   setDialogOpen(true)
  // };
  const handleCloseDialog = () => setDialogOpen(false);
  const handleConfirm = () => {
    // deleteMoney(deleteId)
  };


  useEffect(() => {
    fetUserData();
    // eslint-disable-next-line
  }, [id]);

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={12} sx={{ paddingTop: { xs: '0.5rem !important', sx: '0.5rem !important', md: '0px !important' } }} >
        <BackNavigate />
      </Grid>
      <ConfirmationDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        message="Are you sure you want to delete?"
        onConfirm={handleConfirm}
      />

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
                  defaultValue={formData?.name || user?.name}
                  handleChange={(name, value) => handleSelectChange('name', value)}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"agro_name"}
                  startEdit={true}
                  error={errors?.agro_name?.message}
                  defaultValue={formData?.agro_name || user?.agro_name}
                  handleChange={(name, value) => handleSelectChange('agro_name', value)}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"contact_number"}
                  type="number"
                  startEdit={true}
                  error={errors?.contact_number?.message}
                  defaultValue={formData?.contact_number || user?.contact_number}
                  handleChange={(name, value) => handleSelectChange('contact_number', value)}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"gst_number"}
                  startEdit={true}
                  error={errors?.gst_number?.message}
                  defaultValue={formData?.gst_number || user?.gst_number}
                  handleChange={handleSelectChange}
                />
              </Grid>
              <Grid item xs={12} >
                <TextInput
                  name={"email"}
                  type="email"
                  startEdit={true}
                  error={errors?.email?.message}
                  defaultValue={formData?.email || user?.email}
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
                  defaultValue={formData?.pesticide_license_no || user?.pesticide_license_no}
                  handleChange={handleSelectChange}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"seed_license_no"}
                  startEdit={true}
                  error={errors?.seed_license_no?.message}
                  defaultValue={formData?.seed_license_no || user?.seed_license_no}
                  handleChange={handleSelectChange}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"fertilizer_license_no"}
                  startEdit={true}
                  error={errors?.fertilizer_license_no?.message}
                  defaultValue={formData?.fertilizer_license_no || user?.fertilizer_license_no}
                  handleChange={handleSelectChange}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"pan_number"}
                  startEdit={true}
                  error={errors?.pan_number?.message}
                  defaultValue={formData?.pan_number || user?.pan_number}
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
                  error={errors?.address?.address_line?.message}
                  defaultValue={formData?.address?.address_line || user?.address?.address_line}
                  handleChange={(name, value) => handleSelectChange("address.address_line", value)}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"City"}
                  startEdit={true}
                  error={errors?.address?.city?.message}
                  defaultValue={formData?.address?.city || user?.address?.city}
                  handleChange={(name, value) => handleSelectChange("address.city", value)}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"State"}
                  startEdit={true}
                  error={errors?.address?.state?.message}
                  defaultValue={formData?.address?.state || user?.address?.state}
                  handleChange={(name, value) => handleSelectChange("address.state", value)}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"Pincode"}
                  startEdit={true}
                  error={errors?.address?.pincode?.message}
                  defaultValue={formData?.address?.pincode || user?.address?.pincode}
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
                  name={"Bank Name"}
                  startEdit={true}
                  defaultValue={formData?.bank_details?.bankName || user?.bank_details?.bankName}
                  error={errors?.bank_details?.bankName?.message}
                  handleChange={(name, value) => handleSelectChange("bank_details.bankName", value)}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"Account Number"}
                  startEdit={true}
                  error={errors?.bank_details?.accountNumber?.message}
                  defaultValue={formData?.bank_details?.accountNumber || user?.bank_details?.accountNumber}
                  handleChange={(name, value) => handleSelectChange("bank_details.accountNumber", value)}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"Ifsc Code"}
                  startEdit={true}
                  error={errors?.bank_details?.ifscCode?.message}
                  defaultValue={formData?.bank_details?.ifscCode || user?.bank_details?.ifscCode}
                  handleChange={(name, value) => handleSelectChange("bank_details.ifscCode", value)}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"Branch Name"}
                  startEdit={true}
                  error={errors?.bank_details?.branchName?.message}
                  defaultValue={formData?.bank_details?.branchName || user?.bank_details?.branchName}
                  handleChange={(name, value) => handleSelectChange("bank_details.branchName", value)}
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
            onClick={updateUser}
          >
            Save
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default EditVendor;
