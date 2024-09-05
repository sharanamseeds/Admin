import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, IconButton } from "@mui/material";
// import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../Basic/Pagination";
import { FaEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../../config/AxiosInstancePaths";
import { startLoading, stopLoading } from "../../../../redux/slices/loadingSlice";
import { showErrorMessage } from "../../../../helpers/notificationService";
import { useTheme } from '@mui/material/styles';
import TableHeaderPart from "../../../Basic/TableHeaderPart";
import { BsSortAlphaDown, BsSortAlphaDownAlt } from "react-icons/bs";
import { nameFilter } from "../../../../constant/Options";
import DropDrown from "../../../Basic/DropDrown";
import { saveAs } from 'file-saver'; // You'll need to install this package

function ProductList({ permission }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const theme = useTheme();

  const [productsPerPage, setproductsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0);

  const [filter, setFilter] = useState({
    sortField: "product_name",
    sortBy: "asc",
  });


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

  const fetchProductList = async (search) => {
    try {

      let queryFields = { ...filter }
      delete queryFields.sortBy
      delete queryFields.sortField

      let query = {
        limit: productsPerPage,
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
      const response = await axiosInstance.get(`${AxiosInstancePaths.Products.GET_LIST}?${queryString}`
      );
      if (response.data?.payload) {
        setCurrentPage(response.data?.payload?.result?.meta?.currentPage);
        setproductsPerPage(response.data?.payload?.result?.meta?.limit)
        setTotalDocs(response.data?.payload?.result?.meta?.docsFound)
        setProducts(response.data?.payload?.result?.data);
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  }

  const debouncedFetchUserList = useDebounce(fetchProductList, 500);

  const handleSearchChange = (value) => {
    const newSearchTerm = value;
    debouncedFetchUserList(newSearchTerm);
  };

  const handleFilter = (name, value) => {
    if (name === "product_name" || name === "product_code") {
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

  const editProduct = (id) => {
    navigate(`/products/edit/${id}`);
  };
  const viewProduct = (id) => {
    navigate(`/products/view/${id}`);
  };


  // const deleteProduct = async (id) => {
  //   try {
  //     dispatch(startLoading());
  //     const response = await axiosInstance.delete(
  //       AxiosInstancePaths.Products.DELETE_BY_ID + id
  //     );
  //     showSuccessMessage(response?.data?.message);
  //     dispatch(stopLoading());
  //     fetchProductList();
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
      const response = await axiosInstance.get(AxiosInstancePaths.Products.DOWNLOAD_EXCEL, {
        responseType: 'blob', // Important: This tells Axios to expect a binary response
      });

      // Create a Blob from the response data
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      // Use file-saver to save the file
      saveAs(blob, 'products.xlsx');

      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  }

  useEffect(() => {
    fetchProductList();
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    fetchProductList();
    // eslint-disable-next-line
  }, [filter, productsPerPage, currentPage])

  return (
    <div>
      <TableHeaderPart
        addText={permission?.can_add ? "Add Product" : null}
        title="Products"
        searchText="Search by name or description"
        handleAdd={() => navigate("/products/add")}
        handleSearch={handleSearchChange}
        isClear={true}
        onClear={() => {
          setFilter({
            sortField: "product_name",
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
            Product Name
            <DropDrown
              name="product_name"
              icon={
                filter?.sortField &&
                  filter.sortField === "product_name" &&
                  filter.sortBy !== "asc" ? (
                  <BsSortAlphaDownAlt color={theme.palette.common.black} size={15} />
                ) : (
                  <BsSortAlphaDown color={theme.palette.common.black} size={15} />
                )
              }
              onSelect={handleFilter}
              options={nameFilter}
            />
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            Product Code
            <DropDrown
              name="product_code"
              icon={
                filter?.sortField &&
                  filter.sortField === "product_code" &&
                  filter.sortBy !== "asc" ? (
                  <BsSortAlphaDownAlt color={theme.palette.common.black} size={15} />
                ) : (
                  <BsSortAlphaDown color={theme.palette.common.black} size={15} />
                )
              }
              onSelect={handleFilter}
              options={nameFilter}
            />
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            Action
          </div>
        </div>
      </div>
      {products.length > 0 ? products.map((product, productIndex) => (
        <div
          key={productIndex}
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
            {productsPerPage * (currentPage - 1) + productIndex + 1}
          </div>
          <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
            {product.product_name}
          </div>
          <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
            {product.product_code}
          </div>
          <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
            {permission?.can_read ? <IconButton
              size="small"
              onClick={() => viewProduct(product._id)}
              style={{ color: theme.palette.info.main }}
            >
              <FaEye />
            </IconButton> : ''}
            {permission?.can_update ? <IconButton
              size="small"
              onClick={() => editProduct(product._id)}
              style={{ color: theme.palette.warning.main }}
            >
              <AiFillEdit />
            </IconButton> : ''}
            {/* <IconButton
              size="small"
              onClick={() => deleteProduct(product._id)}
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
          No Product Found
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalItems={totalDocs}
        itemsPerPage={productsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setproductsPerPage}
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

export default ProductList;
