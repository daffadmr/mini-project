import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { INSERT_DIARY } from "../graphql/mutations";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { storage } from "../configs/firebaseConfig";
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Helmet } from "react-helmet-async";

const initialData = { judul: "", isi: "", foto: null };
const InputDiari = () => {
  const [data, setData] = useState(initialData);
  const userId = Cookies.get("userId");
  const navigate = useNavigate();
  const [createDiary] = useMutation(INSERT_DIARY);
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleUploadChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setData({ ...data, foto: downloadURL });
      });
    });
  };

  const handleEditorChange = (editorState) => {
    setData({ ...data, isi: editorState });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newData = {
      judul: data.judul,
      isi: data.isi,
      foto: data.foto,
    };

    createDiary({
      variables: {
        isi: newData.isi,
        judul: newData.judul,
        foto: newData.foto,
        user_id: userId,
      },
    });
    navigate("/dashboard");
    Swal.fire({
      title: "Success",
      text: "Diari berhasil dibuat!",
      icon: "success",
      confirmButtonText: "OK",
    });
  };
  return (
    <>
      <Helmet>
        <title>Diariku - Buat Diari</title>
        <meta name="description" content="Buat diari" />
      </Helmet>
      <div className="container">
        <div className="flex items-center flex-col">
          <Link to="/dashboard" className="self-start">
            <p className="px-3 py-5 lg:px-0 lg:py-5 underline">
              {"<- Back to Dashboard"}
            </p>
          </Link>
          <h1 className="pt-5 pb-5 font-bold">Buat Diari</h1>
          <form onSubmit={handleSubmit} className="w-[80vw] md:w-[50vw] pb-24">
            <div className="flex flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Judul" />
                </div>
                <TextInput
                  id="base"
                  type="text"
                  sizing="md"
                  name="judul"
                  value={data.judul}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Isi" />
                </div>
                <MDEditor
                  value={data.isi}
                  onChange={handleEditorChange}
                  data-color-mode="light"
                  preview="edit"
                  className="bg-slate-500"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Foto" />
                </div>
                <FileInput
                  id="base"
                  type="text"
                  sizing="md"
                  name="foto"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={handleUploadChange}
                />
                <div className="flex gap-5 items-center py-4">
                  <p>Preview Foto:</p>
                  <img src={data.foto} alt="" width={100} />
                </div>
              </div>
            </div>
            <div className="pt-6">
              <Button color={"dark"} type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default InputDiari;
