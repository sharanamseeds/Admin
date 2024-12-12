import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, IconButton } from "@mui/material";
import { FaEye } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Pagination from "../../Basic/Pagination";
import DropDrown from "../../Basic/DropDrown";
import { FaFilter } from "react-icons/fa";
import {
  BsSortAlphaDown,
  BsSortAlphaDownAlt,
  BsSortNumericDown,
  BsSortNumericDownAlt,
} from "react-icons/bs";
import {
  orderStatusOption,
  totalAmountFilter,
  dateFilter,
} from "../../../constant/Options";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import { showErrorMessage } from "../../../helpers/notificationService";
import axiosInstance from "../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../config/AxiosInstancePaths";
import { useTheme } from '@mui/material/styles';
import TableHeaderPart from "../../Basic/TableHeaderPart";
import { saveAs } from 'file-saver'; // You'll need to install this package
import { snakeToTitleCase } from "../../../helpers";

function OrdersList({ permission }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [orders, setOrders] = useState([]);
  const [ordersPerPage, setOrdersPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0);

  const [filter, setFilter] = useState({
    sortField: "createdAt",
    sortBy: "desc",
  });

  const fetchOrderList = async (search) => {
    try {

      let queryFields = { ...filter }
      delete queryFields.sortBy
      delete queryFields.sortField

      let query = {
        limit: ordersPerPage,
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
        `${AxiosInstancePaths.Orders.GET_LIST}?${queryString}`
      );
      if (response.data?.payload) {
        setCurrentPage(response.data?.payload?.result?.meta?.currentPage);
        setTotalDocs(response.data?.payload?.result?.meta?.docsFound)
        setOrders(response.data?.payload?.result?.data);
        setOrdersPerPage(response.data?.payload?.result?.meta?.limit)
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);

      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  }

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

  const debouncedFetchUserList = useDebounce(fetchOrderList, 500);

  const handleSearchChange = (value) => {
    const newSearchTerm = value;
    debouncedFetchUserList(newSearchTerm);
  };


  const editOrder = (id) => {
    navigate(`/orders/edit/${id}`);
  };
  const viewOrder = (id) => {
    navigate(`/orders/view/${id}`);
  };

  const handleFilter = (name, value) => {
    if (name === "billing_amount" || name === "createdAt") {
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

  // const deleteOrder = async (id) => {
  //   try {
  //     dispatch(startLoading());
  //     const response = await axiosInstance.delete(
  //       AxiosInstancePaths.Orders.DELETE_BY_ID + id
  //     );
  //     showSuccessMessage(response?.data?.message);
  //     dispatch(stopLoading());
  //     fetchOrderList();
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
      const response = await axiosInstance.get(AxiosInstancePaths.Orders.DOWNLOAD_EXCEL, {
        responseType: 'blob', // Important: This tells Axios to expect a binary response
      });

      // Create a Blob from the response data
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      // Use file-saver to save the file
      saveAs(blob, 'orders.xlsx');

      dispatch(stopLoading());
    } catch (error) {
      console.log(error);

      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  }

  useEffect(() => {
    fetchOrderList();
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    fetchOrderList();
    // eslint-disable-next-line
  }, [filter, ordersPerPage, currentPage])

  return (
    <div>
      <TableHeaderPart
        addText={permission?.can_add ? "Add Order" : null}
        title="Orders"
        searchText="Search By Status"
        handleAdd={() => navigate("/orders/add")}
        handleSearch={handleSearchChange}
        isClear={true}
        onClear={() => {
          setFilter({
            sortField: "createdAt",
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
            Date
            <DropDrown
              name="createdAt"
              icon={
                filter?.sortField &&
                  filter.sortField === "createdAt" &&
                  filter.sortBy === "asc" ? (
                  <BsSortAlphaDown color="#0B476D" size={15} />
                ) : (
                  <BsSortAlphaDownAlt color="#0B476D" size={15} />
                )
              }
              onSelect={handleFilter}
              options={dateFilter}
              value={filter?.sortField &&
                filter.sortField === "createdAt" ?
                filter.sortBy : ""}
            />
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            Billing Amount
            <DropDrown
              name="billing_amount"
              icon={
                filter?.sortField &&
                  filter.sortField === "billing_amount" &&
                  filter.sortBy === "asc" ? (
                  <BsSortNumericDown color="#0B476D" size={15} />
                ) : (
                  <BsSortNumericDownAlt color="#0B476D" size={15} />
                )
              }
              onSelect={handleFilter}
              options={totalAmountFilter}
              value={filter?.sortField &&
                filter.sortField === "billing_amount" ?
                filter.sortBy : ""}
            />
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            Creditable Order
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            Status
            <DropDrown
              name="status"
              icon={<FaFilter color="#0B476D" size={12} />}
              onSelect={handleFilter}
              options={orderStatusOption}
              value={"status" in filter ? filter.status || "false" : ""}
            />
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            Action
          </div>
        </div>
      </div>
      {orders.length > 0 ? orders.map((order, orderIndex) => (
        <div
          key={orderIndex}
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
            {new Date(order.createdAt).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </div>
          <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
            {order.billing_amount}
          </div>
          <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
            {order.is_creditable ? "Creditable" : 'Regular'}
          </div>
          <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
            {snakeToTitleCase(order.status)}
          </div>
          <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
            {permission?.can_read ? <IconButton
              size="small"
              onClick={() => viewOrder(order._id)}
              style={{ color: theme.palette.info.main }}
            >
              <FaEye />
            </IconButton> : ''}
            {permission?.can_update ? <IconButton
              size="small"
              onClick={() => editOrder(order._id)}
              style={{ color: theme.palette.warning.main }}
            >
              <AiFillEdit />
            </IconButton> : ''}
            {/* <IconButton
              size="small"
              onClick={() => deleteOrder(order._id)}
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
          No Order Found
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalItems={totalDocs}
        itemsPerPage={ordersPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setOrdersPerPage}
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

export default OrdersList;
