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
              <Logo/>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title className="text-slate-500" title="help center" />
            <Footer.LinkGroup className="flex flex-col text-slate-500">
              <Footer.Link href="#">Discord Server</Footer.Link>
              <Footer.Link href="#">Twitter</Footer.Link>
              <Footer.Link href="#">Facebook</Footer.Link>
              <Footer.Link href="#">Contact Us</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title className="text-slate-500" title="legal" />
            <Footer.LinkGroup className="flex flex-col text-slate-500">
              <Footer.Link href="#">Privacy Policy</Footer.Link>
              <Footer.Link href="#">Licensing</Footer.Link>
              <Footer.Link href="#">Terms & Conditions</Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
        <div className="w-full bg-slate-400 text-slate-500 py-4 px-4 sm:flex sm:items-center sm:justify-between">
          <div className="container flex justify-between items-center">
            <Footer.Copyright href="#" by=" Daffa Damar" year={2022} />
            <div className="flex space-x-6 sm:mt-0 sm:justify-center">
              <a href="https://github.com/daffadmr" target="blank">
                <FontAwesomeIcon
                  icon={faGithubSquare}
                  className="text-gray-500 text-2xl"
                />
              </a>
              <a href="https://twitter.com/daffadmr" target="blank">
                <FontAwesomeIcon
                  icon={faTwitterSquare}
                  className="text-gray-500 text-2xl"
                />
              </a>
              <a href="https://www.facebook.com/" target="blank">
                <FontAwesomeIcon
                  icon={faFacebookSquare}
                  className="text-gray-500 text-2xl"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default MyFooter;
