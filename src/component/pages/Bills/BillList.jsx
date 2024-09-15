import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, IconButton, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaEye, FaFilter } from "react-icons/fa";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../config/AxiosInstancePaths";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import { showErrorMessage } from "../../../helpers/notificationService";
import TableHeaderPart from "../../Basic/TableHeaderPart";
import DropDrown from "../../Basic/DropDrown";
import { billStatus, nameFilter } from "../../../constant/Options";
import { BsSortAlphaDown, BsSortAlphaDownAlt } from "react-icons/bs";
import Pagination from "../../Basic/Pagination";
import { saveAs } from 'file-saver'; // You'll need to install this package
import { AiFillEdit } from "react-icons/ai";
import { snakeToTitleCase } from "../../../helpers";

function BillList({ permission }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [bills, setBills] = useState([]);
    const theme = useTheme();

    const [billsPerPage, setbillsPerPage] = useState(5);
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

    const fetchBillList = async (search) => {
        try {

            let queryFields = { ...filter }
            delete queryFields.sortBy
            delete queryFields.sortField

            let query = {
                limit: billsPerPage,
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
            const response = await axiosInstance.get(`${AxiosInstancePaths.Bills.GET_LIST}?${queryString}`
            );
            if (response.data?.payload) {
                setCurrentPage(response.data?.payload?.result?.meta?.currentPage);
                setbillsPerPage(response.data?.payload?.result?.meta?.limit)
                setTotalDocs(response.data?.payload?.result?.meta?.docsFound)
                setBills(response.data?.payload?.result?.data);
            }
            dispatch(stopLoading());
        } catch (error) {
            console.log(error);
            showErrorMessage(error?.response?.data?.message);
            dispatch(stopLoading());
        }
    }

    const debouncedFetchUserList = useDebounce(fetchBillList, 500);

    const handleSearchChange = (value) => {
        const newSearchTerm = value;
        debouncedFetchUserList(newSearchTerm);
    };

    const handleFilter = (name, value) => {
        if (name === "invoice_id" || name === "order_amount" || name === "bill_amount" || name === "createdAt") {
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

    const viewBill = (id) => {
        navigate(`/bills/view/${id}`);
    };
    const editBill = (id) => {
        navigate(`/bills/edit/${id}`);
    };

    const downloadExcel = async () => {
        try {
            dispatch(startLoading());

            // Send the request to download the Excel file
            const response = await axiosInstance.get(AxiosInstancePaths.Bills.DOWNLOAD_EXCEL, {
                responseType: 'blob', // Important: This tells Axios to expect a binary response
            });

            // Create a Blob from the response data
            const blob = new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });

            // Use file-saver to save the file
            saveAs(blob, 'bills.xlsx');

            dispatch(stopLoading());
        } catch (error) {
            console.log(error);
            showErrorMessage(error?.response?.data?.message);
            dispatch(stopLoading());
        }
    }

    useEffect(() => {
        fetchBillList();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        fetchBillList();
        // eslint-disable-next-line
    }, [filter, billsPerPage, currentPage])

    return (
        <div>
            <TableHeaderPart
                title="Bills"
                searchText="Search by Invoice or Status"
                handleAdd={() => navigate("/bills/add")}
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
                        Payment Status
                        <DropDrown
                            name="payment_status"
                            onSelect={handleFilter}
                            options={billStatus}
                            icon={<FaFilter color="#0B476D" size={12} />}
                            value={"payment_status" in filter ? filter.payment_status || "false" : ""}
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
                        Order Amount
                        <DropDrown
                            name="order_amount"
                            icon={
                                filter?.sortField &&
                                    filter.sortField === "order_amount" &&
                                    filter.sortBy !== "asc" ? (
                                    <BsSortAlphaDownAlt color={theme.palette.common.black} size={15} />
                                ) : (
                                    <BsSortAlphaDown color={theme.palette.common.black} size={15} />
                                )
                            }
                            onSelect={handleFilter}
                            options={nameFilter}
                            value={filter?.sortField &&
                                filter.sortField === "order_amount" ?
                                filter.sortBy : ""}
                        />
                    </div>
                    <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        Created At
                        <DropDrown
                            name="createdAt"
                            icon={
                                filter?.sortField &&
                                    filter.sortField === "createdAt" &&
                                    filter.sortBy !== "asc" ? (
                                    <BsSortAlphaDownAlt color={theme.palette.common.black} size={15} />
                                ) : (
                                    <BsSortAlphaDown color={theme.palette.common.black} size={15} />
                                )
                            }
                            onSelect={handleFilter}
                            options={nameFilter}
                            value={filter?.sortField &&
                                filter.sortField === "createdAt" ?
                                filter.sortBy : ""}
                        />
                    </div>
                    <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        Action
                    </div>
                </div>
            </div>
            {bills.length > 0 ? bills.map((bill, billIndex) => (
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
                        {billsPerPage * (currentPage - 1) + billIndex + 1}
                    </div>
                    <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
                        {bill.invoice_id}
                    </div>
                    <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
                        {snakeToTitleCase(bill.payment_status)}
                    </div>
                    <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
                        {bill.bill_amount}
                    </div>
                    <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
                        {bill.order_amount}
                    </div>
                    <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
                        {new Date(bill.createdAt).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        })}
                    </div>
                    <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>

                        {permission?.can_read ? <IconButton
                            size="small"
                            onClick={() => viewBill(bill._id)}
                            style={{ color: theme.palette.info.main }}
                        >
                            <FaEye />
                        </IconButton> : ''}

                        {permission?.can_update && bill.payment_status !== "paid" ?
                            <IconButton
                                size="small"
                                onClick={() => editBill(bill._id)}
                                style={{ color: theme.palette.warning.main }}
                            >
                                <AiFillEdit />
                            </IconButton>
                            : ''}
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
                    No Bills Found
                </div>
            )}
            <Pagination
                currentPage={currentPage}
                totalItems={totalDocs}
                itemsPerPage={billsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setbillsPerPage}
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
    )
}

export default BillList
