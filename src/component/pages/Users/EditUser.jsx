import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextInput from "../../Form/TextInput";
import { Button, Grid, Box, Typography, useTheme, IconButton } from "@mui/material";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import SelectInput from "../../Form/SelectInput";
import SwitchInput from "../../Form/SwitchInput";
import FileUpload from "../../Form/FileUpload";
import { useDispatch } from "react-redux";
import { createGeneralOptions, formatDate, formatErrorObject, objectToFormData } from "../../../helpers";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../helpers/notificationService";
import axiosInstance from "../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../config/AxiosInstancePaths";
import {
  addMoneySchema,
  UpdateUserSchema,
  validateSchema,
} from "../../../validation/validationSchema";
import { Card, CardContent } from "@mui/material";
import ImageWithPreview from "../../Basic/ImagePreview";
import FilledInput from "../../Basic/FilledInput";
import ConfirmationDialog from "../../Basic/ConfirmationDialog";
import BackNavigate from "../../Basic/BackNavigate";

function EditUser() {
  const theme = useTheme();

  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState({});
  const [moneyFormData, setMoneyFormData] = useState({});


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

  const handleMoneySelectChange = (name, value) => {
    const keys = name.split(".");
    setMoneyFormData((prevData) => {
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

  const fetchAccountData = async () => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(
        `${AxiosInstancePaths.Users.GET_ACCOUNT}?user_id=${id}`
      );
      if (response.data?.payload) {
        setAccounts(response.data?.payload?.result)
      }
      dispatch(stopLoading());
    } catch (error) {
      console.error("Error fetching roles:", error);
      showErrorMessage(error?.response?.data?.message || "Failed to fetch roles");
      dispatch(stopLoading());
    }
  }
  const viewLedger = (id) => {
    navigate(`/ledgers/view/${id}`);
  };

  const addMoney = async () => {
    try {
      // addMoneySchema
      const moneyForm = {
        user_id: id,
        ...moneyFormData
      }
      const isValid = await validateSchema(addMoneySchema, moneyForm, setErrors);
      if (!isValid) {
        return;
      }
      dispatch(startLoading());

      const response = await axiosInstance.post(
        AxiosInstancePaths.Users.ADD_MONEY,
        {}, {
        params: { payload: JSON.stringify(moneyForm) }
      }
      );
      showSuccessMessage(response?.data?.message);
      await fetchAccountData()
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.error === "Validation failed" && error?.response?.data?.errorObject) {
        setErrors(formatErrorObject(error?.response?.data?.errorObject))
      }
      showErrorMessage(error?.response?.data?.message);
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
        AxiosInstancePaths.Users.GET_BY_ID + id
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

  const fetchRoleList = async () => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.Roles.GET_LIST
      );
      if (response.data?.payload) {
        setRoles(response.data?.payload?.result?.data);
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null)

  const deleteMoney = async (id) => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.delete(
        AxiosInstancePaths.Users.DELETE_MONEY + id
      );
      showSuccessMessage(response?.data?.message);
      dispatch(stopLoading());
      await fetchAccountData();
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  const handleOpenDialog = (id) => {
    setDeleteId(id)
    setDialogOpen(true)
  };
  const handleCloseDialog = () => setDialogOpen(false);
  const handleConfirm = () => {
    deleteMoney(deleteId)
  };


  useEffect(() => {
    fetchRoleList();
    fetUserData();
    fetchAccountData()
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
              <Grid item xs={12} sm={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
                <div>
                  <FileUpload
                    inputName="profile"
                    handleChange={handleSelectChange}
                    error={errors?.profile?.message}
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={6} >
                <SelectInput
                  name="role_id"
                  startEdit={true}
                  seperatedLabel={true}
                  defaultValue={formData?.role_id || user?.role_id}
                  options={createGeneralOptions(roles, "role_name", "_id")}
                  handleChange={handleSelectChange}
                  error={errors?.role_id?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <SwitchInput
                  name="is_blocked"
                  defaultValue={user?.is_blocked}
                  startEdit={true}
                  handleChange={handleSelectChange}
                  error={errors?.is_blocked?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SwitchInput
                  name="is_verified"
                  defaultValue={user?.is_verified}
                  startEdit={true}
                  handleChange={handleSelectChange}
                  error={errors?.is_active?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SwitchInput
                  name="App User"
                  defaultValue={user?.is_app_user}
                  startEdit={true}
                  isDisabel={true}
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
            Account Details
          </Typography>
          <Grid container spacing={2} alignItems="stretch">
            <Grid item xs={12} md={6} lg={3}>
              <FilledInput
                label={"Total Money Added"}
                value={accounts?.totalMoneyAdded?.toString()}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FilledInput
                label={"Total Ledger Credit"}
                value={accounts?.totalCredit?.toString()} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FilledInput
                label={"Total Ledger Debit"}
                value={accounts?.totalDebit?.toString()} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FilledInput
                label={"Final Balance"}
                value={accounts?.finalBalance?.toString()} />
            </Grid>
            <Grid item xs={12} md={6} lg={5}>
              <TextInput
                name={"amount"}
                type="number"
                startEdit={true}
                defaultValue={moneyFormData?.amount}
                error={errors?.amount?.message}
                handleChange={handleMoneySelectChange}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={5}>
              <TextInput
                name={"description"}
                startEdit={true}
                defaultValue={moneyFormData?.description}
                error={errors?.description?.message}
                handleChange={handleMoneySelectChange}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2} style={{ display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
              <div>
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
                  onClick={addMoney}
                >
                  Add Money
                </Button>
              </div>
            </Grid>
          </Grid>

        </Box>
      </Grid>
      {accounts?.ledgers?.length > 0 ? <Grid item xs={12}>
        <Typography variant="h4" style={{ fontWeight: "bold" }} sx={{ marginBottom: "0.7rem" }}>
          Ledgers
        </Typography>

        <div style={{ width: "100%" }}>
          <div style={{
            fontWeight: "bold",
            color: theme.palette.text.primary,
            display: "flex",
            justifyContent: "space-between",
            padding: "15px",
            backgroundColor: theme.palette.background.paper,
            borderRadius: "10px",
            boxShadow: theme.shadows[1],
          }}>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Sr. No.
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Invoice Id
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Type
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Amount
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Bill Amount
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Action
            </div>
          </div>
        </div>
        {accounts?.ledgers.length > 0 ? accounts.ledgers.map((bill, billIndex) => (
          <div
            key={billIndex}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "15px",
              marginTop: "1rem",
              backgroundColor: theme.palette.background.paper,
              borderRadius: "10px",
              boxShadow: theme.shadows[1],
            }}
          >
            <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
              {billIndex + 1}
            </div>
            <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
              {bill.invoice_id}
            </div>
            <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
              {bill.type}
            </div>
            <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
              {bill.payment_amount}
            </div>
            <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
              {bill.bill_amount}
            </div>
            <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
              <IconButton
                size="small"
                onClick={() => viewLedger(bill._id)}
                style={{ color: theme.palette.info.main }}
              >
                <FaEye />
              </IconButton>

            </div>
          </div>
        )) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "15px",
              marginTop: "1rem",
              backgroundColor: theme.palette.background.paper,
              borderRadius: "10px",
              boxShadow: theme.shadows[1],
            }}
          >
            No Ledgers Found
          </div>
        )}
      </Grid> : ''}
      {accounts?.credits?.length > 0 ? <Grid item xs={12}>
        <Typography variant="h4" style={{ fontWeight: "bold" }} sx={{ marginBottom: "0.7rem" }}>
          Credits
        </Typography>

        <div style={{ width: "100%" }}>
          <div style={{
            fontWeight: "bold",
            color: theme.palette.text.primary,
            display: "flex",
            justifyContent: "space-between",
            padding: "15px",
            backgroundColor: theme.palette.background.paper,
            borderRadius: "10px",
            boxShadow: theme.shadows[1],
          }}>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Sr. No.
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Amount
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Description
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Added At
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              Action
            </div>
          </div>
        </div>
        {accounts?.credits?.length > 0 ? accounts.credits.map((credit, creditIndex) => (
          <div
            key={creditIndex}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "15px",
              marginTop: "1rem",
              backgroundColor: theme.palette.background.paper,
              borderRadius: "10px",
              boxShadow: theme.shadows[1],
            }}
          >
            <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
              {creditIndex + 1}
            </div>
            <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
              {credit.amount}
            </div>
            <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
              {credit.description}
            </div>
            <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
              {formatDate(credit.createdAt)}
            </div>
            <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
              <IconButton
                size="small"
                onClick={() => handleOpenDialog(credit._id)}
                style={{ color: theme.palette.error.main }}
              >
                <MdDelete />
              </IconButton>
            </div>
          </div>
        )) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "15px",
              marginTop: "1rem",
              backgroundColor: theme.palette.background.paper,
              borderRadius: "10px",
              boxShadow: theme.shadows[1],
            }}
          >
            No Credits Found
          </div>
        )}
      </Grid> : ''}
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

export default EditUser;
