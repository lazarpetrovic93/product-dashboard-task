export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    stock: number;
    supplierId?: number;
    categoryId: number;
    quantityPerUnit: string;
    unitPrice: number;
    unitsInStock: number;
    unitsOnOrder: number;
    reorderLevel: number;
}

export interface ButtonProps {
    onButtonClickFunc: () => void;
    type?: 'delete' | 'edit';
    text: string;
    className: string;
}


export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    footer: React.ReactNode;
}

export interface DeleteProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
}

export interface AddEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    product?: Product | null
}