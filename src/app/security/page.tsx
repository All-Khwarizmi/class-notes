import React from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Security, Lock, Shield, Visibility } from "@mui/icons-material";

const SecurityPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Sécurité et Protection des Données
        </Typography>

        <Typography variant="body1" paragraph>
          Chez La Classe, la sécurité et la confidentialité des données de nos
          utilisateurs sont notre priorité absolue. Nous mettons en œuvre les
          meilleures pratiques de l&apos;industrie pour garantir que vos
          informations restent sûres et protégées.
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom>
          Nos Mesures de Sécurité
        </Typography>
        <List>
          {[
            { icon: <Lock />, text: "Chiffrement des données de bout en bout" },
            { icon: <Security />, text: "Authentification à deux facteurs" },
            { icon: <Shield />, text: "Audits de sécurité réguliers" },
            { icon: <Visibility />, text: "Surveillance continue des menaces" },
          ].map((item, index) => (
            <ListItem key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>

        <Typography variant="h5" component="h2" gutterBottom>
          Conformité RGPD
        </Typography>
        <Typography variant="body1" paragraph>
          La Classe est entièrement conforme au Règlement Général sur la
          Protection des Données (RGPD). Nous nous engageons à :
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Collecter uniquement les données nécessaires" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Traiter les données de manière transparente" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Donner aux utilisateurs le contrôle sur leurs données" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Supprimer les données sur demande" />
          </ListItem>
        </List>

        <Typography variant="h5" component="h2" gutterBottom>
          Formation et Sensibilisation
        </Typography>
        <Typography variant="body1" paragraph>
          Nous formons régulièrement notre équipe aux meilleures pratiques en
          matière de sécurité des données et de confidentialité. Chaque membre
          de notre équipe est engagé à protéger vos informations comme si elles
          étaient les siennes.
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom>
          Transparence
        </Typography>
        <Typography variant="body1" paragraph>
          Nous croyons en la transparence totale concernant nos pratiques de
          sécurité. Si vous avez des questions ou des préoccupations,
          n&apos;hésitez pas à nous contacter à support@laclasse.app.
        </Typography>
      </Box>
    </Container>
  );
};

export default SecurityPage;
