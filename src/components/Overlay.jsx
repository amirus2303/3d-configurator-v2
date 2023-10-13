import { useEffect, useState } from "react";
import { scenes, showColorPicker } from "./Experience";
import { slideContext } from "./Experience";
import { useAtom } from "jotai";
import logo from "../assets/logo-devbox.png";
export const Overlay = () => {
  const [showPicker, setShowPicker] = useAtom(showColorPicker);
  const [slide, setSlide] = useAtom(slideContext);
  const [displaySlide, setDisplaySlide] = useState(slide);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 1000);
  }, []);

  useEffect(() => {
    setVisible(false);
    setTimeout(() => {
      setDisplaySlide(slide);
      setVisible(true);
    }, 2600);
  }, [slide]);
  return (
    <>
      <div
        className={`fixed  z-10 top-0 left-0 bottom-0 right-0 flex flex-col justify-between pointer-events-none text-black ${
          visible ? "" : "opacity-0"
        } transition-opacity duration-1000`}
      >
        <img src={logo} alt="" className="w-40 mx-auto mt-8" />
        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-between flex-1 p-4">
          <svg
            onClick={() => {
              setSlide((prev) => (prev > 0 ? prev - 1 : scenes.length - 1));
              setShowPicker(false);
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 transition-opacity cursor-pointer pointer-events-auto hover:opacity-60"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 transition-opacity cursor-pointer pointer-events-auto hover:opacity-60"
            onClick={() => {
              setSlide((prev) => (prev < scenes.length - 1 ? prev + 1 : 0));
              setShowPicker(false);
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </div>
        <div className="flex flex-col items-center p-4 pt-20 pb-10 text-center ">
          <h1 className="text-5xl font-extrabold">
            {scenes[displaySlide].name}
          </h1>
          <p className="italic text-opacity-60">
            {scenes[displaySlide].description}
          </p>
          <div className="flex items-center gap-12 mt-10">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                  />
                </svg>
                <p className="text-3xl font-semibold">
                  {scenes[displaySlide].price.toLocaleString()} DA
                </p>
              </div>
              <p className="text-sm opacity-80">Toutes taxes comprises</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5zM3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z"
                  />
                </svg>
                <p className="text-3xl font-semibold">
                  {scenes[displaySlide].range}km
                </p>
              </div>
              <p className="text-sm opacity-80">Livraison gratuite</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
