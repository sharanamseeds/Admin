import { Box, Button, Card, CardContent, Grid, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import SwitchInput from "../../Form/SwitchInput";
import { useParams } from "react-router-dom";
import FilledInput from "../../Basic/FilledInput";
import axiosInstance from "../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../config/AxiosInstancePaths";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import { showErrorMessage } from "../../../helpers/notificationService";
import { useDispatch } from "react-redux";

function ViewRole() {
  const theme = useTheme();
  const { id } = useParams();
  const [role, setRole] = useState({});
  const [permissions, setPermissions] = useState([])
  const [modules, setModules] = useState([])
  const dispatch = useDispatch();

  const fetchRoleData = async () => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.Roles.GET_LIST + id
      );
      if (response.data?.payload) {
        setRole(response.data?.payload?.result)
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  const fetchPermissions = async () => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.Permissions.GET_LIST, {
        params: { role: id }
      }
      );
      if (response.data?.payload) {
        setPermissions(response.data?.payload?.result)
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  }

  const fetchModules = async () => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(AxiosInstancePaths.Modules.GET_LIST);
      if (response.data?.payload) {
        setModules(response?.data?.payload?.result)
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    fetchRoleData();
    fetchModules()
    fetchPermissions()
    // eslint-disable-next-line
  }, [id]);

  return (
    <Grid container spacing={2} >
      <Grid item xs={12}>
        <Grid container justifyContent="flex-start" spacing={2}>
          <Grid item xs={12} md={4}>
            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent style={{ flex: 1 }}>
                <Typography variant="h4" style={{ fontWeight: "bold" }}>
                  Role Details
                </Typography>
                <Grid container justifyContent={"space-between"} >
                  <Grid item xs={12}>
                    <FilledInput
                      style={{ display: "flex", justifyContent: "space-between" }}
                      label={"role_name"}
                      value={role?.role_name || "Inactive"}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ marginTop: '0.5rem' }}>
                    <SwitchInput
                      name="Role Active"
                      defaultValue={role?.is_active}
                      startEdit={true}
                      isDisabel={true}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} >
        <Grid container justifyContent="flex-start" spacing={2}>
          {permissions.length > 0 ? permissions.map((permission, permissionIndex) => (
            <Grid item xs={12} md={6} lg={4} key={permissionIndex}>
              <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent style={{ flex: 1 }}>
                  <Typography variant="h4" style={{ fontWeight: "bold" }}>
                    {modules.find(item => item._id === permission.module)?.name} Access
                  </Typography>
                  <Grid container justifyContent={"space-between"} >
                    <Grid item xs={12} >
                      <SwitchInput
                        name="can_read"
                        defaultValue={permission?.can_read}
                        startEdit={true}
                        isDisabel={true}
                      />
                    </Grid>
                    <Grid item xs={12} >
                      <SwitchInput
                        name="can_select"
                        defaultValue={permission?.can_select}
                        startEdit={true}
                        isDisabel={true}
                      />
                    </Grid>
                    <Grid item xs={12} >
                      <SwitchInput
                        name="can_add"
                        defaultValue={permission?.can_add}
                        startEdit={true}
                        isDisabel={true}
                      />
                    </Grid>
                    <Grid item xs={12} >
                      <SwitchInput
                        name="can_update"
                        defaultValue={permission?.can_update}
                        startEdit={true}
                        isDisabel={true}
                      />
                    </Grid>
                    <Grid item xs={12} >
                      <SwitchInput
                        name="can_delete"
                        defaultValue={permission?.can_delete}
                        startEdit={true}
                        isDisabel={true}
                      />
                    </Grid>
                    <Grid item xs={12} >
                      <SwitchInput
                        name="can_upload"
                        defaultValue={permission?.can_upload}
                        startEdit={true}
                        isDisabel={true}
                      />
                    </Grid>
                    <Grid item xs={12} >
                      <SwitchInput
                        name="can_download"
                        defaultValue={permission?.can_download}
                        startEdit={true}
                        isDisabel={true}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )) : ""}
        </Grid>
      </Grid>

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

export default ViewRole;
