/* eslint-disable prettier/prettier */
import { Pembayaran } from "@prisma/client";

export interface PembayaranResponse {
    status: number;
    message: string;
    data: Pembayaran | Pembayaran[];
}