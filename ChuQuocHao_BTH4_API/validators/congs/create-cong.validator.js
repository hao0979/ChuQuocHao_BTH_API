import { z } from "zod";

export const createCongSchema = z.object({
  MACT: z.string().min(1, "Mã công là bắt buộc").max(10, "Mã công tối đa 10 ký tự"),
  MANV: z.string().min(1, "Mã nhân viên là bắt buộc").max(10, "Mã nhân viên tối đa 10 ký tự"),
  SLNGAYCONG: z.coerce.number().optional().nullable(),
});



export function validateCreateCong(data) {
  return createCongSchema.parse(data);
}