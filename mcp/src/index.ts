import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { v4, v7 } from "uuid";
import { z } from "zod";

const server = new McpServer({
	name: "utility-server",
	version: "0.0.1",
	capabilities: {
		resources: {},
		tools: {},
	},
});

server.tool(
	"get-server-time",
	"サーバーの現在時刻を取得します。",
	{},
	async () => {
		return {
			content: [
				{
					type: "text",
					text: new Date().toLocaleString(),
				},
			],
		};
	},
);

server.tool(
	"generate-uuidv4",
	"新しいUUIDv4を生成して返します",
	{},
	async () => {
		return {
			content: [
				{
					type: "text",
					text: v4(),
				},
			],
		};
	},
);

server.tool(
	"generate-uuidv7",
	"新しいUUIDv7を生成して返します",
	{},
	async () => {
		return {
			content: [
				{
					type: "text",
					text: v7(),
				},
			],
		};
	},
);

const weatherInputSchema = {
	location: z.string().describe("City name"),
};

const weatherOutputSchema = {
	location: z.string().describe("location name"),
	temperature: z.string().describe("current temperature"),
	conditions: z.string().describe("current condition"),
};

server.registerTool(
	"getWeather",
	{
		title: "Get Weather",
		description: "you can get weather from location.",
		inputSchema: weatherInputSchema,
		outputSchema: weatherOutputSchema,
	},
	async ({ location }) => {
		const dummyWeather = {
			location: location,
			temperature: "72",
			conditions: "sunny",
		} satisfies z.infer<z.ZodObject<typeof weatherOutputSchema>>;
		if (location === "error-location") {
			return {
				content: [
					{
						type: "text",
						text: "An error occured",
					},
				],
				isError: true,
			};
		}
		return {
			structuredContent: dummyWeather,
			content: [
				{
					type: "text",
					text: JSON.stringify(dummyWeather),
				},
			],
			isError: false,
		};
	},
);

async function main() {
	const transport = new StdioServerTransport();
	await server.connect(transport);
	// console.log は stdout になってしまうので、Jsonパースの対象になりエラーになる
	//console.log("Server is running...");
}

main().catch((error) => {
	console.error("Error starting server:", error);
	process.exit(1);
});
