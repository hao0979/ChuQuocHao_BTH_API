export class CreateNhanvienDTO {
  constructor({ MANV, HOTEN, NGAYSINH, PHAI, DIACHI, MAPB }) {
    this.MANV = MANV;
    this.HOTEN = HOTEN;
    
    this.NGAYSINH = NGAYSINH;
    this.PHAI = PHAI;
    this.DIACHI = DIACHI;
    this.MAPB = MAPB;
  }
}