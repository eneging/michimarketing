"use client";

import { useState, useEffect, useRef } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { Nunito } from "next/font/google";
import confetti from "canvas-confetti";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const InvitationPage: NextPage = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isFleeing, setIsFleeing] = useState<boolean>(false);
  const [noPosition, setNoPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasPlayedAudio = useRef<boolean>(false); // evita que se repita

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 768);
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // 🔊 Reproduce música 1 sola vez al entrar o al primer clic
  useEffect(() => {
    const playMusic = () => {
      if (!hasPlayedAudio.current && audioRef.current) {
        audioRef.current.volume = 0.6;
        audioRef.current.play().catch(() => {});
        hasPlayedAudio.current = true;
        window.removeEventListener("click", playMusic);
      }
    };

    // intenta reproducir apenas carga
    playMusic();
    // si falla (por bloqueo del navegador), espera el primer clic
    window.addEventListener("click", playMusic);

    return () => window.removeEventListener("click", playMusic);
  }, []);

  const handleNoMouseOver = () => {
    if (!isFleeing) setIsFleeing(true);
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 100);
    setNoPosition({ top: y, left: x });
  };

 const handleYesClick = () => {
  setShowModal(true);

  // 🎉 Confeti
  const duration = 2 * 1000;
  const end = Date.now() + duration;
  const frame = () => {
    confetti({ particleCount: 7, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 7, angle: 120, spread: 55, origin: { x: 1 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();

  // 🎬 Reproducir video con sonido y efecto fade-in
  setTimeout(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.muted = false;
      video.volume = 0; // empieza en silencio
      video.play().catch(() => {});

      // 🎵 Efecto fade-up suave (2 segundos)
      const fadeDuration = 2000;
      const steps = 20;
      const stepTime = fadeDuration / steps;
      let currentStep = 0;

      const fadeInterval = setInterval(() => {
        currentStep++;
        video.volume = Math.min(currentStep / steps, 1);
        if (currentStep >= steps) clearInterval(fadeInterval);
      }, stepTime);
    }
  }, 500);
};


  if (isMobile) {
    return (
      <div className={`mobile-warning ${nunito.className}`}>
        <h1>🍓 ¡Ups!</h1>
        <p>Esta invitación tan linda solo se puede ver desde tu compu 💻</p>
        <p>¡Ábrela ahí para ver toda la magia! ✨</p>
        <style jsx>{`
          .mobile-warning {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            text-align: center;
            background: linear-gradient(135deg, #ffdde1, #ee9ca7);
            color: #fff;
            padding: 20px;
          }
          h1 {
            font-size: 2.5rem;
            font-weight: 800;
          }
          p {
            font-size: 1.2rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`container ${nunito.className}`}>
      {/* 🎵 Música (se reproduce solo una vez) */}
      <audio ref={audioRef} src="/audio/song.mp3" preload="auto" />

      <div className="background-pattern" />

      {/* 📸 Polaroid aesthetic */}
      <div className="polaroid">
        <Image
          src="/images/anette.jpg"
          alt="Anette"
          width={260}
          height={260}
          className="photo"
        />
        <div className="caption">🍓 Anette 🍓</div>
      </div>

      <h1>Anette, ¿quieres ir a La Rosa y el Clavel conmigo? 🌹</h1>

      <div className="buttons">
        <button id="yes" onClick={handleYesClick}>
          ¡Sí, obvio!
        </button>
        <button
          id="no"
          onMouseOver={handleNoMouseOver}
          style={
            isFleeing
              ? {
                  position: "absolute",
                  top: `${noPosition.top}px`,
                  left: `${noPosition.left}px`,
                }
              : { position: "static" }
          }
        >
          No 😅
        </button>
      </div>

      {/* 💖 Modal con video de fondo */}
      {showModal && (
        <div className="modal-overlay">
          <video
            ref={videoRef}
            src="/video/dance.mp4"
            autoPlay
            loop
            className="video-bg"
          />
          <div className="modal-content">
            🎉 ¡Sabía que dirías que sí! 💃  
            <br />
            Nos vemos en <b>La Rosa y el Clavel</b> 💐  
            <br />
            <br />
            <span className="final-text">
              Espero verte con tu vestido verde de manzanita 🍏💚  
              <br />
              Hace tiempo quería mandarlo, pero estaba programándolo jajaj 😅
            </span>
          </div>
        </div>
      )}

      {/* 🎨 Estilos */}
      <style jsx>{`
        .container {
          position: relative;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          background: #fff0f5;
        }

        .background-pattern {
          background-image: url("/images/strawberry-pattern.png");
          background-repeat: repeat;
          background-size: 180px;
          opacity: 0.15;
          position: absolute;
          inset: 0;
          z-index: 0;
          animation: floatPattern 15s linear infinite alternate;
        }

        @keyframes floatPattern {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 100px 80px;
          }
        }

        .polaroid {
          background: white;
          padding: 10px 10px 30px 10px;
          border: 6px solid #fff;
          border-radius: 8px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          transform: rotate(-2deg);
          margin-bottom: 25px;
          z-index: 2;
          transition: transform 0.3s ease;
        }

        .polaroid:hover {
          transform: rotate(0deg) scale(1.05);
        }

        .caption {
          font-size: 1rem;
          font-weight: 700;
          text-align: center;
          margin-top: 10px;
          color: #d63384;
        }

        h1 {
          font-size: 2.4em;
          font-weight: 800;
          text-align: center;
          color: #d63384;
          text-shadow: 1px 1px 3px #ffffff90;
          margin-bottom: 40px;
          padding: 0 20px;
          z-index: 2;
        }

        .buttons {
          display: flex;
          gap: 30px;
          align-items: center;
          z-index: 2;
        }

        button {
          font-size: 1.4em;
          font-weight: 700;
          padding: 14px 36px;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
        }

        #yes {
          background: linear-gradient(135deg, #ff9a9e, #fecfef);
          color: #fff;
        }
        #yes:hover {
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(255, 153, 204, 0.5);
        }

        #no {
          background: #f87171;
          color: white;
        }

        /* 🌸 Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
          overflow: hidden;
        }

        .video-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        .modal-content {
          position: relative;
          background: rgba(255, 240, 245, 0.95);
          padding: 40px 60px;
          border-radius: 25px;
          border: 2px solid #d63384;
          box-shadow: 0 0 30px rgba(214, 51, 132, 0.3);
          text-align: center;
          font-size: 1.8em;
          color: #d63384;
          font-weight: 700;
          animation: fadeIn 0.8s ease-in-out;
          z-index: 2;
        }

        .final-text {
          font-size: 0.9rem;
          color: #a64d79;
          display: block;
          margin-top: 20px;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default InvitationPage;
