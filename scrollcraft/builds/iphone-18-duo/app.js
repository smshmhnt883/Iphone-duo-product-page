/**
 * iPhone 18 Duo - Interactive Controller
 * Coordinates ScrollCraft runtime, Haptic Fold Angle HUD, and Cosmic Finale Actions
 */

(function () {
  'use strict';

  // 1. Mount ScrollCraft Engine with high-performance responsive playhead
  let scInstance = null;
  if (window.ScrollCraft && typeof window.ScrollCraft.mount === 'function') {
    scInstance = window.ScrollCraft.mount(document.body, { lerp: 0.32 });
  }

  // 2. High-Precision Smooth Wheel Momentum Controller
  // Transforms discrete mousewheel notches into continuous, buttery 60fps/120fps motion
  (function initSmoothWheel() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let isMoving = false;
    let rafId = null;

    function onWheel(e) {
      if (e.ctrlKey) return; // Allow pinch-zoom

      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 36; // lines
      else if (e.deltaMode === 2) delta *= window.innerHeight; // pages

      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
      targetY = Math.max(0, Math.min(maxScroll, targetY + delta));

      if (!isMoving) {
        isMoving = true;
        currentY = window.scrollY;
        rafId = requestAnimationFrame(step);
      }

      e.preventDefault();
    }

    function step() {
      const diff = targetY - currentY;
      if (Math.abs(diff) > 0.4) {
        currentY += diff * 0.12; // Fluid ease-out damping
        window.scrollTo(0, Math.round(currentY * 10) / 10);
        rafId = requestAnimationFrame(step);
      } else {
        currentY = targetY;
        window.scrollTo(0, targetY);
        isMoving = false;
      }
    }

    window.addEventListener('scroll', function () {
      if (!isMoving) {
        targetY = currentY = window.scrollY;
      }
    }, { passive: true });

    window.addEventListener('wheel', onWheel, { passive: false });
  })();

  // 3. Smooth scroll for nav anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 4. Landing Hero Video: Play once, hold final frame constantly + Mobile Autoplay Resilience
  const landingVideo = document.querySelector('.landing-hero__video');
  if (landingVideo) {
    landingVideo.addEventListener('ended', function () {
      landingVideo.pause();
    });

    // Mobile fallback: In iOS Low-Power Mode or mobile battery saver, autoplay can be prevented.
    // Ensure playback kicks off on the first user touch or scroll interaction.
    const startOnInteraction = function () {
      if (landingVideo.paused && !landingVideo.ended) {
        landingVideo.play().catch(function () {});
      }
    };
    window.addEventListener('touchstart', startOnInteraction, { passive: true, once: true });
    window.addEventListener('scroll', startOnInteraction, { passive: true, once: true });
  }

  // Handle "Replay 3D Experience" button to rewind and replay intro video
  const replayBtn = document.querySelector('.cosmic-btn-secondary[href="#landing-hero"]');
  if (replayBtn && landingVideo) {
    replayBtn.addEventListener('click', function () {
      setTimeout(function () {
        landingVideo.currentTime = 0;
        landingVideo.play().catch(function () {});
      }, 350);
    });
  }

  // 5. Finale Actions: Email Priority Drop & Calendar
  const notifyForm = document.getElementById('notifyForm');
  const notifyEmail = document.getElementById('notifyEmail');
  const notifySuccess = document.getElementById('notifySuccess');
  const calendarBtn = document.getElementById('calendarBtn');

  if (notifyForm) {
    notifyForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!notifyEmail || !notifyEmail.value) return;
      notifyForm.style.display = 'none';
      if (notifySuccess) notifySuccess.classList.add('visible');
    });
  }

  if (calendarBtn) {
    calendarBtn.addEventListener('click', function () {
      const title = "Apple Keynote: iPhone 18 Duo Pre-booking";
      const details = "Official pre-booking opens for iPhone 18 Duo with dual-screen liquid titanium architecture.";
      const icsData = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "BEGIN:VEVENT",
        "SUMMARY:" + title,
        "DESCRIPTION:" + details,
        "DTSTART:20261015T170000Z",
        "DTEND:20261015T190000Z",
        "STATUS:CONFIRMED",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "iPhone-18-Duo-Prebooking.ics";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
})();
