import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { getListProduct, putProduct } from "../../api/productService";
import { Button, Card, Popover } from "antd";
import ModalProduct from "../../components/ModalProduct/ModalProduct";
import { NavLink } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";
const { Meta } = Card;

export default function HomePage() {
  const [listProduct, setListProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState(false);
  const [loading, setLoading] = useState(true);
  const [renderLoading, setRenderLoading] = useState(true);

  const showLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

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
    showLoading();
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
        toast.error("Không thêm được!");
      });
  };

  return (
    <div className="font-mono bg-[#004643] text-[#abd1c6]">
      <section className="desktop:h-lvh tablet:h-[500px] h-80">
        <div className="tablet:w-4/5 tablet:m-auto mx-2 h-full flex justify-between">
          <div className="w-1/2 flex flex-col justify-center">
            <motion.p
              initial={{ y: "-100%", opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { duration: 2 },
              }}
              className="desktop:text-3xl tablet:text-2xl text-sm font-bold"
            >
              Đầu tư vào tri thức là khoản đầu tư sinh lời nhất
            </motion.p>
            <motion.p
              initial={{ y: "-250%", opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 2 } }}
              className="desktop:text-2xl tablet:text-xl"
            >
              Hãy bắt đầu từ những cuốn sách.
            </motion.p>
          </div>
          <div className="flex items-center">
            <motion.img
              initial={{ y: "50%", opacity: 0 }}
              animate={{
                y: "10%",
                opacity: 1,
                transition: { duration: 2, delay: 0.5 },
              }}
              className="desktop:w-40 tablet:w-20 w-10"
              src="/bannerLeft.png"
              alt=""
            />
            <motion.img
              initial={{ y: "30%", opacity: 0 }}
              animate={{
                y: "-20%",
                opacity: 1,
                transition: { duration: 2 },
              }}
              className="desktop:w-[500px] tablet:w-36 w-24"
              src="/logo.png"
              alt=""
            />
            <motion.img
              initial={{ y: "50%", opacity: 0 }}
              animate={{
                y: "10%",
                opacity: 1,
                transition: { duration: 2, delay: 1 },
              }}
              className="desktop:w-40 tablet:w-20 w-10"
              src="/bannerRight.png"
              alt=""
            />
          </div>
        </div>
      </section>
      <section className="desktop:h-lvh py-10">
        <div className="tablet:w-4/5 tablet:m-auto mx-2 h-full flex flex-col gap-5 justify-center">
          <div className="flex justify-end">
            <motion.p
              initial={{ x: "100%", opacity: 0 }}
              whileInView={{ x: 0, opacity: 1, transition: { duration: 1 } }}
              viewport={{ once: true }}
              className="hover:text-blue-500 cursor-pointer"
            >
              <NavLink to={"/products"}>
                Xem thêm <i className="fa-solid fa-arrow-right"></i>
              </NavLink>
            </motion.p>
          </div>
          <div className="grid desktop:grid-cols-4 tablet:grid-cols-3 grid-cols-2 gap-5">
            {listProduct.map((product, index) => {
              const desc = product.desc.slice(0, 50);
              return (
                index < 4 && (
                  <motion.div
                    key={index}
                    initial={{ y: "100%", opacity: 0 }}
                    whileInView={{
                      y: 0,
                      opacity: 1,
                      transition: { duration: 1, delay: index * 0.1 },
                    }}
                    whileHover={{ scale: 1.05 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                  >
                    <Card
                      hoverable
                      size="small"
                      cover={
                        <img
                          className="desktop:h-44 tablet:h-16 h-14"
                          alt="example"
                          src={product.img}
                        />
                      }
                      className="desktop:w-60 desktop:h-96 tablet:w-48 tablet:h-72 w-44 h-64 text-[#0f3433] bg-[#e8e4e6] hover:bg-[#f9bc60] hover:border-4 hover:border-[#001e1d] p-4 text-center"
                    >
                      <Meta
                        title={
                          <div className="desktop:text-lg tablet:text-sm text-xs">
                            <div className="flex gap-2 justify-between items-center">
                              <p className="text-red-500">{product.price} $</p>
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
                            <p>{product.name}</p>
                          </div>
                        }
                        description={
                          <Popover
                            content={product.desc}
                            className="desktop:text-md tablet:text-sm text-xs"
                          >
                            {desc.concat(" ...")}
                          </Popover>
                        }
                      />
                      <Button
                        type="link"
                        onClick={() => {
                          setIsModalOpen(true);
                          setDetailProduct(product);
                          showLoading();
                        }}
                        className="desktop:text-md tablet:text-sm text-xs"
                      >
                        Xem chi tiết
                      </Button>
                    </Card>
                  </motion.div>
                )
              );
            })}
          </div>
        </div>
      </section>
      <ModalProduct
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        detailProduct={detailProduct}
        loading={loading}
      />
      <Loading renderLoading={renderLoading} />
    </div>
  );
}
