import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getListProduct, putProduct } from "../../api/productService";
import { Button, Card } from "antd";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";
const { Meta } = Card;

export default function Favorite() {
  const [listProduct, setListProduct] = useState([]);
  const [renderLoading, setRenderLoading] = useState(true);

  const renderProducts = () => {
    getListProduct()
      .then((res) => {
        setListProduct(res.data);
        setRenderLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    renderProducts();
  }, []);

  const handleFavorite = (product) => {
    product.favorite = !product.favorite;
    putProduct(product)
      .then((res) => {
        if (product.favorite) {
          toast.success("Đã thêm vào mục yêu thích", {
            style: { background: "#abd1c6" },
          });
        } else {
          toast.success("Đã xóa khỏi mục yêu thích", {
            style: { background: "#e16162" },
          });
        }
        renderProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="font-mono py-10 bg-[#004643] text-[#abd1c6]">
      <div className="tablet:w-4/5 tablet:m-auto mx-2 p-8 flex flex-col gap-5 overflow-hidden">
        {listProduct?.find((product) => {
          return product.favorite === true;
        }) ? (
          listProduct?.map((product, index) => {
            return (
              <AnimatePresence>
                {product.favorite && (
                  <motion.div
                    key={index}
                    initial={{ x: "50%", opacity: 0 }}
                    exit={{
                      opacity: 0,
                      scale: 0,
                      transition: { duration: 1 },
                    }}
                    whileInView={{
                      x: 0,
                      opacity: 1,
                      transition: { duration: 1, delay: index * 0.1 },
                    }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "#f9bc60",
                      border: "4px solid #001e1d",
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
                            <div>
                              <p>{product.name}</p>
                              <p className="text-red-500">{product.price} $</p>
                            </div>
                            <Button
                              type="text"
                              onClick={() => handleFavorite(product)}
                            >
                              <i
                                className={`fa-solid fa-heart ${
                                  product.favorite && "text-red-500"
                                }`}
                              ></i>
                            </Button>
                          </div>
                        }
                      />
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })
        ) : (
          <motion.p
            initial={{ y: "100%", opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 2 },
            }}
            className="text-5xl text-center"
          >
            Không có sản phẩm yêu thích
          </motion.p>
        )}
      </div>
      <Loading renderLoading={renderLoading} />
    </section>
  );
}
