window.addEventListener("DOMContentLoaded", () => {
	const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

	const mobileMenu = document.querySelector("[data-menu]");
	const mobileToggle = document.querySelector("[data-menu-toggle]");

	if (mobileMenu && mobileToggle) {
		const closeMenu = (focusToggle = false) => {
			mobileMenu.classList.remove("is-open");
			mobileToggle.setAttribute("aria-expanded", "false");
			document.body.classList.remove("mobile-menu-open");
			if (focusToggle) {
				mobileToggle.focus();
			}
		};

		const openMenu = () => {
			mobileMenu.classList.add("is-open");
			mobileToggle.setAttribute("aria-expanded", "true");
			document.body.classList.add("mobile-menu-open");
		};

		mobileToggle.addEventListener("click", () => {
			const expanded = mobileToggle.getAttribute("aria-expanded") === "true";
			if (expanded) {
				closeMenu();
			} else {
				openMenu();
			}
		});

		window.addEventListener("resize", () => {
			if (window.innerWidth >= 1024) {
				closeMenu();
			}
		});

		mobileMenu.addEventListener("click", (event) => {
			const target = event.target;
			if (target instanceof HTMLElement) {
				const link = target.closest("a");
				if (link) {
					closeMenu();
				}
			}
		});

		document.addEventListener("keydown", (event) => {
			if (
				event.key === "Escape" &&
				mobileToggle.getAttribute("aria-expanded") === "true"
			) {
				closeMenu(true);
			}
		});
	}

	// Fade-in del hero
	tl.from("header", { y: -30, opacity: 0, duration: 0.5 })
		.from("h1", { y: 20, opacity: 0, duration: 0.6 }, "-=.2")
		.from(
			".mt-6, .mt-8 a",
			{ y: 16, opacity: 0, stagger: 0.08, duration: 0.5 },
			"-=.3"
		);

	// Dibujo del óvalo de "Right"
	const ellipse = document.querySelector("#rightEllipse ellipse");
	if (ellipse) {
		const len = ellipse.getTotalLength ? ellipse.getTotalLength() : 1000;
		ellipse.style.strokeDasharray = len;
		ellipse.style.strokeDashoffset = len;
		gsap.to(ellipse, { strokeDashoffset: 0, duration: 1.2, delay: 0.2 });
	}

	// Garabatos
	["#scribbleTop path", "#scribbleBottom path"].forEach((sel, i) => {
		const p = document.querySelector(sel);
		if (!p) return;
		const L = p.getTotalLength ? p.getTotalLength() : 120;
		p.style.strokeDasharray = L;
		p.style.strokeDashoffset = L;
		gsap.to(p, {
			strokeDashoffset: 0,
			duration: 0.9,
			delay: 0.4 + i * 0.2,
		});
	});

	// // Flotado sutil de la llanta
	// gsap.to("#tire", {
	// 	y: -8,
	// 	rotation: -2,
	// 	duration: 2.4,
	// 	ease: "sine.inOut",
	// 	yoyo: true,
	// 	repeat: -1,
	// });
	// === Rotación automática de llantas ===
	const tireEl = document.getElementById("tire");

	if (tireEl) {
		// Cambia estos paths por tus archivos reales:
		const TIRE_SOURCES = [
			"../assets/img/ltraSport.png",
			"../assets/img/terragrip.png",
			"../assets/img/terrain.png",
		];

		// Preload para que el cambio sea instantáneo
		TIRE_SOURCES.forEach((src) => {
			const img = new Image();
			img.src = src;
		});

		let idx = 0;
		const EVERY_SEC = 4; // cada 4s (ajústalo)

		function swapTire() {
			const next = TIRE_SOURCES[(idx + 1) % TIRE_SOURCES.length];

			// Timeline del cambio suave
			gsap
				.timeline({ defaults: { ease: "power2.inOut" } })
				.to(tireEl, { opacity: 0, y: 20, scale: 0.98, duration: 0.45 })
				.add(() => {
					tireEl.src = next; // Cambiamos la imagen
					idx = (idx + 1) % TIRE_SOURCES.length;
				})
				.to(tireEl, { opacity: 1, y: 0, scale: 1, duration: 0.55 });

			// Programamos el siguiente cambio
			gsap.delayedCall(EVERY_SEC, swapTire);
		}

		// Inicia el ciclo tras un pequeño delay
		gsap.delayedCall(EVERY_SEC, swapTire);
	}
});

// Tabs simple
const tabVehicle = document.getElementById("tabByVehicle");
const tabSize = document.getElementById("tabBySize");
const formVeh = document.getElementById("finderByVehicle");
const formSize = document.getElementById("finderBySize");

if (tabVehicle && tabSize) {
	tabVehicle.addEventListener("click", () => {
		formVeh.classList.remove("hidden");
		formSize.classList.add("hidden");
		tabVehicle.classList.add("bg-[var(--brand)]", "text-white");
		tabSize.classList.remove("bg-[var(--brand)]", "text-white");
		tabSize.classList.add("text-white/80");
	});
	tabSize.addEventListener("click", () => {
		formSize.classList.remove("hidden");
		formVeh.classList.add("hidden");
		tabSize.classList.add("bg-[var(--brand)]", "text-white");
		tabVehicle.classList.remove("bg-[var(--brand)]", "text-white");
		tabVehicle.classList.add("text-white/80");
	});
}

