import { Box, Button, Card, CardContent, Grid, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import FilledInput from '../../Basic/FilledInput';
import { startLoading, stopLoading } from '../../../redux/slices/loadingSlice';
import { showErrorMessage, showSuccessMessage } from '../../../helpers/notificationService';
import axiosInstance from '../../../config/AxiosConfig';
import AxiosInstancePaths from '../../../config/AxiosInstancePaths';
import ImageWithPreview from '../../Basic/ImagePreview';
import { saveAs } from 'file-saver'; // You'll need to install this package
import { billStatus, paymentMethodsOption } from '../../../constant/Options';
import FileUpload from '../../Form/FileUpload';
import SelectInput from '../../Form/SelectInput';
import { billSchema, validateSchema } from '../../../validation/validationSchema';
import { objectToFormData } from '../../../helpers';

function EditBill() {
    const [bill, setBill] = useState();
    const { id } = useParams();
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});


    const handleSelectChange = (name, value) => {
        const keys = name.split(".");
        setFormData((prevData) => {
            let newData = { ...prevData };
            let current = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                current[keys[i]] = current[keys[i]] || {};
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return newData;
        });

        setErrors((prevErrors) => {
            let newErrors = { ...prevErrors };
            let current = newErrors;
            for (let i = 0; i < keys.length - 1; i++) {
                current[keys[i]] = current[keys[i]] || {};
                current = current[keys[i]];
            }
            delete current[keys[keys.length - 1]];
            return newErrors;
        });
    };

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
                responseType: 'blob', // Important: This tells Axios to expect a binary response
            });

            // Create a Blob from the response data
            const blob = new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });

            // Use file-saver to save the file
            saveAs(blob, 'bill.pdf');

            dispatch(stopLoading());
        } catch (error) {
            console.log(error);
            showErrorMessage(error?.response?.data?.message);
            dispatch(stopLoading());
        }
    }

    const updateBill = async () => {
        try {
            const isValid = await validateSchema(billSchema, formData, setErrors);
            if (!isValid) {
                return;
            }
            if (formData.payment_status === 'paid') {
                if (!formData?.payment_details || formData.payment_details.length === 0) {
                    const newErrors = {
                        ...errors,
                        payment_details: { message: 'Payment details required' }
                    };
                    setErrors(newErrors);
                    return;
                }
                if (!formData?.payment_method) {
                    const newErrors = {
                        ...errors,
                        payment_method: { message: 'Payment method is required' }
                    };
                    setErrors(newErrors);
                    return;
                }
            }
            dispatch(startLoading());

            const newFormData = new FormData();
            let documents = {}
            let tempFormData = { ...formData };

            if (formData?.payment_details) {
                documents.payment_details = formData.payment_details;
                delete tempFormData.payment_details;
            }

            objectToFormData(newFormData, documents);

            const response = await axiosInstance.put(
                AxiosInstancePaths.Bills.UPDATE_BY_ID + id,
                newFormData, {
                params: {
                    payload: JSON.stringify(tempFormData)
                },
            }
            );
            showSuccessMessage(response?.data?.message);
            dispatch(stopLoading());
            navigate('/bills')
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
                                <FilledInput label="createdAt" value={bill?.createdAt ? new Date(bill.createdAt).toLocaleDateString() : "Not Set"} disabled />
                            </Grid>
                            <Grid item xs={12} md={6} >
                                <SelectInput
                                    name="payment_status"
                                    startEdit={true}
                                    defaultValue={formData?.payment_status}
                                    error={errors?.payment_status?.message}
                                    options={billStatus}
                                    handleChange={handleSelectChange}
                                    seperatedLabel={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} >
                                <SelectInput
                                    name="payment_method"
                                    startEdit={true}
                                    defaultValue={formData?.payment_method}
                                    error={errors?.payment_method?.message}
                                    options={paymentMethodsOption}
                                    handleChange={handleSelectChange}
                                    seperatedLabel={true}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} display="flex" flexDirection="column" alignItems="center">
                                <ImageWithPreview
                                    src={formData?.payment_details?.length > 0
                                        ? URL.createObjectURL(formData.payment_details[0]) : ""}
                                    alt="payment_details"
                                    height="102px"
                                    width="102px"
                                />
                            </Grid>
                            <Grid item xs={12} md={6} lg={6} sm={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
                                <div >
                                    <FileUpload
                                        inputName="payment_details"
                                        defaultFiles={formData.payment_details}
                                        error={errors?.payment_details?.message}
                                        handleChange={handleSelectChange}
                                    />
                                </div>
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
                            backgroundColor: theme.palette.primary.main,
                            "&:hover": {
                                backgroundColor: theme.palette.primary.main,
                            },
                        }}
                        onClick={updateBill}
                    >
                        Save
                    </Button>
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

export default EditBill
