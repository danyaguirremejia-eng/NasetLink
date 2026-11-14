import { createMiddleware, getRequest, setResponseStatus } from "./ssr.mjs";
import { createClientFromRequest, getAccessToken } from "../_libs/@base44/sdk+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/auth-middleware-Ag8cE1no.js
var withGetBase44 = (next, request = getRequest()) => {
	let client;
	return next({ context: { getBase44: () => client ??= createClientFromRequest(request) } });
};
var authMiddleware = createMiddleware({ type: "function" }).client(async ({ next }) => {
	const token = typeof window === "undefined" ? null : getAccessToken();
	return next({ headers: token ? { Authorization: `Bearer ${token}` } : {} });
}).server(({ next }) => withGetBase44(next));
var base44RequestMiddleware = createMiddleware({ type: "request" }).server(({ next, request }) => withGetBase44(next, request));
var currentUser = (context) => context.getBase44().auth.me().catch((error) => {
	if (error?.status === 401 || error?.status === 403) return null;
	throw error;
});
var requireUser = createMiddleware({ type: "function" }).server(async ({ next, context }) => {
	const user = await currentUser(context);
	if (!user) {
		setResponseStatus(401);
		throw Object.assign(/* @__PURE__ */ new Error("Unauthorized"), {
			status: 401,
			code: "UNAUTHORIZED"
		});
	}
	return next({ context: { user } });
});
createMiddleware({ type: "request" }).server(async ({ next, context }) => {
	const user = await currentUser(context);
	if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
	return next({ context: { user } });
});
export { authMiddleware, base44RequestMiddleware, requireUser };
