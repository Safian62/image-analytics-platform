// src/hoc/withAuthRedirect.tsx

import type { ComponentType } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const withAuthRedirect = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return function AuthRedirectWrapper(props: P) {
    const { loading, isAuth } = useAuth();

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (isAuth) return <Navigate to="/" replace />;

    return <WrappedComponent {...props} />;
  };
};

export default withAuthRedirect;