// --- Datos demo (coordenadas reales de ciudades: CDMX, GDL, MTY, Houston, Dallas, LA) ---
const DEALERS = [
	{
		id: 1,
		name: "Durable Tire Roma",
		city: "CDMX",
		lat: 19.416,
		lng: -99.162,
		phone: "+52 55 0000 0001",
		address: "Col. Roma Norte, CDMX",
		services: ["install", "balance"],
		hours: "Mon-Sat 9–18",
	},
	{
		id: 2,
		name: "Durable Tire Reforma",
		city: "CDMX",
		lat: 19.427,
		lng: -99.166,
		phone: "+52 55 0000 0002",
		address: "Paseo de la Reforma, CDMX",
		services: ["install", "247"],
		hours: "24/7",
	},
	{
		id: 3,
		name: "Durable Tire MTY",
		city: "Monterrey",
		lat: 25.667,
		lng: -100.31,
		phone: "+52 81 0000 0003",
		address: "San Pedro, NL",
		services: ["install"],
		hours: "Mon-Sat 9–18",
	},
	{
		id: 4,
		name: "Durable Tire GDL",
		city: "Guadalajara",
		lat: 20.676,
		lng: -103.347,
		phone: "+52 33 0000 0004",
		address: "Providencia, Jal.",
		services: ["install", "balance"],
		hours: "Mon-Fri 9–18",
	},
	{
		id: 5,
		name: "Durable Tire Houston",
		city: "Houston",
		lat: 29.76,
		lng: -95.369,
		phone: "+1 713 000 0005",
		address: "Downtown, TX",
		services: ["install", "247"],
		hours: "24/7",
	},
	{
		id: 6,
		name: "Durable Tire Dallas",
		city: "Dallas",
		lat: 32.776,
		lng: -96.797,
		phone: "+1 214 000 0006",
		address: "Design District, TX",
		services: ["install"],
		hours: "Mon-Sat 9–18",
	},
	{
		id: 7,
		name: "Durable Tire LA",
		city: "Los Angeles",
		lat: 34.052,
		lng: -118.244,
		phone: "+1 213 000 0007",
		address: "Arts District, CA",
		services: ["install", "balance"],
		hours: "Mon-Sat 9–18",
	},
];

// --- helpers ---
const rad = (d) => (d * Math.PI) / 180;
function haversine(a, b) {
	const R = 6371; // km
	const dLat = rad(b.lat - a.lat),
		dLng = rad(b.lng - a.lng);
	const s =
		Math.sin(dLat / 2) ** 2 +
		Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
	return 2 * R * Math.asin(Math.sqrt(s));
}
function parseLocation(input) {
	// "lat,lon" o texto suelto: mapeo rápido a ciudades demo
	const direct = input.split(",").map((s) => s.trim());
	if (
		direct.length === 2 &&
		!isNaN(parseFloat(direct[0])) &&
		!isNaN(parseFloat(direct[1]))
	) {
		return { lat: parseFloat(direct[0]), lng: parseFloat(direct[1]) };
	}
	const t = input.toLowerCase();
	if (t.includes("mty") || t.includes("monterrey"))
		return { lat: 25.667, lng: -100.31 };
	if (
		t.includes("cdmx") ||
		t.includes("méxico") ||
		t.includes("mexico city") ||
		t.includes("reforma") ||
		t.includes("roma")
	)
		return { lat: 19.4326, lng: -99.1332 };
	if (t.includes("guadalajara") || t.includes("gdl"))
		return { lat: 20.676, lng: -103.347 };
	if (t.includes("houston")) return { lat: 29.76, lng: -95.369 };
	if (t.includes("dallas")) return { lat: 32.776, lng: -96.797 };
	if (t.includes("los angeles") || t.includes("la,"))
		return { lat: 34.052, lng: -118.244 };
	return null; // si no, el usuario puede usar "lat,lon"
}

// --- UI state ---
const form = document.getElementById("dealerForm");
const inputLoc = document.getElementById("dealerLocation");
const radiusSel = document.getElementById("dealerRadius");
const listEl = document.getElementById("dealerList");
const countEl = document.getElementById("resultCount");
const mapCanvas = document.getElementById("mapCanvas");
const rootStyles = getComputedStyle(document.documentElement);
const BRAND_COLOR =
	(rootStyles.getPropertyValue("--brand") || "#b424a7").trim() || "#b424a7";
const ACCENT_COLOR =
	(rootStyles.getPropertyValue("--accent") || "#c344b8").trim() || "#c344b8";
const filtersActive = { install: false, open: false, 247: false };
let lastOrigin = null;
let lastDealers = [];

let markersLayer = null;
// filtros chips
document.querySelectorAll(".chip[data-filter]").forEach((ch) => {
	ch.addEventListener("click", () => {
		const k = ch.getAttribute("data-filter");
		filtersActive[k] = !filtersActive[k];
		ch.setAttribute("data-active", String(filtersActive[k]));
	});
});
// <!-- JS: filtros, tilt y comparación -->

