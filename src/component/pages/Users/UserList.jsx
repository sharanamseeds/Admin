import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, IconButton } from "@mui/material";
import { FaEye } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Pagination from "../../Basic/Pagination";
import DropDrown from "../../Basic/DropDrown";
import { FaFilter } from "react-icons/fa";
import { BsSortAlphaDown, BsSortAlphaDownAlt, BsSortDown, BsSortDownAlt } from "react-icons/bs";
import {
  AdminUserFilter,
  nameFilter,
  statusUserFilter,
} from "../../../constant/Options";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import axiosInstance from "../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../config/AxiosInstancePaths";
import { useDispatch } from "react-redux";
import { showErrorMessage } from "../../../helpers/notificationService";
import { createGeneralOptions } from "../../../helpers";
import { useTheme } from '@mui/material/styles';
import TableHeaderPart from "../../Basic/TableHeaderPart";
import { saveAs } from 'file-saver'; // You'll need to install this package

function UserList({ permission }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [totalDocs, setTotalDocs] = useState(0);

  const [filter, setFilter] = useState({
    sortField: "name",
    sortBy: "asc",
  });

  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const fetchUserList = async (search) => {
    try {

      let queryFields = { ...filter }
      delete queryFields.sortBy
      delete queryFields.sortField

      let query = {
        limit: usersPerPage,
        page: currentPage,
        sortBy: filter.sortField,
        sortOrder: filter.sortBy,
        ...queryFields
      };
      if (search) {
        query.search = search;
      }


      const queryString = new URLSearchParams(query).toString();

      dispatch(startLoading());
      const response = await axiosInstance.get(
        `${AxiosInstancePaths.Users.GET_LIST}?${queryString}`
      );
      if (response.data?.payload) {

        setCurrentPage(response.data?.payload?.result?.meta?.currentPage);
        setUsersPerPage(response.data?.payload?.result?.meta?.limit)
        setTotalDocs(response.data?.payload?.result?.meta?.docsFound)
        setUsers(response.data?.payload?.result?.data);
      }
      dispatch(stopLoading());
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  const useDebounce = (callback, delay) => {
    const timeoutRef = useRef(null);

    const debounceCallback = useCallback(
      (...args) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          callback(...args);
        }, delay);
      },
      [callback, delay]
    );

    return debounceCallback;
  };


  const debouncedFetchUserList = useDebounce(fetchUserList, 500);

  const handleSearchChange = (value) => {
    const newSearchTerm = value;
    debouncedFetchUserList(newSearchTerm);
  };

  const handleFilter = (name, value) => {
    if (name === "email" || name === "name" || name === "contact_number") {
      setFilter({
        sortBy: value,
        sortField: name,
      });
    } else {
      setFilter({
        [name]: value,
      });
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
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  // const deleteUser = async (id) => {
  //   try {
  //     dispatch(startLoading());
  //     const response = await axiosInstance.delete(
  //       AxiosInstancePaths.Users.DELETE_BY_ID + id
  //     );
  //     showSuccessMessage(response?.data?.message);
  //     dispatch(stopLoading());
  //     fetchUserList();
  //   } catch (error) {
  //     console.log(error);
  //     showErrorMessage(error?.response?.data?.message);
  //     dispatch(stopLoading());
  //   }
  // };

  const downloadExcel = async () => {
    try {
      dispatch(startLoading());

      // Send the request to download the Excel file
      const response = await axiosInstance.get(AxiosInstancePaths.Users.DOWNLOAD_EXCEL, {
        responseType: 'blob', // Important: This tells Axios to expect a binary response
      });

      // Create a Blob from the response data
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      // Use file-saver to save the file
      saveAs(blob, 'users.xlsx');

      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      dispatch(stopLoading());
    }
  }

  const editUser = (id) => {
    navigate(`/users/edit/${id}`);
  };

  const viewUser = (id) => {
    navigate(`/users/view/${id}`);
  };


  useEffect(() => {
    fetchRoleList();
    fetchUserList();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchUserList();
    // eslint-disable-next-line
  }, [filter, usersPerPage, currentPage])

  return (
    <div>
      <TableHeaderPart
        addText={permission?.can_add ? "Add User" : null}
        title="Users"
        searchText="Search by name, email, or phone"
        handleAdd={() => navigate("/users/add")}
        handleSearch={handleSearchChange}
        isClear={true}
        onClear={() => {
          setFilter({
            sortField: "name",
            sortBy: "asc",
          })
        }}
      />

      <div style={{ width: "100%", marginTop: "1rem" }}>
        <div style={{
          fontWeight: "bold",
          color: theme.palette.text.primary,
          display: "flex",
          justifyContent: "space-between",
          padding: "15px",
          marginTop: "1rem",
          backgroundColor: theme.palette.background.paper,
          borderRadius: "10px",
          boxShadow: theme.shadows[1],
        }}>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            Name
            <DropDrown
              name="name"
              icon={
                filter?.sortField &&
                  filter.sortField === "name" &&
                  filter.sortBy !== "asc" ? (
                  <BsSortAlphaDownAlt color={theme.palette.common.black} size={15} />
                ) : (
                  <BsSortAlphaDown color={theme.palette.common.black} size={15} />
                )
              }
              value={filter?.sortField &&
                filter.sortField === "name" ? filter.sortBy : ""}
              onSelect={handleFilter}
              options={nameFilter}
            />
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>Email
            <DropDrown
              name="email"
              icon={
                filter?.sortField &&
                  filter.sortField === "email" &&
                  filter.sortBy !== "asc" ? (
                  <BsSortAlphaDownAlt color={theme.palette.common.black} size={15} />
                ) : (
                  <BsSortAlphaDown color={theme.palette.common.black} size={15} />
                )
              }
              value={filter?.sortField &&
                filter.sortField === "email" ? filter.sortBy : ""}
              onSelect={handleFilter}
              options={nameFilter}
            />
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>Phone
            <DropDrown
              name="contact_number"
              icon={
                filter?.sortField &&
                  filter.sortField === "contact_number" &&
                  filter.sortBy !== "asc" ? (
                  <BsSortAlphaDownAlt color={theme.palette.common.black} size={15} />
                ) : (
                  <BsSortAlphaDown color={theme.palette.common.black} size={15} />
                )
              }
              value={filter?.sortField &&
                filter.sortField === "contact_number" ? filter.sortBy : ""}
              onSelect={handleFilter}
              options={nameFilter}
            />
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            Role
            <DropDrown
              name="role_id"
              icon={<FaFilter color={theme.palette.common.black} size={12} />}
              onSelect={handleFilter}
              options={createGeneralOptions(roles, "role_name", "_id")}
              value={filter?.role_id ? filter.role_id : ""}
            />
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            App User
            <DropDrown
              name="is_app_user"
              icon={<FaFilter color={theme.palette.common.black} size={12} />}
              onSelect={handleFilter}
              options={AdminUserFilter}
              value={filter?.is_app_user ? filter.is_app_user : ""}
            />
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            Status
            <DropDrown
              name="is_verified"
              icon={
                filter?.is_verified ? (
                  <BsSortDown color={theme.palette.common.black} size={15} />
                ) : (
                  <BsSortDownAlt color={theme.palette.common.black} size={15} />
                )
              }
              onSelect={handleFilter}
              options={statusUserFilter}
              value={"is_verified" in filter ? filter.is_verified || "false" : ""}
            />
          </div>
          {permission.can_delete || permission?.can_read || permission?.can_update ? <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>Action</div> : ''}
        </div>
        {users.length > 0 ? users.map((user, index) => (
          <div
            key={index}
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
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              {user.name}
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              {user.email}
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              {user.contact_number}
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              {roles.find((role) => role._id === user.role_id)?.role_name || ""}
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              {user.is_app_user ? "App User" : 'Admin User'}
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              {user.is_verified ? "Verified" : 'Unverified'}
            </div>
            <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>

              {permission?.can_read ? <IconButton
                size="small"
                onClick={() => viewUser(user._id)}
                style={{ color: theme.palette.info.main }}
              >
                <FaEye />
              </IconButton> : ''}
              {permission?.can_update ? <IconButton
                size="small"
                onClick={() => editUser(user._id)}
                style={{ color: theme.palette.warning.main }}
              >
                <AiFillEdit />
              </IconButton> : ''}
              {/* <IconButton
                size="small"
                onClick={() => deleteUser(user._id)}
                style={{ color: theme.palette.error.main }}
              >
                <MdDelete />
              </IconButton> */}
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
            No Users Found
          </div>
        )}
      </div>

      <Pagination
        totalItems={totalDocs}
        currentPage={currentPage}
        itemsPerPage={usersPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setUsersPerPage}
      />
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'end' }}>
        <Button
          variant="contained"
          onClick={downloadExcel}
          style={{
            backgroundColor: theme.palette.success.main,
            textTransform: 'capitalize',
            color: theme.palette.common.white,
            ':hover': { backgroundColor: theme.palette.success.dark },
          }}
        >
          Download Excel Sheet
        </Button>
      </div>
    </div>
  );
}

export default UserList;
