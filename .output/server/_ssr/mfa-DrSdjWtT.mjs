import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/react.mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import { Check } from "../_libs/lucide-react10.mjs";
import { ChevronsUpDown, Minus } from "../_libs/lucide-react14.mjs";
import { Copy } from "../_libs/lucide-react20.mjs";
import { LoaderCircle } from "../_libs/lucide-react35.mjs";
import { Lock } from "../_libs/lucide-react36.mjs";
import { Mail } from "../_libs/lucide-react39.mjs";
import { MessageSquare } from "../_libs/lucide-react42.mjs";
import { Search } from "../_libs/lucide-react45.mjs";
import { ShieldCheck } from "../_libs/lucide-react49.mjs";
import { Smartphone } from "../_libs/lucide-react50.mjs";
import { X } from "../_libs/lucide-react60.mjs";
import { Button, cn, safeReturnTo } from "./router-DtpLq15p.mjs";
import { GoogleIcon, Input, Label, finishSignIn, loadSignInOptions, mfaSession, resumeMfa, signInToManageMfa, signInWithProvider } from "./label-D9OP1Q-n.mjs";
import { DialogClose, DialogContent as DialogContent$1, DialogDescription as DialogDescription$1, DialogOverlay as DialogOverlay$1, DialogPortal as DialogPortal$1, DialogTitle as DialogTitle$1 } from "../_libs/radix-ui__react-dialog.mjs";
import { _e } from "../_libs/cmdk.mjs";
import { Lt, jt } from "../_libs/input-otp.mjs";
import { Content2, Portal, Root2, Trigger } from "../_libs/radix-ui__react-popover.mjs";
// node_modules/.nitro/vite/services/ssr/assets/mfa-DrSdjWtT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var Command$1 = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e, {
	ref,
	className: cn("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", className),
	...props
}));
Command$1.displayName = _e.displayName;
var CommandInput = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "flex items-center border-b px-3",
	"cmdk-input-wrapper": "",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
		ref,
		className: cn("flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	})]
}));
CommandInput.displayName = _e.Input.displayName;
var CommandList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.List, {
	ref,
	className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
	...props
}));
CommandList.displayName = _e.List.displayName;
var CommandEmpty = import_react.forwardRef((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, {
	ref,
	className: "py-6 text-center text-sm",
	...props
}));
CommandEmpty.displayName = _e.Empty.displayName;
var CommandGroup = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
	ref,
	className: cn("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground", className),
	...props
}));
CommandGroup.displayName = _e.Group.displayName;
var CommandSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Separator, {
	ref,
	className: cn("-mx-1 h-px bg-border", className),
	...props
}));
CommandSeparator.displayName = _e.Separator.displayName;
var CommandItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Item, {
	ref,
	className: cn("relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", className),
	...props
}));
CommandItem.displayName = _e.Item.displayName;
var CommandShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className),
		...props
	});
};
CommandShortcut.displayName = "CommandShortcut";
var InputOTP = import_react.forwardRef(({ className, containerClassName, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lt, {
	ref,
	containerClassName: cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName),
	className: cn("disabled:cursor-not-allowed", className),
	...props
}));
InputOTP.displayName = "InputOTP";
var InputOTPGroup = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex items-center", className),
	...props
}));
InputOTPGroup.displayName = "InputOTPGroup";
var InputOTPSlot = import_react.forwardRef(({ index, className, ...props }, ref) => {
	const { char, hasFakeCaret, isActive } = import_react.useContext(jt).slots[index];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: cn("relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md", isActive && "z-10 ring-1 ring-ring", className),
		...props,
		children: [char, hasFakeCaret && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-0 flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-px animate-caret-blink bg-foreground duration-1000" })
		})]
	});
});
InputOTPSlot.displayName = "InputOTPSlot";
var InputOTPSeparator = import_react.forwardRef(({ ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	role: "separator",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {})
}));
InputOTPSeparator.displayName = "InputOTPSeparator";
var Popover = Root2;
var PopoverTrigger = Trigger;
var PopoverContent = import_react.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
	...props
}) }));
PopoverContent.displayName = Content2.displayName;
var appInfo;
function useAppInfo() {
	const [info, setInfo] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		appInfo ||= loadSignInOptions().catch(() => ({}));
		appInfo.then((value) => setInfo(value || {}));
	}, []);
	return info;
}
function MfaScreen({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center bg-background px-4 py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-full max-w-md bg-card rounded-2xl shadow-sm border border-border p-8",
			children
		})
	});
}
function MfaHeader({ title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center text-center mb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
					className: "w-7 h-7 text-primary-foreground",
					"aria-hidden": "true"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold tracking-tight text-foreground min-h-[2rem]",
				children: title
			}),
			description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mt-2",
				children: description
			})
		]
	});
}
function CodeField({ id, label = "Enter the 6-digit code", value, onChange, onComplete, hasError = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: id,
			className: "block text-center font-normal text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputOTP, {
			id,
			maxLength: 6,
			value,
			autoFocus: true,
			autoComplete: "one-time-code",
			containerClassName: "justify-center",
			onChange: (next) => {
				onChange(next);
				if (next.length === 6) onComplete?.(next);
			},
			onKeyDown: (e) => {
				if (e.key === "Enter" && onComplete) {
					e.preventDefault();
					onComplete(value);
				}
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputOTPGroup, { children: [
				0,
				1,
				2,
				3,
				4,
				5
			].map((index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputOTPSlot, {
				index,
				className: hasError ? "border-destructive" : void 0
			}, index)) })
		})]
	});
}
function ResendLine({ cooldown, disabled, onResend, error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-muted-foreground",
			children: [
				"Didn't receive a code?",
				" ",
				cooldown > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Resend in ",
					cooldown,
					"s"
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled,
					onClick: onResend,
					className: "font-semibold text-foreground hover:underline disabled:opacity-50",
					children: "Resend"
				})
			]
		}), error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-destructive",
			children: error
		})]
	});
}
var INVALID_PHONE = "Invalid phone number. Please check the number and try again.";
var COUNTRY_DIAL_CODES = new Map("af93 ax358 al355 dz213 as1684 ad376 ao244 ai1264 aq672 ag1268 ar54 am374 aw297 au61 at43 az994 bs1242 bh973 bd880 bb1246 by375 be32 bz501 bj229 bm1441 bt975 bo591 ba387 bw267 bv47 br55 io246 vg1284 bn673 bg359 bf226 bi257 kh855 cm237 ca1 cv238 bq599 ky1345 cf236 td235 cl56 cn86 cx61 cc61 co57 km269 cd243 cg242 ck682 cr506 ci225 hr385 cu53 cw599 cy357 cz420 dk45 dj253 dm1767 do1 ec593 eg20 sv503 gq240 er291 ee372 et251 fk500 fo298 fj679 fi358 fr33 gf594 pf689 tf262 ga241 gm220 ge995 de49 gh233 gi350 gr30 gl299 gd1473 gp590 gu1671 gt502 gg44 gn224 gw245 gy592 ht509 hm672 hn504 hk852 hu36 is354 in91 id62 ir98 iq964 ie353 im44 il972 it39 jm1876 jp81 je44 jo962 kz7 ke254 ki686 xk383 kw965 kg996 la856 lv371 lb961 ls266 lr231 ly218 li423 lt370 lu352 mo853 mk389 mg261 mw265 my60 mv960 ml223 mt356 mh692 mq596 mr222 mu230 yt262 mx52 fm691 md373 mc377 mn976 me382 ms1664 ma212 mz258 mm95 na264 nr674 np977 nl31 nc687 nz64 ni505 ne227 ng234 nu683 nf672 kp850 mp1670 no47 om968 pk92 pw680 ps970 pa507 pg675 py595 pe51 ph63 pn64 pl48 pt351 pr1 qa974 re262 ro40 ru7 rw250 bl590 sh290 kn1869 lc1758 mf590 pm508 vc1784 ws685 sm378 st239 sa966 sn221 rs381 sc248 sl232 sg65 sx1721 sk421 si386 sb677 so252 za27 gs500 kr82 ss211 es34 lk94 sd249 sr597 sj47 sz268 se46 ch41 sy963 tw886 tj992 tz255 th66 tl670 tg228 tk690 to676 tt1868 tn216 tr90 tm993 tc1649 tv688 vi1340 ug256 ua380 ae971 gb44 us1 um1 uy598 uz998 vu678 va39 ve58 vn84 wf681 eh212 ye967 zm260 zw263".split(" ").map((entry) => [entry.slice(0, 2), entry.slice(2)]));
var DIAL_CODES = [...new Set(COUNTRY_DIAL_CODES.values())].sort((a, b) => Number(a) - Number(b));
function defaultDialCode() {
	const region = typeof navigator === "undefined" ? void 0 : navigator.language.split("-")[1]?.toLowerCase();
	const dialCode = region && COUNTRY_DIAL_CODES.get(region);
	return dialCode ? `+${dialCode}` : "+1";
}
function isPlausiblePhone(fullPhone) {
	const digits = fullPhone.replace(/\D/g, "");
	return digits.length >= 7 && digits.length <= 15;
}
var matchesSearch = (code, search) => {
	const normalized = search.replace(/\+/g, "");
	return normalized === "" || code.startsWith(normalized);
};
function DialCodePicker({ value, onChange }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const search = (0, import_react.useRef)("");
	const handleOpenChange = (next) => {
		if (!next && search.current) {
			const matches = DIAL_CODES.filter((code) => matchesSearch(code, search.current));
			if (matches.length === 1) onChange(`+${matches[0]}`);
			search.current = "";
		}
		setOpen(next);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
		open,
		onOpenChange: handleOpenChange,
		modal: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "outline",
				role: "combobox",
				"aria-expanded": open,
				"aria-label": "Country code",
				className: "h-10 w-[100px] justify-between px-2.5 font-normal shadow-none",
				children: [value, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, {
					className: "ml-1 h-3.5 w-3.5 shrink-0 opacity-50",
					"aria-hidden": "true"
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
			className: "w-[140px] p-0",
			align: "start",
			side: "bottom",
			avoidCollisions: false,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command$1, {
				filter: (item, text) => matchesSearch(item, text) ? 1 : 0,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
					placeholder: "Search...",
					className: "h-9",
					onValueChange: (text) => {
						search.current = text;
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, { children: "No match" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, { children: DIAL_CODES.map((code) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
					value: code,
					onSelect: () => {
						onChange(`+${code}`);
						search.current = "";
						setOpen(false);
					},
					children: [
						"+",
						code,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							className: cn("ml-auto h-3.5 w-3.5", value === `+${code}` ? "opacity-100" : "opacity-0"),
							"aria-hidden": "true"
						})
					]
				}, code)) })] })]
			})
		})]
	});
}
function PhoneField({ countryCode, onCountryCodeChange, phoneNumber, onPhoneNumberChange, error, onSubmit }) {
	const [touched, setTouched] = (0, import_react.useState)(false);
	const invalid = touched && phoneNumber.length >= 4 && !isPlausiblePhone(`${countryCode}${phoneNumber}`);
	const message = error ?? (invalid ? "Invalid phone number. Please check the number and try again." : null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialCodePicker, {
				value: countryCode,
				onChange: onCountryCodeChange
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: "mfa-phone",
				type: "tel",
				autoComplete: "tel-national",
				autoFocus: true,
				value: phoneNumber,
				maxLength: 15,
				placeholder: "5551234567",
				"aria-invalid": Boolean(message),
				onChange: (e) => {
					onPhoneNumberChange(e.target.value.replace(/\D/g, ""));
					setTouched(true);
				},
				onKeyDown: (e) => {
					if (e.key === "Enter" && onSubmit) {
						e.preventDefault();
						onSubmit();
					}
				},
				className: cn("h-10 flex-1", message && "border-destructive focus-visible:ring-destructive")
			})]
		}), message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-destructive",
			children: message
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Standard message and data rates may apply."
		})]
	});
}
function CopyKeyButton({ text, wide = false }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const copy = async () => {
		await navigator.clipboard.writeText(text.replace(/\s/g, ""));
		setCopied(true);
		setTimeout(() => setCopied(false), 2e3);
	};
	if (wide) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type: "button",
		variant: "outline",
		className: "w-full h-11",
		onClick: copy,
		children: copied ? "Copied" : "Copy key"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: copy,
		title: "Copy to clipboard",
		"aria-label": "Copy to clipboard",
		className: "inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-muted",
		children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
			className: "w-4 h-4",
			"aria-hidden": "true"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
			className: "w-4 h-4",
			"aria-hidden": "true"
		})
	});
}
function MfaNotice({ error, signInPath = "/login" }) {
	if (!error) return null;
	const returnTo = safeReturnTo();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "alert",
		className: "mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center",
		children: error.mustSignInAgain ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"Your sign-in expired.",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: signInPath + (returnTo !== "/" ? "?returnTo=" + encodeURIComponent(returnTo) : ""),
				className: "font-medium underline",
				children: "Sign in again"
			})
		] }) : error.message || "Verification failed. Please try again."
	});
}
function RememberDevice({ checked, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex items-center justify-center gap-2 text-sm text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "checkbox",
			className: "h-4 w-4 accent-primary",
			checked,
			onChange: (e) => onChange(e.target.checked)
		}), "Remember this device for 30 days"]
	});
}
function useCooldown() {
	const [left, setLeft] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (left <= 0) return void 0;
		const timer = setTimeout(() => setLeft(left - 1), 1e3);
		return () => clearTimeout(timer);
	}, [left]);
	return [left, setLeft];
}
function isTouchDevice() {
	return typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)").matches;
}
var SMS_RESEND_SECONDS$2 = 30;
var FULL_CODE = "Enter the full 6-digit code";
function MfaMethodSetup({ session, method, onDone, onBack, signInPath }) {
	const [setup, setSetup] = (0, import_react.useState)(null);
	const [step, setStep] = (0, import_react.useState)("start");
	const [countryCode, setCountryCode] = (0, import_react.useState)(defaultDialCode);
	const [phoneNumber, setPhoneNumber] = (0, import_react.useState)("");
	const [code, setCode] = (0, import_react.useState)("");
	const [fieldError, setFieldError] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [resendError, setResendError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [cooldown, setCooldown] = useCooldown();
	const started = (0, import_react.useRef)(false);
	const fullPhone = `${countryCode}${phoneNumber}`;
	const run = async (action, onError) => {
		setBusy(true);
		try {
			return await action();
		} catch (err) {
			onError(err);
			return null;
		} finally {
			setBusy(false);
		}
	};
	(0, import_react.useEffect)(() => {
		if (method !== "totp" || started.current) return;
		started.current = true;
		run(() => session.setupAuthenticator(), setError).then((result) => result && setSetup(result));
	}, [method, session]);
	const sendCode = async () => {
		setFieldError(null);
		setError(null);
		setResendError(null);
		if (!isPlausiblePhone(fullPhone)) {
			setFieldError(INVALID_PHONE);
			return;
		}
		if (await run(() => session.sendPhoneCode(fullPhone), (err) => {
			if (err.message?.toLowerCase().includes("phone")) setFieldError("Invalid phone number. Please check the number and try again.");
			else setError(err);
		})) {
			setStep("code");
			setCode("");
			setCooldown(SMS_RESEND_SECONDS$2);
		}
	};
	const resend = async () => {
		if (cooldown > 0) return;
		setResendError(null);
		try {
			await session.sendPhoneCode(fullPhone);
			setCooldown(SMS_RESEND_SECONDS$2);
		} catch (err) {
			setResendError(err.message || "Failed to resend");
		}
	};
	const confirm = async (value = code) => {
		if (busy) return;
		if (value.length !== 6) {
			setFieldError(FULL_CODE);
			return;
		}
		setFieldError(null);
		setError(null);
		const result = await run(() => method === "totp" ? session.confirmAuthenticator(value) : session.confirmPhone(value), (err) => err.mustSignInAgain ? setError(err) : setFieldError(err.message || "Invalid code"));
		if (result) onDone(result);
	};
	const backToStart = () => {
		setStep("start");
		setCode("");
		setFieldError(null);
		setError(null);
		setResendError(null);
	};
	const actions = (secondary, onSecondary, primary, onPrimary, disabled = false) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-2 gap-3 pt-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			className: "h-11",
			disabled: busy,
			onClick: onSecondary,
			children: secondary
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			className: "h-11",
			disabled: busy || disabled,
			onClick: onPrimary,
			children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }), primary]
		})]
	});
	if (method === "totp" && step === "start") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-semibold text-center",
				children: "Set up your authenticator app"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MfaNotice, {
				error,
				signInPath
			}),
			!setup && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mx-auto w-6 h-6 animate-spin text-muted-foreground" }),
			setup && (isTouchDevice() ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "list-decimal pl-5 space-y-1 text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Copy the key below." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "In your authenticator app, add an account and paste the key." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Come back here and enter the code the app shows." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						className: "block rounded-lg border border-border px-3 py-3 text-center font-mono font-medium tracking-wider break-all",
						children: setup.secret_formatted
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyKeyButton, {
						text: setup.secret_formatted,
						wide: true
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: "Scan the QR code with your authenticator app"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: setup.qr_code,
						alt: "QR code for authenticator app setup",
						className: "w-36 h-36 rounded-lg border border-border bg-white p-1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground mt-3",
						children: "Can't scan the code? Enter it manually:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "font-mono font-medium tracking-wider break-all",
							children: setup.secret_formatted
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyKeyButton, { text: setup.secret_formatted })]
					})
				]
			})),
			actions("Cancel", onBack, "Continue", () => setStep("code"), !setup)
		]
	});
	if (method === "sms" && step === "start") {
		const phoneError = fieldError ?? (error && !error.mustSignInAgain ? error.message : null);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold text-center",
					children: "Enter your phone number"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground text-center",
					children: "A verification code will be sent to this number to confirm it's yours."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "mfa-phone",
						children: "Phone number"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneField, {
						countryCode,
						onCountryCodeChange: setCountryCode,
						phoneNumber,
						onPhoneNumberChange: (value) => {
							setPhoneNumber(value);
							setFieldError(null);
						},
						error: phoneError,
						onSubmit: !busy && phoneNumber.length >= 4 ? sendCode : void 0
					})]
				}),
				error?.mustSignInAgain && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MfaNotice, {
					error,
					signInPath
				}),
				actions("Cancel", onBack, "Send Code", sendCode, phoneNumber.length < 4)
			]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-semibold text-center",
				children: method === "totp" ? "Enter a code from your authenticator app" : "Verify your phone number"
			}),
			method === "sms" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground text-center",
				children: [
					"A 6-digit code sent to ",
					countryCode,
					" ",
					phoneNumber
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeField, {
						id: "mfa-setup-code",
						value: code,
						onChange: (value) => {
							setCode(value);
							setFieldError(null);
						},
						onComplete: confirm,
						hasError: Boolean(fieldError)
					}),
					fieldError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-destructive",
						children: fieldError
					}),
					method === "totp" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Codes refresh every 30 seconds."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResendLine, {
						cooldown,
						onResend: resend,
						error: resendError
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MfaNotice, {
				error,
				signInPath
			}),
			actions("Back", backToStart, "Verify", () => confirm())
		]
	});
}
var SMS_RESEND_SECONDS$1 = 60;
function MfaFlow({ challenge, returnTo, onManage }) {
	const session = (0, import_react.useMemo)(() => mfaSession(challenge), [challenge]);
	const finish = (result) => result.mfa_management_token && onManage ? onManage(session) : finishSignIn(result.access_token, returnTo);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "session-record-block",
		children: challenge.next_step === "enroll" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Enroll, {
			session,
			onDone: finish
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Verify, {
			session,
			challenge,
			returnTo,
			onDone: finish
		})
	});
}
function Enroll({ session, onDone }) {
	const [method, setMethod] = (0, import_react.useState)(null);
	const info = useAppInfo();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MfaHeader, {
		title: info && `${info.name || "This app"} requires multi-factor authentication`,
		description: method ? null : "Add a second sign-in step to keep your account secure. Choose how you want to get your codes."
	}), method ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MfaMethodSetup, {
		session,
		method,
		onDone,
		onBack: () => setMethod(null)
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "w-full h-12 font-medium",
			onClick: () => setMethod("totp"),
			children: "Set up your authenticator app"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			className: "w-full h-12 font-medium",
			onClick: () => setMethod("sms"),
			children: "Enter your phone number"
		})]
	})] });
}
function Verify({ session, challenge, returnTo, onDone }) {
	const methods = challenge.mfa_methods;
	const [method, setMethod] = (0, import_react.useState)(methods.includes("totp") ? "totp" : "sms");
	const [code, setCode] = (0, import_react.useState)("");
	const [remember, setRemember] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [sending, setSending] = (0, import_react.useState)(false);
	const [cooldown, setCooldown] = useCooldown();
	const sent = (0, import_react.useRef)(false);
	const phone = challenge.phone_hint || "your phone";
	const sendCode = async () => {
		setError(null);
		setSending(true);
		try {
			await session.sendSignInCode();
			setCooldown(SMS_RESEND_SECONDS$1);
		} catch (err) {
			setError(err);
		} finally {
			setSending(false);
		}
	};
	(0, import_react.useEffect)(() => {
		if (method !== "sms" || sent.current) return;
		sent.current = true;
		sendCode();
	}, [method]);
	const verify = async (value = code) => {
		if (busy || value.length < 6) return;
		setError(null);
		setBusy(true);
		try {
			onDone(await session.verify(value, method, remember));
		} catch (err) {
			setError(err);
			setCode("");
			setBusy(false);
		}
	};
	const other = methods.find((value) => value !== method);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MfaHeader, { title: "Verify your identity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MfaNotice, { error }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground text-center",
				children: method === "totp" ? "Enter the code from your authenticator app" : sending && !cooldown ? `Sending code to ${phone}…` : `Enter the code sent to ${phone}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeField, {
				id: "mfa-code",
				value: code,
				onChange: setCode,
				onComplete: verify
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RememberDevice, {
				checked: remember,
				onChange: setRemember
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "w-full h-12 font-medium",
				disabled: busy || code.length < 6,
				onClick: () => verify(),
				children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }), busy ? "Verifying..." : "Verify"]
			}),
			method === "sms" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResendLine, {
				cooldown,
				disabled: sending,
				onResend: sendCode
			}),
			other && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				className: "w-full",
				onClick: () => {
					setMethod(other);
					setCode("");
					setError(null);
				},
				children: other === "sms" ? "Verify via Text Message" : "Verify via Authenticator App"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: returnTo && returnTo !== "/" ? "/login?returnTo=" + encodeURIComponent(returnTo) : "/login",
					className: "text-sm text-muted-foreground hover:underline",
					children: "Back to Login"
				})
			})
		]
	})] });
}
var METHODS = [{
	id: "totp",
	name: "Authenticator app",
	icon: Smartphone,
	description: "Use an app like Google Authenticator or Duo to generate secure sign-in codes."
}, {
	id: "sms",
	name: "Text messages",
	icon: MessageSquare,
	description: "Get sign-in codes sent to your phone by text message."
}];
var SMS_RESEND_SECONDS = 30;
function MfaManage({ session, returnTo }) {
	const [status, setStatus] = (0, import_react.useState)(null);
	const [view, setView] = (0, import_react.useState)({ name: "list" });
	const [error, setError] = (0, import_react.useState)(null);
	const load = async () => {
		setError(null);
		try {
			setStatus(await session.status());
		} catch (err) {
			setError(err);
		}
	};
	(0, import_react.useEffect)(() => {
		load();
	}, [session]);
	const back = () => {
		setView({ name: "list" });
		load();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "session-record-block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MfaHeader, {
				title: "Two-factor authentication",
				description: "Add an extra layer of protection when signing in. You'll be asked for a code each time you sign in."
			}),
			view.name === "setup" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MfaMethodSetup, {
				session,
				method: view.method,
				signInPath: "/mfa",
				onDone: back,
				onBack: () => setView({ name: "list" })
			}),
			view.name === "disable" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disable, {
				session,
				method: view.method,
				onDone: back,
				onBack: () => setView({ name: "list" })
			}),
			view.name === "list" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MfaNotice, {
						error,
						signInPath: "/mfa"
					}),
					!status && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mx-auto w-6 h-6 animate-spin text-muted-foreground" }),
					status && METHODS.map(({ id, name, icon: Icon, description }) => {
						const enrolled = status.methods.includes(id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-3 rounded-lg border border-border p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "w-5 h-5 text-muted-foreground shrink-0",
									"aria-hidden": "true"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-[10rem]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: enrolled ? id === "sms" && status.phone_hint ? `Enabled · ${status.phone_hint}` : "Enabled" : description
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2 ml-auto",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "outline",
										onClick: () => setView({
											name: "setup",
											method: id
										}),
										children: enrolled ? "Replace" : "Enable"
									}), enrolled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: () => setView({
											name: "disable",
											method: id
										}),
										children: "Disable"
									})]
								})
							]
						}, id);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full h-12 font-medium",
						onClick: () => {
							window.location.href = returnTo;
						},
						children: "Done"
					})
				]
			})
		]
	});
}
function Disable({ session, method, onDone, onBack }) {
	const [code, setCode] = (0, import_react.useState)("");
	const [codeSent, setCodeSent] = (0, import_react.useState)(method === "totp");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [cooldown, setCooldown] = useCooldown();
	const run = async (task) => {
		setError(null);
		setBusy(true);
		try {
			return await task();
		} catch (err) {
			setError(err);
			return null;
		} finally {
			setBusy(false);
		}
	};
	const sendCode = async () => {
		if (await run(() => session.sendProofCode())) {
			setCodeSent(true);
			setCooldown(SMS_RESEND_SECONDS);
		}
	};
	const confirm = async (value = code) => {
		if (busy || value.length < 6) return;
		if (await run(() => session.removeMethod(method, value, method))) onDone();
		else setCode("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-semibold text-center",
				children: method === "totp" ? "Enter a code from your authenticator app" : "Verify with a code sent to your phone"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MfaNotice, {
				error,
				signInPath: "/mfa"
			}),
			codeSent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeField, {
				id: "mfa-disable-code",
				value: code,
				onChange: setCode,
				onComplete: confirm
			}), method === "sms" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResendLine, {
				cooldown,
				disabled: busy,
				onResend: sendCode
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "w-full h-11",
				disabled: busy,
				onClick: sendCode,
				children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }), "Send Code"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					className: "h-11",
					disabled: busy,
					onClick: onBack,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "h-11",
					disabled: busy || !codeSent || code.length < 6,
					onClick: () => confirm(),
					children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }), "Verify & Disable"]
				})]
			})
		]
	});
}
var PROVIDERS = [
	{
		id: "google",
		flag: "enable_google_login",
		name: "Google"
	},
	{
		id: "microsoft",
		flag: "enable_microsoft_login",
		name: "Microsoft"
	},
	{
		id: "facebook",
		flag: "enable_facebook_login",
		name: "Facebook"
	},
	{
		id: "apple",
		flag: "enable_apple_login",
		name: "Apple"
	}
];
function MfaPage() {
	const returnTo = safeReturnTo();
	const [challenge, setChallenge] = (0, import_react.useState)(null);
	const [managing, setManaging] = (0, import_react.useState)(null);
	const [resuming, setResuming] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		resumeMfa().then((result) => {
			if (result?.access_token) return finishSignIn(result.access_token, returnTo);
			if (result) setChallenge(result);
			setResuming(false);
		}).catch((err) => {
			setError(err);
			setResuming(false);
		});
	}, []);
	if (resuming) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-8 h-8 animate-spin text-muted-foreground" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MfaScreen, { children: managing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MfaManage, {
		session: managing,
		returnTo
	}) : challenge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MfaFlow, {
		challenge,
		returnTo,
		onManage: setManaging
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmIdentity, {
		returnTo,
		onChallenge: setChallenge,
		initialError: error
	}) });
}
function ConfirmIdentity({ returnTo, onChallenge, initialError }) {
	const info = useAppInfo();
	const options = info ? info.auth_config || {} : null;
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(initialError);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const submit = async (e) => {
		e.preventDefault();
		setError(null);
		setBusy(true);
		try {
			onChallenge(await signInToManageMfa(email, password));
		} catch (err) {
			setError(err);
			setBusy(false);
		}
	};
	const withProvider = (provider) => signInWithProvider(provider, returnTo, { manage: true }).catch(setError);
	const providers = options ? PROVIDERS.filter((provider) => options[provider.flag] ?? provider.id === "google") : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MfaHeader, {
			title: info && `Welcome to ${info.name || "the app"}`,
			description: "Sign in to continue"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MfaNotice, { error }),
		!options && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mx-auto w-6 h-6 animate-spin text-muted-foreground" }),
		options && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				providers.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					className: "w-full h-12 text-sm font-medium",
					onClick: () => withProvider(provider.id),
					children: [
						provider.id === "google" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleIcon, { className: "w-5 h-5 mr-2" }),
						"Continue with ",
						provider.name
					]
				}, provider.id)),
				(options.enable_sso_login || options.use_workspace_sso) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					className: "w-full h-12 text-sm font-medium",
					onClick: () => withProvider("sso"),
					children: "Continue with SSO"
				}),
				options.enable_username_password && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "mfa-email",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
									className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "mfa-email",
									type: "email",
									autoComplete: "email",
									placeholder: "you@example.com",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									className: "pl-10 h-12",
									required: true
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "mfa-password",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
									className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "mfa-password",
									type: "password",
									autoComplete: "current-password",
									placeholder: "••••••••",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									className: "pl-10 h-12",
									required: true
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							className: "w-full h-12 font-medium",
							disabled: busy,
							children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }), "Continue"]
						})
					]
				})
			]
		})
	] });
}
var SplitComponent = MfaPage;
export { SplitComponent as component };
