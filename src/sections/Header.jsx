import React, { useEffect, useState } from "react";
import image from "../assets/images/auth/logo.svg";
import imageFull from "../assets/images/auth/logoTarjetags.svg";
import { BiSolidUser } from "react-icons/bi";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../utils/firebase-config";
import { GoFileDirectoryFill } from "react-icons/go";
import { FaStore, FaUsersCog } from "react-icons/fa";
import useWindowSize from "../hooks/useWindowsSize";
import "../assets/styles/header.css";
import { doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowSize();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsOpen(false);
  }, [router.pathname]);

  const [fullname, setFullname] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (fireBaseUser) => {
      if (fireBaseUser) {
        setUser(fireBaseUser);
        const unsubscribe = onSnapshot(
          doc(db, "users", fireBaseUser.uid),
          (snapshot) => {
            const userData = snapshot.data();
            setFullname(userData.fullname);
            setIsAdmin(userData.admin);
          },
          (error) => {
            setFullname("Perfil");
          }
        );
        return unsubscribe;
      } else {
        setUser("Perfil");
      }
    });
  }, [user]);

  const onClickHeader = () => {
    setIsOpen(!isOpen);
  };

  const isResponsive = width <= 1268 ? true : false;
  const conditional = isOpen && isResponsive ? "navigationResponsive" : "";

  return (
    <header style={{ zIndex: 1000 }}>
      <div className="headerContainer container">
        <div className="logo_img">
          <Link href="/">
            <div className="logoHeader">
              <Image
                src={isResponsive ? image : imageFull}
                alt="Tarjetag logo"
                width={800}
                height={800}
              />
            </div>
          </Link>
        </div>
        <nav className={"navigation " + conditional}>
          <div
            className={`${conditional !== "navigationResponsive" && "d-flex"}`}
          >
            {isAdmin ? (
              <>
                <div className="header-link">
                  <FaUsersCog className="icon-header" />
                  <Link href="/admin">
                    <span className="link ml-1">Admin Panel</span>
                  </Link>
                </div>
                <div className="header-link">
                  <FaStore className="icon-header" />
                  <Link href="/store">
                    <span className="link ml-1">Tienda</span>
                  </Link>
                </div>
              </>
            ) : (
              <></>
            )}

            <div className="header-link">
              <GoFileDirectoryFill className="icon-header" />
              <Link href="/">
                <span className="link ml-1">Ver Mi Tarjeta</span>
              </Link>
            </div>

            <div className="header-link">
              <BiSolidUser className="icon-header" />
              <Link href={!user ? "/" : "/profile"}>
                <span className="link mainButton ml-1">
                  {user ? fullname : "Iniciar Sesion"}
                </span>
              </Link>
            </div>
          </div>
        </nav>
        <div className="menuButton" onClick={onClickHeader}>
          <button
            className={
              isOpen && isResponsive ? "cancelButton-header" : "headerButton"
            }
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