(function () {
	// --- Tabs de categoría ---
	const chips = document.querySelectorAll("#tire-lineup .tl-chip");
	const cards = document.querySelectorAll("#tireGrid .tire-card");
	chips.forEach((ch) => {
		ch.addEventListener("click", () => {
			chips.forEach((c) => c.setAttribute("data-active", "false"));
			ch.setAttribute("data-active", "true");
			const cat = ch.getAttribute("data-cat");
			cards.forEach((card) => {
				const show = cat === "all" || card.dataset.cat === cat;
				card.classList.toggle("hidden", !show);
			});
		});
	});

	// --- Tilt ligero (hover 3D) ---
	// cards.forEach((card) => {
	// 	const max = 10; // grados
	// 	function tilt(e) {
	// 		const r = card.getBoundingClientRect();
	// 		const x = (e.clientX - r.left) / r.width,
	// 			y = (e.clientY - r.top) / r.height;
	// 		const rx = (y - 0.5) * -2 * max;
	// 		const ry = (x - 0.5) * 2 * max;
	// 		card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
	// 	}
	// 	card.addEventListener("mousemove", tilt);
	// 	card.addEventListener(
	// 		"mouseleave",
	// 		() => (card.style.transform = "")
	// 	);
	// });

	// --- Compare tray ---
	const tray = document.getElementById("compareTray");
	const pills = document.getElementById("comparePills");
	const body = document.getElementById("compareBody");
	const btnClear = document.getElementById("clearCompare");
	const selected = new Map(); // model -> data

	function renderCompare() {
		const arr = [...selected.values()];
		tray.classList.toggle("hidden", arr.length === 0);
		// pills
		pills.innerHTML = arr
			.map(
				(d) => `
          <span class="pill">
            ${d.model}
            <button class="remove" data-model="${d.model}" title="Remove">✕</button>
          </span>
        `
			)
			.join("");
		// table
		body.innerHTML = arr
			.map(
				(d) => `
          <tr>
            <td class="py-2 pr-4 text-white">${d.model}</td>
            <td class="py-2 pr-4">${d.tread}</td>
            <td class="py-2 pr-4">${d.traction}</td>
            <td class="py-2 pr-4">${d.noise}</td>
            <td class="py-2 pr-4">${d.sizes}</td>
          </tr>
        `
			)
			.join("");
		// listeners remove
		pills.querySelectorAll(".remove").forEach((b) => {
			b.addEventListener("click", () => {
				selected.delete(b.dataset.model);
				renderCompare();
			});
		});
	}

	document.querySelectorAll("#tireGrid .addCompare").forEach((btn) => {
		btn.addEventListener("click", () => {
			const card = btn.closest(".tire-card");
			const data = {
				model: card.dataset.model,
				tread: card.dataset.tread,
				traction: card.dataset.traction,
				noise: card.dataset.noise,
				sizes: card.dataset.sizes,
			};
			if (selected.has(data.model)) {
				selected.delete(data.model);
			} else {
				selected.set(data.model, data);
			}
			renderCompare();
		});
	});

	// btnClear.addEventListener("click", () => {
	// 	selected.clear();
	// 	renderCompare();
	// });
})();

// <!-- Contadores animados -->

(function () {
	const els = document.querySelectorAll("#why-landscape-strength .counter");
	const ease = (t) => 1 - Math.pow(1 - t, 3);
	function animate(el) {
		const target = +el.getAttribute("data-target");
		const dur = 1200;
		const start = performance.now();
		function tick(now) {
			const p = Math.min(1, (now - start) / dur);
			el.textContent = Math.floor(ease(p) * target).toLocaleString();
			if (p < 1) requestAnimationFrame(tick);
		}
		requestAnimationFrame(tick);
	}
	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					animate(e.target);
					io.unobserve(e.target);
				}
			});
		},
		{ threshold: 0.5 }
	);
	els.forEach((el) => io.observe(el));
})();

// -------- Filtros --------
const chips = document.querySelectorAll("#corporate-news .chip[data-filter]");
const cards = document.querySelectorAll("#newsGrid [data-category]");
chips.forEach((ch) =>
	ch.addEventListener("click", () => {
		chips.forEach((c) => c.setAttribute("data-active", "false"));
		ch.setAttribute("data-active", "true");
		const f = ch.getAttribute("data-filter");
		cards.forEach((card) => {
			card.classList.toggle(
				"hidden",
				f !== "all" && card.dataset.category !== f
			);
		});
	})
);

// -------- Modal (vista rápida) --------
const modal = document.getElementById("newsModal");
const modalTitle = document.getElementById("newsModalTitle");
const modalBody = document.getElementById("newsModalBody");
const closeBtn = document.getElementById("newsModalClose");
function openModal({ title, body }) {
	modalTitle.textContent = title;
	modalBody.innerHTML = body;
	modal.classList.remove("hidden");
	document.body.style.overflow = "hidden";
}
function closeModal() {
	modal.classList.add("hidden");
	document.body.style.overflow = "";
}
// closeBtn.addEventListener("click", closeModal);
// modal.addEventListener("click", (e) => {
// 	if (e.target === modal) closeModal();
// });

document.querySelectorAll("[data-open]").forEach((btn) => {
	btn.addEventListener("click", () => {
		const id = btn.getAttribute("data-open");
		// contenido demo por id
		const content = {
			n1: {
				title: "NVH Test Center",
				body: "<p>Instalación con cámaras anecoicas y dinamómetros para validar QuietWave y compuestos ColdFlex™.</p>",
			},
			n2: {
				title: "Resultados Q2",
				body: "<p>Ingreso +12% A/A; margen +180 bps; capex enfocado en expansión MX.</p>",
			},
			n3: {
				title: "Urban Series",
				body: "<p>MultiContour-X, surcos profundos y compuesto DryGrip+™. Disponible en 16–20”.</p>",
			},
			n4: {
				title: "Reciclaje 2M",
				body: "<p>Programa de economía circular con partners regionales. -CO₂ y reutilización de materiales.</p>",
			},
			n5: {
				title: "Nueva planta MX",
				body: "<p>Automatización, ahorro energético y capacidad +35% para líneas All-Season.</p>",
			},
			n6: {
				title: "ColdFlex™ 2.0",
				body: "<p>Mejor elasticidad a baja temperatura; menor cristalización; más agarre invernal.</p>",
			},
			n7: {
				title: "Bono verde",
				body: "<p>Emisión por $120M destinada a proyectos ESG certificados.</p>",
			},
		}[id] || { title: "News", body: "<p>Content not found.</p>" };
		openModal(content);
	});
});

// -------- Load more (demo) --------
// document.getElementById("loadMoreNews").addEventListener("click", () => {
// 	const grid = document.getElementById("newsGrid");
// 	const tpl = grid.firstElementChild.cloneNode(true);
// 	// cambia fecha/título mínimos para distinguir
// 	tpl.querySelector("time").textContent = "Today";
// 	tpl.querySelector("h5").textContent = "Nueva nota corporativa (demo)";
// 	grid.appendChild(tpl);
// });

// ---------- Filtros ----------
const jobsList = document.getElementById("jobsList");
const fDept = document.getElementById("fDept");
const fLoc = document.getElementById("fLoc");
const fType = document.getElementById("fType");
const chips1 = document.querySelectorAll(
	"#recruitment .chip:not([data-static])"
);
const form1 = document.getElementById("jobsFilter");

