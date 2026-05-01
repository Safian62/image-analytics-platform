import withProtectedRoute from "../components/ProtectedRoute";

const Dashboard = withProtectedRoute(() => {
  return <div>Dashboard</div>;
});

export default Dashboard