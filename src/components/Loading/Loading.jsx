import React from "react";
import { motion } from "motion/react";

export default function Loading({ renderLoading }) {
  return (
    <div
      className={`w-lvw h-lvh bg-black opacity-50 ${
        renderLoading || "hidden"
      } fixed top-0 left-0 flex justify-center items-center`}
    >
      <motion.i
        initial={{ rotate: 0 }}
        animate={
          renderLoading
            ? {
                rotate: 360,
                transition: { duration: 1.5, repeat: Infinity, ease: "linear" },
              }
            : null
        }
        className="fa-solid fa-spinner text-5xl"
      ></motion.i>
    </div>
  );
}