let tagFilter = null;
chips1.forEach((ch) => {
	ch.addEventListener("click", () => {
		chips1.forEach((c) => c.setAttribute("data-active", "false"));
		const active =
			ch.getAttribute("data-active") === "true" ? null : ch.dataset.tag;
		tagFilter = active;
		if (active) {
			ch.setAttribute("data-active", "true");
		}
		applyFilters();
	});
});

// form1.addEventListener("submit", (e) => {
// 	e.preventDefault();
// 	applyFilters();
// });

function applyFilters() {
	const dept = fDept.value,
		loc = fLoc.value,
		type = fType.value;
	jobsList.querySelectorAll("article.rec-card").forEach((card) => {
		const okDept = !dept || card.dataset.dept === dept;
		const okLoc = !loc || card.dataset.loc === loc;
		const okType = !type || card.dataset.type === type;
		const okTag =
			!tagFilter || (card.dataset.tags || "").split(",").includes(tagFilter);
		card.classList.toggle("hidden", !(okDept && okLoc && okType && okTag));
	});
}

// ---------- Modal Apply ----------
const modal1 = document.getElementById("applyModal");
const modalClose = document.getElementById("applyClose");
const titleSpan = document.getElementById("applyJobTitle");

document.querySelectorAll(".applyBtn").forEach((btn) => {
	btn.addEventListener("click", () => {
		titleSpan.textContent = btn.dataset.job || "Role";
		modal1.classList.remove("hidden");
		document.body.style.overflow = "hidden";
	});
});
function closeModal() {
	modal1.classList.add("hidden");
	document.body.style.overflow = "";
}
// modalClose.addEventListener("click", closeModal);
// modal1.addEventListener("click", (e) => {
// 	if (e.target === modal1) closeModal();
// });

// Demo submit
// document.getElementById("applyForm").addEventListener("submit", (e) => {
// 	e.preventDefault();
// 	const fd = new FormData(e.target);
// 	alert(
// 		"Application sent (demo)\\n" +
// 			JSON.stringify(Object.fromEntries(fd), null, 2)
// 	);
// 	closeModal();
// 	e.target.reset();
// });

// init
// applyFilters();

// Año automático
document.getElementById("year").textContent = new Date().getFullYear();

// Back to top (suave)
document.getElementById("backToTop").addEventListener("click", () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
});

// Newsletter (demo)
document.getElementById("newsletterForm").addEventListener("submit", (e) => {
	e.preventDefault();
	const email = e.target.querySelector('input[type="email"]').value;
	alert("Gracias por suscribirte (demo): " + email);
	e.target.reset();
});

const track = document.querySelector("#track");
// const slides = [...track.children];
// const dotsRow = slides.map((s) => s.querySelector("[data-dots]"));

// Crea dots
// let dots = [];
// slides.forEach((_, i) => {
// 	const d = document.createElement("button");
// 	d.className = "dot";
// 	d.setAttribute("aria-label", `Ir a la diapositiva ${i + 1}`);
// 	d.addEventListener("click", () => goTo(i));
// 	dots.push(d);
// });
// dotsRow.forEach((row) =>
// 	dots.forEach((d) => row.appendChild(d.cloneNode(true)))
// );
// dots = [...document.querySelectorAll(".dot")].slice(0, slides.length);

// --- helpers de video ---
function pauseAllVideos() {
	document.querySelectorAll("video[data-video]").forEach((v) => {
		v.pause();
		// opcional: reinicia al salir del slide
		// v.currentTime = 0;
	});
}
function playVideosInSlide(i) {
	const _slides = [...document.querySelectorAll("#track > *")];
	_slides[i]?.querySelectorAll("video[data-video]").forEach((v) => {
		// si estaba preload="none", forzamos carga mínima
		if (v.preload === "none" && v.readyState === 0) v.load();
		v.play().catch(() => {});
	});
}

let current = 0,
	timer;

// function goTo(i) {
// 	current = (i + slides.length) % slides.length;
// 	track.style.transform = `translateX(-${current * 100}%)`;
// 	dots.forEach((d, idx) => d.classList.toggle("active", idx === current));

// 	// 🔧 IMPORTANTE: controlar videos EN CADA CAMBIO
// 	pauseAllVideos();
// 	playVideosInSlide(current);

// 	reset();
// }
// function next() {
// 	goTo(current + 1);
// }
// function prev() {
// 	goTo(current - 1);
// }

// document.getElementById("next").addEventListener("click", next);
// document.getElementById("prev").addEventListener("click", prev);

// function reset() {
// 	clearInterval(timer);
// 	timer = setInterval(next, 6000);
// }

// Opcional: pausar todo si la pestaña se oculta
document.addEventListener("visibilitychange", () => {
	if (document.hidden) pauseAllVideos();
	else playVideosInSlide(current);
});

// iniciar
// reset();
// goTo(0); // ya llama a pause/play internamente

(function () {
	const root = document.documentElement;
	const bar = document.getElementById("brand-fixed");
	const topStrip = document.querySelector(".top-strip");
	const ribbon = document.querySelector("header.ribbon");
	function applyOffset() {
		// Altura total del banner (incluye safe-area)
		const brandHeight = bar?.offsetHeight ?? 0;
		const topStripHeight = topStrip?.offsetHeight ?? 0;
		const ribbonHeight = ribbon?.offsetHeight ?? 0;
		// Empuja el documento hacia abajo para que nada quede tapado
		document.body.style.paddingTop = brandHeight + "px";
		// Útil si quieres posicionar algo relativo a esta barra:
		root.style.setProperty("--fixedbar-h", brandHeight + "px");
		root.style.setProperty("--brand-bar-h", brandHeight + "px");
		root.style.setProperty("--top-strip-h", topStripHeight + "px");
		root.style.setProperty(
			"--nav-stack-h",
			brandHeight + topStripHeight + ribbonHeight + "px"
		);
	}
	// Aplicar al cargar y al redimensionar
	window.addEventListener("load", applyOffset);
	window.addEventListener("resize", () => requestAnimationFrame(applyOffset));
	applyOffset();
})();

