import { Document, Schema, model } from "mongoose";

interface IVariant {
    ram: string;
    color: string;
}

export interface IProductInput {
    name: string;
    price: number;
    discount: number;
    category: string;
    inStock: boolean;
    tags: string[];
    description?: string;
    variants?: IVariant;
}

interface IProduct extends IProductInput, Document {
    createdAt: Date;
    updatedAt: Date;
}

const variantSchema = new Schema<IVariant>({
    color: {
        type: String,
        required: true
    },
    ram: {
        type: String,
        required: true
    }
});

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    },
    description: {
        type: String
    },
    variants: {
        type: variantSchema,
        default: {}
    },
    tags: {
        type: [String],
        default: []
    }
}, {
    timestamps: true,
});

const Product = model<IProduct>("Product", productSchema);
export default Product;