import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import { fetchProducts } from "../services/index";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Product } from "../types";
import Button from "./Button";
import { DeleteProductModal } from "./DeleteProductModal";
import { AddEditModal } from "./AddEditModal";
import TableHeaderbutton from "./TableHeaderButton";

const Table: React.FC = () => {
  const [isDeleteModalVisible, setDeleteModalVisible] =
    useState<boolean>(false);
  const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const handleOpenEditModal = (product: Product) => {
    setEditModalVisible(true);
    setSelectedProduct(product);
  };
  const handleOpenAddModal = () => setEditModalVisible(true);

  const handleOpenDeleteModal = (product: Product) => {
    setDeleteModalVisible(true);
    setSelectedProduct(product);
  };

  const handleOnClose = () => {
    setEditModalVisible(false);
    setSelectedProduct(null);
  };

  const defaultColDef = {
    flex: 1,
    minWidth: 150,
    sortable: true,
    filter: true,
  };

  const columns = [
    { headerName: "Product ID", field: "id" },
    { headerName: "Product Name", field: "name" },
    { headerName: "Supplier ID", field: "supplierId" },
    { headerName: "Category ID", field: "categoryId" },
    { headerName: "Quantity Per Unit", field: "quantityPerUnit" },
    { headerName: "Unit Price", field: "unitPrice" },
    { headerName: "Units In Stock", field: "unitsInStock" },
    { headerName: "Units On Order", field: "unitsOnOrder" },
    { headerName: "Reorder Level", field: "reorderLevel" },
    {
      headerName: "Actions",
      field: "actions",
      filter: false,
      sortable: false,
      headerComponent: TableHeaderbutton,
      headerComponentParams: {
        handleOpenAddModal,
      },
      cellRenderer: (params: { data: Product }) => {
        const { data } = params;
        return (
          <div className="pr-20px">
            <Button
              text="Edit"
              onClick={() => handleOpenEditModal(data)}
              classNames="text-blue-600"
            />
            <Button
              text="Delete"
              onClick={() => handleOpenDeleteModal(data)}
              classNames="text-red-600"
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="ag-theme-alpine w-full h-full">
        <AgGridReact
          rowData={error ? null : data}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          pagination={true}
          loading={isLoading}
          paginationPageSize={50}
          loadingOverlayComponent={"agLoadingOverlay"}
          loadingOverlayComponentParams={{
            loadingMessage: "Please wait while the data is loading...",
          }}
          overlayLoadingTemplate={
            '<span class="ag-overlay-loading-center">Loading...</span>'
          }
          overlayNoRowsTemplate={
            '<span class="ag-overlay-no-rows-center">No data to display</span>'
          }
        />
      </div>
      <DeleteProductModal
        isOpen={isDeleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        product={selectedProduct}
      />
      <AddEditModal
        isOpen={isEditModalVisible}
        onClose={handleOnClose}
        product={selectedProduct}
      />
    </>
  );
};

export default Table;
