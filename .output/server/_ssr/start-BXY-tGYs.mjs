import { isNotFound, isRedirect } from "../_libs/@tanstack/react-router+[...].mjs";
import { createMiddleware, recordErrorResponse, recordFunctionError, recordRequestError } from "./ssr.mjs";
import { authMiddleware, base44RequestMiddleware } from "./auth-middleware-Ag8cE1no.mjs";
// node_modules/.nitro/vite/services/ssr/assets/start-BXY-tGYs.js
function dedupeSerializationAdapters(deduped, serializationAdapters) {
	for (let i = 0, len = serializationAdapters.length; i < len; i++) {
		const current = serializationAdapters[i];
		if (!deduped.has(current)) {
			deduped.add(current);
			if (current.extends) dedupeSerializationAdapters(deduped, current.extends);
		}
	}
}
var createStart = (getOptions) => {
	return {
		getOptions: async () => {
			const options = await getOptions();
			if (options.serializationAdapters) {
				const deduped = /* @__PURE__ */ new Set();
				dedupeSerializationAdapters(deduped, options.serializationAdapters);
				options.serializationAdapters = Array.from(deduped);
			}
			return options;
		},
		createMiddleware
	};
};
var isControlFlow = (error) => error instanceof Response || isRedirect(error) || isNotFound(error);
var errorCaptureFunctionMiddleware = createMiddleware({ type: "function" }).server(async ({ next, serverFnMeta }) => {
	try {
		return await next();
	} catch (error) {
		if (!isControlFlow(error)) recordFunctionError(error, serverFnMeta);
		throw error;
	}
});
var errorCaptureRequestMiddleware = createMiddleware({ type: "request" }).server(async ({ next, request, handlerType }) => {
	let result;
	try {
		result = await next();
	} catch (error) {
		if (handlerType !== "serverFn" && !isControlFlow(error)) recordRequestError(request, error);
		throw error;
	}
	if (handlerType !== "serverFn") recordErrorResponse(request, result);
	return result;
});
var startInstance = createStart(() => ({
	requestMiddleware: [errorCaptureRequestMiddleware, base44RequestMiddleware],
	functionMiddleware: [errorCaptureFunctionMiddleware, authMiddleware]
}));
export { startInstance };
