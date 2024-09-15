import { Box, Button, Card, CardContent, Grid, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import FilledInput from '../../Basic/FilledInput';
import { startLoading, stopLoading } from '../../../redux/slices/loadingSlice';
import { showErrorMessage } from '../../../helpers/notificationService';
import axiosInstance from '../../../config/AxiosConfig';
import AxiosInstancePaths from '../../../config/AxiosInstancePaths';
import ImageWithPreview from '../../Basic/ImagePreview';
import html2pdf from 'html2pdf.js';
import { snakeToTitleCase } from '../../../helpers';

function ViewBill() {
    const [bill, setBill] = useState();
    const [billInfo, setBillInfo] = useState()
    const { id } = useParams();
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const fetchBillData = async () => {
        try {
            dispatch(startLoading());
            const response = await axiosInstance.get(
                AxiosInstancePaths.Bills.GET_BY_ID + id
            );
            if (response.data?.payload) {
                setBill(response.data?.payload?.result);
                setBillInfo(response.data?.payload?.bill);
            }
            dispatch(stopLoading());
        } catch (error) {
            console.log(error);
            showErrorMessage(error?.response?.data?.message);
            dispatch(stopLoading());
        }
    };

    const downloadBill = async () => {
        try {
            dispatch(startLoading());

            const response = await axiosInstance.get(AxiosInstancePaths.Bills.DOWNLOAD_BILL + id, {
                responseType: 'text',
            });

            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = response.data;

            const opt = {
                margin: 0.1,
                filename: 'bill.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            // Convert and download the PDF
            html2pdf().from(tempContainer).set(opt).save();

            dispatch(stopLoading());
        } catch (error) {
            console.log(error);
            showErrorMessage(error?.response?.data?.message);
            dispatch(stopLoading());
        }
    }

    useEffect(() => {
        fetchBillData();
        // eslint-disable-next-line
    }, [id]);


    return (
        <Grid container spacing={2} alignItems="stretch" justifyContent={'end'}>
            <Grid item xs={12} >
                <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent style={{ flex: 1 }}>
                        <Typography variant="h4" style={{ fontWeight: "bold", }}>
                            Invoice No : {bill?.invoice_id}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent style={{ flex: 1 }}>
                        <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: '0.75rem' }} sx={{ marginBottom: "0.5rem" }}>
                            Buyer Details
                        </Typography>
                        <p>Name: {billInfo?.sellerName}</p>
                        <p>Address: {billInfo?.sellerAddress}</p>
                        <p>Email: {billInfo?.sellerEmail}</p>
                        <p>Phone: {billInfo?.sellerPhone}</p>
                        <p>GST No.: {billInfo?.sellerGST}</p>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent style={{ flex: 1 }}>
                        <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: '0.75rem' }} sx={{ marginBottom: "0.5rem" }}>
                            Seller Details
                        </Typography>
                        <p>Name: {billInfo?.buyerName}</p>
                        <p>Address: {billInfo?.buyerAddress}</p>
                        <p>Email: {billInfo?.buyerEmail}</p>
                        <p>Phone: {billInfo?.buyerPhone}</p>
                        <p>GST No.: {billInfo?.buyerGST}</p>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} >
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
                            Item Name
                        </div>
                        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            Product Code
                        </div>
                        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            Man. Date
                        </div>
                        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            Exe. Date
                        </div>
                        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            Quantity
                        </div>
                        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            Rate
                        </div>
                        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            GST Rate
                        </div>
                        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            GST Amount
                        </div>
                        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            Discount
                        </div>
                    </div>
                </div>
                {billInfo?.items?.length > 0 ? billInfo?.items?.map((item, itemIndex) => (
                    <div
                        key={itemIndex}
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
                            {item.product_name}
                        </div>
                        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {item.product_code}
                        </div>
                        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {item.manufacture_date}
                        </div>
                        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {item.expiry_date}
                        </div>
                        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {item.quantity}
                        </div>
                        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {item.rate}
                        </div>
                        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {item.gstRate}
                        </div>
                        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {item.gstAmount}
                        </div>
                        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {item.discount}
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
                        No Products Found
                    </div>
                )}
            </Grid>

            <Grid item xs={12} >
                <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent style={{ flex: 1, textAlign: 'right' }}>
                        <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: '0.75rem' }} sx={{ marginBottom: "0.5rem" }}>
                            Amount Details
                        </Typography>
                        <p>Order Amount: {billInfo?.order_amount}</p>
                        <p>Discount Amount: {billInfo?.discount_amount}</p>
                        <p>Tax Amount: {billInfo?.tax_amount}</p>
                        <p>Billing Amount: {billInfo?.billing_amount}</p>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6}>
                <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent style={{ flex: 1 }}>
                        <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: '0.75rem' }} sx={{ marginBottom: "0.5rem" }}>
                            Basic Info
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <FilledInput label="payment_status" value={snakeToTitleCase(bill?.payment_status) || "Not Set"} disabled />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FilledInput label="createdAt" value={bill?.createdAt ? new Date(bill.createdAt).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                }) : "Not Set"} disabled />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FilledInput label="payment_method" value={snakeToTitleCase(bill?.payment_method) || "Not Set"} disabled />
                            </Grid>
                        </Grid>
                        <Box sx={{ display: "flex", justifyContent: "center", margin: "1rem 0px" }}>
                            <ImageWithPreview
                                src={bill?.payment_details ? AxiosInstancePaths.base_url + bill?.payment_details : ""}
                                alt="User Profile"
                                height="145px"
                                width="145px"
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            {/* Back Button */}
            <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: '1rem' }}>
                    <Button
                        variant="contained"
                        sx={{
                            color: theme.palette.common.white,
                            width: "max-content",
                            backgroundColor: theme.palette.warning.main,
                            "&:hover": {
                                backgroundColor: theme.palette.warning.main,
                            },
                        }}
                        onClick={() => window.history.back()}
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            color: theme.palette.common.white,
                            width: "max-content",
                            backgroundColor: theme.palette.success.main,
                            "&:hover": {
                                backgroundColor: theme.palette.success.main,
                            },
                        }}
                        onClick={downloadBill}
                    >
                        Download Pdf
                    </Button>
                    {bill?.order_id ? <Button
                        variant="contained"
                        sx={{
                            color: theme.palette.common.white,
                            width: "max-content",
                            backgroundColor: theme.palette.secondary.main,
                            "&:hover": {
                                backgroundColor: theme.palette.secondary.main,
                            },
                        }}
                        onClick={() => navigate(`/orders/edit/${bill?.order_id}`)}
                    >
                        View Order
                    </Button> : ""}
                </Box>
            </Grid>
        </Grid>
    )
}

export default ViewBill
