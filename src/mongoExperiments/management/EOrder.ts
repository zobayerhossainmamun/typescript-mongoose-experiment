import Product from '../models/Product';
import User from '../models/User';
import Order, { IOrderItem } from '../models/Order';

interface addProductItems {
    productId: string;
    quantity: number;
}

export default class EOrder {
    /**
     * Create order
     * @param {addProductItems[]} products
     * @param {string} userId 
     * @returns 
     */
    public async createOrder(products: addProductItems[], userId: string) {
        let user = await User.findOne({ _id: userId });
        if (!user) {
            throw new Error('User does not exist.');
        }

        let orderItems: IOrderItem[] = [];
        let totalPrice: number = 0;
        let totalDiscount: number = 0;

        for (let product of products) {
            let findProduct = await Product.findOne({ _id: product.productId });
            if (findProduct) {
                orderItems.push({
                    productId: findProduct.id,
                    price: findProduct.price,
                    discount: findProduct.discount,
                    quantity: product.quantity
                });
                totalPrice += findProduct.price;
                let discount = (findProduct.price / 100 * findProduct.discount);
                totalDiscount += discount;
            }
        }

        let order = new Order({
            userId: userId,
            items: orderItems,
            totalAmount: totalPrice,
            totalDiscount: totalDiscount,
            status: "pending"
        });
        return order.save();
    }

    /**
     * Calculate Total Price per Item
     * @returns 
     */
    public calculateTotalValuePerItem() {
        return Order.aggregate([
            { $unwind: "$items" },
            {
                $addFields: {
                    "items.totalPrice": {
                        $multiply: [
                            "$items.quantity",
                            "$items.price"
                        ]
                    }
                }
            }
        ]);
    }

    /**
     * Calculate Total Discounted price per Item
     * @returns 
     */
    public calculateTotalDiscountedValuePerItem() {
        return Order.aggregate([
            { $unwind: "$items" },
            {
                $addFields: {
                    "items.discountedPrice": {
                        $subtract: [
                            {
                                $multiply: [
                                    "$items.quantity",
                                    "$items.price"
                                ]
                            },
                            "$items.discount"
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: "$_id",
                    userId: { $first: "$userId" },
                    discountedPricePerOrder: {
                        $sum: "$items.discountedPrice"
                    },
                    items: { $push: "$items" },
                    totalAmount: { $first: "$totalAmount" },
                    totalDiscount: { $first: "$totalDiscount" },
                    status: { $first: "$status" },
                    createdAt: { $first: "$createdAt" },
                    updatedAt: { $first: "$updatedAt" }
                }
            }
        ]);
    }

    /**
     * Get Total Quantity per Product
     * @returns 
     */
    public getTotalQuantityPerProduct() {
        return Order.aggregate([
            { $unwind: "$items" },
            {
                $group: {
                    _id: "$items.productId",
                    totalQuantity: { $sum: "$items.quantity" }
                }
            }
        ]);
    }

    /**
     * Calculate Net Amount After Discount for the Entire Order
     * @returns 
     */
    public calculateNetAmountAfterDiscount() {
        return Order.aggregate([
            { $unwind: "$items" },
            {
                $addFields: {
                    "items.netAmount": {
                        $subtract: [
                            { $multiply: ["$items.quantity", "$items.price"] },
                            "$items.discount"
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: "$_id",
                    userId: { $first: "$userId" },
                    netAmountPerOrder: { $sum: "$items.netAmount" },
                    items: { $push: "$items" },
                    totalAmount: { $first: "$totalAmount" },
                    totalDiscount: { $first: "$totalDiscount" },
                    status: { $first: "$status" },
                    createdAt: { $first: "$createdAt" },
                    updatedAt: { $first: "$updatedAt" }
                }
            }
        ]);
    }

    /**
     * Get order with product title and user Name
     * @returns 
     */
    public getOrdersWithProductAndUserInfo() {
        return Order.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "items.productId",
                    foreignField: "_id",
                    as: "order_items"
                }
            },
            {
                $unwind: "$items"
            },
            {
                $lookup: {
                    from: "products",
                    localField: "items.productId",
                    foreignField: "_id",
                    as: "product_details"
                }
            },
            {
                $unwind: "$product_details"
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user_details"
                }
            },
            {
                $unwind: "$user_details"
            },
            {
                $project: {
                    _id: 1,
                    totalAmount: 1,
                    totalDiscount: 1,
                    status: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    userName: "$user_details.name",
                    items: {
                        productId: "$items.productId",
                        quantity: "$items.quantity",
                        price: "$items.price",
                        discount: "$items.discount",
                        productTitle: "$product_details.name"
                    }
                }
            }
        ]);
    }
}