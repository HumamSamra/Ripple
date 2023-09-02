document.addEventListener("DOMContentLoaded", function () {
    const all = document.querySelectorAll(".ripple");

    all.forEach(function (ev) {
        ev.style.overflow = 'hidden';
        ev.style.position = 'relative';

        ev.addEventListener("mousedown", function (e) {
            const ripple = document.createElement("span");
            ripple.className = "rippler";

            const rect = ev.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ripple.style.position = 'absolute';

            ripple.style.borderRadius = '50%';
            ripple.style.width = '10px';

            ripple.style.height = '10px';
            ripple.style.transform = 'translate(-50%, -50%)';

            ripple.style.opacity = ev.getAttribute('ripple-opacity') ?? '0.4';
            ripple.style.background = ev.getAttribute('ripple-color') ?? 'black';

            if (ev.hasAttribute('ripple-center')) {
                ripple.style.left = '50%';
                ripple.style.top = '50%';
            } else {
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
            }


            let size = (ev.clientHeight > ev.clientWidth) ? ev.clientHeight : ev.clientWidth;
            ev.appendChild(ripple);

            ripple.animate(
                [
                    { width: size * 2.5 + 'px', height: size * 2.5 + 'px' },
                ],
                {
                    duration: 600,
                    easing: "cubic-bezier(.23,.03,.3,.99)",
                    fill: "forwards"
                });

            ev.addEventListener("mouseup", ev => {
                let anim = ripple.animate(
                    [
                        { opacity: '0' },
                    ],
                    {
                        duration: 500,
                        easing: "ease",
                        fill: "forwards"
                    });
                anim.onfinish = setTimeout(() => {
                    ripple.remove();
                }, 500);
            });

            ev.addEventListener("mouseleave", function () {
                let anim = ripple.animate(
                    [
                        { opacity: '0' },
                    ],
                    {
                        duration: 500,
                        easing: "ease",
                        fill: "forwards"
                    });
                anim.onfinish = setTimeout(() => {
                    ripple.remove();
                }, 500);
            });
        });
    });
});
