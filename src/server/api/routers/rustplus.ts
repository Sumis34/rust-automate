import { z } from "zod";
import RustPlus from "@liamcottle/rustplus.js";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const rustPlus = createTRPCRouter({
  hello: publicProcedure
    .input(
      z.object({
        ip: z.string(),
        port: z.string(),
        playerId: z.string(),
        playerToken: z.string(),
      })
    )
    .mutation(({ input: { ip, playerId, playerToken, port } }) => {
      var rustplus = new RustPlus(ip, port, playerId, playerToken);
      // wait until connected before sending commands
      rustplus.on("connected", () => {
        // ready to send requests
        rustplus.sendTeamMessage("Hello from rustplus.js!");
      });
      // connect to rust server
      rustplus.connect();
    }),
});
