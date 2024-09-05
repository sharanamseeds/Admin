import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import FilledInput from "../../../Basic/FilledInput";
import axiosInstance from "../../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../../config/AxiosInstancePaths";
import { startLoading, stopLoading } from "../../../../redux/slices/loadingSlice";
import { showErrorMessage } from "../../../../helpers/notificationService";
import { useDispatch } from "react-redux";
import SelectInput from "../../../Form/SelectInput";
import { createGeneralOptions } from "../../../../helpers";
import ImageWithPreview from "../../../Basic/ImagePreview";
import { useTheme } from "@mui/material";


function ViewBrand() {
  const { id } = useParams();
  const [brand, setBrand] = useState();
  const dispatch = useDispatch();
  const [langCode, setLangCode] = useState("")
  const [languages, setLanguages] = useState([]);
  const theme = useTheme();
  const fetBrandData = async () => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.Brands.GET_BY_ID + id, {
        params: {
          lang_code: langCode || 'en'
        }
      }
      );
      if (response.data?.payload) {
        setBrand(response.data?.payload?.result);
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  const fetchLanguageData = async () => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.Languages.GET_LIST
      );
      if (response.data?.payload) {
        setLanguages(response.data?.payload?.result?.data);
        setLangCode(response.data?.payload?.result?.data[0]?.lang_code)
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    fetBrandData();
    // eslint-disable-next-line
  }, [id, langCode]);
  useEffect(() => {
    fetchLanguageData();
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container spacing={2} alignItems="stretch" style={{ display: 'flex', justifyContent: 'end' }}>
      <Grid item xs={12} md={6}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: 1 }}>
            <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: '0.75rem' }}>Brand Details</Typography>
            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
              <ImageWithPreview
                src={brand?.logo ? AxiosInstancePaths.base_url + brand?.logo : ""}
                alt="User Profile"
                height="145px"
                width="145px"
              />
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FilledInput
                  label={"brand_name"}
                  value={brand?.brand_name || "Inactive"}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FilledInput
                  label={"tag_line"}
                  value={brand?.tag_line || "Inactive"}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <SelectInput
                  name="language"
                  startEdit={true}
                  seperatedLabel={false}
                  defaultValue={langCode}
                  options={createGeneralOptions(languages, "lang_name", "lang_code")}
                  handleChange={(name, value) => setLangCode(value)}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Back Button */}
      <Grid item xs={12}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
        </Box>
      </Grid>
    </Grid>
  );
}

export default ViewBrand;
