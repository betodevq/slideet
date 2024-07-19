import React, { Suspense } from "react";

const Fallback = () => <div>Loading...</div>;

const SuspenseBoundary: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <Suspense fallback={<Fallback />}>{children}</Suspense>;

export default SuspenseBoundary;
