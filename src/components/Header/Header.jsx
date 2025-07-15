import React, { useState } from "react";
import { motion } from "motion/react";
import { NavLink, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

export default function Header() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { duration: 2 } }}
      className="font-mono h-16 bg-[#e16162] text-[#abd1c6] sticky top-0 z-10 shadow-lg"
    >
      <div
        className={`tablet:w-4/5 tablet:m-auto flex justify-between items-center`}
      >
        <motion.div
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 2, delay: 1 } }}
        >
          <img className="w-16" src="/logo.png" alt="" />
        </motion.div>
        <motion.nav
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 2, delay: 2 } }}
          className="h-fit desktop:flex hidden gap-5 font-bold"
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={
              location.pathname === "/"
                ? { scale: 1.2, color: "#001e1d", backgroundColor: "#f9bc60" }
                : null
            }
            className="p-2 rounded-md"
          >
            <NavLink to="/">Trang Chủ</NavLink>
          </motion.div>
          <motion.div
            initial={{ scale: 1 }}
            animate={
              location.pathname === "/products"
                ? { scale: 1.2, color: "#001e1d", backgroundColor: "#f9bc60" }
                : null
            }
            className="p-2 rounded-md"
          >
            <NavLink to="/products">Sản Phẩm</NavLink>
          </motion.div>
          <motion.div
            initial={{ scale: 1 }}
            animate={
              location.pathname === "/favorite"
                ? { scale: 1.2, color: "#001e1d", backgroundColor: "#f9bc60" }
                : null
            }
            className="p-2 rounded-md"
          >
            <NavLink to="/favorite">Yêu Thích</NavLink>
          </motion.div>
          <motion.div
            initial={{ scale: 1 }}
            animate={
              location.pathname === "/history"
                ? { scale: 1.2, color: "#001e1d", backgroundColor: "#f9bc60" }
                : null
            }
            className="p-2 rounded-md"
          >
            <NavLink to="/history">Nhật ký</NavLink>
          </motion.div>
        </motion.nav>
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-3xl size-10 desktop:hidden"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
    </motion.header>
  );
}
