import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Card } from "antd";
const { Meta } = Card;

export default function History() {
  const [listProduct, setListProduct] = useState([]);
  const [dateProduct, setDateProduct] = useState("");

  useEffect(() => {
    const story = localStorage.getItem("HISTORY");
    if (story) {
      setListProduct(JSON.parse(story));
    } else {
      localStorage.setItem("HISTORY", JSON.stringify(listProduct));
    }
  }, []);

  return (
    <div className="font-mono py-10 bg-[#004643] text-[#abd1c6]">
      <div className="tablet:w-4/5 tablet:m-auto mx-2 p-8 flex flex-col gap-5 overflow-hidden">
        {[...listProduct]?.reverse().map((product, index) => {
          return (
            <>
              <motion.div
                key={index}
                initial={{ y: "50%", opacity: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0,
                  transition: { duration: 1 },
                }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                  transition: { duration: 1, delay: index * 0.1 },
                }}
                viewport={{ once: true }}
              >
                <Card
                  hoverable
                  className="text-[#0f3433] bg-[#e8e4e6] hover:bg-[#f9bc60]"
                >
                  <Meta
                    title={
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <img
                            className="size-20 rounded-lg"
                            src={product.img}
                            alt=""
                          />
                          <div>
                            <p>{product.name}</p>
                            <p className="text-red-500">{product.price} $</p>
                          </div>
                        </div>
                        <div>{product.time}</div>
                      </div>
                    }
                  />
                </Card>
              </motion.div>
            </>
          );
        }) || (
          <motion.p
            initial={{ y: "100%", opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 2 },
            }}
            className="text-5xl text-center"
          >
            Không có sản phẩm đã xem
          </motion.p>
        )}
      </div>
    </div>
  );
}
