// app/comunidad/page.tsx
//import Image from "next/image";
import Link from "next/link";
//import { communities } from "../data/communities";
import { FaYoutube, FaTiktok, FaInstagram, FaFacebook, FaDiscord } from "react-icons/fa";

export default function ComunidadPage() {
  return (
    <div className=" min-h-screen text-gray-200">
      {/* Hero */}
      <section className="text-center py-16
       
       
       ">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
          🐾 Comunidad MichiMarketing
        </h1>
        <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
          Únete a nuestra comunidad y forma parte de un movimiento de emprendedores 
          y creativos que quieren hacer crecer sus negocios con estrategia y creatividad.
        </p>
      </section>

      {/* Redes Sociales */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-center mb-6">🌍 Conéctate con nosotros</h2>
        <div className="flex justify-center gap-6 text-3xl">
          <Link href="https://youtube.com" target="_blank" className="text-red-500 hover:scale-110 transition">
            <FaYoutube />
          </Link>
          <Link href="https://tiktok.com" target="_blank" className="text-white hover:scale-110 transition">
            <FaTiktok />
          </Link>
          <Link href="https://instagram.com" target="_blank" className="text-pink-500 hover:scale-110 transition">
            <FaInstagram />
          </Link>
          <Link href="https://www.facebook.com/profile.php?id=61574073081363" target="_blank" className="text-blue-500 hover:scale-110 transition">
            <FaFacebook />
          </Link>
          <Link href="https://discord.gg" target="_blank" className="text-indigo-500 hover:scale-110 transition">
            <FaDiscord />
          </Link>
        </div>
      </section>

     {/* 
      <section className="bg-gray-900 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">🎥 Contenido Destacado</h2>
        <div className="flex flex-col md:flex-row justify-center gap-6 px-6">
          <div className="w-full md:w-1/2">
            <iframe
              className="w-full h-64 rounded-xl shadow-lg"
              src="https://www.youtube.com/watch?v=DKY8cAbdhnM"
              title="Video destacado"
              allowFullScreen
            />
          </div>
          <div className="w-full md:w-1/2">
            <iframe
              className="w-full h-64 rounded-xl shadow-lg"
              src="https://www.youtube.com/embed/ysz5S6PUM-U"
              title="Video destacado"
              allowFullScreen
            />
          </div>
        </div>
      </section> */}

      {/* Comunidades */}


     {/* <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-10">🤝 Nuestras Comunidades</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {communities.map((community) => (
            <div
              key={community.id}
              className="bg-gray-900 rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-xl hover:scale-[1.03] transition-transform"
            >
              {/* Imagen 
              <div className="relative w-full h-48">
                <Image
                  src={community.image}
                  alt={community.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Contenido 
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2 text-purple-400">
                  {community.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4 flex-grow">
                  {community.description}
                </p>
                <p className="text-gray-500 text-xs mb-4">
                  Plataforma: {community.platform} • {community.members}
                </p>

                <Link
                  href={`/comunidad/${community.slug}`}
                  className="mt-auto inline-block text-center bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-lg transition"
                >
                  Ver más 👀
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section> */}


    </div>
  );
}
