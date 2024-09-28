import { Section, Container } from "@/core/components/common/Craft";
import Balancer from "react-wrap-balancer";
import Link from "next/link";
import { Book, Pen, Layers, User, Folder, BookOpen } from "lucide-react";
import { Typography } from "@mui/material";

type UserSpaceLandingPageProps = {
  hostname: string;
  userName: string;
};

export default function UserSpaceLandingPage(props: UserSpaceLandingPageProps) {
  return (
    <Section>
      <Container>
        <UserSpaceLandingPageContent
          hostname={props.hostname}
          userName={props.userName}
        />
      </Container>
    </Section>
  );
}

type UserSpaceLandingPageContentProps = UserSpaceLandingPageProps;

const UserSpaceLandingPageContent = (
  props: UserSpaceLandingPageContentProps
) => {
  return (
    <article className="prose-m-none space-y-8">
      <Typography variant="h4" className="font-bold">
        <Balancer>
          Bienvenue dans votre espace personnel sur {props.userName}
        </Balancer>
      </Typography>
      <Typography variant="subtitle1" className="text-muted-foreground">
        Cet espace est conçu pour vous permettre de gérer vos classes, séquences
        et articles de blog. Utilisez les liens ci-dessous pour naviguer dans
        les différentes sections de votre espace.
      </Typography>
      <div className="grid md:grid-cols-3 gap-4 mt-6 not-prose">
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href={`/${props.hostname}/classes`}
        >
          <Book size={32} />
          <span>
            Classes
            <span className="block text-sm text-muted-foreground">
              Gérez vos classes et leur contenu
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href={`/${props.hostname}/sequences`}
        >
          <Layers size={32} />
          <span>
            Séquences
            <span className="block text-sm text-muted-foreground">
              Créez et organisez vos séquences d&apos;apprentissage
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href={`/${props.hostname}/blog`}
        >
          <Pen size={32} />
          <span>
            Blog
            <span className="block text-sm text-muted-foreground">
              Rédigez et publiez vos articles de blog
            </span>
          </span>
        </Link>
        {/* <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href={`/${props.hostname}/profile`}
        >
          <User size={32} />
          <span>
            Profil
            <span className="block text-sm text-muted-foreground">
              Gérez votre profil et vos informations personnelles
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href={`/${props.hostname}/resources`}
        >
          <Folder size={32} />
          <span>
            Ressources
            <span className="block text-sm text-muted-foreground">
              Accédez à vos documents et ressources pédagogiques
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href={`/${props.hostname}/library`}
        >
          <BookOpen size={32} />
          <span>
            Bibliothèque
            <span className="block text-sm text-muted-foreground">
              Explorez votre collection de contenus éducatifs
            </span>
          </span>
        </Link> */}
      </div>
    </article>
  );
};
