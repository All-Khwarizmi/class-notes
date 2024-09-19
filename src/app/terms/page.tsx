import React from "react";
import { Container, Typography, Box } from "@mui/material";

const TermsPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Conditions d&apos;Utilisation
        </Typography>

        <Typography variant="body1" paragraph>
          Dernière mise à jour : [Date]
        </Typography>

        <Typography variant="body1" paragraph>
          Bienvenue sur La Classe. En utilisant notre plateforme, vous acceptez
          les présentes conditions d&apos;utilisation. Veuillez les lire
          attentivement.
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom>
          1. Acceptation des Conditions
        </Typography>
        <Typography variant="body1" paragraph>
          En accédant ou en utilisant La Classe, vous acceptez d&apos;être lié
          par ces conditions. Si vous n&apos;acceptez pas ces conditions,
          veuillez ne pas utiliser notre plateforme.
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom>
          2. Description du Service
        </Typography>
        <Typography variant="body1" paragraph>
          La Classe est une plateforme éducative qui fournit des outils de
          création de contenu, de gestion de cours et d&apos;analyse de
          performance assistés par l&apos;IA.
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom>
          3. Comptes Utilisateurs
        </Typography>
        <Typography variant="body1" paragraph>
          Vous êtes responsable de maintenir la confidentialité de votre compte
          et de votre mot de passe. Vous acceptez de nous informer immédiatement
          de toute utilisation non autorisée de votre compte.
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom>
          4. Propriété Intellectuelle
        </Typography>
        <Typography variant="body1" paragraph>
          Tout le contenu fourni par La Classe est protégé par des droits
          d&apos;auteur. Vous ne pouvez pas reproduire, distribuer ou créer des
          œuvres dérivées sans notre autorisation expresse.
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom>
          5. Confidentialité
        </Typography>
        <Typography variant="body1" paragraph>
          Votre utilisation de La Classe est également régie par notre Politique
          de Confidentialité.
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom>
          6. Limitation de Responsabilité
        </Typography>
        <Typography variant="body1" paragraph>
          La Classe ne sera pas responsable des dommages indirects, accessoires,
          spéciaux ou consécutifs résultant de votre utilisation de la
          plateforme.
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom>
          7. Modifications des Conditions
        </Typography>
        <Typography variant="body1" paragraph>
          Nous nous réservons le droit de modifier ces conditions à tout moment.
          Les modifications prendront effet dès leur publication sur la
          plateforme.
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom>
          8. Contact
        </Typography>
        <Typography variant="body1" paragraph>
          Pour toute question concernant ces conditions, veuillez nous contacter
          à support@laclasse.app.
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsPage;
