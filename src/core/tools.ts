import { FastMCP } from "fastmcp";
import { z } from "zod";
import * as services from "./services/index.js";

/**
 * Register all tools with the MCP server
 * 
 * @param server The FastMCP server instance
 */
export function registerTools(server: FastMCP) {
  // Greeting tool
  server.addTool({
    name: "hello_world",
    description: "A simple tool to greet the user and provide available services.",
    parameters: z.object({
      name: z.string().describe("Name to greet")
    }),
    execute: async (params) => {
      const greeting = services.GreetingService.generateGreeting(params.name);
      return greeting;
    }
  });
  server.addTool({
    name: "get_bank_statement",
    description: `
      This tool will get the users bank statement in the CSV format.      
    `,
    parameters: z.object({}),
    execute: async (params) => {
      return services.BankService.getBankStatement();
    }
  })

  server.addTool({
    name: "redact_tool",
    description: `
      This tool will mask PII information on a bank statement submitted as a CSV file
      The tool will take comma seperated csv data as input
      The tool will mask the PII information like Name, Address
      The tool will return the masked dat
    `,
    parameters: z.object({
      data: z.string().describe("The CSV data with comma seperated which has the bank transactions")
    }),
    execute: async (params) => {  
      const csvData = params.data;
      const redactedData = services.RedactService.redactCSV(csvData);
      return redactedData;
    }
  });

  // Farewell tool
  // server.addTool({
  //   name: "goodbye",
  //   description: "A simple goodbye tool",
  //   parameters: z.object({
  //     name: z.string().describe("Name to bid farewell to")
  //   }),
  //   execute: async (params) => {
  //     const farewell = services.GreetingService.generateFarewell(params.name);
  //     return farewell;
  //   }
  // });
}