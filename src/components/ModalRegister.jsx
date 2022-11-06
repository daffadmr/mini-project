import { useMutation } from "@apollo/client";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Button, FileInput, Label, Modal, TextInput } from "flowbite-react";
import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { storage } from "../configs/firebaseConfig";
import { INSERT_USER } from "../GraphQL/mutations";

const ModalRegister = () => {
  const [showModal, setShowModal] = useState(false);
  const [setDataUser, { error }] = useMutation(INSERT_USER);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setAvatar(downloadURL);
      });
    });
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    await setDataUser({
      variables: {
        username: userName,
        password: password,
        email: email,
        avatar: avatar,
      },
    });

    if (error === undefined) {
      Swal.fire({
        title: "Success",
        text: "Berhasil Sign Up",
        icon: "success",
        confirmButtonText: "OK",
      });
      setShowModal(false);
    } else {
      Swal.fire({
        title: "Error",
        text: "Gagal Sign Up",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const onClick = () => {
    setShowModal(!showModal);
  };

  return (
    <span>
      <button className="text-blue-600" onClick={onClick}>
        sini
      </button>
      <Modal
        show={showModal}
        size="md"
        popup={true}
        onClose={onClick}
        className="w-sreen h-screen"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">
              Sign Up
            </h3>
            <form
              className="space-y-6 pb-4 sm:pb-6 xl:pb-8"
              onSubmit={handleSubmitRegister}
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="username" value="Username" />
                </div>
                <TextInput
                  id="username"
                  placeholder="ujangkopling"
                  required={true}
                  value={userName}
                  onChange={handleChangeUserName}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email" />
                </div>
                <TextInput
                  id="email"
                  placeholder="ujangkopling@gmail.com"
                  type="email"
                  required={true}
                  value={email}
                  onChange={handleChangeEmail}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Password" />
                </div>
                <TextInput
                  id="password"
                  placeholder="*********"
                  type="password"
                  required={true}
                  value={password}
                  onChange={handleChangePassword}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="avatar" value="Avatar" />
                </div>
                <FileInput
                  id="avatar"
                  required={true}
                  onChange={handleChangeAvatar}
                  accept="image/png, image/jpg, image/jpeg"
                />
              </div>
              <div className="w-full">
                <Button type="submit" color="dark">
                  Sign Up
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </span>
  );
};

export default ModalRegister;
