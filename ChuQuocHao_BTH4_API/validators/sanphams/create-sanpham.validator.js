import { z } from "zod";

export const createSanPhamSchema = z.object({
  Ten: z.string().min(1, "Tên sản phẩm là bắt buộc"),
  DonGia: z.coerce.number().min(0, "Đơn giá phải >= 0").default(0),
  MaDanhMuc: z.coerce.number().optional().nullable(),
});


export function validateCreateSanPham(data) {
  return createSanPhamSchema.parse(data);
}