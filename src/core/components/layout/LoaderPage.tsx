import { Loader } from 'lucide-react';
import React from 'react';

function LoaderPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Loader className="animate-spin" />
    </div>
  );
}

export default LoaderPage;
