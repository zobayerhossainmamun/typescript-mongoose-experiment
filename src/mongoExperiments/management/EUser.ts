import User from '../models/User';
import userData from '../../datasets/users.json';

export default class EUser {
    /**
     * Import users
     * @returns 
     */
    public importUsers() {
        return User.insertMany(userData);
    }

    /**
     * Get users with order info
     * @returns 
     */
    public getUserWithOrderInfo() {
        return User.aggregate([
            {
                $lookup: {
                    from: "orders",
                    localField: "_id",
                    foreignField: "userId",
                    as: "orders"
                }
            },
            {
                $addFields: {
                    orderCount: {
                        $size: "$orders"
                    },
                    orderAmount: {
                        $sum: "$orders.totalAmount"
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    orderCount: 1,
                    orderAmount: 1
                }
            }
        ]);
    }
}