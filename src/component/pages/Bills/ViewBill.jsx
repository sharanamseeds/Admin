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

function ViewBill() {
    const [bill, setBill] = useState();
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
            <Grid item xs={12} md={6}>
                <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent style={{ flex: 1 }}>
                        <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: '0.75rem' }} sx={{ marginBottom: "0.5rem" }}>
                            Bill Details
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <FilledInput label="invoice" value={bill?.invoice_id || "Not Set"} disabled />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FilledInput label="order_amount" value={bill?.order_amount || "Not Set"} disabled />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FilledInput label="bill_amount" value={bill?.bill_amount || "Not Set"} disabled />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FilledInput label="tax_amount" value={bill?.tax_amount || "Not Set"} disabled />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FilledInput label="discount_amount" value={bill?.discount_amount || "Not Set"} disabled />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FilledInput label="payment_status" value={bill?.payment_status || "Not Set"} disabled />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FilledInput label="createdAt" value={bill?.createdAt ? new Date(bill.createdAt).toLocaleDateString() : "Not Set"} disabled />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FilledInput label="payment_method" value={bill?.payment_method || "Not Set"} disabled />
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
