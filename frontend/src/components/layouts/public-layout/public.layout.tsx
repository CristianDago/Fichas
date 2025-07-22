import PublicLayoutProps from "../../../interface/layouts/public.layouts.props";

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="public-layout">
      <main>{children}</main>
    </div>
  );
};

export default PublicLayout;
