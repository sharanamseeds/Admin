import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, IconButton } from "@mui/material";
import { FaEye } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Pagination from "../../Basic/Pagination";
import DropDrown from "../../Basic/DropDrown";
import { BsSortAlphaDown, BsSortAlphaDownAlt } from "react-icons/bs";
import {
  nameFilter,
} from "../../../constant/Options";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import axiosInstance from "../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../config/AxiosInstancePaths";
import { useDispatch } from "react-redux";
import { showErrorMessage } from "../../../helpers/notificationService";
import { useTheme } from '@mui/material/styles';
import TableHeaderPart from "../../Basic/TableHeaderPart";
import { saveAs } from 'file-saver'; // You'll need to install this package

function VendorList({ permission }) {
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

  const fetchVendorList = async (search) => {
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
        `${AxiosInstancePaths.Vendors.GET_LIST}?${queryString}`
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


  const debouncedFetchVendorList = useDebounce(fetchVendorList, 500);

  const handleSearchChange = (value) => {
    const newSearchTerm = value;
    debouncedFetchVendorList(newSearchTerm);
  };

  const handleFilter = (name, value) => {
    if (name === "email" || name === "name" || name === "contact_number" || name === "agro_name") {
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

  const downloadExcel = async () => {
    try {
      dispatch(startLoading());

      // Send the request to download the Excel file
      const response = await axiosInstance.get(AxiosInstancePaths.Vendors.DOWNLOAD_EXCEL, {
        responseType: 'blob', // Important: This tells Axios to expect a binary response
      });

      // Create a Blob from the response data
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      // Use file-saver to save the file
      saveAs(blob, 'vendors.xlsx');

      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  }

  const editUser = (id) => {
    navigate(`/vendors/edit/${id}`);
  };

  const viewUser = (id) => {
    navigate(`/vendors/view/${id}`);
  };


  useEffect(() => {
    fetchVendorList();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchVendorList();
    // eslint-disable-next-line
  }, [filter, usersPerPage, currentPage])

  return (
    <div>
      <TableHeaderPart
        addText={permission?.can_add ? "Add Vendor" : null}
        title="Vendors"
        searchText="Agro Name, Name, Email, Phone"
        handleAdd={() => navigate("/vendors/add")}
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
            Agro Name
            <DropDrown
              name="agro_name"
              icon={
                filter?.sortField &&
                  filter.sortField === "agro_name" &&
                  filter.sortBy !== "asc" ? (
                  <BsSortAlphaDownAlt color={theme.palette.common.black} size={15} />
                ) : (
                  <BsSortAlphaDown color={theme.palette.common.black} size={15} />
                )
              }
              value={filter?.sortField &&
                filter.sortField === "agro_name" ? filter.sortBy : ""}
              onSelect={handleFilter}
              options={nameFilter}
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
              {user?.name}
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              {user?.email}
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              {user?.contact_number}
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              {user?.agro_name}
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
            No Vendors Found
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

export default VendorList;
