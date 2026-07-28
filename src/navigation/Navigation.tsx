import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminProfile from "../pages/Admin/AdminProfile";
import AllPost from "../pages/Posts/AllPost";
import Home from "../pages/Public/Home";
import Register from "../components/Auth/RegisterForm/RegisterForm";
import Login from "../components/Auth/LoginForm/LoginForm";
import Contracts from "../pages/Contracts/Contracts"; //to show all contracts
import BuyerFarmerPosts from "../pages/Buyer/FarmerPosts/FarmerPosts";
import ForgotPassword from "../components/Auth/ForgotPassword/ForgotPassword";
import FarmerPosts from "../pages/Farmer/MyPosts/MyPosts";
import ContractProposals from "../pages/Farmer/ContractProposals/ContractProposals";
import Dashboard from "../pages/Farmer/Dashboard/Dashboard";
import HarvestRecords from "../pages/Farmer/HarvestRecords/HarvestRecords";
import MyContracts from "../pages/Farmer/MyContracts/MyContracts";
import MyApplications from "../pages/Farmer/MyApplications/MyApplications";
import Notifications from "../pages/Farmer/Notifications/Notifications";
import Payment from "../pages/Farmer/Payment/Payments";
import Profile from "../pages/Farmer/FarmerProfile/FarmerProfile";
import Reports from "../pages/Farmer/Reports/Reports";

import BuyerDashboard from "../pages/Buyer/Dashboard/Dashboard";
import ContractRequest from "../pages/Buyer/ContractRequests/ContractRequests";
import AdminNotifications from "../pages/Buyer/Notifications/Notifications";
import BuyerPayment from "../pages/Buyer/Payment/Payments";
import BuyerProfile from "../pages/Buyer/BuyerProfile/BuyerProfile";
import BuyerReports from "../pages/Buyer/Reports/Reports";
import RicePurchases from "../pages/Buyer/RicePurchases/RicePurchases";
import CreateContract from "../pages/Buyer/CreateContract/CreateContract";
import EditFarmerProfile from "../pages/Farmer/EditFarmerProfile/EditFarmerProfile";
import EditBuyerProfile from "../pages/Buyer/EditBuyerProfile/EditBuyerProfile";
import HarvestRecordsBuyer from "../pages/Buyer/HarvestRecords/HarvestRecords";

export const AppRoutes = () => (
  <Routes>
    {/* test route */}
    <Route path="/" element={<Home />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/all-posts" element={<AllPost />} />
    <Route path="/contracts" element={<Contracts />} /> //create contracts
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    <Route path="/adminProfile" element={<AdminProfile />} />
    {/* farmer route */}
    <Route path="/farmer/farmer-posts" element={<FarmerPosts />} />
    <Route path="/farmer/contract-proposals" element={<ContractProposals />} />
    <Route path="/farmer/dashboard" element={<Dashboard />} />
    <Route path="/farmer/harvestRecords" element={<HarvestRecords />} />
    <Route path="/farmer/myContracts" element={<MyContracts />} />
    <Route path="/farmer/myApplications" element={<MyApplications />} />
    <Route path="/farmer/notifications" element={<Notifications />} />
    <Route path="/farmer/payment" element={<Payment />} />
    <Route path="/farmer/profile" element={<Profile />} />
    <Route path="/farmer/edit-profile" element={<EditFarmerProfile />} />
    <Route path="/farmer/reports" element={<Reports />} />
    {/* buyer route */}
    <Route path="/buyer/contracts" element={<ContractRequest />} />
    <Route path="/buyer/create-contract" element={<CreateContract />} />
    <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
    <Route path="/buyer/farmer-posts" element={<BuyerFarmerPosts />} />
    <Route path="/buyer/notifications" element={<AdminNotifications />} />
    <Route path="/buyer/payment" element={<BuyerPayment />} />
    <Route path="/buyer/profile" element={<BuyerProfile />} />
    <Route path="/buyer/edit-profile" element={<EditBuyerProfile />} />
    <Route path="/buyer/reports" element={<BuyerReports />} />
    <Route path="/buyer/purchases" element={<RicePurchases />} />
    <Route path="/buyer/harvestRecords" element={<HarvestRecordsBuyer />} />
    <Route path="*" element={<h1>404 Not Found</h1>} />
  </Routes>
);
