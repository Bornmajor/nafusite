import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardBar from '../components/DashboardBar';
// import '../assets/dashboard/css/dashboard.css'
import '../assets/dashboard/js/bootstrap.bundle.min'
import { HiMenuAlt3 } from "react-icons/hi";
import { RiSearchLine } from "react-icons/ri";



const Dashboard = () => {
return (
<>
<header class="header-dashboard navbar sticky-top bg-primary flex-md-nowrap p-0 shadow" data-bs-theme="dark">
  <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" href="#">Nafusite</a>

  <ul class="navbar-nav flex-row d-md-none">
    <li class="nav-item text-nowrap">
      <a class="nav-link px-3 text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSearch" aria-controls="navbarSearch" aria-expanded="false" aria-label="Toggle search">
        {/* <svg class="bi"><use xlink:href="#search"/></svg> */}
        <RiSearchLine />
      </a>
    </li>
    <li class="nav-item text-nowrap">
      <a class="nav-link px-3 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        {/* <svg class="bi"><use xlink:href="#list"/></svg> */}
        <HiMenuAlt3 />
      </a>
    </li>
  </ul>

  <div id="navbarSearch" class="navbar-search w-100 collapse">
    <input class="form-control w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search" />
  </div>
</header>


<div class="container-fluid">
<div class="row">
<DashboardBar />


<Outlet />


</div>
</div>









</>
);
}

export default Dashboard;
