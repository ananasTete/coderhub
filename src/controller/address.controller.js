const addressService = require("../service/address.service");

class AddressController {
  async addressInfo(ctx, next) {
    try {
      const { id } = ctx.request.user;
      const { addressInfo } = ctx.request.body;
      const result = await addressService.uploadAddress(id, addressInfo);
      ctx.response.body = {
        returnCode: 20000,
        message: "上传地址信息成功",
      };
    } catch (error) {
      console.log("AddressController/addressInfo", error);
    }
  }
  async getAddressListByUserId(ctx, next) {
    try {
      const { id } = ctx.request.user;
      const result = await addressService.getAddressListByUserId(id);
      ctx.response.body = result;
    } catch (error) {
      console.log("AddressController/getAddressListById", error);
    }
  }
  async editAddressInfo(ctx, next) {
    try {
      const { address } = ctx.request.body;
      const result = await addressService.getAddressById(address?.id);
      const target = result[0];
      if (target) {
        await addressService.updateAddressById(address);
        await addressService.cancelOtherDefault(address.id);
        ctx.response.body = {
          returnCode: 20000,
          message: "编辑地址信息成功",
        };
      }
    } catch (error) {
      console.log("AddressController/editAddressInfo", error);
    }
  }
  async deleteAddressInfo(ctx, next) {
    try {
      const { id } = ctx.request.params;
      const result = await addressService.deleteAddressInfo(id);
      ctx.response.body = {
        returnCode: 20000,
        message: "删除地址信息成功",
      };
    } catch (error) {
      console.log("AddressController/deleteAddressInfo", error);
    }
  }
}

module.exports = new AddressController();
