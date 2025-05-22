import { inngest } from "@/inngest/client";
import { GenerateVideoData } from "@/inngest/functions";
import { serve } from "inngest/next";


export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        GenerateVideoData
    ],
});
