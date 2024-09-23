import { getUserByHostname } from "@/data-access/hostname/get-user-by-hostname";
import { isNone } from "fp-ts/lib/Option";
import { checkParams } from "./helpers/check-params";
import NotFound from "../not-found";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import { Suspense } from "react";
import HostSpaceServerLayer from "./HostSpaceServerLayer";
import type { Metadata, ResolvingMetadata } from "next";
export const dynamic = "force-dynamic";
type Props = {
  params: { hostname: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const isValid = checkParams({
    params,
    requiredParams: ["hostname"],
  });
  if (!isValid) {
    return {
      title: "Page non trouvée | LaClasse.app",
      description: "La page que vous recherchez n'existe pas sur LaClasse.app.",
    };
  }

  const hostname = params.hostname;
  const user = await getUserByHostname(hostname);

  if (isNone(user)) {
    return {
      title: "Page non trouvée | LaClasse.app",
      description: "La page que vous recherchez n'existe pas sur LaClasse.app.",
    };
  }

  const { name, schoolSubject } = user.value;
  const additionalInfo = schoolSubject ? schoolSubject : undefined;

  return {
    title: createPageTitle(name, additionalInfo),
    description: createPageDescription(name, additionalInfo),
    openGraph: {
      title: createPageTitle(name, additionalInfo),
      description: createPageDescription(name, additionalInfo),
      url: `https://laclasse.app/${hostname}`,
      siteName: "LaClasse.app",
      images: [
        {
          url: "https://laclasse.app/default-profile-image.jpg",
          width: 1200,
          height: 630,
          alt: `Photo de profil de ${name}`,
        },
      ],
      locale: "fr_FR",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: createPageTitle(name, additionalInfo),
      description: createPageDescription(name, additionalInfo),
      images: ["https://laclasse.app/default-profile-image.jpg"],
    },
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { hostname: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const isValid = checkParams({
    params,
    requiredParams: ["hostname"],
  });
  if (!isValid) {
    return <NotFound />;
  }
  const hostname = params.hostname;
  const user = await getUserByHostname(hostname);
  if (isNone(user)) {
    return <NotFound />;
  }
  console.log(user);
  if (!user) {
    return <NotFound />;
  }
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <HostSpaceServerLayer userId={user.value.userId} hostname={hostname} />
    </Suspense>
  );
}

function createPageTitle(user: string | undefined, additionalInfo?: string) {
  const baseName = user ? `${user}` : "Espace hôte";
  const siteName = "LaClasse.app";
  const additionalPart = additionalInfo ? ` - ${additionalInfo}` : "";
  return `${baseName}${additionalPart} | ${siteName}`;
}

function createPageDescription(
  user: string | undefined,
  additionalInfo?: string
) {
  const baseDescription = user
    ? `Découvrez l'espace pédagogique de ${user} sur LaClasse.app. `
    : "Explorez un espace pédagogique innovant sur LaClasse.app. ";
  const additionalPart = additionalInfo ? `${additionalInfo}. ` : "";
  return `${baseDescription}${additionalPart} Ressources éducatives, cours interactifs et outils d'apprentissage personnalisés.`;
}
