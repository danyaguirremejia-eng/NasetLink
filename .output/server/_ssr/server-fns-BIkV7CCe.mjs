import { createServerFn } from "./ssr.mjs";
import { initializeApp } from "../_libs/@firebase/app+[...].mjs";
import "../_libs/firebase.mjs";
import { addDoc, collection, doc, getDocs, getFirestore, increment, query, serverTimestamp, updateDoc, where } from "../_libs/@firebase/firestore+[...].mjs";
import { object, string } from "../_libs/zod.mjs";
import { createServerRpc } from "./createServerRpc-cwhBdcVU.mjs";
// node_modules/.nitro/vite/services/ssr/assets/server-fns-BIkV7CCe.js
var app = initializeApp({
	apiKey: "AIzaSyCSBxC7y0rZ9dj_F2M5xMk7PS7wLUOLJfY",
	authDomain: "dany-protect-app.firebaseapp.com",
	projectId: "dany-protect-app",
	storageBucket: "dany-protect-app.appspot.com",
	messagingSenderId: "800991664439",
	appId: "1:80099166439:web:a3425b63c1fc45c1d5ba42"
});
var db = getFirestore(app);
var ALPHABET = "abcdefghijkmnpqrstuvwxyz23456789";
var codeSchema = object({ code: string().min(4).max(24).regex(/^[a-zA-Z0-9]+$/) });
function makeCode(length = 7) {
	const bytes = crypto.getRandomValues(new Uint8Array(length));
	let out = "";
	for (let i = 0; i < length; i += 1) out += ALPHABET[bytes[i] % 32];
	return out;
}
var createShortLink_createServerFn_handler = createServerRpc({
	id: "2ee32f3b9faa81fe37600782713735563100b5953ea185c57cdb982c5e110796",
	name: "createShortLink",
	filename: "src/lib/server-fns.js"
}, (opts) => createShortLink.__executeServer(opts));
var createShortLink = createServerFn({ method: "POST" }).validator(object({
	url: string().min(3).max(2048),
	userId: string()
})).handler(createShortLink_createServerFn_handler, async ({ data }) => {
	const code = makeCode();
	return {
		id: (await addDoc(collection(db, "links"), {
			original_url: data.url,
			short_code: code,
			clicks: 0,
			earnings: 0,
			userId: data.userId,
			createdAt: serverTimestamp()
		})).id,
		short_code: code,
		original_url: data.url,
		clicks: 0,
		earnings: 0
	};
});
var getDashboard_createServerFn_handler = createServerRpc({
	id: "6517a43c14902faa61134004049a7ed0f71eefd627bb85e31e8c599a2e58a941",
	name: "getDashboard",
	filename: "src/lib/server-fns.js"
}, (opts) => getDashboard.__executeServer(opts));
var getDashboard = createServerFn({ method: "GET" }).validator(object({ userId: string() })).handler(getDashboard_createServerFn_handler, async ({ data }) => {
	const q = query(collection(db, "links"), where("userId", "==", data.userId));
	const querySnapshot = await getDocs(q);
	const links = [];
	let totalClicks = 0;
	let totalEarnings = 0;
	querySnapshot.forEach((docSnap) => {
		const linkData = docSnap.data();
		links.push({
			id: docSnap.id,
			...linkData
		});
		totalClicks += linkData.clicks || 0;
		totalEarnings += linkData.earnings || 0;
	});
	return {
		links: links.reverse(),
		balance: totalEarnings,
		totalClicks,
		totalEarnings
	};
});
var registerClick_createServerFn_handler = createServerRpc({
	id: "1b79a05de85dde44c7cbb3bee98794d27bf5982ae4b9b039fd14a4e8f87fcb9e",
	name: "registerClick",
	filename: "src/lib/server-fns.js"
}, (opts) => registerClick.__executeServer(opts));
var registerClick = createServerFn({ method: "POST" }).validator(codeSchema).handler(registerClick_createServerFn_handler, async ({ data }) => {
	const q = query(collection(db, "links"), where("short_code", "==", data.code));
	const querySnapshot = await getDocs(q);
	if (querySnapshot.empty) return {
		ok: false,
		original_url: null
	};
	const linkDoc = querySnapshot.docs[0];
	const linkData = linkDoc.data();
	await updateDoc(doc(db, "links", linkDoc.id), {
		clicks: increment(1),
		earnings: increment(.01)
	});
	return {
		ok: true,
		original_url: linkData.original_url
	};
});
var getLinkByCode_createServerFn_handler = createServerRpc({
	id: "90f812a0e298cc23559f32210a237891dd818b041b0440f33d16dee8ea0ae9a6",
	name: "getLinkByCode",
	filename: "src/lib/server-fns.js"
}, (opts) => getLinkByCode.__executeServer(opts));
var getLinkByCode = createServerFn({ method: "GET" }).validator(codeSchema).handler(getLinkByCode_createServerFn_handler, async ({ data }) => {
	const q = query(collection(db, "links"), where("short_code", "==", data.code));
	const querySnapshot = await getDocs(q);
	if (querySnapshot.empty) return null;
	const link = querySnapshot.docs[0].data();
	return {
		short_code: link.short_code,
		original_url: link.original_url,
		clicks: link.clicks
	};
});
var requestPayout_createServerFn_handler = createServerRpc({
	id: "e53c2cddac03db482446287389bea07201ff63dc7915c1cc04470fc8f5ec67fb",
	name: "requestPayout",
	filename: "src/lib/server-fns.js"
}, (opts) => requestPayout.__executeServer(opts));
var requestPayout = createServerFn({ method: "POST" }).validator(object({ paypal_email: string().email() })).handler(requestPayout_createServerFn_handler, async () => {
	return {
		success: true,
		message: "Retiro solicitado"
	};
});
export { createShortLink_createServerFn_handler, getDashboard_createServerFn_handler, getLinkByCode_createServerFn_handler, registerClick_createServerFn_handler, requestPayout_createServerFn_handler };
