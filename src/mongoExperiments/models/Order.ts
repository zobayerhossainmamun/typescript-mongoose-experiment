import { Document, Schema, model } from "mongoose";

export interface IOrderItem {
    productId: Schema.Types.ObjectId;
    quantity: number;
    price: number;
    discount: number;
}

interface IOrder extends Document {
    userId: Schema.Types.ObjectId;
    items: IOrderItem[];
    totalAmount: number;
    totalDiscount: number;
    status: "pending" | "completed" | "shipped" | "delivered" | "cancelled";
    createdAt: Date;
    updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    }
});

const orderSchema = new Schema<IOrder>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        items: {
            type: [orderItemSchema],
            required: true
        },
        totalAmount: {
            type: Number,
            required: true
        },
        totalDiscount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "completed", "shipped", "delivered", "cancelled"],
            default: "pending"
        },
    },
    {
        timestamps: true
    }
);

const Order = model<IOrder>("Order", orderSchema);
export default Order;
