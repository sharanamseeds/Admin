import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import FilledInput from "../../Basic/FilledInput";
import axiosInstance from "../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../config/AxiosInstancePaths";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import { showErrorMessage } from "../../../helpers/notificationService";
import BackNavigate from "../../Basic/BackNavigate";


function ViewLanguage() {
  const { id } = useParams();
  const [language, setLanguage] = useState();
  const dispatch = useDispatch();
  const fetchLanguageData = async () => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.Languages.GET_BY_ID + id
      );
      if (response.data?.payload) {
        setLanguage(response.data?.payload?.result);
      }
      dispatch(stopLoading());
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
              Language Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FilledInput
                  style={{ display: "flex", justifyContent: "space-between" }}
                  label={"lang_name"}
                  value={language?.lang_name || "Inactive"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FilledInput
                  style={{ display: "flex", justifyContent: "space-between" }}
                  label={"lang_code"}
                  value={language?.lang_code || "Inactive"}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ViewLanguage;
