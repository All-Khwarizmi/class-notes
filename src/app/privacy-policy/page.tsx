import React from "react";
import { Container, Typography, Box } from "@mui/material";
import Link from "next/link";

const PrivacyPolicy: React.FC = () => {
  return (
    <Container maxWidth="md" className="mt-4">
      <Link
        className="text-blue-500 hover:underline text-lg p-4 mt-4"
        prefetch={false}
        href="/"
      >
        Home
      </Link>
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Privacy Policy for La Classe
        </Typography>
        <Typography variant="body1" paragraph>
          Last updated: {new Date().toLocaleDateString()}
        </Typography>
        <Typography variant="body1" paragraph>
          At La Classe, we are committed to protecting your privacy and ensuring
          the security of your personal information. This Privacy Policy
          outlines how we collect, use, disclose, and safeguard your data when
          you use our educational SaaS platform.
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom>
          1. Information We Collect
        </Typography>
        <div>
          We collect information that you provide directly to us, such as when
          you create an account, use our services, or contact our support team.
          This may include:
          <ul>
            <li>
              Personal information (e.g., name, email address, profession)
            </li>
            <li>Account credentials</li>
            <li>Usage data and analytics</li>
            <li>Content you create or share on our platform</li>
          </ul>
        </div>

        <Typography variant="h5" component="h2" gutterBottom>
          2. How We Use Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          We use the collected information to:
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Personalize your experience on our platform</li>
            <li>Communicate with you about our services</li>
            <li>Ensure the security and integrity of our platform</li>
            <li>Comply with legal obligations</li>
          </ul>
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom>
          3. Data Sharing and Disclosure
        </Typography>
        <Typography variant="body1" paragraph>
          We do not sell your personal information. We may share your
          information with:
          <ul>
            <li>Service providers who help us operate our platform</li>
            <li>Legal authorities when required by law</li>
            <li>
              Other users, as directed by you when using collaborative features
            </li>
          </ul>
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom>
          4. Data Security
        </Typography>
        <Typography variant="body1" paragraph>
          We implement appropriate technical and organizational measures to
          protect your personal information against unauthorized or unlawful
          processing, accidental loss, destruction, or damage.
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom>
          5. Your Rights
        </Typography>
        <Typography variant="body1" paragraph>
          You have the right to access, correct, delete, or export your personal
          information. You can manage most of your data directly through your
          account settings or by contacting our support team.
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom>
          6. Changes to This Policy
        </Typography>
        <Typography variant="body1" paragraph>
          We may update this Privacy Policy from time to time. We will notify
          you of any significant changes by posting the new Privacy Policy on
          this page and updating the &quot;Last updated&quot; date.
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom>
          7. Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about this Privacy Policy, please contact us
          at:
          <br />
          Email: support@laclasse.app
          <br />
          Address: 60 rue François 1er, 75008 Paris
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
