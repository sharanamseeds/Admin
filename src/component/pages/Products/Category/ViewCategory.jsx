import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import FilledInput from "../../../Basic/FilledInput";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../../config/AxiosInstancePaths";
import { startLoading, stopLoading } from "../../../../redux/slices/loadingSlice";
import { showErrorMessage } from "../../../../helpers/notificationService";
import SelectInput from "../../../Form/SelectInput";
import { createGeneralOptions } from "../../../../helpers";
import ImageWithPreview from "../../../Basic/ImagePreview";
import ShowDescription from "../../../Form/ShowDescription";
import BackNavigate from "../../../Basic/BackNavigate";


function ViewCategory() {
  const { id } = useParams();
  const [category, setCategory] = useState();
  const dispatch = useDispatch();
  const [langCode, setLangCode] = useState("")
  const [languages, setLanguages] = useState([]);

  const fetCategoryData = async () => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.Categories.GET_BY_ID + id, {
        params: {
          lang_code: langCode || 'en'
        },
      }
      );
      if (response.data?.payload) {
        setCategory(response.data?.payload?.result);
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
    fetCategoryData();
    // eslint-disable-next-line
  }, [id, langCode]);

  useEffect(() => {
    fetchLanguageData()
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container spacing={2} alignItems="stretch" style={{ display: 'flex', justifyContent: 'end' }}>
      <Grid item xs={12} sx={{ paddingTop: { xs: '0.5rem !important', sx: '0.5rem !important', md: '0px !important' } }} >
        <BackNavigate />
      </Grid>
      <Grid item xs={12} md={6}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: 1 }}>
            <Typography variant="h4" style={{ fontWeight: "bold" }} sx={{ marginBottom: "0.5rem" }}>
              Category Details
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <ImageWithPreview
                  src={category?.logo ? AxiosInstancePaths.base_url + category?.logo : ''}
                  alt="User Profile"
                  height="145px"
                  width="145px"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <SelectInput
                  name="language"
                  startEdit={true}
                  seperatedLabel={true}
                  defaultValue={langCode}
                  options={createGeneralOptions(languages, "lang_name", "lang_code")}
                  handleChange={(name, value) => setLangCode(value)}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <FilledInput
                  label={"category_name"}
                  value={category?.category_name || "Not Added"}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12} sm={12}>
                <Typography variant="h4" style={{ fontWeight: "bold" }}>
                  Description
                </Typography>
                <ShowDescription description={category?.description} />
              </Grid>
            </Grid>

          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ViewCategory;
