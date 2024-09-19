import React from "react";
import { Container, Typography, Box, Grid } from "@mui/material";

const AboutPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          À propos de La Classe
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom>
          Notre Mission
        </Typography>
        <Typography variant="body1" paragraph>
          Chez La Classe, notre mission est de révolutionner l&apos;éducation en
          fournissant aux enseignants des outils innovants alimentés par
          l&apos;intelligence artificielle. Nous croyons que chaque enseignant mérite
          d&apos;avoir accès à des technologies de pointe pour optimiser son
          enseignement et offrir la meilleure expérience d&apos;apprentissage
          possible à ses élèves.
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom>
          Notre Histoire
        </Typography>
        <Typography variant="body1" paragraph>
          Fondée en [année] par une équipe d&apos;anciens enseignants et de
          développeurs passionnés, La Classe est née de la volonté de combler le
          fossé entre l&apos;éducation traditionnelle et les possibilités offertes
          par l&apos;intelligence artificielle. Depuis notre création, nous n&apos;avons
          cessé d&apos;innover et d&apos;améliorer notre plateforme pour répondre aux
          besoins changeants des éducateurs du monde entier.
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom>
          Nos Valeurs
        </Typography>
        <Grid container spacing={3}>
          {[
            {
              title: "Innovation",
              description:
                "Nous repoussons constamment les limites de ce qui est possible dans l&apos;éducation assistée par l&apos;IA.",
            },
            {
              title: "Accessibilité",
              description:
                "Nous nous efforçons de rendre nos outils accessibles à tous les enseignants, quelle que soit leur expérience technologique.",
            },
            {
              title: "Confidentialité",
              description:
                "La protection des données de nos utilisateurs est au cœur de tout ce que nous faisons.",
            },
            {
              title: "Collaboration",
              description:
                "Nous croyons en la puissance de la communauté éducative et favorisons la collaboration entre les enseignants.",
            },
          ].map((value, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box border={1} borderColor="grey.300" p={2} borderRadius={2}>
                <Typography variant="h6" gutterBottom>
                  {value.title}
                </Typography>
                <Typography variant="body2">{value.description}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box mt={4}>
          <Typography variant="h5" component="h2" gutterBottom>
            Notre Équipe
          </Typography>
          <Typography variant="body1" paragraph>
            La Classe est portée par une équipe diverse et passionnée
            d&apos;éducateurs, de développeurs, de designers et d&apos;experts en IA.
            Ensemble, nous travaillons chaque jour pour faire de La Classe la
            meilleure plateforme éducative possible.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default AboutPage;
