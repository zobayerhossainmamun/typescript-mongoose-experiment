import Product, { IProductInput } from '../models/Product';
import productData from '../../datasets/products.json';

export default class EProduct {
    /**
     * Import Product
     * @returns 
     */
    public importProducts() {
        return Product.insertMany(productData);
    }

    /**
     * Add new product
     * @param {IProductInput} product
     * @returns 
     */
    public addProduct(product: IProductInput) {
        let addProduct = new Product(product);
        return addProduct.save();
    }

    /**
     * Get all products
     * @returns 
     */
    public async getAllProducts(): Promise<IProductInput[]> {
        let products = await Product.find();
        return products;
    }

    /**
     * Get all product ids
     * @returns 
     */
    public async getAllProductIds(): Promise<IProductInput[]> {
        let products = await Product.find().select({ _id: 1 });
        return products;
    }

    /**
     * Find Products which is in Stock
     * @returns 
     */
    public findByInStock() {
        return Product.aggregate([
            {
                $match: {
                    inStock: true
                }
            }
        ]);
    }

    /**
     * Group Products by Category and Calculate Average Price and Product count
     * @returns 
     */
    groupAvgPriceAndCountByCategory() {
        return Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    averagePrice: {
                        $avg: "$price"
                    },
                    totalProducts: {
                        $sum: 1
                    }
                }
            }
        ]);
    }

    /**
     * Sort Products by Price
     * @returns 
     */
    public sortProductsByPrice() {
        return Product.aggregate([
            {
                $sort: {
                    price: 1
                }
            }
        ]);
    }

    /**
     * Filter Products with Discount Greater than 5 and Project Specific Fields
     * @returns 
     */
    public filterAndProjectProductsWithDiscount() {
        return Product.aggregate([
            {
                $match: {
                    discount: {
                        $gt: 5
                    }
                }
            },
            {
                $project: {
                    name: 1,
                    price: 1,
                    _id: 0
                }
            }
        ]);
    }

    /**
     * Find Products with a Specific Tag
     * @param tag 
     * @returns 
     */
    public findProductsWithTag(tag: string) {
        return Product.aggregate([
            {
                $match: {
                    tags: tag
                }
            }
        ]);
    }

    /**
     * Add a Field with Discounted Price
     * @returns 
     */
    public addDiscountedPriceField() {
        return Product.aggregate([
            {
                $addFields: {
                    discountedPrice: {
                        $subtract: [
                            "$price",
                            {
                                $multiply: [
                                    "$price",
                                    {
                                        $divide: ["$discount", 100]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ]);
    }

    /**
     * Unwind Tags Array
     * @returns 
     */
    public unwindTagsArray() {
        return Product.aggregate([
            { $unwind: "$tags" }
        ]);
    }

    /**
     * Count Number of Products in Each Category
     * @returns 
     */
    public countProductsByCategory() {
        return Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
        ]);
    }

    /**
     * Count and product list by price range
     * @returns 
     */
    public countListProductByPriceRange() {
        return Product.aggregate([
            {
                $bucket: {
                    groupBy: "$discount",
                    boundaries: [0, 10, 20, 30],
                    default: "Other",
                    output: {
                        count: { $sum: 1 },
                        averagePrice: { $avg: "$price" },
                        names: {
                            $push: "$name"
                        }
                    }
                }
            }
        ]);
    }

    /**
     * Count and list product by auto price range
     * @returns 
     */
    public countListProductByAutoPriceRange() {
        return Product.aggregate([
            {
                $bucketAuto: {
                    groupBy: "$price",
                    buckets: 5,
                    output: {
                        count: { $sum: 1 },
                        averagePrice: { $avg: "$price" }
                    }
                }
            }
        ]);
    }

    /**
     * Get count product by multiple stages
     * @returns 
     */
    public countProductMultipleStage() {
        return Product.aggregate([
            {
                $facet: {
                    categorizedByTags: [
                        {
                            $unwind: "$tags"
                        },
                        {
                            $sortByCount: "$tags"
                        }
                    ],
                    categorizedByPrice: [
                        {
                            $match: {
                                price: {
                                    $exists: 1
                                }
                            }
                        },
                        {
                            $bucket: {
                                groupBy: "$price",
                                boundaries: [0, 150, 200, 300, 400],
                                default: "Other",
                                output: {
                                    count: { $sum: 1 },
                                    titles: { $push: "$name" }
                                }
                            }
                        }
                    ],
                    categorizedBycategory: [
                        {
                            $bucketAuto: {
                                groupBy: "$category",
                                buckets: 4
                            }
                        }
                    ]
                }
            }
        ]);
    }

    /**
     * Get product list with tags count
     * @returns 
     */
    public getProductWithTagCount() {
        return Product.aggregate([
            {
                $set: {
                    totalTags: { $size: "$tags" }
                }
            }
        ]);
    }

    /**
     * Get product with pagination
     * @param page 
     * @returns 
     */
    public getProductWithPagination(page: number) {
        const limit = 5;
        const offset = Math.ceil(limit * page);
        return Product.aggregate([
            { $skip: offset },
            { $limit: limit }
        ]);
    }
}