import { Modal, Progress } from "antd";

export default function ModalProduct({
  isModalOpen,
  setIsModalOpen,
  detailProduct,
  loading,
}) {
  const { name, price, img, desc, rate } = detailProduct;

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={false}
      loading={loading}
      className="font-mono"
    >
      <div className="flex gap-2">
        <img
          className="tablet:w-52 tablet:h-64 w-24 h-40 rounded-md"
          src={img}
          alt=""
        />
        <div>
          <p className="tablet:text-xl text-sm font-bold">{name}</p>
          <p className="tablet:text-lg text-sm text-red-500">{price} $</p>
          <p>{desc}</p>
          <Progress size={"small"} type="circle" percent={rate} />
        </div>
      </div>
    </Modal>
  );
}