// Mostrar la barra cuando el usuario ha hecho scroll y no está cerca del hero
(function () {
	const bar = document.getElementById("cta-bar");
	let visible = false;
	function toggle() {
		const y = window.scrollY || document.documentElement.scrollTop;
		const shouldShow = y > 600; // ajusta según tu hero
		if (shouldShow !== visible) {
			visible = shouldShow;
			bar.style.transform = visible ? "translateY(0)" : "translateY(120%)";
			bar.style.transition = "transform .35s cubic-bezier(.22,.61,.36,1)";
		}
	}
	toggle();
	window.addEventListener("scroll", toggle, { passive: true });

	// Tracking básico
	document.querySelectorAll("#cta-bar [data-cta]").forEach((el) => {
		el.addEventListener("click", () => {
			console.log("CTA click", el.dataset.cta);
			// TODO: window.gtag?.('event','cta_click',{ label: el.dataset.cta });
		});
	});

	const chatWidget = document.getElementById("chat-widget");
	const chatToggle = document.querySelector("[data-cta='book-consult']");
	const chatCloseBtn = chatWidget?.querySelector(".chat-close-btn");
	const chatForm = document.getElementById("chat-widget-form");
	const chatInput = document.getElementById("chat-widget-message");
	const chatLog = chatWidget?.querySelector(".chat-body");
	const cannedResponses = [
		"Thank you for your message. A specialist will contact you shortly.",
		"I'm collecting your information. Could you share your city and preferred time?",
		"If you need immediate assistance, you can also call 1-800-LANDSCAPE.",
	];

	function appendMessage(role, text) {
		if (!chatLog) return;
		const bubble = document.createElement("div");
		bubble.className = `chat-message ${role}`;
		bubble.textContent = text;
		chatLog.appendChild(bubble);
		chatLog.scrollTop = chatLog.scrollHeight;
	}

	function openChat() {
		if (!chatWidget) return;
		chatWidget.classList.add("is-open");
		chatWidget.setAttribute("aria-hidden", "false");
		setTimeout(() => {
			chatInput?.focus();
		}, 120);
	}

	function closeChat() {
		if (!chatWidget) return;
		chatWidget.classList.remove("is-open");
		chatWidget.setAttribute("aria-hidden", "true");
	}

	chatToggle?.addEventListener("click", () => {
		openChat();
	});

	chatCloseBtn?.addEventListener("click", () => {
		closeChat();
		chatToggle?.focus();
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && chatWidget?.classList.contains("is-open")) {
			event.preventDefault();
			closeChat();
			chatToggle?.focus();
		}
	});

	chatForm?.addEventListener("submit", (event) => {
		event.preventDefault();
		const message = chatInput?.value.trim();
		if (!message) {
			return;
		}
		appendMessage("user", message);
		if (chatInput) {
			chatInput.value = "";
		}
		setTimeout(() => {
			const reply =
				cannedResponses[Math.floor(Math.random() * cannedResponses.length)];
			appendMessage("bot", reply);
		}, 450);
	});
})();

// // Mapea hrefs (#id) del nav a secciones
// const links = [...document.querySelectorAll('header nav a[href^="#"]')];
// const map = new Map(links.map((a) => [a.getAttribute("href"), a]));

// // Estilo activo: subrayado permanente + color pleno
// const setActive = (href) => {
// 	links.forEach((a) => a.classList.remove("active-nav"));
// 	map.get(href)?.classList.add("active-nav");
// };

// // Observa secciones (usa ids que ya tienes: #finder, #find-dealer, etc.)
// const sections = [...map.keys()]
// 	.map((sel) => document.querySelector(sel))
// 	.filter(Boolean);

// const io = new IntersectionObserver(
// 	(entries) => {
// 		entries.forEach((e) => {
// 			if (e.isIntersecting) setActive("#" + e.target.id);
// 		});
// 	},
// 	{ rootMargin: "-35% 0px -60% 0px", threshold: 0.01 }
// );

// sections.forEach((s) => io.observe(s));

(function () {
	const cards = document.querySelectorAll("#company-history .h-card");
	if (!cards.length) return;
	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => (e.target.dataset.active = e.isIntersecting));
		},
		{ rootMargin: "-30% 0px -50% 0px", threshold: 0.2 }
	);
	cards.forEach((c) => io.observe(c));
})();

// Simple slider a clic (si quieres auto-play añade un setInterval)
(function () {
	const track = document.querySelector(".carousel-track");
	if (!track) return;
	const slides = track.children.length;
	let i = 0;
	const dots = document.querySelectorAll(".dot");
	function go(n) {
		i = (n + slides) % slides;
		track.style.transform = `translateX(-${i * 100}%)`;
		dots.forEach(
			(d, idx) =>
				(d.style.background =
					idx === i ? "rgba(255,255,255,.9)" : "rgba(255,255,255,.4)")
		);
	}
	dots.forEach((d, idx) => d.addEventListener("click", () => go(idx)));
	go(0);
})();

(function () {
	const root = document.querySelector("#carousel .snap-x");
	if (!root) return;
	let i = 0,
		slides = root.children.length;
	let timer = setInterval(() => {
		i = (i + 1) % slides;
		root.scrollTo({ left: i * root.clientWidth, behavior: "smooth" });
	}, 5000);
	root.addEventListener("mouseenter", () => clearInterval(timer));
	root.addEventListener(
		"mouseleave",
		() =>
			(timer = setInterval(() => {
				i = (i + 1) % slides;
				root.scrollTo({ left: i * root.clientWidth, behavior: "smooth" });
			}, 5000))
	);
	window.addEventListener("resize", () =>
		root.scrollTo({ left: i * root.clientWidth })
	);
})();

