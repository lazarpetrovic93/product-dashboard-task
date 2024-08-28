import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import { fetchProducts } from "../services/index";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Product } from "../types";
import Button from "./Button";
import { DeleteProductModal } from "./DeleteProductModal";
import { EditProductModal } from "./EditProductModal";

const Table: React.FC = () => {
  const [isDeleteModalVisible, setDeleteModalVisible] =
    useState<boolean>(false);
  const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const gridRef = useRef<AgGridReact<Product>>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

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
      headerName: "",
      field: "actions",
      cellRenderer: (params: { data: Product }) => {
        const { data } = params;
        return (
          <div className="space-x-2">
            <Button
              text="Edit"
              onButtonClickFunc={() => handleOpenEditModal(data)}
              className="text-blue-600"
            />
            <Button
              text="Delete"
              onButtonClickFunc={() => handleOpenDeleteModal(data)}
              className="text-red-600"
            />
          </div>
        );
      },
    },
  ];

  const handleNextPage = () => {
    gridRef.current?.api.paginationGoToNextPage();
  };

  const handlePreviousPage = () => {
    gridRef.current?.api.paginationGoToPreviousPage();
  };

  const handleOpenEditModal = async (product: Product) => {
    setEditModalVisible(true);
    setCurrentProduct(product);
  };

  const handleOpenDeleteModal = async (product: Product) => {
    setDeleteModalVisible(true);
    setCurrentProduct(product);
  };

  return (
    <>
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
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
        <div className="flex justify-between mt-4">
          <Button
            onButtonClickFunc={handlePreviousPage}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            text="Previous"
          />
          <Button
            onButtonClickFunc={handleNextPage}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            text="Next"
          />
        </div>
      </div>
      <DeleteProductModal
        isOpen={isDeleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        product={currentProduct}
      />
      <EditProductModal
        isOpen={isEditModalVisible}
        onClose={() => setEditModalVisible(false)}
        product={currentProduct}
      />
    </>
  );
};

export default Table;
