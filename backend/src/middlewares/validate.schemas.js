import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const objectIdSchema = z.string().regex(objectIdRegex, {
    message: "Invalid ObjectId format. Must be a 24-character hexadecimal string.",
});

// Schema for POST /api/chat
export const sendMessageSchema = z.object({
    body: z.object({
        conversationId: objectIdSchema,
        prompt: z.string().optional(),
        attachments: z.array(
            z.object({
                filename: z.string(),
                path: z.string(),
                mimetype: z.string(),
                size: z.number().nonnegative(),
            })
        ).optional(),
    }).refine(data => (data.prompt && data.prompt.trim().length > 0) || (data.attachments && data.attachments.length > 0), {
        message: "Either prompt or attachments must be provided",
        path: ["prompt"],
    }),
});

// Schema for GET /api/conversations/:id/messages
export const getMessagesSchema = z.object({
    params: z.object({
        id: objectIdSchema,
    }),
    query: z.object({
        page: z.string().regex(/^\d+$/).transform(val => parseInt(val)).optional(),
        limit: z.string().regex(/^\d+$/).transform(val => parseInt(val)).optional(),
    }),
});

// Schema for DELETE /api/conversations/:id
export const deleteConversationSchema = z.object({
    params: z.object({
        id: objectIdSchema,
    }),
});
