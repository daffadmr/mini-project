import React from "react";
import Logo from "../assets/svg/Logo";
import { Footer } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithubSquare,
  faFacebookSquare,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";

const MyFooter = () => {
  return (
    <Footer className="font-inter rounded-none">
      <div className="w-full bg-slate-300">
        <div className="flex w-full py-8 px-12 md:px-0 flex-wrap container justify-between flex-col md:flex-row gap-12">
          <div className="flex flex-col justify-center">
            <Footer.LinkGroup>
              <Logo />
            </Footer.LinkGroup>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase">
              Social Media
            </h3>
            <Footer.LinkGroup className="flex gap-5 text-gray-900">
              <a href="https://github.com/daffadmr" target="blank">
                <FontAwesomeIcon icon={faGithubSquare} className=" text-2xl" />
              </a>
              <a href="https://twitter.com/daffadmr" target="blank">
                <FontAwesomeIcon icon={faTwitterSquare} className=" text-2xl" />
              </a>
              <a href="https://www.facebook.com/" target="blank">
                <FontAwesomeIcon
                  icon={faFacebookSquare}
                  className=" text-2xl"
                />
              </a>
            </Footer.LinkGroup>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase ">Address</h3>
            <Footer.LinkGroup className="flex flex-col text-gray-900">
              <Footer.Link href="#">Jakarta, Indonesia</Footer.Link>
              <Footer.Link href="#">10210</Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
        <div className="w-full bg-slate-400 text-slate-500 py-4 px-4 text-center">
          <Footer.Copyright href="#" by=" Daffa Damar" year={2022} />
        </div>
      </div>
    </Footer>
  );
};

export default MyFooter;
