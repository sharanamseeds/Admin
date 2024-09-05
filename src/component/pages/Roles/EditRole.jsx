import { Box, Button, Card, CardContent, Grid, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextInput from "../../Form/TextInput";
import SwitchInput from "../../Form/SwitchInput";
import {
  roleUpdateSchema,
  validateSchema,
} from "../../../validation/validationSchema";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../helpers/notificationService";
import axiosInstance from "../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../config/AxiosInstancePaths";


function EditRole() {
  const theme = useTheme();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [role, setRole] = useState({})
  const [permissions, setPermissions] = useState([])
  const [modules, setModules] = useState([])
  const navigate = useNavigate()

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

  const permissionUpdate = async (data) => {
    try {
      let updateData = { ...data };
      delete updateData._id
      delete updateData.role
      delete updateData.module
      delete updateData.createdAt
      delete updateData.updatedAt
      delete updateData.__v

      await axiosInstance.put(
        AxiosInstancePaths.Permissions.UPDATE_BY_ID + data._id,
        updateData
      );
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  }


  const updateRole = async () => {
    try {
      const isValid = await validateSchema(roleUpdateSchema, formData, setErrors);
      if (!isValid) {
        return;
      }
      dispatch(startLoading());
      // update permission
      // permissions.forEach(async (permissionItem) => {
      //   await permissionUpdate(permissionItem)
      // })
      const response = await axiosInstance.put(
        AxiosInstancePaths.Roles.UPDATE_BY_ID + id,
        formData
      );
      showSuccessMessage(response?.data?.message);
      dispatch(stopLoading());
      navigate('/roles')
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

  const fetchRoleData = async () => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.Roles.GET_BY_ID + id
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

  const updatePermission = async (name, value, index) => {
    // setPermissions((prevPermissions) => {
    //   const updatedPermissions = [...prevPermissions];
    //   updatedPermissions[index] = {
    //     ...updatedPermissions[index],
    //     [name]: value,
    //   };
    //   return updatedPermissions;
    // });

    const data = {
      ...permissions[index],
      [name]: value,
    }
    await permissionUpdate(data)
    await fetchPermissions()
  };

  useEffect(() => {
    fetchModules()
    fetchRoleData();
    fetchPermissions()
    // eslint-disable-next-line
  }, [id]);


  useEffect(() => {
    console.log(permissions)
  }, [permissions])

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
                    <TextInput
                      name={"Name"}
                      error={errors?.role_name?.message}
                      defaultValue={formData?.role_name || role?.role_name}
                      startEdit={true}
                      handleChange={(name, value) =>
                        handleSelectChange("role_name", value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} style={{ marginTop: '0.5rem' }}>
                    <SwitchInput
                      name="Role Active"
                      defaultValue={formData?.is_active || role?.is_active}
                      startEdit={true}
                      handleChange={(name, value) =>
                        handleSelectChange("is_active", value)
                      }
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
                        handleChange={(name, value) =>
                          updatePermission("can_read", value, permissionIndex)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} >
                      <SwitchInput
                        name="can_select"
                        defaultValue={permission?.can_select}
                        startEdit={true}
                        handleChange={(name, value) =>
                          updatePermission("can_select", value, permissionIndex)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} >
                      <SwitchInput
                        name="can_add"
                        defaultValue={permission?.can_add}
                        startEdit={true}
                        handleChange={(name, value) =>
                          updatePermission("can_add", value, permissionIndex)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} >
                      <SwitchInput
                        name="can_update"
                        defaultValue={permission?.can_update}
                        startEdit={true}
                        handleChange={(name, value) =>
                          updatePermission("can_update", value, permissionIndex)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} >
                      <SwitchInput
                        name="can_delete"
                        defaultValue={permission?.can_delete}
                        startEdit={true}
                        handleChange={(name, value) =>
                          updatePermission("can_delete", value, permissionIndex)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} >
                      <SwitchInput
                        name="can_upload"
                        defaultValue={permission?.can_upload}
                        startEdit={true}
                        handleChange={(name, value) =>
                          updatePermission("can_upload", value, permissionIndex)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} >
                      <SwitchInput
                        name="can_download"
                        defaultValue={permission?.can_download}
                        startEdit={true}
                        handleChange={(name, value) =>
                          updatePermission("can_download", value, permissionIndex)
                        }
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
            onClick={() => navigate("/roles")}
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
            onClick={updateRole}
          >
            Save
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default EditRole;
