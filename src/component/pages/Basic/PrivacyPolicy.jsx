import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const PrivacyPolicy = () => {


    return (
        <Container style={{ padding: '2rem', maxWidth: '100%' }}>
            {/* Header Section */}
            <Box textAlign="center" marginBottom={4}>
                <Typography variant="h4" component="h1" gutterBottom style={{ fontWeight: 'bold' }}>
                    Privacy Policy
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    Effective Date: [Insert Date]
                </Typography>
            </Box>

            {/* Content Section */}
            <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
                <Box marginBottom={3}>
                    <Typography variant="h6" gutterBottom>
                        1. Introduction
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Welcome to [App Name] ("we", "our", "us"). Your privacy is important to us, and we are
                        committed to protecting your personal data. This Privacy Policy explains how we collect,
                        use, and share information when you use our mobile application, [App Name] (the "App").
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        By using our App, you agree to the terms of this Privacy Policy. If you do not agree with
                        this Privacy Policy, please do not use our App.
                    </Typography>
                </Box>

                <Box marginBottom={3}>
                    <Typography variant="h6" gutterBottom>
                        2. Information We Collect
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        We may collect the following types of information when you use our App:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ marginLeft: '16px' }}>
                        a. Personal Information:
                        <ul>
                            <li>Name</li>
                            <li>Email address</li>
                            <li>Phone number</li>
                            <li>Address (for delivery purposes)</li>
                            <li>Payment information (collected by third-party payment processors)</li>
                        </ul>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ marginLeft: '16px' }}>
                        b. Usage Data:
                        <ul>
                            <li>Device information (model, operating system, unique device identifiers)</li>
                            <li>Log data (IP address, browser type, usage times, and interactions with the App)</li>
                            <li>Location data (if location services are enabled)</li>
                        </ul>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ marginLeft: '16px' }}>
                        c. Cookies and Tracking Technologies:
                        We may use cookies and other tracking technologies to enhance user experience, analyze app
                        usage, and personalize content.
                    </Typography>
                </Box>

                <Box marginBottom={3}>
                    <Typography variant="h6" gutterBottom>
                        3. How We Use Your Information
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        We use the information collected to:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ marginLeft: '16px' }}>
                        <ul>
                            <li>Provide and maintain the App.</li>
                            <li>Process orders, including shipping and returns.</li>
                            <li>Manage user accounts and provide customer support.</li>
                            <li>Send promotional materials and updates (with your consent).</li>
                            <li>Monitor app usage and improve functionality.</li>
                            <li>Comply with legal obligations.</li>
                        </ul>
                    </Typography>
                </Box>

                <Box marginBottom={3}>
                    <Typography variant="h6" gutterBottom>
                        4. Sharing Your Information
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        We may share your personal information in the following situations:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ marginLeft: '16px' }}>
                        <ul>
                            <li>
                                With third-party service providers who assist with payment processing, shipping, and app
                                analytics.
                            </li>
                            <li>
                                To comply with legal obligations, such as responding to subpoenas or lawful requests
                                from government authorities.
                            </li>
                            <li>
                                In connection with a merger, acquisition, or sale of assets, where your personal data may
                                be transferred as part of the transaction.
                            </li>
                        </ul>
                    </Typography>
                </Box>

                <Box marginBottom={3}>
                    <Typography variant="h6" gutterBottom>
                        5. Data Retention
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        We will retain your personal data for as long as necessary to provide you with services or
                        comply with legal obligations. Once no longer needed, we will securely dispose of your data.
                    </Typography>
                </Box>

                <Box marginBottom={3}>
                    <Typography variant="h6" gutterBottom>
                        6. Your Rights
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        You have the following rights regarding your personal data:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ marginLeft: '16px' }}>
                        <ul>
                            <li>Access, correct, or delete your personal information.</li>
                            <li>Object to or restrict our processing of your data.</li>
                            <li>Withdraw your consent at any time for data processed based on consent.</li>
                            <li>Lodge a complaint with a data protection authority.</li>
                        </ul>
                    </Typography>
                </Box>

                <Box marginBottom={3}>
                    <Typography variant="h6" gutterBottom>
                        7. Data Security
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        We take appropriate security measures to protect your personal data from unauthorized
                        access, alteration, disclosure, or destruction. However, no internet-based application is
                        100% secure, and we cannot guarantee the security of your data.
                    </Typography>
                </Box>

                <Box marginBottom={3}>
                    <Typography variant="h6" gutterBottom>
                        8. Children's Privacy
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Our App is not intended for users under the age of 13. We do not knowingly collect personal
                        information from children under 13. If you believe we have collected such information,
                        please contact us to delete it.
                    </Typography>
                </Box>

                <Box marginBottom={3}>
                    <Typography variant="h6" gutterBottom>
                        9. Changes to this Privacy Policy
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        We may update this Privacy Policy from time to time. Any changes will be posted within the
                        App and, where appropriate, notified to you via email. Please review this page periodically
                        to stay informed about our privacy practices.
                    </Typography>
                </Box>

                <Box marginBottom={3}>
                    <Typography variant="h6" gutterBottom>
                        10. Contact Us
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        If you have any questions or concerns about this Privacy Policy, please contact us at:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ marginLeft: '16px' }}>
                        Email: support@[yourdomain].com
                        <br />
                        Phone: [Insert Phone Number]
                        <br />
                        Address: [Insert Company Address]
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default PrivacyPolicy;
