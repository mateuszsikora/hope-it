import axios from 'axios'

export class Payu {

  construct (id, key) {
    this.id = id
    this.key = key
    this.host = 'https://secure.payu.com'
  }

  _calculateTotalAmount(products) {
    return products
      .map(product => product.quantity * product.unitPrice)
      .reduce((a, b) => a + b);
  }

  _createRequestModel(options, products, buyer) {
    const total = this._calculateTotalAmount(products);

    const model = Object.assign({}, options)
    model.buyer = buyer;
    model.products = products;
    model.totalAmount = total;
    model.merchantPosId = this.id;

    return model;
  }

  /**
   *
   * this.createOrderRequest({
   *  notifyUrl: 'asd',
   *  completeUrl: '',
   *  customerIp: '',
   *  description: '',
   *  currencyCode: 'PLN',
   *  extOrderId: '123'
   * }, [{
   *  name: "P1",
   *  unitPrice: 100,
   *  quantity: 1
   *}], {
   *   "email": "john.doe@example.com",
   *   "phone": "111111111",
   *   "firstName": "John",
   *   "lastName": "Doe"
   *});
   */
  createOrderRequest(options, products, buyer) {
    const data = this._createRequestModel(options, products, buyer);

    console.log('sending ', data);
    return request
      .post(this.host + '/api/v2_1/orders')
      .type('json')
      .redirects(0)
      .auth(this.id, this.key)
      .set('Accept', 'application/json')
      .send(data);
  }

  getOrderInfo(orderId) {
    return request
      .get(this.host + '/api/v2_1/orders/' + orderId)
      .auth(this.id, this.key)
      .set('Accept', 'application/json');
  }

};

Payu.create = function (id, key) {
  return new Payu(id, key);
};

Payu.test = Payu.create('145227', '13a980d4f851f3d9a1cfc792fb1f5e50');