const segmentFilterController = (() => {
	const container = document.getElementById("segmentFilters");
	const buttons = container ? container.querySelectorAll("[data-segment]") : [];
	const listeners = new Set();
	let active = "all";

	function setActive(segment, options = {}) {
		if (!segment) return;
		active = segment;
		buttons.forEach((btn) => {
			const isActive = btn.dataset.segment === segment;
			btn.classList.toggle("filter-pill-active", isActive);
			btn.setAttribute("aria-pressed", String(isActive));
		});
		if (options.emit !== false) {
			listeners.forEach((cb) => cb(active));
		}
	}

	function onChange(cb) {
		if (typeof cb === "function") {
			listeners.add(cb);
		}
		return () => listeners.delete(cb);
	}

	function updateCounts(counts = {}) {
		container?.querySelectorAll(".filter-pill-count").forEach((el) => {
			const key = el.dataset.countFor;
			if (key && Object.prototype.hasOwnProperty.call(counts, key)) {
				el.textContent = counts[key];
			}
		});
	}

	buttons.forEach((btn) => {
		btn.addEventListener("click", (event) => {
			event.preventDefault();
			const segment = btn.dataset.segment;
			if (segment && segment !== active) {
				setActive(segment);
			}
		});
	});

	setActive(active, { emit: false });

	return {
		onChange,
		setActive,
		updateCounts,
		get active() {
			return active;
		},
	};
})();

/* ====== Utils ====== */
const slug = (s) =>
	String(s || "")
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");

const byId = (id) => document.getElementById(id);

const RX = {
	metric: /^(?:LT|P|ST)?\s*(\d{3})\s*\/\s*(\d{2,3})\s*R?\s*(\d{2}(?:\.\d+)?)$/i,
	floatX:
		/^\s*\d{2,3}(?:\.\d+)?\s*[xX×]\s*(\d{1,2}(?:\.\d+)?)\s*R?\s*(\d{2}(?:\.\d+)?)\s*$/i,
	floatSlash: /^\s*(\d{1,2}(?:\.\d+)?)\s*\/\/\s*(\d{2}(?:\.\d+)?)\s*$/i,
	commR: /^\s*(\d{2}(?:\.\d+)?)\s*R\s*(\d{2}(?:\.\d+)?)\s*$/i,
	commSlash: /^\s*(\d{2}(?:\.\d+)?)\s*\/\/\s*(\d{2}(?:\.\d+)?)\s*$/i,
};

const norm = (s) =>
	String(s || "")
		.toUpperCase()
		.trim()
		.replace(/–|—/g, "-")
		.replace(/\s+/g, "");

function parseSize(key) {
	const raw = norm(key);
	let m = raw.match(RX.metric);
	if (m)
		return {
			width: m[1],
			height: m[2],
			rim: m[3],
			kind: "METRIC",
		};

	m = raw.match(RX.floatX);
	if (m)
		return {
			width: m[1],
			height: "",
			rim: m[2],
			kind: "FLOTATION",
		};

	m = raw.match(RX.floatSlash);
	if (m)
		return {
			width: m[1],
			height: "",
			rim: m[2],
			kind: "FLOTATION",
		};

	m = raw.match(RX.commR);
	if (m)
		return {
			width: m[1],
			height: "",
			rim: m[2],
			kind: "COMMERCIAL",
		};

	m = raw.match(RX.commSlash);
	if (m)
		return {
			width: m[1],
			height: "",
			rim: m[2],
			kind: "COMMERCIAL",
		};

	return null;
}

/* Heurística para agrupar en contenedores existentes:
   - Si encuentras <div data-group="invierno">, manda Winter/WS allí
   - Si encuentras <div data-group="pasajero">, manda lo (PCR) allí
   - Si no hay, cae al #cards-grid (A) */
function pickTargetContainer(item) {
	const name = (item?.modelo || "").toLowerCase();
	const has = (sel) => document.querySelector(sel);

	// 1) invierno: por palabra o por prefijo WSxx
	if (
		/(winter|invierno)/i.test(item?.descripcion || "") ||
		/^ws\d+/i.test(item?.modelo || "")
	) {
		const el = has('[data-group="invierno"]');
		if (el) return el;
	}

	// 2) pasajero: si trae (PCR)
	if (/\(pcr\)/i.test(item?.modelo || "")) {
		const el = has('[data-group="pasajero"]');
		if (el) return el;
	}

	// fallback: grid dinámico
	return byId("cards-grid") || has("[data-group]") || document.body;
}

/* Imagen: intenta derivar un nombre de archivo por modelo; si no existe, usa placeholder */
function resolveImageSrc(item) {
	// si tus assets siguen el esquema "assets/tires/<slug>.png", prueba con el modelo sin paréntesis
	const base = (item?.imagen || "").replace(/\(.*?\)/g, "").trim();
	const guess = `../assets/img/tires/${base}.webp`;
	console.log(guess);
	// const guess = `assets/tires/${slug(base)}.png`;
	// no vamos a comprobar existencia; el <img> tiene onerror para caer a placeholder
	return guess;
}

