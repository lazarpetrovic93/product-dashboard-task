import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useModal from "../hooks/useModal";
import { editProduct, addProduct } from "../services";
import { AddEditModalProps, Product } from "../types";
import Button from "./Button";

const defaultValues = {
  name: "",
  supplierId: 0,
  categoryId: 0,
  quantityPerUnit: "",
  unitPrice: 0,
  unitsInStock: 0,
  unitsOnOrder: 0,
  reorderLevel: 0,
};

export const AddEditModal: React.FC<AddEditModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: product || defaultValues,
  });

  useEffect(() => {
    reset(product || defaultValues);
  }, [product, reset]);

  const mutation = useMutation({
    mutationFn: (newProduct: Product): Promise<Product> => {
      const formatedData = {
        ...newProduct,
        supplierId: Number(newProduct.supplierId),
        categoryId: Number(newProduct.categoryId),
        unitPrice: Number(newProduct.unitPrice),
        unitsInStock: Number(newProduct.unitsInStock),
        unitsOnOrder: Number(newProduct.unitsOnOrder),
        reorderLevel: Number(newProduct.reorderLevel),
      };

      if (product && product.id) {
        return editProduct(product.id, formatedData);
      } else {
        return addProduct(formatedData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      onClose();
    },
  });

  const onSubmit = async (data: Product) => {
    try {
      await mutation.mutateAsync(data);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const modal = useModal({
    isOpen,
    onClose,
    title: product ? "Edit Product" : "Add Product",
    children: (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-1">
          <label className="block text-sm font-medium">Product Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className={`mt-1 p-2 border rounded w-full focus:outline-none ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        <div className="mb-1">
          <label className="block text-sm font-medium">Supplier ID</label>
          <input
            type="number"
            {...register("supplierId", { required: true })}
            className={`mt-1 p-2 border rounded w-full focus:outline-none ${
              errors.supplierId ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        <div className="mb-1">
          <label className="block text-sm font-medium">Category ID</label>
          <input
            type="number"
            {...register("categoryId", { required: true })}
            className={`mt-1 p-2 border rounded w-full focus:outline-none ${
              errors.categoryId ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        <div className="mb-1">
          <label className="block text-sm font-medium">Quantity Per Unit</label>
          <input
            type="text"
            {...register("quantityPerUnit", { required: true })}
            className={`mt-1 p-2 border rounded w-full focus:outline-none ${
              errors.quantityPerUnit ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        <div className="mb-1">
          <label className="block text-sm font-medium">Unit Price</label>
          <input
            type="number"
            step="0.01"
            {...register("unitPrice", { required: true })}
            className={`mt-1 p-2 border rounded w-full focus:outline-none ${
              errors.unitPrice ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        <div className="mb-1">
          <label className="block text-sm font-medium">Units In Stock</label>
          <input
            type="number"
            {...register("unitsInStock", { required: true })}
            className={`mt-1 p-2 border rounded w-full focus:outline-none ${
              errors.unitsInStock ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        <div className="mb-1">
          <label className="block text-sm font-medium">Units On Order</label>
          <input
            type="number"
            {...register("unitsOnOrder", { required: true })}
            className={`mt-1 p-2 border rounded w-full focus:outline-none ${
              errors.unitsOnOrder ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        <div className="mb-1">
          <label className="block text-sm font-medium">Reorder Level</label>
          <input
            type="number"
            {...register("reorderLevel", { required: true })}
            className={`mt-1 p-2 border rounded w-full focus:outline-none ${
              errors.reorderLevel ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        <div className="flex justify-end mt-6 ">
          <Button
            classNames="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-[10px]"
            text="Save"
            type="submit"
            disabled={!isDirty}
          />
          <Button
            onClick={onClose}
            classNames="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            text="Close"
          />
        </div>
      </form>
    ),
  });
  return modal;
};
