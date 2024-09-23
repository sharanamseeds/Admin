import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Box, Typography, Card, CardContent, useTheme, IconButton } from "@mui/material";
import { FaEye } from "react-icons/fa";
import ImageWithPreview from "../../Basic/ImagePreview";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../config/AxiosInstancePaths";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import { showErrorMessage } from "../../../helpers/notificationService";
import FilledInput from "../../Basic/FilledInput";
import SwitchInput from "../../Form/SwitchInput";
import { formatDate } from "../../../helpers";
import BackNavigate from "../../Basic/BackNavigate";

function ViewUser() {
  const theme = useTheme();

  const [user, setUser] = useState();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [roles, setRoles] = useState([]);
  const [accounts, setAccounts] = useState({});
  const navigate = useNavigate()

  const fetchUserData = async () => {
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
      console.error("Error fetching user data:", error);
      showErrorMessage(error?.response?.data?.message || "Failed to fetch user data");
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
      console.error("Error fetching roles:", error);
      showErrorMessage(error?.response?.data?.message || "Failed to fetch roles");
      dispatch(stopLoading());
    }
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

  useEffect(() => {
    fetchRoleList();
    fetchUserData();
    fetchAccountData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={12} sx={{ paddingTop: { xs: '0.5rem !important', sx: '0.5rem !important', md: '0px !important' } }} >
        <BackNavigate />
      </Grid>
      <Grid item xs={12} md={6}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: 1 }}>
            <Typography variant="h4" style={{ fontWeight: "bold" }} sx={{ marginBottom: "0.5rem" }}>
              Personal Details
            </Typography>
            <Grid container style={{ justifyContent: 'space-between' }}>
              <Grid item xs={12} md={5.8}>
                <FilledInput label="Name" value={user?.name || "Not Set"} disabled />
              </Grid>
              <Grid item xs={12} md={5.8}>
                <FilledInput label="agro_name" value={user?.agro_name || "Not Set"} disabled />
              </Grid>
              <Grid item xs={12} md={5.8}>
                <FilledInput label="contact_number" value={user?.contact_number || "Not Set"} disabled />
              </Grid>
              <Grid item xs={12} >
                <FilledInput label="Email" value={user?.email || "Not Set"} disabled />
              </Grid>
              <Grid item xs={12}>
                <FilledInput label="gst_number" value={user?.gst_number || "Not Set"} disabled />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
              <ImageWithPreview
                src={user?.profile ? AxiosInstancePaths.base_url + user?.profile : ""}
                alt="User Profile"
                height="145px"
                width="145px"
              />
            </Box>
            <Grid container style={{ justifyContent: 'space-between' }}>
              <Grid item xs={12} md={5.8}>
                <FilledInput
                  label="Verification Status"
                  value={user?.is_verified
                    ? "Verified" : "Unverified"}
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={5.8}>
                <FilledInput
                  label="Block Status"
                  value={user?.is_blocked ? "Blocked" : "Not Blocked"}
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={5.8}>
                <FilledInput
                  label="Role"
                  value={user?.role_id ? roles.find((item) => item._id === user?.role_id)?.role_name : "Not Set"}
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={5.8} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
                <div>
                  <SwitchInput
                    name="App User"
                    defaultValue={user?.is_app_user}
                    startEdit={true}
                    isDisabel={true}
                  />
                </div>
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
            <Grid container style={{ justifyContent: 'space-between' }}>
              <Grid item xs={12} sm={5.8}>
                <FilledInput
                  label={"Address_line"}
                  value={user?.billing_address?.address_line}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <FilledInput
                  label={"City"}
                  value={user?.billing_address?.city}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <FilledInput
                  label={"State"}
                  value={user?.billing_address?.state}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <FilledInput
                  label={"Pincode"}
                  value={user?.billing_address?.pincode}
                />
              </Grid>
            </Grid>
            <Grid container style={{ justifyContent: 'space-between' }} >
              <Grid item xs={12} sm={5.8} style={{ marginTop: '0.5rem' }}>
                <SwitchInput
                  name="Use Shipping Address for Billing"
                  defaultValue={user?.billing_equals_shipping}
                  startEdit={true}
                  isDisabel={true}
                />
              </Grid>
            </Grid>
            {!user?.billing_equals_shipping ? <Typography variant="h5" style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              Shipping Address
            </Typography> : ""}
            {!user?.billing_equals_shipping ? <Grid container style={{ justifyContent: 'space-between' }}>
              <Grid item xs={12} sm={5.8}>
                <FilledInput
                  label={"Address_line"}
                  value={user?.shipping_address?.address_line}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <FilledInput
                  label={"City"}
                  value={user?.shipping_address?.city}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <FilledInput
                  label={"State"}
                  value={user?.shipping_address?.state}
                />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <FilledInput
                  label={"Pincode"}
                  value={user?.shipping_address?.pincode}
                />
              </Grid>
            </Grid> : ""}


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
            Documents Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Typography variant="subtitle1">Aadhar Card</Typography>
              <div style={{ textAlign: 'center' }}>
                <ImageWithPreview
                  src={user?.aadhar_card ? AxiosInstancePaths.base_url + user?.aadhar_card : ""}
                  alt="Aadhar Card"
                  height={"200px"}
                  width={"100%"}
                />
              </div>
            </Grid>
            <Grid item xs={6} md={3} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Typography variant="subtitle1">GST Certificate</Typography>
              <div style={{ textAlign: 'center' }}>
                <ImageWithPreview
                  src={user?.gst_certificate ? AxiosInstancePaths.base_url + user?.gst_certificate : ''}
                  alt="GST Certificate"
                  height={"200px"}
                  width={"100%"}
                />
              </div>
            </Grid>
            <Grid item xs={6} md={3} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Typography variant="subtitle1">Bank Details</Typography>
              <div style={{ textAlign: 'center' }}>
                <ImageWithPreview
                  src={user?.bank_details ? AxiosInstancePaths.base_url + user?.bank_details : ''}
                  alt="Bank Details"
                  height={"200px"}
                  width={"100%"}
                />
              </div>
            </Grid>
            <Grid item xs={6} md={3} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Typography variant="subtitle1">Other Documents</Typography>
              <div style={{ textAlign: 'center' }}>
                <ImageWithPreview
                  src={user?.other_document ? AxiosInstancePaths.base_url + user?.other_document : ''}
                  alt="Other Documents"
                  height={"200px"}
                  width={"100%"}
                />
              </div>
            </Grid>
          </Grid>
        </Box>
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
    </Grid>
  );
}

export default ViewUser;

