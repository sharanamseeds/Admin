import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, IconButton } from "@mui/material";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../Basic/Pagination";
import { FaEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../../config/AxiosInstancePaths";
import { startLoading, stopLoading } from "../../../../redux/slices/loadingSlice";
import { showErrorMessage } from "../../../../helpers/notificationService";
import TableHeaderPart from "../../../Basic/TableHeaderPart";
import { useTheme } from '@mui/material/styles';
import DropDrown from "../../../Basic/DropDrown";
import { nameFilter } from "../../../../constant/Options";
import { BsSortAlphaDown, BsSortAlphaDownAlt } from "react-icons/bs";
import { saveAs } from 'file-saver'; // You'll need to install this package

function BrandList({ permission }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [brands, setBrands] = useState([]); // Setting initial state with brand data

  const [brandsPerPage, setBrandsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0);

  const [filter, setFilter] = useState({
    sortField: "brand_name",
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

  const fetchBrandList = async (search) => {
    try {
      let queryFields = { ...filter }
      delete queryFields.sortBy
      delete queryFields.sortField

      let query = {
        limit: brandsPerPage,
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
      const response = await axiosInstance.get(`${AxiosInstancePaths.Brands.GET_LIST}?${queryString}`
      );
      if (response.data?.payload) {

        setCurrentPage(response.data?.payload?.result?.meta?.currentPage);
        setBrandsPerPage(response.data?.payload?.result?.meta?.limit)
        setTotalDocs(response.data?.payload?.result?.meta?.docsFound)
        setBrands(response.data?.payload?.result?.data);

      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  }

  const debouncedFetchUserList = useDebounce(fetchBrandList, 500);

  const handleSearchChange = (value) => {
    const newSearchTerm = value;
    debouncedFetchUserList(newSearchTerm);
  };

  const handleFilter = (name, value) => {
    if (name === "brand_name") {
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

  // const deleteBrand = async (id) => {
  //   try {
  //     dispatch(startLoading());
  //     const response = await axiosInstance.delete(
  //       AxiosInstancePaths.Brands.DELETE_BY_ID + id
  //     );
  //     showSuccessMessage(response?.data?.message);
  //     dispatch(stopLoading());
  //     fetchBrandList();
  //   } catch (error) {
  //     console.log(error);
  //     showErrorMessage(error?.response?.data?.message);
  //     dispatch(stopLoading());
  //   }
  // };

  const editBrand = (id) => {
    navigate(`/brands/edit/${id}`);
  };
  const viewBrand = (id) => {
    navigate(`/brands/view/${id}`);
  };

  const downloadExcel = async () => {
    try {
      dispatch(startLoading());

      // Send the request to download the Excel file
      const response = await axiosInstance.get(AxiosInstancePaths.Brands.DOWNLOAD_EXCEL, {
        responseType: 'blob', // Important: This tells Axios to expect a binary response
      });

      // Create a Blob from the response data
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      // Use file-saver to save the file
      saveAs(blob, 'brands.xlsx');

      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  }

  useEffect(() => {
    fetchBrandList();
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    fetchBrandList();
    // eslint-disable-next-line
  }, [filter, brandsPerPage, currentPage])

  return (
    <div>
      <TableHeaderPart
        addText={permission?.can_add ? "Add Brand" : null}
        title="Brands"
        searchText="Search by name or tag line"
        handleAdd={() => navigate("/brands/add")}
        handleSearch={handleSearchChange}
        isClear={true}
        onClear={() => {
          setFilter({
            sortField: "brand_name",
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
            Brand Name
            <DropDrown
              name="brand_name"
              icon={
                filter?.sortField &&
                  filter.sortField === "brand_name" &&
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
            Tag Line
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            Action
          </div>
        </div>
      </div>
      {brands.length > 0 ? brands
        .map((brand, brandIndex) => (
          <div
            key={brand._id}
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
              {brandsPerPage * (currentPage - 1) + brandIndex + 1}
            </div>
            <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
              {brand.brand_name}
            </div>
            <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>{brand.tag_line}</div>
            <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
              {permission?.can_read ? <IconButton
                size="small"
                onClick={() => viewBrand(brand._id)}
                style={{ color: theme.palette.info.main }}
              >
                <FaEye />
              </IconButton> : ''}
              {permission?.can_update ? <IconButton
                size="small"
                onClick={() => editBrand(brand._id)}
                style={{ color: theme.palette.warning.main }}
              >
                <AiFillEdit />
              </IconButton> : ''}
              {/* <IconButton
                size="small"
                onClick={() => deleteBrand(brand._id)}
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
          No Brands Found
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalItems={totalDocs}
        itemsPerPage={brandsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setBrandsPerPage}
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

export default BrandList;
