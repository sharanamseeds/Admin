import React, { useCallback, useEffect, useRef, useState } from "react";
import { IconButton, useTheme } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Pagination from "../../Basic/Pagination";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import axiosInstance from "../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../config/AxiosInstancePaths";
import { useDispatch } from "react-redux";
import { showErrorMessage, showSuccessMessage } from "../../../helpers/notificationService";
import TableHeaderPart from "../../Basic/TableHeaderPart";
import DropDrown from "../../Basic/DropDrown";
import { nameFilter } from "../../../constant/Options";
import { BsSortAlphaDown, BsSortAlphaDownAlt } from "react-icons/bs";
import ConfirmationDialog from "../../Basic/ConfirmationDialog";

function LanguageList({ permission }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [languagesPerPage, setLanguagesPerPage] = useState(5);
  const [languages, setLanguages] = useState([]);

  const [totalDocs, setTotalDocs] = useState(0);

  const [filter, setFilter] = useState({
    sortField: "lang_name",
    sortBy: "asc",
  });


  const fetchLanguageData = async (search) => {
    try {

      let queryFields = { ...filter }
      delete queryFields.sortBy
      delete queryFields.sortField

      let query = {
        limit: languagesPerPage,
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
        `${AxiosInstancePaths.Languages.GET_LIST}?${queryString}`
      );
      if (response.data?.payload) {
        setCurrentPage(response.data?.payload?.result?.meta?.currentPage);
        setLanguagesPerPage(response.data?.payload?.result?.meta?.limit)
        setTotalDocs(response.data?.payload?.result?.meta?.docsFound)
        setLanguages(response.data?.payload?.result?.data);
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


  const debouncedFetchUserList = useDebounce(fetchLanguageData, 500);

  const handleSearchChange = (value) => {
    const newSearchTerm = value;
    debouncedFetchUserList(newSearchTerm);
  };

  const handleFilter = (name, value) => {
    if (name === "lang_name" || name === "lang_code") {
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

  const deleteLanguage = async (id) => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.delete(
        AxiosInstancePaths.Languages.DELETE_BY_ID + id
      );
      showSuccessMessage(response?.data?.message);
      dispatch(stopLoading());
      fetchLanguageData();
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  const editLanguage = (id) => {
    navigate(`/languages/edit/${id}`);
  };

  const viewLanguage = (id) => {
    navigate(`/languages/view/${id}`);
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null)

  const handleOpenDialog = (id) => {
    setDeleteId(id)
    setDialogOpen(true)
  };
  const handleCloseDialog = () => setDialogOpen(false);
  const handleConfirm = () => {
    deleteLanguage(deleteId)
  };


  useEffect(() => {
    fetchLanguageData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchLanguageData();
    // eslint-disable-next-line
  }, [filter, languagesPerPage, currentPage]);

  return (
    <div>
      <ConfirmationDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        message="Are you sure you want to delete language?"
        onConfirm={handleConfirm}
      />
      <TableHeaderPart
        addText={permission?.can_add ? "Add Language" : null}
        title="Languages"
        searchText="Search by language name"
        handleAdd={() => navigate("/languages/add")}
        handleSearch={handleSearchChange}
        isClear={true}
        onClear={() => {
          setFilter({
            sortField: "lang_name",
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
            Language Name
            <DropDrown
              name="lang_name"
              icon={
                filter?.sortField &&
                  filter.sortField === "lang_name" &&
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
            Language Code
            <DropDrown
              name="lang_code"
              icon={
                filter?.sortField &&
                  filter.sortField === "lang_code" &&
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
      {languages.length > 0 ? languages.map((language, languageIndex) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px",
            marginTop: "1rem",
            backgroundColor: theme.palette.background.paper,
            borderRadius: "10px",
            boxShadow: theme.shadows[1],
          }}
          key={languageIndex}
        >
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            {languagesPerPage * (currentPage - 1) + languageIndex + 1}
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            {language.lang_name}
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            {language.lang_code}
          </div>


          <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
            {permission?.can_read ? <IconButton
              size="small"
              onClick={() => viewLanguage(language._id)}
              style={{ color: theme.palette.info.main }}
            >
              <FaEye />
            </IconButton> : ''}
            {permission?.can_update ? <IconButton
              size="small"
              onClick={() => editLanguage(language._id)}
              style={{ color: theme.palette.warning.main }}
            >
              <AiFillEdit />
            </IconButton> : ''}
            {permission?.can_delete ? <IconButton
              size="small"
              onClick={() => handleOpenDialog(language._id)}
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
          No Language Found
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalItems={totalDocs}
        itemsPerPage={languagesPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setLanguagesPerPage}
      />
    </div>
  );
}

export default LanguageList;
