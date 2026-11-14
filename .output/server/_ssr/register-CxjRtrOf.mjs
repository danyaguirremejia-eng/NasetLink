import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/react.mjs";
import { Link } from "../_libs/@tanstack/react-router+[2...].mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import { browserLocalPersistence, browserSessionPersistence, createUserWithEmailAndPassword, setPersistence, signInWithPopup, updateProfile } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase2.mjs";
import { toast } from "../_libs/sonner.mjs";
import { Check } from "../_libs/lucide-react10.mjs";
import { ChevronDown } from "../_libs/lucide-react11.mjs";
import { ChevronUp } from "../_libs/lucide-react13.mjs";
import { Link2 } from "../_libs/lucide-react33.mjs";
import { Lock } from "../_libs/lucide-react36.mjs";
import { Mail } from "../_libs/lucide-react39.mjs";
import { User } from "../_libs/lucide-react57.mjs";
import { auth, cn, googleProvider } from "./router-DtpLq15p.mjs";
import { GoogleIcon, Input, Label } from "./label-D9OP1Q-n.mjs";
import { AuthError, AuthLink, SubmitButton } from "./parts-DC-5Otov.mjs";
import { Checkbox as Checkbox$1, CheckboxIndicator } from "../_libs/radix-ui__react-checkbox.mjs";
import { Select as Select$1, SelectContent as SelectContent$1, SelectIcon, SelectItem as SelectItem$1, SelectItemIndicator, SelectItemText, SelectLabel as SelectLabel$1, SelectPortal, SelectScrollDownButton as SelectScrollDownButton$1, SelectScrollUpButton as SelectScrollUpButton$1, SelectSeparator as SelectSeparator$1, SelectTrigger as SelectTrigger$1, SelectValue as SelectValue$1, SelectViewport } from "../_libs/@radix-ui/react-select+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/register-CxjRtrOf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("flex items-center justify-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectSeparator$1.displayName;
var COUNTRIES = [
	{
		code: "AR",
		name: "Argentina",
		dial: "+54"
	},
	{
		code: "BO",
		name: "Bolivia",
		dial: "+591"
	},
	{
		code: "BR",
		name: "Brasil",
		dial: "+55"
	},
	{
		code: "CL",
		name: "Chile",
		dial: "+56"
	},
	{
		code: "CO",
		name: "Colombia",
		dial: "+57"
	},
	{
		code: "CR",
		name: "Costa Rica",
		dial: "+506"
	},
	{
		code: "CU",
		name: "Cuba",
		dial: "+53"
	},
	{
		code: "EC",
		name: "Ecuador",
		dial: "+593"
	},
	{
		code: "SV",
		name: "El Salvador",
		dial: "+503"
	},
	{
		code: "ES",
		name: "España",
		dial: "+34"
	},
	{
		code: "GT",
		name: "Guatemala",
		dial: "+502"
	},
	{
		code: "HN",
		name: "Honduras",
		dial: "+504"
	},
	{
		code: "MX",
		name: "México",
		dial: "+52"
	},
	{
		code: "NI",
		name: "Nicaragua",
		dial: "+505"
	},
	{
		code: "PA",
		name: "Panamá",
		dial: "+507"
	},
	{
		code: "PY",
		name: "Paraguay",
		dial: "+595"
	},
	{
		code: "PE",
		name: "Perú",
		dial: "+51"
	},
	{
		code: "PR",
		name: "Puerto Rico",
		dial: "+1"
	},
	{
		code: "DO",
		name: "República Dominicana",
		dial: "+1"
	},
	{
		code: "UY",
		name: "Uruguay",
		dial: "+598"
	},
	{
		code: "VE",
		name: "Venezuela",
		dial: "+58"
	}
];
var REFERRAL_SOURCES = [
	"YouTube",
	"TikTok",
	"Discord",
	"Recomendación",
	"Otro"
];
var inputClass = "h-12 border-white/10 bg-[#0b1324] pl-10 text-sm text-white placeholder:text-slate-500 focus-visible:ring-primary";
var triggerClass = "h-12 border-white/10 bg-[#0b1324] text-sm text-white data-[placeholder]:text-slate-500 focus:ring-primary";
function Field({ id, label, children, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: id,
				className: "text-sm font-medium text-slate-200",
				children: label
			}),
			children,
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: hint
			})
		]
	});
}
function IconInput({ icon: Icon, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500",
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			className: inputClass,
			...props
		})]
	});
}
function RegisterForm({ values, onChange, onSubmit, onGoogle, busy, error }) {
	const set = (key) => (e) => onChange(key, e?.target ? e.target.value : e);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: onGoogle,
			disabled: busy,
			className: "flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-white text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a] disabled:opacity-50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleIcon, { className: "h-5 w-5" }), "Continuar con Google"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "my-6 flex items-center gap-3",
			role: "separator",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-white/10" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
					children: "o regístrate con tu email"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-white/10" })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthError, { children: error }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "space-y-4",
			noValidate: true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "reg-name",
					label: "Nombre completo",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconInput, {
						icon: User,
						id: "reg-name",
						autoComplete: "name",
						placeholder: "Tu nombre y apellido",
						value: values.fullName,
						onChange: set("fullName"),
						disabled: busy,
						required: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "reg-email",
					label: "Email",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconInput, {
						icon: Mail,
						id: "reg-email",
						type: "email",
						autoComplete: "email",
						placeholder: "tu@email.com",
						value: values.email,
						onChange: set("email"),
						disabled: busy,
						required: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "reg-password",
						label: "Contraseña",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconInput, {
							icon: Lock,
							id: "reg-password",
							type: "password",
							autoComplete: "new-password",
							placeholder: "Mínimo 8 caracteres",
							minLength: 8,
							value: values.password,
							onChange: set("password"),
							disabled: busy,
							required: true
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "reg-confirm",
						label: "Confirmar contraseña",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconInput, {
							icon: Lock,
							id: "reg-confirm",
							type: "password",
							autoComplete: "new-password",
							placeholder: "Repite tu contraseña",
							value: values.confirm,
							onChange: set("confirm"),
							disabled: busy,
							required: true
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "reg-channel",
					label: "Link de tu canal / red principal",
					hint: "YouTube, TikTok u otra red donde publicas.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconInput, {
						icon: Link2,
						id: "reg-channel",
						type: "url",
						inputMode: "url",
						placeholder: "https://youtube.com/@tucanal",
						value: values.channelUrl,
						onChange: set("channelUrl"),
						disabled: busy,
						required: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "reg-country",
						label: "País",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: values.country,
							onValueChange: set("country"),
							disabled: busy,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								id: "reg-country",
								className: triggerClass,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecciona tu país" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
								className: "max-h-72",
								children: COUNTRIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: c.code,
									children: c.name
								}, c.code))
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "reg-source",
						label: "¿Cómo nos encontraste?",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: values.referralSource,
							onValueChange: set("referralSource"),
							disabled: busy,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								id: "reg-source",
								className: triggerClass,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecciona una opción" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: REFERRAL_SOURCES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: s,
								children: s
							}, s)) })]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "reg-whatsapp",
					label: "WhatsApp",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: values.dialCountry,
							onValueChange: set("dialCountry"),
							disabled: busy,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"aria-label": "Código de país",
								className: `${triggerClass} w-[112px] shrink-0`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "+00" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
								className: "max-h-72",
								children: COUNTRIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
									value: c.code,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-xs text-muted-foreground",
											children: c.code
										}),
										" ",
										c.dial
									]
								}, c.code))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "reg-whatsapp",
							type: "tel",
							inputMode: "tel",
							autoComplete: "tel-national",
							placeholder: "Número sin código",
							value: values.whatsapp,
							onChange: (e) => onChange("whatsapp", e.target.value.replace(/[^\d\s-]/g, "")),
							className: `${inputClass} pl-3`,
							disabled: busy,
							required: true
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						id: "reg-terms",
						checked: values.terms,
						onCheckedChange: (v) => onChange("terms", v === true),
						disabled: busy,
						className: "mt-0.5"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
						htmlFor: "reg-terms",
						className: "text-sm font-normal leading-relaxed text-slate-300",
						children: [
							"Acepto los",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								hash: "terminos",
								className: "font-medium text-primary hover:underline",
								children: "Términos y Condiciones"
							}),
							" ",
							"y la",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								hash: "privacidad",
								className: "font-medium text-primary hover:underline",
								children: "Política de Privacidad"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						id: "reg-remember",
						checked: values.rememberMe,
						onCheckedChange: (v) => onChange("rememberMe", v === true),
						disabled: busy,
						className: "mt-0.5"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "reg-remember",
						className: "text-sm font-normal leading-relaxed text-slate-300 cursor-pointer select-none",
						children: "Recordar mi sesión (No aplica para Google)"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitButton, {
					busy,
					busyLabel: "Creando tu cuenta...",
					className: "h-12 w-full rounded-xl bg-primary text-base font-semibold shadow-[0_10px_30px_-10px_rgba(59,130,246,.9)] hover:bg-primary/90",
					children: "Crear mi cuenta"
				})
			]
		})
	] });
}
function RegisterShell({ title, subtitle, children, footer }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "naset-bg relative min-h-screen text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid-lines pointer-events-none absolute inset-0",
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "relative mx-auto flex min-h-screen w-full max-w-lg flex-col px-4 py-8 sm:py-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "mx-auto mb-8 flex items-center gap-2.5",
					"aria-label": "NASETLINK, ir al inicio",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563eb] to-[#3b82f6] shadow-[0_0_24px_-4px_rgba(59,130,246,.9)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							viewBox: "0 0 24 24",
							fill: "none",
							className: "h-5 w-5 text-white",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M9.5 14.5 14.5 9.5M8 16l-1.2 1.2a3.4 3.4 0 1 1-4.8-4.8L5 9.4M16 8l1.2-1.2a3.4 3.4 0 1 1 4.8 4.8L19 14.6",
								stroke: "currentColor",
								strokeWidth: "2.2",
								strokeLinecap: "round"
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-heading text-lg font-bold tracking-[0.2em] text-white",
						children: ["NASET", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: "LINK"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-heading text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl",
						children: title
					}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-pretty text-sm text-muted-foreground sm:text-base",
						children: subtitle
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "panel rounded-2xl p-5 sm:p-8",
					children
				}),
				footer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 text-center text-sm text-muted-foreground",
					children: footer
				})
			]
		})]
	});
}
var INITIAL = {
	fullName: "",
	email: "",
	password: "",
	confirm: "",
	channelUrl: "",
	country: "",
	referralSource: "",
	dialCountry: "MX",
	whatsapp: "",
	terms: false,
	rememberMe: true
};
function isHttpUrl(value) {
	try {
		const url = new URL(value);
		return url.protocol === "https:" || url.protocol === "http:";
	} catch {
		return false;
	}
}
function validate(v) {
	if (v.fullName.trim().length < 2) return "Escribe tu nombre completo.";
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) return "Escribe un email válido.";
	if (v.password.length < 8) return "La contraseña debe tener al menos 8 caracteres.";
	if (v.password !== v.confirm) return "Las contraseñas no coinciden.";
	if (!isHttpUrl(v.channelUrl.trim())) return "Escribe el link completo de tu canal.";
	if (!v.country) return "Selecciona tu país.";
	if (!v.referralSource) return "Cuéntanos cómo nos encontraste.";
	if (v.whatsapp.replace(/\D/g, "").length < 6) return "Escribe un número de WhatsApp válido.";
	if (!v.terms) return "Debes aceptar los Términos y Condiciones.";
	return "";
}
function RegisterPage() {
	const [values, setValues] = (0, import_react.useState)(INITIAL);
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const email = values.email.trim();
	function change(key, value) {
		setValues((prev) => {
			const next = {
				...prev,
				[key]: value
			};
			if (key === "country" && !prev.whatsapp) next.dialCountry = value;
			return next;
		});
	}
	async function register(e) {
		e.preventDefault();
		const problem = validate(values);
		setError(problem);
		if (problem) return;
		setBusy(true);
		try {
			await setPersistence(auth, values.rememberMe ? browserLocalPersistence : browserSessionPersistence);
			const userCredential = await createUserWithEmailAndPassword(auth, email, values.password);
			await updateProfile(userCredential.user, { displayName: values.fullName.trim() });
			toast.success("¡Cuenta creada con éxito!");
			setTimeout(() => {
				window.location.href = "/dashboard";
			}, 500);
		} catch (err) {
			console.error(err);
			if (err.code === "auth/email-already-in-use") setError("Este correo ya está registrado. Intenta iniciar sesión.");
			else setError(err.message || "No pudimos crear tu cuenta. Inténtalo de nuevo.");
			setBusy(false);
		}
	}
	async function google() {
		setError("");
		setBusy(true);
		try {
			await setPersistence(auth, browserLocalPersistence);
			await signInWithPopup(auth, googleProvider);
			toast.success("¡Bienvenido!");
			setTimeout(() => {
				window.location.href = "/dashboard";
			}, 500);
		} catch (err) {
			console.error(err);
			setError(err.message || "No pudimos iniciar sesión con Google.");
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegisterShell, {
		title: "Crea tu cuenta",
		subtitle: "Empieza a monetizar tus enlaces con NASETLINK",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["¿Ya tienes una cuenta? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthLink, {
			to: "/login",
			children: "Inicia sesión"
		})] }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegisterForm, {
			values,
			onChange: change,
			onSubmit: register,
			onGoogle: google,
			busy,
			error
		})
	});
}
var SplitComponent = RegisterPage;
export { SplitComponent as component };
