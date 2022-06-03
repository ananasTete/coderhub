const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const {
  addressInfo,
  getAddressListByUserId,
  editAddressInfo,
  deleteAddressInfo
} = require("../controller/address.controller");

const router = new Router({
  prefix: "/address",
});

// 上传地址信息
router.post("/", verifyAuth, addressInfo);

// 根据userId请求全部地址信息
router.get("/", verifyAuth, getAddressListByUserId);

// 编辑地址信息
router.patch("/", verifyAuth, editAddressInfo);

// 删除地址信息
router.patch("/:id", verifyAuth, deleteAddressInfo)

module.exports = router;
