'use client';

import ComplementsTable from '@/features/cours-sequence/presentation/components/ComplementsTable';
import React from 'react';

import { Complement } from '../../domain/complement-schemas';

function ComplementsView(props: {
  complements: Complement[];
  coursId: string;
  userId: string;
}) {
  return (
    <ComplementsTable
      complements={props.complements}
      coursId={props.coursId}
      userId={props.userId}
    />
  );
}

export default ComplementsView;
