import { Box, Button, Card, CardContent, Grid, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import FilledInput from '../../Basic/FilledInput';
import { startLoading, stopLoading } from '../../../redux/slices/loadingSlice';
import { showErrorMessage } from '../../../helpers/notificationService';
import axiosInstance from '../../../config/AxiosConfig';
import AxiosInstancePaths from '../../../config/AxiosInstancePaths';

function ViewLedger() {
    const [ledger, setLedger] = useState();
    const { id } = useParams();
    const theme = useTheme();
    const dispatch = useDispatch();

    const fetchLedgerData = async () => {
        try {
            dispatch(startLoading());
            const response = await axiosInstance.get(
                AxiosInstancePaths.Ledgers.GET_BY_ID + id
            );
            if (response.data?.payload) {
                setLedger(response.data?.payload?.result);
            }
            dispatch(stopLoading());
        } catch (error) {
            console.log(error);
            showErrorMessage(error?.response?.data?.message);
            dispatch(stopLoading());
        }
    };

    useEffect(() => {
        fetchLedgerData();
        // eslint-disable-next-line
    }, [id]);


    return (
        <Grid container spacing={2} alignItems="stretch" justifyContent={'end'}>
            <Grid item xs={12} md={6}>
                <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent style={{ flex: 1 }}>
                        <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: '0.75rem' }} sx={{ marginBottom: "0.5rem" }}>
                            Ledger Details
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <FilledInput label="invoice" value={ledger?.invoice_id || "Not Set"} disabled />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FilledInput label="bill_amount" value={ledger?.bill_amount || "Not Set"} disabled />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FilledInput label="payment_amount" value={ledger?.payment_amount || "Not Set"} disabled />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FilledInput label="type" value={ledger?.type || "Not Set"} disabled />
                            </Grid>

                        </Grid>
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
                </Box>
            </Grid>
        </Grid>
    )
}

export default ViewLedger
