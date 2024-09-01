import connectDB from './common/database';
import EProduct from './mongoExperiments/management/EProduct';
import EOrder from './mongoExperiments/management/EOrder';
import EUser from './mongoExperiments/management/EUser';

connectDB();

async function main() {
    let _eProduct = new EProduct();
    let _eOrder = new EOrder();
    let _eUser = new EUser();

    // await _eProduct.importProducts();
    // console.log('Products has been imported.');

    // await _eUser.importUsers();
    // console.log('Users has been imported.');

    // let result = await _eProduct.groupAvgPriceAndCountByCategory();
    // console.log(result);

    // await _eOrder.createOrder([{
    //     productId: '66d4098dd7c0a2ce5718deb4',
    //     quantity: 2
    // }, {
    //     productId: '66d4098dd7c0a2ce5718dec6',
    //     quantity: 1
    // }, {
    //     productId: '66d4098dd7c0a2ce5718ded2',
    //     quantity: 3
    // }], '66d40adddfb518bc72b142cf');
    // console.log('Order has been created.');

    // await _eOrder.createOrder([{
    //     productId: '66d4098dd7c0a2ce5718dedb',
    //     quantity: 2
    // }, {
    //     productId: '66d4098dd7c0a2ce5718decc',
    //     quantity: 1
    // }, {
    //     productId: '66d4098dd7c0a2ce5718dec6',
    //     quantity: 3
    // }], '66d40adddfb518bc72b142d1');
    // console.log('Order has been created.');
}
main();