import React, { useCallback, useEffect, useRef, useState } from "react";
import { IconButton } from "@mui/material";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Pagination from "../../Basic/Pagination";
import AxiosInstancePaths from "../../../config/AxiosInstancePaths";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import {
  showErrorMessage,

} from "../../../helpers/notificationService";
import axiosInstance from "../../../config/AxiosConfig";
import { useDispatch } from "react-redux";
import TableHeaderPart from "../../Basic/TableHeaderPart";
import { useTheme } from '@mui/material/styles';
import DropDrown from "../../Basic/DropDrown";
import { BsSortAlphaDown, BsSortAlphaDownAlt, BsSortDown, BsSortDownAlt } from "react-icons/bs";
import { activeFilter, nameFilter } from "../../../constant/Options";

function RoleList({ permission }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [rolesPerPage, setRolesPerPage] = useState(5);
  const [roles, setRoles] = useState([]);
  const theme = useTheme();
  const [totalDocs, setTotalDocs] = useState(0);

  const [filter, setFilter] = useState({
    sortField: "role_name",
    sortBy: "asc",
  });

  const editRole = (id) => {
    navigate(`/roles/edit/${id}`);
  };

  const viewRole = (id) => {
    navigate(`/roles/view/${id}`);
  };

  const fetchRoleList = async (search) => {
    try {
      let queryFields = { ...filter }
      delete queryFields.sortBy
      delete queryFields.sortField

      let query = {
        limit: rolesPerPage,
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
        `${AxiosInstancePaths.Roles.GET_LIST}?${queryString}`
      );
      if (response.data?.payload) {
        setCurrentPage(response.data?.payload?.result?.meta?.currentPage);
        setRolesPerPage(response.data?.payload?.result?.meta?.limit)
        setTotalDocs(response.data?.payload?.result?.meta?.docsFound)
        setRoles(response.data?.payload?.result?.data);
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
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


  const debouncedFetchUserList = useDebounce(fetchRoleList, 500);

  const handleSearchChange = (value) => {
    const newSearchTerm = value;
    debouncedFetchUserList(newSearchTerm);
  };

  const handleFilter = (name, value) => {
    if (name === "role_name") {
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


  // const deleteRole = async (id) => {
  //   try {
  //     dispatch(startLoading());
  //     const response = await axiosInstance.delete(
  //       AxiosInstancePaths.Roles.DELETE_BY_ID + id
  //     );
  //     showSuccessMessage(response?.data?.message);
  //     dispatch(stopLoading());
  //     fetchRoleList();
  //   } catch (error) {
  //     console.log(error);
  //     showErrorMessage(error?.response?.data?.message);
  //     dispatch(stopLoading());
  //   }
  // };

  useEffect(() => {
    fetchRoleList();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchRoleList();
    // eslint-disable-next-line
  }, [filter, rolesPerPage, currentPage]);

  return (
    <div>
      <TableHeaderPart
        addText={permission?.can_add ? "Add Role" : null}
        title="Roles"
        searchText="Search by role name"
        handleAdd={() => navigate("/roles/add")}
        handleSearch={handleSearchChange}
        isClear={true}
        onClear={() => {
          setFilter({
            sortField: "role_name",
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
            Sr. No.
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            Role Name
            <DropDrown
              name="role_name"
              icon={
                filter?.sortField &&
                  filter.sortField === "role_name" &&
                  filter.sortBy !== "asc" ? (
                  <BsSortAlphaDownAlt color={theme.palette.common.black} size={15} />
                ) : (
                  <BsSortAlphaDown color={theme.palette.common.black} size={15} />
                )
              }
              onSelect={handleFilter}
              options={nameFilter}
              value={filter?.sortField &&
                filter.sortField === "role_name" ?
                filter.sortBy : ""}
            />

          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            Active
            <DropDrown
              name="is_active"
              icon={
                filter?.is_active ? (
                  <BsSortDown color={theme.palette.common.black} size={15} />
                ) : (
                  <BsSortDownAlt color={theme.palette.common.black} size={15} />
                )
              }
              onSelect={handleFilter}
              options={activeFilter}
              value={"is_active" in filter ? filter.is_active || "false" : ""}

            />
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            Action
          </div>
        </div>
      </div>
      {roles.length > 0 ? roles.map((role, roleIndex) => (
        <div
          key={roleIndex}
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
            {rolesPerPage * (currentPage - 1) + roleIndex + 1}
          </div>
          <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
            {role.role_name}
          </div>
          <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
            {role.is_active ? "Active" : "Inactive"}
          </div>
          <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
            {permission?.can_read ? <IconButton
              size="small"
              onClick={() => viewRole(role._id)}
              style={{ color: theme.palette.info.main }}
            >
              <FaEye />
            </IconButton> : ''}
            {permission?.can_update ? <IconButton
              size="small"
              onClick={() => editRole(role._id)}
              style={{ color: theme.palette.warning.main }}
            >
              <AiFillEdit />
            </IconButton> : ''}


            {/* <IconButton
              size="small"
              onClick={() => deleteRole(role._id)}
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
          No Role Found
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalItems={totalDocs}
        itemsPerPage={rolesPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setRolesPerPage}
      />
    </div>
  );
}

export default RoleList;
