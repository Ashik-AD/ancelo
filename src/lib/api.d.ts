import type { Sessions as SessionsFactory } from "@prisma/client";
export interface Sessions extends SessionsFactory {
  itemsCount: number;
}
