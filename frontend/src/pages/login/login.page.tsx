import React from "react";
import PublicLayout from "../../components/layouts/public-layout/public.layout";
import Login from "../../features/login/login.container";

const LoginPage: React.FC = () => {
  return (
    <PublicLayout>
      <Login />
    </PublicLayout>
  );
};

export default LoginPage;
