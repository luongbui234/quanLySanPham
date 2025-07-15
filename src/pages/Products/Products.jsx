import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button, Card, Input, Popover, Radio } from "antd";
import ModalProduct from "../../components/ModalProduct/ModalProduct";
import { getListProduct, putProduct } from "../../api/productService";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";
const { Meta } = Card;
const { Search } = Input;

export default function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const [valuePrice, setValuePrice] = useState(1);
  const [loading, setLoading] = useState(true);
  const [renderLoading, setRenderLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [listSuggest, setListSuggest] = useState([]);
  const [suggestProduct, setSuggestProduct] = useState(false);

  const showLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleHistory = (product) => {
    setDetailProduct(product);
    product.date =
      new Date().getDate() +
      "/" +
      (new Date().getMonth() + 1) +
      "/" +
      new Date().getFullYear();
    product.time = new Date().getHours() + ":" + new Date().getMinutes();
    history.push(product);
    localStorage.setItem("HISTORY", JSON.stringify(history));
  };

  const fetchProducts = () => {
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
    fetchProducts();
    setListProduct(listProduct);
    const story = localStorage.getItem("HISTORY");
    if (story) {
      setHistory(JSON.parse(story));
    } else {
      localStorage.setItem("HISTORY", JSON.stringify(history));
    }
  }, []);

  const searchProduct = (products) => {
    if (valuePrice === 1) {
      return setListProduct(products);
    } else if (valuePrice === 2) {
      return setListProduct(
        products?.filter((product) => {
          return product.price < 500;
        })
      );
    } else if (valuePrice === 3) {
      return setListProduct(
        products?.filter((product) => {
          return product.price > 500 && product.price < 1000;
        })
      );
    } else if (valuePrice === 4) {
      return setListProduct(
        products?.filter((product) => {
          return product.price > 1000;
        })
      );
    }
  };
  const onSearch = (value) => {
    if (value === "") {
      searchProduct(listProduct);
    } else {
      const newList = listProduct?.filter((product) => {
        return product.name.includes(value);
      });

      searchProduct(newList);
    }
  };

  const onChange = (e) => {
    setValuePrice(e.target.value);
  };
  const formFilter = () => {
    return (
      <>
        <p className="font-bold">Giá:</p>
        <Radio.Group
          onChange={onChange}
          value={valuePrice}
          options={[
            {
              value: 1,
              label: "Tất cả",
            },
            {
              value: 2,
              label: "<500$",
            },
            {
              value: 3,
              label: "500$-1000$",
            },
            {
              value: 4,
              label: ">1000$",
            },
          ]}
        />
      </>
    );
  };

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
        fetchProducts();
      })
      .catch((err) => {
        toast.error("Không thêm được!");
      });
  };

  const renderProducts = (product, index) => {
    return (
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
          size="small"
          hoverable
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
                  <Button type="text" onClick={() => handleFavorite(product)}>
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
                {product.desc.slice(0, 50).concat(" ...")}
              </Popover>
            }
          />
          <Button
            type="link"
            onClick={() => {
              setIsModalOpen(true);
              handleHistory(product);
              showLoading();
            }}
            className="desktop:text-md tablet:text-sm text-xs"
          >
            Xem chi tiết
          </Button>
        </Card>
      </motion.div>
    );
  };

  const handleSuggest = () => {
    if (history) {
      setSuggestProduct(true);
      const suggest = [...new Set(history)];
      setListSuggest(suggest);
    } else {
      setSuggestProduct(false);
      toast.success("Không thể lấy gợi ý lúc này");
    }
  };
  const handleSuggestNO = () => {
    setSuggestProduct(false);
  };
  return (
    <div className="font-mono bg-[#004643] text-[#abd1c6]">
      <section className="py-10 bg-[#004643] text-[#abd1c6] flex flex-col gap-5">
        <div className="tablet:w-4/5 tablet:m-auto mx-2 flex gap-2">
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 2 },
            }}
            className="w-full"
          >
            <Search
              placeholder="Tìm tên sản phẩm"
              onSearch={onSearch}
              enterButton
            />
          </motion.div>
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 2, delay: 0.5 },
            }}
          >
            <Popover placement="bottom" content={formFilter} trigger="click">
              <Button>
                <i className="fa-solid fa-filter"></i>
              </Button>
            </Popover>
          </motion.div>
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 2, delay: 1 },
            }}
          >
            {suggestProduct ? (
              <Button onClick={handleSuggestNO} className="font-bold">
                Tắt gợi ý
              </Button>
            ) : (
              <Button onClick={handleSuggest} className="font-bold">
                Gợi ý
              </Button>
            )}
          </motion.div>
        </div>
        <div className="tablet:w-4/5 tablet:m-auto mx-2 grid desktop:grid-cols-4 tablet:grid-cols-3 grid-cols-2 gap-5">
          {suggestProduct
            ? listSuggest?.map((product, index) => {
                return renderProducts(product, index);
              })
            : listProduct?.map((product, index) => {
                return renderProducts(product, index);
              })}
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
