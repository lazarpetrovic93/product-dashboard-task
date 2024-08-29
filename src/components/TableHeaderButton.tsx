import Button from "./Button";

const TableHeaderbutton: React.FC<{ handleOpenAddModal: () => void }> = ({
  handleOpenAddModal,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button
        classNames="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        text="Add Product"
        onClick={handleOpenAddModal}
      />
    </div>
  );
};

export default TableHeaderbutton;
