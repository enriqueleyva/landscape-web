window.addEventListener("DOMContentLoaded", () => {
	const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

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

	// Cambia estos paths por tus archivos reales:
	const TIRE_SOURCES = [
		"assets/img/ltraSport.png",
		"assets/img/terragrip.png",
		"assets/img/terrain.png",
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
});
