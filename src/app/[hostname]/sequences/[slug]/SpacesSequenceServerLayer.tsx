import Layout from '@/core/components/layout/ExperimentalLayout';
import { getCurrentUser as getUser } from '@/data-access/user/get-current-user';
import { authUseCases } from '@/features/auth/application/usecases/auth-usecases';
import getVisibility from '@/features/classe/application/adapters/actions/get-visibility';
import { coursUsecases } from '@/features/cours-sequence/application/usecases/cours-usecases';
import ContentViewer from '@/features/cours-sequence/presentation/views/ContentViewer';
import EmptyUserSpace from '@/features/spaces/presentation/components/EmptyUserSpace';
import { NavItem } from '@/lib/types';
import { isLeft } from 'fp-ts/lib/Either';
import { isNone } from 'fp-ts/lib/Option';
import { BookOpen, BookCopy } from 'lucide-react';
import React from 'react';

async function SpacesSequenceServerLayer(props: {
  slug: string;
  searchParams: { [key: string]: string | undefined };
}) {
  const sequenceType =
    props.searchParams.type === 'template' ? 'template' : 'sequence';
  const userId = props.searchParams.user;

  if (!userId) {
    return <Layout.NotFound />;
  }

  const user = await getUser(userId);
  if (isNone(user)) {
    return <Layout.NotFound />;
  }

  const isOwner = await authUseCases.isCurrentUser(userId);

  const eitherSequence = await coursUsecases.getSingleSequence({
    userId: '',
    sequenceId: props.slug,
    type: sequenceType,
  });

  const eitherVisibility = await getVisibility({ userId });

  if (isLeft(eitherSequence) || isLeft(eitherVisibility)) {
    return <Layout.NotFound />;
  }

  const sequenceVisibility = eitherVisibility.right.sequences.find(
    (visibility) => visibility.id === props.slug
  );
  const isSequenceVisible =
    sequenceVisibility?.publish === true && sequenceVisibility.classe;

  if (!isSequenceVisible) {
    return (
      <EmptyUserSpace
        isOwner={isOwner}
        userName={user.value.name ?? 'Utilisateur inconnu'}
        userEmail={user.value.email}
        contentType="séquence"
      />
    );
  }

  const eitherCours = await coursUsecases.getAllCoursFromSequence({
    userId: '',
    sequenceId: props.slug,
    type: 'sequence',
  });

  if (isLeft(eitherCours)) {
    return <Layout.NotFound />;
  }

  const coursesNavItems: NavItem[] = eitherCours.right
    .filter((cours) => {
      const coursVisibility = eitherVisibility.right.cours.find(
        (visibility) => visibility.id === cours._id
      );
      return (
        coursVisibility?.publish &&
        coursVisibility.sequence &&
        coursVisibility.classe
      );
    })
    .map((cours) => ({
      title: cours.name,
      href: `/${user.value.hostname}/cours/${cours._id}?user=${userId}`,
      icon: <BookOpen size={16} className="text-orange-500" />,
      color: 'text-blue-300',
    }));

  const sequenceNavItems: NavItem[] = [
    {
      title: 'Cours',
      href: `#`,
      icon: <BookCopy size={16} className="text-orange-500" />,
      color: 'text-blue-300',
      isChidren: true,
      children: coursesNavItems,
    },
  ];

  if (coursesNavItems.length === 0) {
    return (
      <EmptyUserSpace
        isOwner={isOwner}
        userName={user.value.name ?? 'Utilisateur inconnu'}
        userEmail={user.value.email}
        contentType="cours"
      />
    );
  }

  return (
    <ContentViewer
      content={eitherSequence.right.body}
      navItems={sequenceNavItems}
    />
  );
}

export default SpacesSequenceServerLayer;
