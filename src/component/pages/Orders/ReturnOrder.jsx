import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../config/AxiosConfig';
import AxiosInstancePaths from '../../../config/AxiosInstancePaths';
import { showErrorMessage, showSuccessMessage } from '../../../helpers/notificationService';
import { startLoading, stopLoading } from '../../../redux/slices/loadingSlice';
import { useDispatch } from 'react-redux';
import { Box, Button, Card, CardContent, Grid, Typography, useTheme } from '@mui/material';
import { returnOrderSchema, validateSchema } from '../../../validation/validationSchema';
import TextInput from '../../Form/TextInput';


function ReturnOrder() {
    const { id } = useParams();
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [order, setOrder] = useState({});
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();

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

    const fetchOrderData = async () => {
        try {
            dispatch(startLoading());
            const response = await axiosInstance.get(
                AxiosInstancePaths.Orders.GET_BY_ID + id
            );
            if (response.data?.payload) {
                setOrder(response.data?.payload?.result);
            }
            dispatch(stopLoading());
        } catch (error) {
            console.log(error);
            showErrorMessage(error?.response?.data?.message);
            dispatch(stopLoading());
        }
    };

    const fetchProductsData = async () => {
        try {
            let query = {
                pagination: false,
                // in_stock: true,
                // is_active: true,
                // is_verified: true,
            };
            const queryString = new URLSearchParams(query).toString();

            dispatch(startLoading());
            const response = await axiosInstance.get(
                AxiosInstancePaths.Products.GET_LIST + `?${queryString}`
            );
            if (response.data?.payload) {
                setProducts(response.data?.payload?.result?.data);
            }
            dispatch(stopLoading());
        } catch (error) {
            console.log(error);
            showErrorMessage(error?.response?.data?.message);
            dispatch(stopLoading());
        }
    };



    const returnOrder = async () => {
        try {
            const isValid = await validateSchema(returnOrderSchema, formData, setErrors);
            if (!isValid) {
                return;
            }

            dispatch(startLoading());
            const response = await axiosInstance.post(
                AxiosInstancePaths.Orders.ADD_RETURN + id,
                {},
                {
                    params: {
                        payload: JSON.stringify(formData)
                    },
                }
            );
            showSuccessMessage(response?.data?.message);
            dispatch(stopLoading());
            navigate('/orders')
        } catch (error) {
            console.log(error);
            showErrorMessage(error?.response?.data?.message);
            dispatch(stopLoading());
        }
    };

    async function fetchAllData() {
        await fetchProductsData();
        await fetchOrderData();
    }

    useEffect(() => {
        fetchAllData()
        // eslint-disable-next-line
    }, [id]);

    return (
        <Grid container spacing={2} alignItems="stretch" justifyContent="end">
            <Grid item xs={12} md={6}>
                <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent style={{ flex: 1 }}>
                        <Typography variant="h4" style={{ fontWeight: "bold" }} sx={{ marginBottom: "0.5rem" }}>
                            Order Details
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextInput
                                    name="Reason"
                                    defaultValue={formData?.reason}
                                    error={errors?.reason?.message}
                                    startEdit={true}
                                    handleChange={(name, value) => handleSelectChange('reason', value)}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4" style={{ fontWeight: "bold" }} sx={{ marginBottom: "1rem" }}>
                    Ordered Products
                </Typography>
                <div style={{ width: "100%" }}>
                    <div style={{
                        fontWeight: "bold",
                        color: theme.palette.text.primary,
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "15px",
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: "10px",
                        boxShadow: theme.shadows[1],
                    }}>
                        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            Product Name
                        </div>
                        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            Quantity
                        </div>
                        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            Total Amount
                        </div>
                        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            Offer Discount
                        </div>
                        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            Gst Rate
                        </div>
                    </div>
                </div>
                {order?.products?.length > 0 ? order?.products
                    .map((item, index) => (
                        <div
                            key={index}
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
                                {
                                    products.find(
                                        (product) => product._id === item.product_id
                                    )?.product_name
                                }
                            </div>

                            <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
                                {item.quantity}
                            </div>
                            <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
                                {item?.total_amount}
                            </div>
                            <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
                                {item?.offer_discount}
                            </div>
                            <div style={{ flex: 1, display: "flex", gap: '0.2rem', justifyContent: "center", alignItems: "center" }}>
                                {item.gst_rate}%
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
                        No Products Added
                    </div>
                )}
            </Grid>
            <Grid item xs={12}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "1rem",
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            color: theme.palette.common.white,
                            width: "max-content",
                            backgroundColor: theme.palette.error.main,
                            "&:hover": {
                                backgroundColor: theme.palette.error.main,
                            },
                        }}
                        onClick={() => navigate("/orders")}
                    >
                        Cancel
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
                        onClick={returnOrder}
                    >
                        Create Order
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default ReturnOrder
