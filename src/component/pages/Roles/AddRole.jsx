import { Button, Card, CardContent, Grid, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextInput from "../../Form/TextInput";
import SwitchInput from "../../Form/SwitchInput";
import {
  roleSchema,
  validateSchema,
} from "../../../validation/validationSchema";
import axiosInstance from "../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../config/AxiosInstancePaths";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../helpers/notificationService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import BackNavigate from "../../Basic/BackNavigate";


function AddRole() {
  const theme = useTheme();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [modules, setModules] = useState([])
  const [permissions, setPermissions] = useState([])

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

  const generatePermissions = () => {
    let pArray = []
    modules.forEach((item) => {
      const baseData = {
        role: null,
        module: item._id,
        can_read: true,
        can_select: true,
        can_add: false,
        can_update: false,
        can_delete: false,
        can_upload: false,
        can_download: false
      }
      pArray.push(baseData)
    })
    setPermissions(pArray)
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

  const updatePermission = (name, value, index) => {
    setPermissions((prevPermissions) => {
      const updatedPermissions = [...prevPermissions];
      updatedPermissions[index] = {
        ...updatedPermissions[index],
        [name]: value,
      };
      return updatedPermissions;
    });
  };


  const addPermission = async (data) => {
    try {
      await axiosInstance.post(
        AxiosInstancePaths.Permissions.ADD,
        data
      );
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }

  const addRole = async () => {
    try {
      const isValid = await validateSchema(roleSchema, formData, setErrors);
      if (!isValid) {
        return;
      }
      dispatch(startLoading());
      const response = await axiosInstance.post(
        AxiosInstancePaths.Roles.ADD,
        formData
      );
      const roleDoc = response.data?.payload?.result;
      if (roleDoc) {
        const roleId = roleDoc._id
        // add permission
        permissions.forEach(async (permissionItem) => {
          let data = { ...permissionItem, role: roleId }
          await addPermission(data)
        })
      }
      showSuccessMessage(response?.data?.message);
      dispatch(stopLoading());
      navigate('/roles')
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    fetchModules()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (modules.length > 0) {
      generatePermissions()
    }
    // eslint-disable-next-line
  }, [modules])


  return (
    <Grid container spacing={2} >
      <Grid item xs={12} sx={{ paddingTop: { xs: '0.5rem !important', sx: '0.5rem !important', md: '0px !important' } }} >
        <BackNavigate />
      </Grid>
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
                      defaultValue={formData.role_name}
                      startEdit={true}
                      handleChange={(name, value) =>
                        handleSelectChange("role_name", value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} style={{ marginTop: '0.5rem' }}>
                    <SwitchInput
                      name="Role Active"
                      defaultValue={formData?.is_active}
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
                        defaultValue={permission[permissionIndex]?.can_read}
                        startEdit={true}
                        handleChange={(name, value) =>
                          updatePermission("can_read", value, permissionIndex)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} >
                      <SwitchInput
                        name="can_select"
                        defaultValue={permission[permissionIndex]?.can_select}
                        startEdit={true}
                        handleChange={(name, value) =>
                          updatePermission("can_select", value, permissionIndex)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} >
                      <SwitchInput
                        name="can_add"
                        defaultValue={permission[permissionIndex]?.can_add}
                        startEdit={true}
                        handleChange={(name, value) =>
                          updatePermission("can_add", value, permissionIndex)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} >
                      <SwitchInput
                        name="can_update"
                        defaultValue={permission[permissionIndex]?.can_update}
                        startEdit={true}
                        handleChange={(name, value) =>
                          updatePermission("can_update", value, permissionIndex)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} >
                      <SwitchInput
                        name="can_delete"
                        defaultValue={permission[permissionIndex]?.can_delete}
                        startEdit={true}
                        handleChange={(name, value) =>
                          updatePermission("can_delete", value, permissionIndex)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} >
                      <SwitchInput
                        name="can_upload"
                        defaultValue={permission[permissionIndex]?.can_upload}
                        startEdit={true}
                        handleChange={(name, value) =>
                          updatePermission("can_upload", value, permissionIndex)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} >
                      <SwitchInput
                        name="can_download"
                        defaultValue={permission[permissionIndex]?.can_download}
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
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Button
              fullWidth
              variant="contained"
              onClick={addRole}
              sx={{
                color: theme.palette.common.white,
                width: "max-content",
                backgroundColor: theme.palette.success.main,
                "&:hover": {
                  backgroundColor: theme.palette.success.main,
                },
              }}
            >
              Add Role
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AddRole;
