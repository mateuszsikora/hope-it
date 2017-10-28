import axios from 'axios'

export default class Payu {

  constructor (id, key, host) {
    this.id = id
    this.key = key
    this.host = host
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
    model.settings = {
      invoiceDisabled: "true"
    };
    model.products = products;
    model.totalAmount = `${total}`;
    model.merchantPosId = this.id;

    return model;
  }

  async getToken() {
    if (this.cachedToken) {
      return this.cachedToken
    }

    const res = await axios.request({
      method: 'post',
      url: `${this.host}/pl/standard/user/oauth/authorize`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: `grant_type=client_credentials&client_id=${this.id}&client_secret=${this.key}`
    })

    this.cachedToken = res.data.access_token
    setTimeout(() => {
      this.cachedToken = null
    }, res.data.expires_in)

    return this.cachedToken
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
  async createOrderRequest(options, products, buyer) {
    const data = this._createRequestModel(options, products, buyer);

    const token = await this.getToken()
    return await axios.request(
      {
        url: this.host + '/api/v2_1/orders',
        method: 'post',
        maxRedirects: 0,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        data
      }
    )
  }

  async getOrderInfo(orderId) {
    const token = await this.getToken()

    return await axios.request({
      method: 'get',
      url: this.host + '/api/v2_1/orders/' + orderId,
      headers: {
        'Accept': 'application/json'
      }
    })
  }

};

Payu.create = function (id, key, host = 'https://secure.payu.com') {
  return new Payu(id, key, host);
};

// Payu.test = Payu.create('145227', '12f071174cb7eb79d4aac5bc2f07563f');
Payu.test = Payu.create('300746', '2ee86a66e5d97e3fadc400c9f19b065d', 'https://secure.snd.payu.com');
