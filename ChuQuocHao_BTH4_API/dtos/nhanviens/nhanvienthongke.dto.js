export class ThongKeDTO {
  constructor(data) {
    this.MANV = data.MANV;
    this.HOTEN = data.HOTEN;
    
    this.MAPB = data.MAPB;
    this.SONGAYCONG = parseInt(data.SONGAYCONG) || 0;
  }
}