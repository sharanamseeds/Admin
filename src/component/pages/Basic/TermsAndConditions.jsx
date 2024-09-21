import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const TermsAndConditions = () => {

    return (
        <Container style={{ padding: '2rem', maxWidth: '100%' }}>
            {/* Header Section */}
            <Box textAlign="center" marginBottom={4}>
                <Typography variant="h4" component="h1" gutterBottom style={{ fontWeight: 'bold' }}>
                    Terms and Conditions
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
                        Welcome to [App Name] ("we", "our", "us"). These Terms and Conditions ("Terms") govern your
                        use of our mobile application (the "App"). By using the App, you agree to comply with these Terms.
                        If you do not agree to these Terms, please do not use the App.
                    </Typography>
                </Box>

                <Box marginBottom={3}>
                    <Typography variant="h6" gutterBottom>
                        2. User Accounts
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        You may be required to create an account to use certain features of the App. You agree to provide
                        accurate, current, and complete information during the registration process and to update such information
                        to keep it accurate and complete. You are responsible for safeguarding your account and any activities
                        under it.
                    </Typography>
                </Box>

                <Box marginBottom={3}>
                    <Typography variant="h6" gutterBottom>
                        3. Acceptable Use
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        You agree not to use the App for any unlawful or prohibited activities, including but not limited to:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ marginLeft: '16px' }}>
                        <ul>
                            <li>Violating any applicable local, state, national, or international law.</li>
                            <li>Engaging in any fraudulent, defamatory, or harmful conduct.</li>
                            <li>Interfering with the proper functioning of the App or servers.</li>
                            <li>Attempting to access unauthorized areas of the App or related systems.</li>
                        </ul>
                    </Typography>
                </Box>

                <Box marginBottom={3}>
                    <Typography variant="h6" gutterBottom>
                        4. Intellectual Property
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        All content on the App, including text, graphics, logos, images, and software, is the property of [App Name] or
                        its licensors and is protected by intellectual property laws. You may not use, copy, modify, or distribute any
                        content from the App without our prior written permission.
                    </Typography>
                </Box>

                <Box marginBottom={3}>
                    <Typography variant="h6" gutterBottom>
                        5. Limitation of Liability
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        To the fullest extent permitted by law, [App Name] and its affiliates, directors, employees, or agents
                        shall not be liable for any indirect, incidental, special, or consequential damages arising from your use
                        of the App.
                    </Typography>
                </Box>

                <Box marginBottom={3}>
                    <Typography variant="h6" gutterBottom>
                        6. Changes to the Terms
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        We reserve the right to modify these Terms at any time. Any changes will be posted within the App and, where
                        appropriate, notified to you via email. By continuing to use the App after the changes are made, you agree to
                        the revised Terms.
                    </Typography>
                </Box>

                <Box marginBottom={3}>
                    <Typography variant="h6" gutterBottom>
                        7. Governing Law
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        These Terms shall be governed by and construed in accordance with the laws of [Insert Jurisdiction]. Any disputes
                        arising from these Terms will be resolved in the courts of [Insert Jurisdiction].
                    </Typography>
                </Box>

                <Box marginBottom={3}>
                    <Typography variant="h6" gutterBottom>
                        8. Contact Us
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        If you have any questions or concerns about these Terms and Conditions, please contact us at:
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

export default TermsAndConditions;
