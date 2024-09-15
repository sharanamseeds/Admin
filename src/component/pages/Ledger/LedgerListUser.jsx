import React, { useCallback, useEffect, useRef, useState } from "react";
import { Grid, IconButton, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaEye, FaFilter } from "react-icons/fa";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../config/AxiosInstancePaths";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import { showErrorMessage } from "../../../helpers/notificationService";
import DropDrown from "../../Basic/DropDrown";
import { ledgerStatus, nameFilter } from "../../../constant/Options";
import { BsSortAlphaDown, BsSortAlphaDownAlt } from "react-icons/bs";
import Pagination from "../../Basic/Pagination";
import { createProductOptions, snakeToTitleCase } from "../../../helpers";
import SelectInput from "../../Form/SelectInput";
import TableHeaderPart from "../../Basic/TableHeaderPart";


function LedgerListUser({ permission }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ledgers, setLedgers] = useState([]);
    const theme = useTheme();

    const [userId, setUserId] = useState();
    const [users, setUsers] = useState([]);
    const [ledgersPerPage, setledgersPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalDocs, setTotalDocs] = useState(0);

    const [filter, setFilter] = useState({
        sortField: "createdAt",
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

    const fetchLedgerList = async (search) => {

        if (userId) {
            try {
                let queryFields = { ...filter }
                delete queryFields.sortBy
                delete queryFields.sortField

                let query = {
                    limit: ledgersPerPage,
                    page: currentPage,
                    user_id: userId,
                    sortBy: filter.sortField,
                    sortOrder: filter.sortBy,
                    ...queryFields
                };
                if (search) {
                    query.search = search;
                }
                const queryString = new URLSearchParams(query).toString();

                dispatch(startLoading());
                const response = await axiosInstance.get(`${AxiosInstancePaths.Ledgers.GET_LIST}?${queryString}`
                );
                if (response.data?.payload) {
                    setCurrentPage(response.data?.payload?.result?.meta?.currentPage);
                    setledgersPerPage(response.data?.payload?.result?.meta?.limit)
                    setTotalDocs(response.data?.payload?.result?.meta?.docsFound)
                    setLedgers(response.data?.payload?.result?.data);
                }
                dispatch(stopLoading());
            } catch (error) {
                console.log(error);
                showErrorMessage(error?.response?.data?.message);
                dispatch(stopLoading());
            }
        }
    }

    const debouncedFetchUserList = useDebounce(fetchLedgerList, 500);

    const handleSearchChange = (value) => {
        const newSearchTerm = value;
        debouncedFetchUserList(newSearchTerm);
    };

    const handleFilter = (name, value) => {
        if (name === "invoice_id" || name === "bill_amount" || name === "payment_amount" || name === "createdAt") {
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

    const viewLedger = (id) => {
        navigate(`/ledgers/view/${id}`);
    };


    const fetchUserList = async () => {
        try {
            dispatch(startLoading());
            const response = await axiosInstance.get(
                AxiosInstancePaths.Users.GET_LIST + `?pagination=false`
            );
            if (response.data?.payload) {
                setUsers(response.data?.payload?.result?.data);
            }
            dispatch(stopLoading());
        } catch (error) {
            console.log(error);
            showErrorMessage(error?.response?.data?.message);
            dispatch(stopLoading());
        }
    }


    useEffect(() => {
        fetchUserList()
        fetchLedgerList();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        fetchLedgerList();
        // eslint-disable-next-line
    }, [filter, userId])

    return (
        <div>
            <h2 style={{ color: theme.palette.common.black, margin: "0px" }}>User Ledgers</h2>
            <Grid container spacing={2} style={{ marginBottom: '0.5rem' }}>
                <Grid item xs={6} >
                    <SelectInput
                        name="user_id"
                        defaultValue={userId}
                        startEdit={true}
                        options={createProductOptions(users, "name")}
                        handleChange={(name, value) => setUserId(value)}
                    />
                </Grid>
                {/* <Grid item xs={12} md={6} lg={6} sm={12}>
                <SelectInput
                  name="status"
                  error={errors?.status?.message}
                  startEdit={true}
                  options={statusOption}
                  handleChange={handleSelectChange}
                />
              </Grid> */}
            </Grid>
            <TableHeaderPart
                // addText="View User Ledger"
                title="Ledgers"
                searchText="Search by Invoice or Type"
                // handleAdd={() => navigate("/ledgers/user")}
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
                        Sr. No.
                    </div>
                    <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        Invoice Id
                        <DropDrown
                            name="invoice_id"
                            icon={
                                filter?.sortField &&
                                    filter.sortField === "invoice_id" &&
                                    filter.sortBy !== "asc" ? (
                                    <BsSortAlphaDownAlt color={theme.palette.common.black} size={15} />
                                ) : (
                                    <BsSortAlphaDown color={theme.palette.common.black} size={15} />
                                )
                            }
                            onSelect={handleFilter}
                            options={nameFilter}
                            value={filter?.sortField &&
                                filter.sortField === "invoice_id" ?
                                filter.sortBy : ""}
                        />
                    </div>
                    <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        Type
                        <DropDrown
                            name="type"
                            icon={<FaFilter color="#0B476D" size={12} />}
                            value={"type" in filter ? filter.type || "false" : ""}
                            onSelect={handleFilter}
                            options={ledgerStatus}
                        />
                    </div>
                    <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        Ledger Amount
                        <DropDrown
                            name="payment_amount"
                            icon={
                                filter?.sortField &&
                                    filter.sortField === "payment_amount" &&
                                    filter.sortBy !== "asc" ? (
                                    <BsSortAlphaDownAlt color={theme.palette.common.black} size={15} />
                                ) : (
                                    <BsSortAlphaDown color={theme.palette.common.black} size={15} />
                                )
                            }
                            onSelect={handleFilter}
                            options={nameFilter}
                            value={filter?.sortField &&
                                filter.sortField === "payment_amount" ?
                                filter.sortBy : ""}
                        />
                    </div>
                    <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        Bill Amount
                        <DropDrown
                            name="bill_amount"
                            icon={
                                filter?.sortField &&
                                    filter.sortField === "bill_amount" &&
                                    filter.sortBy !== "asc" ? (
                                    <BsSortAlphaDownAlt color={theme.palette.common.black} size={15} />
                                ) : (
                                    <BsSortAlphaDown color={theme.palette.common.black} size={15} />
                                )
                            }
                            onSelect={handleFilter}
                            options={nameFilter}
                            value={filter?.sortField &&
                                filter.sortField === "bill_amount" ?
                                filter.sortBy : ""}
                        />
                    </div>
                    <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        Action
                    </div>
                </div>
            </div>
            {ledgers.length > 0 ? ledgers.map((bill, billIndex) => (
                <div
                    key={billIndex}
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
                        {ledgersPerPage * (currentPage - 1) + billIndex + 1}
                    </div>
                    <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
                        {bill.invoice_id}
                    </div>
                    <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
                        {snakeToTitleCase(bill?.type)}
                    </div>
                    <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
                        {bill.payment_amount}
                    </div>
                    <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
                        {bill.bill_amount}
                    </div>
                    <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
                        {permission?.can_read ? <IconButton
                            size="small"
                            onClick={() => viewLedger(bill._id)}
                            style={{ color: theme.palette.info.main }}
                        >
                            <FaEye />
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
                    No Ledgers Found
                </div>
            )}
            <Pagination
                currentPage={currentPage}
                totalItems={totalDocs}
                itemsPerPage={ledgersPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setledgersPerPage}
            />
        </div>
    )
}

export default LedgerListUser
