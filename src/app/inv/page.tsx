"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";

export default function InvitationPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isFleeing, setIsFleeing] = useState(false);
  const [noPosition, setNoPosition] = useState({ top: 0, left: 0 });
  const [yesScale, setYesScale] = useState(1);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hoverSound = useRef<HTMLAudioElement | null>(null);
  const clickSound = useRef<HTMLAudioElement | null>(null);
  const hasPlayedAudio = useRef(false);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 768);
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Inicializa sonidos
  useEffect(() => {
    hoverSound.current = new Audio("/music/uh-oh.mp3");
    clickSound.current = new Audio("/music/pop.mp3");
  }, []);

  // Reproduce música principal al entrar o al primer clic
  useEffect(() => {
    const playMusic = () => {
      if (!hasPlayedAudio.current && audioRef.current) {
        audioRef.current.volume = 0.6;
        audioRef.current.play().catch(() => {});
        hasPlayedAudio.current = true;
        window.removeEventListener("click", playMusic);
      }
    };
    playMusic();
    window.addEventListener("click", playMusic);
    return () => window.removeEventListener("click", playMusic);
  }, []);

  const handleNoMouseOver = () => {
    setIsFleeing(true);
    setYesScale((prev) => Math.min(prev + 0.08, 2)); // crece sin volver atrás
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 100);
    setNoPosition({ top: y, left: x });

    if (hoverSound.current) {
      hoverSound.current.currentTime = 0;
      hoverSound.current.play().catch(() => {});
    }
  };

  const handleYesClick = () => {
    setShowModal(true);
    confetti({ particleCount: 150, spread: 70 });
    if (clickSound.current) clickSound.current.play().catch(() => {});

    setTimeout(() => {
      if (videoRef.current) {
        const video = videoRef.current;
        video.muted = false;
        video.volume = 0;
        video.play().catch(() => {});
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
      <div className="flex flex-col justify-center items-center h-screen text-center bg-gradient-to-br from-pink-200 to-rose-300 text-white p-6">
        <h1 className="text-4xl font-extrabold mb-4">🍓 ¡Hey!</h1>
        <p className="text-lg mb-2">
          Parece que este contenido no se adapta bien al celular 📱
        </p>
        <p>Prueba abrirlo en tu computadora 💻 para disfrutarlo mejor ✨</p>
      </div>
    );
  }

  return (
    <div className="invitation-container">
      {/* 🎵 Música de fondo */}
      <audio ref={audioRef} src="/music/song.mp3" preload="auto" />

      {/* 🍓 Fondo con patrón de fresas */}
      <div className="background-pattern" />

      {/* 📸 Foto polaroid */}
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

      <h1 className="title">Anette, ¿quieres ir a La Rosa y el Clavel conmigo? 🌹</h1>

      <div className="buttons">
        <button
          id="yes"
          onClick={handleYesClick}
          style={{
            transform: `scale(${yesScale})`,
          }}
        >
          ¡Sí, obvio! 
        </button>
        <button
          id="no"
          onMouseOver={handleNoMouseOver}
          style={{
            position: isFleeing ? "absolute" : "static",
            top: isFleeing ? `${noPosition.top}px` : "auto",
            left: isFleeing ? `${noPosition.left}px` : "auto",
          }}
        >
          No 😅
        </button>
      </div>

      {/* 💞 Modal final */}
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
              (queria enviarlo antes pero demore un poquito haciendolo😅)
            </span>
          </div>
        </div>
      )}

      {/* 🎨 Estilos */}
      <style jsx>{`
        .invitation-container {
          position: fixed;
          inset: 0;
          z-index: 9999;
          height: 100vh;
          width: 100vw;
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
          background-size: 250px auto;
          background-position: center center;
          opacity: 0.18;
          position: absolute;
          inset: 0;
          z-index: 0;
          animation: floatPattern 20s ease-in-out infinite alternate;
          transform: scale(1.05);
        }

        @keyframes floatPattern {
          from {
            background-position: center center;
            transform: scale(1.05);
          }
          to {
            background-position: calc(50% + 60px) calc(50% + 40px);
            transform: scale(1.1);
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

        .title {
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
}
