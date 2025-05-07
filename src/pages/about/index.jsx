import React from "react";

const AboutPage = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
          <h2 className="text-xl text-gray-600 font-medium mb-6 ">
            Book your perfect venue from around the world.
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Holidaze is a platform for finding unique places to stay — from
            peaceful cabins and cozy cottages to scenic homes and modern
            hideaways. We handpick every location for its comfort, charm, and
            setting, so you can relax and enjoy your getaway without the hassle.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Travel at your own pace. Stay somewhere that feels just right — with
            Holidaze.
          </p>
        </div>

        <div className="w-full h-[300px] md:h-[400px]">
          <img
            src="./hero-bg.png"
            alt="Scenic holiday destination"
            className="w-full h-full object-cover rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
