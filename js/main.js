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
let leafletMap = null;
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
closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
	if (e.target === modal) closeModal();
});

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
modalClose.addEventListener("click", closeModal);
modal1.addEventListener("click", (e) => {
	if (e.target === modal1) closeModal();
});

// Demo submit
document.getElementById("applyForm").addEventListener("submit", (e) => {
	e.preventDefault();
	const fd = new FormData(e.target);
	alert(
		"Application sent (demo)\\n" +
			JSON.stringify(Object.fromEntries(fd), null, 2)
	);
	closeModal();
	e.target.reset();
});

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
const slides = [...track.children];
const dotsRow = slides.map((s) => s.querySelector("[data-dots]"));

// Crea dots
let dots = [];
slides.forEach((_, i) => {
	const d = document.createElement("button");
	d.className = "dot";
	d.setAttribute("aria-label", `Ir a la diapositiva ${i + 1}`);
	d.addEventListener("click", () => goTo(i));
	dots.push(d);
});
dotsRow.forEach((row) =>
	dots.forEach((d) => row.appendChild(d.cloneNode(true)))
);
dots = [...document.querySelectorAll(".dot")].slice(0, slides.length);

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

function goTo(i) {
	current = (i + slides.length) % slides.length;
	track.style.transform = `translateX(-${current * 100}%)`;
	dots.forEach((d, idx) => d.classList.toggle("active", idx === current));

	// 🔧 IMPORTANTE: controlar videos EN CADA CAMBIO
	pauseAllVideos();
	playVideosInSlide(current);

	reset();
}
function next() {
	goTo(current + 1);
}
function prev() {
	goTo(current - 1);
}

document.getElementById("next").addEventListener("click", next);
document.getElementById("prev").addEventListener("click", prev);

function reset() {
	clearInterval(timer);
	timer = setInterval(next, 6000);
}

// Opcional: pausar todo si la pestaña se oculta
document.addEventListener("visibilitychange", () => {
	if (document.hidden) pauseAllVideos();
	else playVideosInSlide(current);
});

// iniciar
reset();
goTo(0); // ya llama a pause/play internamente

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
