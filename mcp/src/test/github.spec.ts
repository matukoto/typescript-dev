import { test, expect } from "@playwright/test";

test("sign in", async ({ page }) => {
	await page.goto("https://github.com/login");
	await page
		.getByLabel("Username or email address")
		.fill("youraddress@example.com");
	await page.getByLabel("Password").click();
	await page.getByLabel("Password").fill("xxxxxxxx");
	await page.getByRole("button", { name: "Sign in", exact: true }).click();
});