/* Render de una card de producto (estructura compatible con tu HTML) */
function renderCard(item) {
	const imgSrc = resolveImageSrc(item);

	// badges rápidos a partir de la descripción (opcionales)
	const isNew = /new\b|nuevo/i.test(item?.descripcion || "");
	const isPassengerModel = /\(pcr\)/i.test(item?.modelo || "");
	const segmentLabel = isPassengerModel
		? "PASSENGER / SUV & LT"
		: "TBR / TRUCK & BUS";

	// medidas (top 6 visibles, el resto plegables)
	const medidas = Array.isArray(item?.medidas_disponibles)
		? item.medidas_disponibles
		: [];
	const visibles = medidas.slice(0, 6);
	const restantes = medidas.slice(6);

	const article = document.createElement("article");
	article.className =
		"grid grid-cols-[140px,1fr] gap-4 items-start border-b md:border-0 pb-6 md:pb-0";
	article.dataset.dynamicCard = "true";
	article.dataset.segment = isPassengerModel ? "passenger" : "tbr";

	article.innerHTML = `
    <!-- imagen -->
    <div class="relative">
      <div class="tire-frame relative">
        <img src="${imgSrc}" alt="${item?.modelo || ""}"
             class="absolute inset-0 w-full h-full object-contain drop-shadow-2xl select-none"
             draggable="false"
             onerror="this.onerror=null;this.src='assets/tires/placeholder.png';"/>
      </div>
      ${
				isNew
					? `<span class="absolute -bottom-1 right-2 new-badge">NEW</span>`
					: ``
			}
    </div>

    <!-- info -->
    <div>


      <div class="model text-2xl mt-1">${(item?.modelo || "").replace(
				/\s*\(.*?\)\s*/,
				""
			)}</div>

      <div class="uppercase text-[11px] tracking-wider text-neutral-500 mt-1">
         ${segmentLabel}
      </div>

      <p class="mt-2 text-[12px] leading-5 text-neutral-600 max-w-[46ch]">
        ${item?.descripcion || ""}
      </p>

      <!-- Medidas disponibles -->
      ${
				medidas.length
					? `
          <div class="mt-3">
            <div class="text-[11px] uppercase tracking-wider text-neutral-500 mb-1">SIZES</div>
            <div class="flex flex-wrap gap-2">
              ${visibles
								.map(
									(m) => `
                <span class="chip">
                  <i class="fa-solid fa-circle-notch"></i>
                  <span>${m}</span>
                </span>`
								)
								.join("")}
              ${
								restantes.length
									? `<button type="button" class="chip" data-more>
                     +${restantes.length} más
                   </button>`
									: ``
							}
            </div>
          </div>
        `
					: ``
			}

    </div>
  `;

	// comportamiento del botón "+N más"
	const btnMore = article.querySelector("[data-more]");
	if (btnMore && restantes.length) {
		btnMore.addEventListener("click", () => {
			const wrap = btnMore.parentElement;
			restantes.forEach((m) =>
				wrap.insertAdjacentHTML(
					"beforeend",
					`<span class="chip"><i class="fa-solid fa-circle-notch"></i><span>${m}</span></span>`
				)
			);
			btnMore.remove();
		});
	}

	return article;
}

/* ====== Boot ====== */

(async function mountCatalog() {
	try {
		const res = await fetch("../assets/info/data_modelos.json", {
			cache: "no-store",
		});
		const data = await res.json(); // [{modelo, descripcion, medidas_disponibles}, ...]
		if (!Array.isArray(data)) return;

		const params = new URLSearchParams(window.location.search);
		const rawSegment = (params.get("segment") || "").toLowerCase();
		const segment = rawSegment === "tbr" ? "commercial" : rawSegment;

		const widthFilter = (params.get("width") || "").trim();
		const rimFilter = (params.get("rim") || "").trim();
		const hasHeightParam = params.has("height");
		let heightFilter = hasHeightParam ? params.get("height") : null;
		if (heightFilter === "__none__") {
			heightFilter = "";
		}
		const sizeFilters = {
			width: widthFilter,
			rim: rimFilter,
			height: hasHeightParam ? heightFilter : null,
		};
		const hasSizeFilter = Boolean(sizeFilters.width && sizeFilters.rim);

		const matchesSizeToken = (token) => {
			if (!hasSizeFilter) return true;
			const parsed = parseSize(token);
			if (!parsed) return false;
			if (sizeFilters.width && parsed.width !== sizeFilters.width) return false;
			if (sizeFilters.rim && parsed.rim !== sizeFilters.rim) return false;
			if (sizeFilters.height !== null) {
				const candidateHeight = parsed.height || "";
				return candidateHeight === sizeFilters.height;
			}
			return true;
		};

		const sizeFiltered = data.filter((item) => {
			if (!hasSizeFilter) return true;
			const measures = Array.isArray(item?.medidas_disponibles)
				? item.medidas_disponibles
				: [];
			return measures.some((token) => matchesSizeToken(token));
		});

		const isPassengerModel = (item) => /\(pcr\)/i.test(item?.modelo || "");
		const segmentCounts = sizeFiltered.reduce(
			(acc, item) => {
				const key = isPassengerModel(item) ? "passenger" : "tbr";
				acc[key] = (acc[key] || 0) + 1;
				return acc;
			},
			{ passenger: 0, tbr: 0 }
		);
		segmentFilterController.updateCounts(segmentCounts);

		const segmentLabels = {
			passenger: "PASSENGER / SUV & LT",
			commercial: "TBR / TRUCK & BUS",
		};

		const toNormalizedSegment = (navValue) => {
			if (navValue === "passenger") return "passenger";
			if (navValue === "tbr") return "commercial";
			return "all";
		};

		const toNavSegment = (normalized) => {
			if (normalized === "passenger") return "passenger";
			if (normalized === "commercial") return "tbr";
			return "all";
		};

		const updateHeading = (normalized) => {
			const heading = document.querySelector("#catalogo-dynamic .text-2xl");
			if (!heading) return;

			let headingContent = "Our Tires";
			if (normalized && segmentLabels[normalized]) {
				headingContent = `Our Tires <span class="block text-sm font-semibold tracking-wide text-[var(--brand-ink)]">${segmentLabels[normalized]}</span>`;
			}

			if (hasSizeFilter) {
				const heightLabel =
					sizeFilters.height === null
						? null
						: sizeFilters.height === ""
						? "—"
						: sizeFilters.height;
				const sizeLabel =
					sizeFilters.height === null
						? `${sizeFilters.width} · R${sizeFilters.rim}`
						: `${sizeFilters.width}${heightLabel ? `/${heightLabel}` : ""} R${
								sizeFilters.rim
						  }`;
				headingContent += `<span class="block text-xs md:text-sm font-semibold tracking-wide text-[var(--brand-ink)]/80 mt-1">Size filter: ${sizeLabel}</span>`;
			}

			heading.innerHTML = headingContent;
		};

		const renderForSegment = (normalized) => {
			const results = sizeFiltered.filter((item) => {
				if (normalized === "passenger") {
					return isPassengerModel(item);
				}
				if (normalized === "commercial") {
					return !isPassengerModel(item);
				}
				return true;
			});

			document
				.querySelectorAll("[data-dynamic-card]")
				.forEach((el) => el.remove());

			const grid = byId("cards-grid");
			if (grid) {
				grid.innerHTML = "";
			}

			if (!results.length) {
				if (grid) {
					grid.innerHTML =
						'<p class="col-span-full text-center text-sm text-neutral-500">No results found</p>';
				}
				updateHeading(normalized);
				return;
			}

			results.forEach((item) => {
				const target = pickTargetContainer(item);
				target?.appendChild(renderCard(item));
			});

			updateHeading(normalized);
		};

		const initialSegment =
			segment === "passenger" || segment === "commercial" ? segment : "all";
		const navSegment = toNavSegment(initialSegment);
		segmentFilterController.setActive(navSegment, { emit: false });
		renderForSegment(initialSegment);

		segmentFilterController.onChange((navValue) => {
			const normalized = toNormalizedSegment(navValue);
			renderForSegment(normalized);

			const paramsForUrl = new URLSearchParams(window.location.search);
			if (normalized === "all") {
				paramsForUrl.delete("segment");
			} else if (normalized === "commercial") {
				paramsForUrl.set("segment", "tbr");
			} else {
				paramsForUrl.set("segment", normalized);
			}

			const searchString = paramsForUrl.toString();
			const newUrl = `${window.location.pathname}${
				searchString ? `?${searchString}` : ""
			}${window.location.hash}`;
			window.history.replaceState({}, "", newUrl);
		});
	} catch (err) {
		console.error("No se pudo cargar data_modelos.json", err);
	}
})();

