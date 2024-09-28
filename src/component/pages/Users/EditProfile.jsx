import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextInput from "../../Form/TextInput";
import { Button, Grid, Box, Typography, useTheme, IconButton } from "@mui/material";
import { FaEye } from "react-icons/fa";
import SwitchInput from "../../Form/SwitchInput";
import FileUpload from "../../Form/FileUpload";
import { useDispatch } from "react-redux";
import { clearLocalStorage, formatErrorObject, objectToFormData } from "../../../helpers";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../helpers/notificationService";
import axiosInstance from "../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../config/AxiosInstancePaths";
import {
  updatePasswordSchema,
  UpdateUserSchema,
  validateSchema,
} from "../../../validation/validationSchema";
import { Card, CardContent } from "@mui/material";
import ImageWithPreview from "../../Basic/ImagePreview";
import {
  TextField,
} from "@mui/material";
import InputError from "../../Basic/InputError";
import { FaLock, FaEyeSlash } from "react-icons/fa";


function EditUser() {
  const theme = useTheme();

  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [passwordForm, setPasswordFormData] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

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

  const handlePasswordSelectChange = (name, value) => {
    const keys = name.split(".");
    setPasswordFormData((prevData) => {
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

  const updatePassword = async () => {
    try {

      const data = { email: user?.email, new_password: passwordForm?.new_password, confirm_password: passwordForm?.confirm_password }

      const isValid = await validateSchema(updatePasswordSchema, data, setErrors);
      if (!isValid) {
        return;
      }
      dispatch(startLoading());
      const response = await axiosInstance.post(
        AxiosInstancePaths.Auth.CHANGE_PASSWORD,
        data
      );
      if (response.data?.payload) {
        showSuccessMessage(response.data?.message);
        if (response.data?.payload?.status) {
          clearLocalStorage()
          navigate(AxiosInstancePaths.login_path)
        }
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.errors) {
        setErrors(formatErrorObject(error?.response?.data?.errors))
      } showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  }

  const updateUser = async () => {
    try {
      const isValid = await validateSchema(UpdateUserSchema, formData, setErrors);
      if (!isValid) {
        return;
      }
      dispatch(startLoading());

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

      const response = await axiosInstance.put(
        AxiosInstancePaths.Users.UPDATE_BY_ID + id,
        newFormData, {
        params: { payload: JSON.stringify(tempFormData) }
      }
      );
      showSuccessMessage(response?.data?.message);
      dispatch(stopLoading());
      navigate("/users");
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.errors) {
        setErrors(formatErrorObject(error?.response?.data?.errors))
      }
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  const fetUserData = async () => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.Users.GET_BY_ID + id
      );
      if (response.data?.payload) {
        setUser(response.data?.payload?.result);
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

    fetUserData();

    // eslint-disable-next-line
  }, [id]);

  return (
    <Grid container spacing={2} alignItems="stretch">

      <Grid item xs={12} md={6}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: 1 }}>
            <Typography variant="h4" style={{ fontWeight: "bold" }} sx={{ marginBottom: "0.5rem", width: "100%", textAlign: "left" }}>
              Personal Details
            </Typography>
            <Grid container justifyContent={"space-between"} >
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"name"}
                  startEdit={true}
                  error={errors?.name?.message}
                  defaultValue={user?.name}
                  handleChange={handleSelectChange}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"agro_name"}
                  startEdit={true}
                  error={errors?.agro_name?.message}
                  defaultValue={user?.agro_name}
                  handleChange={handleSelectChange}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"contact_number"}
                  type="number"
                  startEdit={true}
                  error={errors?.contact_number?.message}
                  defaultValue={user?.contact_number}
                  handleChange={handleSelectChange}
                />
              </Grid>
              <Grid item xs={12} >
                <TextInput
                  name={"email"}
                  type="email"
                  startEdit={true}
                  error={errors?.email?.message}
                  defaultValue={user?.email}
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
                    ? URL.createObjectURL(formData.profile[0]) : user?.profile ? AxiosInstancePaths.base_url + user?.profile : ""}
                  alt="User Profile"
                  height="102px"
                  width="102px"
                />

              </Grid>
              <Grid item xs={12} >
                <div style={{ textAlign: 'center' }}>
                  <div style={{ maxWidth: '300px', minWidth: '250px', display: 'inline-block' }}>
                    <FileUpload
                      inputName="profile"
                      handleChange={handleSelectChange}
                      error={errors?.profile?.message}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  name={"gst_number"}
                  startEdit={true}
                  error={errors?.gst_number?.message}
                  defaultValue={user?.gst_number}
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
            <Typography variant="h5" style={{ textAlign: 'center' }}>
              Billing Address
            </Typography>
            <Grid container justifyContent={"space-between"} >
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"Address_line"}
                  startEdit={true}
                  defaultValue={formData?.billing_address?.address_line || user?.billing_address?.address_line}
                  error={errors?.billing_address?.address_line?.message}
                  handleChange={(name, value) => handleSelectChange("billing_address.address_line", value)}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"City"}
                  startEdit={true}
                  error={errors?.billing_address?.city?.message}
                  defaultValue={formData?.billing_address?.city || user.billing_address?.city}
                  handleChange={(name, value) => handleSelectChange("billing_address.city", value)}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"State"}
                  startEdit={true}
                  error={errors?.billing_address?.state?.message}
                  defaultValue={formData?.billing_address?.state || user?.billing_address?.state}
                  handleChange={(name, value) => handleSelectChange("billing_address.state", value)}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"Pincode"}
                  startEdit={true}
                  error={errors?.billing_address?.pincode?.message}
                  defaultValue={formData?.billing_address?.pincode || user?.billing_address?.pincode}
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
                  defaultValue={formData?.billing_equals_shipping || user?.billing_equals_shipping}
                />
              </Grid>
            </Grid>
            {!formData?.billing_equals_shipping || !user?.billing_equals_shipping ? <Typography variant="h5" style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              Shipping Address
            </Typography> : ""}

            {!formData?.billing_equals_shipping || !user?.billing_equals_shipping ? <Grid container justifyContent={"space-between"} >
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"Address_line"}
                  startEdit={true}
                  error={errors?.shipping_address?.address_line?.message}
                  defaultValue={formData?.shipping_address?.address_line || user?.shipping_address?.address_line}
                  handleChange={(name, value) => handleSelectChange("shipping_address.address_line", value)}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"City"}
                  startEdit={true}
                  error={errors?.shipping_address?.city?.message}
                  handleChange={(name, value) => handleSelectChange("shipping_address.city", value)}
                  defaultValue={formData?.shipping_address?.city || user?.shipping_address?.city}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"State"}
                  startEdit={true}
                  error={errors?.shipping_address?.state?.message}
                  handleChange={(name, value) => handleSelectChange("shipping_address.state", value)}
                  defaultValue={formData?.shipping_address?.state || user?.shipping_address?.state}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <TextInput
                  name={"Pincode"}
                  startEdit={true}
                  error={errors?.shipping_address?.pincode?.message}
                  handleChange={(name, value) => handleSelectChange("shipping_address.pincode", value)}
                  defaultValue={formData?.shipping_address?.pincode || user?.shipping_address?.pincode}
                />
              </Grid>
            </Grid> : ""}

          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: '0.75rem' }}>
              Documents Details
            </Typography>
            <Grid container spacing={2}>
              {["aadhar_card", "gst_certificate", "bank_details", "other_document"].map((doc, index) => (
                <Grid item xs={6} md={3} key={index} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <ImageWithPreview
                      src={formData[doc]?.length > 0
                        ? URL.createObjectURL(formData[doc][0]) : user?.[doc] ? AxiosInstancePaths.base_url + user?.[doc] : ""}
                      alt="User Profile"
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
      <Grid item xs={12}>
        <Box
          sx={{
            padding: "1.5rem",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
        >
          <Typography variant="h4" style={{ fontWeight: "bold" }} sx={{ marginBottom: "0.5rem" }}>
            Update Password
          </Typography>
          <Grid container spacing={2} alignItems="stretch">
            <Grid item xs={12} md={6} lg={5}>
              <TextField
                fullWidth
                className="defaultText"
                label="New Password"
                type={showPassword ? "text" : "password"}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <div style={{ display: "inline-flex", color: theme.palette.common.black, marginRight: "0.5rem" }}>
                      <FaLock />
                    </div>
                  ),
                  endAdornment: (
                    <IconButton onClick={toggleShowPassword} size="small">
                      {showPassword ? (
                        <FaEyeSlash color={theme.palette.common.black} />
                      ) : (
                        <FaEye color={theme.palette.common.black} />
                      )}
                    </IconButton>
                  ),
                }}
                style={{
                  input: { padding: "0.8rem 0px", color: theme.palette.common.black },
                  '.MuiOutlinedInput-root, .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.common.black },
                  '.MuiInputLabel-root': { color: theme.palette.common.black },
                  '.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.common.black },
                }}
                onChange={(e) => handlePasswordSelectChange("new_password", e.target.value)}
              />
              {errors?.new_password?.message && (
                <div style={{ textAlign: 'left' }}>
                  <InputError message={errors.new_password.message} />
                </div>
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={5}>
              <TextField
                fullWidth
                className="defaultText"
                label="Confirm New Password"
                type={showConfirmPassword ? "text" : "password"}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <div style={{ display: "inline-flex", color: theme.palette.common.black, marginRight: "0.5rem" }}>
                      <FaLock />
                    </div>
                  ),
                  endAdornment: (
                    <IconButton onClick={toggleShowConfirmPassword} size="small">
                      {showConfirmPassword ? (
                        <FaEyeSlash color={theme.palette.common.black} />
                      ) : (
                        <FaEye color={theme.palette.common.black} />
                      )}
                    </IconButton>
                  ),
                }}
                style={{
                  input: { padding: "0.8rem 0px", color: theme.palette.common.black },
                  '.MuiOutlinedInput-root, .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.common.black },
                  '.MuiInputLabel-root': { color: theme.palette.common.black },
                  '.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.common.black },
                }}
                onChange={(e) => handlePasswordSelectChange("confirm_password", e.target.value)}
              />
              {errors?.confirm_password?.message && (
                <div style={{ textAlign: 'left' }}>
                  <InputError message={errors.confirm_password.message} />
                </div>
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={2} style={{
              display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}>
              <div>
                <Button
                  variant="contained"
                  sx={{
                    color: theme.palette.common.white,
                    width: "max-content",
                    backgroundColor: theme.palette.warning.main,
                    "&:hover": {
                      backgroundColor: theme.palette.warning.main,
                    },
                  }}
                  onClick={updatePassword}
                >
                  Update Password
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
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
              backgroundColor: theme.palette.error.main,
              "&:hover": {
                backgroundColor: theme.palette.error.main,
              },
            }}
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
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

export default EditUser;
