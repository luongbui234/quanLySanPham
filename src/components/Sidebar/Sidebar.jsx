import React from "react";
import { motion } from "motion/react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <motion.nav
      initial={{ x: "100%", opacity: 0 }}
      animate={
        sidebarOpen
          ? { x: 0, opacity: 1, transition: { duration: 1 } }
          : { x: "100%", opacity: 0, transition: { duration: 1 } }
      }
      className={`w-1/2 h-full desktop:hidden tablet:fixed fixed top-0 right-0 font-bold flex gap-2`}
    >
      <button
        onClick={() => setSidebarOpen(false)}
        className="h-fit p-2 inline-flex"
      >
        <i className="fa-solid fa-xmark text-xl"></i>
      </button>
      <div className="w-full bg-[#e16162] text-[#abd1c6] flex flex-col gap-5">
        <motion.div
          initial={{ scale: 1 }}
          animate={
            location.pathname === "/"
              ? { scale: 1.15, color: "#001e1d", backgroundColor: "#f9bc60" }
              : null
          }
          className="p-2 rounded-md"
        >
          <NavLink to="/">HOME</NavLink>
        </motion.div>
        <motion.div
          initial={{ scale: 1 }}
          animate={
            location.pathname === "/products"
              ? { scale: 1.15, color: "#001e1d", backgroundColor: "#f9bc60" }
              : null
          }
          className="p-2 rounded-md"
        >
          <NavLink to="/products">PRODUCTS</NavLink>
        </motion.div>
        <motion.div
          initial={{ scale: 1 }}
          animate={
            location.pathname === "/favorite"
              ? { scale: 1.15, color: "#001e1d", backgroundColor: "#f9bc60" }
              : null
          }
          className="p-2 rounded-md"
        >
          <NavLink to="/favorite">FAVORITE</NavLink>
        </motion.div>
      </div>
    </motion.nav>
  );
}
