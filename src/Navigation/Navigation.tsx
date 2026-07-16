import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminProfile from "../pages/Admin/AdminProfile";
import UserProfile from "../pages/User/UserProfile";
import AllPost from "../pages/Posts/AllPost";
import Home from "../pages/Public/Home";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import Contracts from "../pages/Contracts/Contracts"; //to show all contracts
import CreateContracts from "../pages/Contracts/CreateContract/CreateContract"; //create new contractsz
import FarmerPosts from "../pages/Posts/FarmerPosts";
import { PostDetail } from "../pages/Posts/PostDetail";

import CompanyOffers from "../pages/Farmer/CompanyOffers/CompanyOffers";
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
import Farmers from "../pages/Buyer/Farmers/Farmers";
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
    <Route path="/allPost" element={<AllPost />} />
    <Route path="/farmerPost" element={<FarmerPosts />} />
    <Route path="/farmerPostDetails/:id" element={<PostDetail />} />
    <Route path="/contracts" element={<Contracts />} /> //create contracts
    {/* <Route path="/contracts" element={<CreateContract />} /   //all contracts */}
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    <Route path="/adminProfile" element={<AdminProfile />} />
    <Route path="/userProfile" element={<UserProfile />} />
    {/* farmer route */}
    <Route path="/farmer/offers" element={<CompanyOffers />} />
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
    <Route path="/buyer/farmers" element={<Farmers />} />
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
