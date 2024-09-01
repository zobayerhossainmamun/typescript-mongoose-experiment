import connectDB from '../../common/database';
import EProduct from "./EProduct";
import { IProductInput } from '../models/Product';
import mongoose from 'mongoose';
let _eProduct = new EProduct();

beforeAll(async () => {
    await connectDB();
});

describe('Test Product', () => {
    it('should get all product as an array', async () => {
        let result: IProductInput[] = await _eProduct.getAllProducts();
        expect(Array.isArray(result)).toBe(true);
    });
});

afterAll(async () => {
    await mongoose.disconnect();
});