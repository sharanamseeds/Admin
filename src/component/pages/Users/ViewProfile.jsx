import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Box, Typography, Button, Card, CardContent, useTheme } from "@mui/material";
import ImageWithPreview from "../../Basic/ImagePreview";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../config/AxiosInstancePaths";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import { showErrorMessage } from "../../../helpers/notificationService";
import FilledInput from "../../Basic/FilledInput";
import SwitchInput from "../../Form/SwitchInput";

function ViewUser() {
  const theme = useTheme();

  const [user, setUser] = useState();
  const { id } = useParams();
  const dispatch = useDispatch();
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

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Grid container spacing={2} alignItems="stretch">
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

            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "2.3rem" }}>
              <ImageWithPreview
                src={user?.profile ? AxiosInstancePaths.base_url + user?.profile : ""}
                alt="User Profile"
                height="145px"
                width="145px"
              />
            </Box>
            <Grid container style={{ justifyContent: 'space-between' }}>
              <Grid item xs={12}>
                <FilledInput label="gst_number" value={user?.gst_number || "Not Set"} disabled />
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

      {/* Back Button */}
      <Grid item xs={12}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: '1rem' }}>
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
            onClick={() => window.history.back()}
          >
            Back
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
            onClick={() => navigate(`/profile/edit/${user?._id}`)}
          >
            Edit
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ViewUser;

