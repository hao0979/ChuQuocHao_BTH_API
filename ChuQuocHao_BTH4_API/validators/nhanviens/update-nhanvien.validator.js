import { z } from "zod";

export const updateNhanvienSchema = z.object({
  HOTEN: z.string().min(1, "Họ tên là bắt buộc").max(100, "Họ tên tối đa 100 ký tự"),
  NGAYSINH: z.string().or(z.date()).optional().nullable(),
  PHAI: z.string().max(5, "Phái tối đa 5 ký tự").optional().nullable(),
  DIACHI: z.string().max(200, "Địa chỉ tối đa 200 ký tự").optional().nullable(),
  MAPB: z.string().max(10, "Mã phòng ban tối đa 10 ký tự").optional().nullable(),
});


export function validateUpdateNhanvien(data) {
  return updateNhanvienSchema.parse(data);
}