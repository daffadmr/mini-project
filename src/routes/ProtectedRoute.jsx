import { Navigate, Outlet } from "react-router-dom";
import Layout from "../components/Layout";
import Auth from "../utils/Auth";

export default function ProtectedRoute() {
	if (Auth.isAuthorization()) {
		return <Navigate to="/" replace />;
	}

	return  (
		<Layout>
			<Outlet />
		</Layout>
	);
}