import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { v7 as uuidv7 } from "uuid";
import { z } from "zod";

const server = new McpServer({
	name: "uuid",
	version: "0.0.1",
	capabilities: {
		resources: {},
		tools: {},
	},
});

const uuid = uuidv7();

server.tool("get-uuid", "uuidを発行します", {}, async () => {
	return {
		content: [{ type: "text", text: "UUIDは " + validateUuid(uuid) }],
	};
});

function validateUuid(value: unknown): string {
	try {
		return z.string().uuid().parse(value);
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new Error(
				`UUID validation failed: ${error.errors.map((e) => e.message).join(",")}`,
			);
		}
		throw error;
	}
}

async function main() {
	const transport = new StdioServerTransport();
	await server.connect(transport);
	console.log("Server is running.");
}

main().catch((error) => {
	console.error("Error starting server: ", error);
	process.exit(1);
});
