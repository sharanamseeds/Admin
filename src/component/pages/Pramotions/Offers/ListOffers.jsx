import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, IconButton } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../Basic/Pagination";
import { FaEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../../../redux/slices/loadingSlice";
import axiosInstance from "../../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../../config/AxiosInstancePaths";
import { showErrorMessage, showSuccessMessage } from "../../../../helpers/notificationService";
import { useTheme } from '@mui/material/styles';
import TableHeaderPart from "../../../Basic/TableHeaderPart";
import { activeFilter, nameFilter } from "../../../../constant/Options";
import DropDrown from "../../../Basic/DropDrown";
import { BsSortAlphaDown, BsSortAlphaDownAlt, BsSortDown, BsSortDownAlt } from "react-icons/bs";
import { saveAs } from 'file-saver'; // You'll need to install this package

function ListOffers({ permission }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [offersPerPage, setOffersPerPage] = useState(5);
  const dispatch = useDispatch();
  const [offers, setOffers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0);

  const [filter, setFilter] = useState({
    sortField: "offer_name",
    sortBy: "asc",
  });


  const fetchOfferList = async (search) => {
    try {
      let queryFields = { ...filter }
      delete queryFields.sortBy
      delete queryFields.sortField

      let query = {
        limit: offersPerPage,
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
      const response = await axiosInstance.get(`${AxiosInstancePaths.Offers.GET_LIST}?${queryString}`
      );
      if (response.data?.payload) {
        setCurrentPage(response.data?.payload?.result?.meta?.currentPage);
        setTotalDocs(response.data?.payload?.result?.meta?.docsFound)
        setOffers(response.data?.payload?.result?.data);
        setOffersPerPage(response.data?.payload?.result?.meta?.limit)
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

  const debouncedFetchUserList = useDebounce(fetchOfferList, 500);

  const handleSearchChange = (value) => {
    const newSearchTerm = value;
    debouncedFetchUserList(newSearchTerm);
  };


  const handleFilter = (name, value) => {
    if (name === "offer_name" || name === "offer_code") {
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

  const editOffer = (id) => {
    navigate(`/offers/edit/${id}`);
  };
  const viewOffer = (id) => {
    navigate(`/offers/view/${id}`);
  };


  const deleteOffer = async (id) => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.delete(
        AxiosInstancePaths.Offers.DELETE_BY_ID + id
      );
      showSuccessMessage(response?.data?.message);
      dispatch(stopLoading());
      fetchOfferList();
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  const downloadExcel = async () => {
    try {
      dispatch(startLoading());

      // Send the request to download the Excel file
      const response = await axiosInstance.get(AxiosInstancePaths.Offers.DOWNLOAD_EXCEL, {
        responseType: 'blob', // Important: This tells Axios to expect a binary response
      });

      // Create a Blob from the response data
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      // Use file-saver to save the file
      saveAs(blob, 'offers.xlsx');

      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  }

  useEffect(() => {
    fetchOfferList()
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchOfferList()
    // eslint-disable-next-line
  }, [filter, offersPerPage, currentPage]);

  return (
    <div>
      <TableHeaderPart
        addText={permission?.can_add ? "Add Offer" : null}
        title="Offers"
        searchText="Search by name or code"
        handleAdd={() => navigate("/offers/add")}
        handleSearch={handleSearchChange}
        isClear={true}
        onClear={() => {
          setFilter({
            sortField: "offer_name",
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
            Offer Name
            <DropDrown
              name="offer_name"
              icon={
                filter?.sortField &&
                  filter.sortField === "offer_name" &&
                  filter.sortBy !== "asc" ? (
                  <BsSortAlphaDownAlt color={theme.palette.common.black} size={15} />
                ) : (
                  <BsSortAlphaDown color={theme.palette.common.black} size={15} />
                )
              }
              onSelect={handleFilter}
              options={nameFilter}
              value={filter?.sortField &&
                filter.sortField === "offer_name" ?
                filter.sortBy : ""}
            />
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            Offer Code
            <DropDrown
              name="offer_code"
              icon={
                filter?.sortField &&
                  filter.sortField === "offer_code" &&
                  filter.sortBy !== "asc" ? (
                  <BsSortAlphaDownAlt color={theme.palette.common.black} size={15} />
                ) : (
                  <BsSortAlphaDown color={theme.palette.common.black} size={15} />
                )
              }
              onSelect={handleFilter}
              options={nameFilter}
              value={filter?.sortField &&
                filter.sortField === "offer_code" ?
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
      {offers.length > 0 ? offers.map((offer, offerIndex) => (
        <div
          key={offerIndex}
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
            {offersPerPage * (currentPage - 1) + offerIndex + 1}
          </div>
          <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
            {offer.offer_name}
          </div>
          <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
            {offer.offer_code}
          </div>
          <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
            {offer.is_active ? "Active" : "Inactive"}
          </div>
          <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
            {permission?.can_read ? <IconButton
              size="small"
              onClick={() => viewOffer(offer._id)}
              style={{ color: theme.palette.info.main }}
            >
              <FaEye />
            </IconButton> : ''}
            {permission?.can_update ? <IconButton
              size="small"
              onClick={() => editOffer(offer._id)}
              style={{ color: theme.palette.warning.main }}
            >
              <AiFillEdit />
            </IconButton> : ''}
            {permission?.can_delete ? <IconButton
              size="small"
              onClick={() => deleteOffer(offer._id)}
              style={{ color: theme.palette.error.main }}
            >
              <MdDelete />
            </IconButton> : ''}
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
          No Offer Found
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalItems={totalDocs}
        itemsPerPage={offersPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setOffersPerPage}
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

export default ListOffers;
