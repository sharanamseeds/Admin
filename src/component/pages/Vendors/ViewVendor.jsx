import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography, Card, CardContent } from "@mui/material";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../config/AxiosInstancePaths";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import { showErrorMessage } from "../../../helpers/notificationService";
import FilledInput from "../../Basic/FilledInput";
import BackNavigate from "../../Basic/BackNavigate";

function ViewVendor() {

  const [user, setUser] = useState();
  const { id } = useParams();
  const dispatch = useDispatch();

  const fetchUserData = async () => {
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
      console.error("Error fetching user data:", error);
      showErrorMessage(error?.response?.data?.message || "Failed to fetch user data");
      dispatch(stopLoading());
    }
  };


  useEffect(() => {
    fetchUserData();
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
            <Typography variant="h4" style={{ fontWeight: "bold" }}>
              Personal Details
            </Typography>
            <Grid container justifyContent={"space-between"} >
              <Grid item xs={12} sm={5.8}>
                <FilledInput label="Name" value={user?.name || "Not Set"} disabled />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <FilledInput label="agro_name" value={user?.agro_name || "Not Set"} disabled />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <FilledInput label="contact_number" value={user?.contact_number || "Not Set"} disabled />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <FilledInput label="gst_number" value={user?.gst_number || "Not Set"} disabled />
              </Grid>
              <Grid item xs={12} >
                <FilledInput label="email" value={user?.email || "Not Set"} disabled />
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
                <FilledInput label="pesticide_license_no" value={user?.pesticide_license_no || "Not Set"} disabled />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <FilledInput label="seed_license_no" value={user?.seed_license_no || "Not Set"} disabled />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <FilledInput label="fertilizer_license_no" value={user?.fertilizer_license_no || "Not Set"} disabled />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <FilledInput label="pan_number" value={user?.pan_number || "Not Set"} disabled />
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
                <FilledInput label="Address_line" value={user?.address?.address_line || "Not Set"} disabled />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <FilledInput label="city" value={user?.address?.city || "Not Set"} disabled />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <FilledInput label="state" value={user?.address?.state || "Not Set"} disabled />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <FilledInput label="pincode" value={user?.address?.pincode || "Not Set"} disabled />
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
                <FilledInput label="Bank Name" value={user?.bank_details?.bankName || "Not Set"} disabled />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <FilledInput label="Account Number" value={user?.bank_details?.accountNumber || "Not Set"} disabled />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <FilledInput label="Ifsc Code" value={user?.bank_details?.ifscCode || "Not Set"} disabled />
              </Grid>
              <Grid item xs={12} sm={5.8}>
                <FilledInput label="Branch Name" value={user?.bank_details?.branchName || "Not Set"} disabled />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ViewVendor;