// Mostrar la barra cuando el usuario ha hecho scroll y no está cerca del hero
(function () {
	const bar = document.getElementById("cta-bar");
	let visible = false;
	function toggle() {
		const y = window.scrollY || document.documentElement.scrollTop;
		const shouldShow = y > 600; // ajusta según tu hero
		if (shouldShow !== visible) {
			visible = shouldShow;
			bar.style.transform = visible ? "translateY(0)" : "translateY(120%)";
			bar.style.transition = "transform .35s cubic-bezier(.22,.61,.36,1)";
		}
	}
	toggle();
	window.addEventListener("scroll", toggle, { passive: true });

	// Tracking básico
	document.querySelectorAll("#cta-bar [data-cta]").forEach((el) => {
		el.addEventListener("click", () => {
			console.log("CTA click", el.dataset.cta);
			// TODO: window.gtag?.('event','cta_click',{ label: el.dataset.cta });
		});
	});

	const chatWidget = document.getElementById("chat-widget");
	const chatToggle = document.querySelector("[data-cta='book-consult']");
	const chatCloseBtn = chatWidget?.querySelector(".chat-close-btn");
	const chatForm = document.getElementById("chat-widget-form");
	const chatInput = document.getElementById("chat-widget-message");
	const chatLog = chatWidget?.querySelector(".chat-body");
	const cannedResponses = [
		"Thank you for your message. A specialist will contact you shortly.",
		"I'm collecting your information. Could you share your city and preferred time?",
		"If you need immediate assistance, you can also call 1-800-LANDSCAPE.",
	];

	function appendMessage(role, text) {
		if (!chatLog) return;
		const bubble = document.createElement("div");
		bubble.className = `chat-message ${role}`;
		bubble.textContent = text;
		chatLog.appendChild(bubble);
		chatLog.scrollTop = chatLog.scrollHeight;
	}

	function openChat() {
		if (!chatWidget) return;
		chatWidget.classList.add("is-open");
		chatWidget.setAttribute("aria-hidden", "false");
		setTimeout(() => {
			chatInput?.focus();
		}, 120);
	}

	function closeChat() {
		if (!chatWidget) return;
		chatWidget.classList.remove("is-open");
		chatWidget.setAttribute("aria-hidden", "true");
	}

	chatToggle?.addEventListener("click", () => {
		openChat();
	});

	chatCloseBtn?.addEventListener("click", () => {
		closeChat();
		chatToggle?.focus();
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && chatWidget?.classList.contains("is-open")) {
			event.preventDefault();
			closeChat();
			chatToggle?.focus();
		}
	});

	chatForm?.addEventListener("submit", (event) => {
		event.preventDefault();
		const message = chatInput?.value.trim();
		if (!message) {
			return;
		}
		appendMessage("user", message);
		if (chatInput) {
			chatInput.value = "";
		}
		setTimeout(() => {
			const reply =
				cannedResponses[Math.floor(Math.random() * cannedResponses.length)];
			appendMessage("bot", reply);
		}, 450);
	});
})();

// Mapea hrefs (#id) del nav a secciones
const links = [...document.querySelectorAll('header nav a[href^="#"]')];
const map = new Map(links.map((a) => [a.getAttribute("href"), a]));

// Estilo activo: subrayado permanente + color pleno
const setActive = (href) => {
	links.forEach((a) => a.classList.remove("active-nav"));
	map.get(href)?.classList.add("active-nav");
};

// Observa secciones (usa ids que ya tienes: #finder, #find-dealer, etc.)
const sections = [...map.keys()]
	.map((sel) => document.querySelector(sel))
	.filter(Boolean);

const io = new IntersectionObserver(
	(entries) => {
		entries.forEach((e) => {
			if (e.isIntersecting) setActive("#" + e.target.id);
		});
	},
	{ rootMargin: "-35% 0px -60% 0px", threshold: 0.01 }
);

sections.forEach((s) => io.observe(s));

(function () {
	const cards = document.querySelectorAll("#company-history .h-card");
	if (!cards.length) return;
	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => (e.target.dataset.active = e.isIntersecting));
		},
		{ rootMargin: "-30% 0px -50% 0px", threshold: 0.2 }
	);
	cards.forEach((c) => io.observe(c));
})();
