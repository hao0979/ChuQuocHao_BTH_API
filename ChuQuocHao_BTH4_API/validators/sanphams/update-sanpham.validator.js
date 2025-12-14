import { z } from "zod";

export const updateSanPhamSchema = z.object({
  Ten: z.string().min(1).optional(),
  DonGia: z.coerce.number().min(0).optional(),
  MaDanhMuc: z.coerce.number().optional().nullable(),
});


export function validateUpdateSanPham(data) {
  return updateSanPhamSchema.parse(data);
}