import { useMutation, useQueryClient } from "@tanstack/react-query";
import useModal from "../hooks/useModal";
import { deleteProduct } from "../services";
import { DeleteProductModalProps } from "../types";
import Button from "./Button";

export const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (productId: number) => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      onClose();
    },
  });

  const handleDelete = async () => {
    if (product && product.id) {
      try {
        await mutation.mutateAsync(product.id);
      } catch (error) {
        console.error("Error during deletion:", error);
      }
    }
  };

  const modal = useModal({
    isOpen,
    onClose,
    title: "Delete Product?",
    children: (
      <div className="flex flex-col gap-[20px] w-[360px]">
        Are you sure to delete product?
      </div>
    ),
    footer: (
      <div className="flex justify-end mt-6 ">
        <Button
          classNames="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-[10px]"
          text="Delete"
          onClick={handleDelete}
        />
        <Button
          onClick={onClose}
          classNames="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          text="Close"
        />
      </div>
    ),
  });
  return modal;
};
