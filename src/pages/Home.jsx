import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faCalendar,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import heroImage from "../assets/png/heroImage.jpg";
import ProductFeature from "../components/Card/ProductFeature";

const Home = () => {
  return (
    <>
      <div className="bg-slate-100">
        <div className="container pt-24 flex flex-col sm:justify-between lg:flex-row items-center gap-5 lg:gap-20 px-10 sm:px-24 h-[100vw] sm:h-auto">
          <h1 className="text-4xl font-extrabold">
            Tulis keluh kesahmu di sini!
          </h1>
          <img src={heroImage} alt="" className="w-full lg:w-1/2" />
        </div>

        <div className="bg-slate-200">
          <div className="containe flex flex-col justify-around items-center mt-24 text-center p-6">
            <h2 className="text-xl font-bold text-center pt-5">About</h2>
            <p className="max-w-7xl text-center pt-3 pb-8">
              Diariku merupakan sebuah diari pribadi yang berisi tulisan-tulisan
              pribadi. Tulis perjalanan hidup Anda dan simpan kenangan itu
              selamanya. Anda juga dapat menulis jurnal, catatan, daftar tugas
              dan rencana harian Anda di sini. Di sini Anda dapat
              mengekspresikan diri. Tuliskan rahasia dan perasaan Anda dalam
              diari pribadi kehidupan ini. Pertahankan momen hidup Anda yang tak
              terlupakan dan tonggak sejarah di dalamnya. Diariku akan menjadi
              teman sempurna Anda untuk mengekspresikan diri.
            </p>
          </div>
        </div>

        <div className="container py-24 flex flex-wrap justify-evenly gap-20 p-6">
          <ProductFeature
            FontAwesomeIcon={FontAwesomeIcon}
            icon={faLock}
            productTitle={`Lebih Aman & Praktis`}
            productText={`Diari yang lebih aman dan lebih praktis dibandingkan diari
                tradisional yang ditulis dengan pensil.`}
          />
          <ProductFeature
            FontAwesomeIcon={FontAwesomeIcon}
            icon={faSearch}
            productTitle={`Lebih Mudah Dicari`}
            productText={` Diari Anda dapat dengan mudah dicari menggunakan satu kata kunci
            dari judul dan isi`}
          />
          <ProductFeature
            FontAwesomeIcon={FontAwesomeIcon}
            icon={faCalendar}
            productTitle={`Lebih Terorganisir`}
            productText={`Diari terorganisir dengan kalender, sehingga Anda dapat
            menjangkau diari anda dengan mudah.`}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
