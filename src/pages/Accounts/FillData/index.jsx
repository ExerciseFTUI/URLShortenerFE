import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Select from "react-select"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { motion, AnimatePresence } from "framer-motion"

import { apiGetUserData, apiUpdateUser } from "../../../utils"

import InputText from "../../../components/inputText"
import HexaParticles from "../../../components/hexagonAnim/HexaParticles"
import HexaBorder from "../../../components/hexagonAnim/HexaBorder"

import fakultas from "../../../assets/data/list-fakultas"

function RegisterPage() {
  const queryClient = useQueryClient()
  const userId = sessionStorage.getItem("userId")
  const navigate = useNavigate()

  //Get user data
  const userQuery = useQuery({
    queryKey: ["getUserData"],
    queryFn: () => apiGetUserData(),
  })

  const fakultasOpt = fakultas.map(({ nama }) => ({
    value: nama,
    label: nama,
  }))

  const jurusanOpt = fakultas.map(({ jurusan }) =>
    jurusan.map((j) => ({ value: j, label: j }))
  )

  const [namaUser, setNamaUser] = useState("")
  const [namaFakultas, setNamaFakultas] = useState("")
  const [namaJurusan, setNamaJurusan] = useState("")

  const [indexFakultas, setIndexFakultas] = useState(-1)
  const [currentJurusanOpt, setCurrentJurusanOpt] = useState([])

  const fakultasChange = ({ value }) => {
    setNamaFakultas(value)
  }

  const jurusanChange = ({ value }) => {
    setNamaJurusan(value)
  }

  if (userQuery.isSuccess) {
    sessionStorage.setItem("userId", userQuery.data.user._id)
    sessionStorage.setItem("name", userQuery.data.user.name)
    sessionStorage.setItem("avatar", userQuery.data.user.avatar)
  }

  const loginGoogle = (e) => {
    e.preventDefault()

    if (namaUser.length < 3 || namaFakultas == "" || namaJurusan == "") {
      // Give Error
    } else {
      // POST data to database
      const userData = {
        name: namaUser,
        fakultas: namaFakultas,
        jurusan: namaJurusan,
      }

      mutation.mutate(userData)
    }
  }

  const mutation = useMutation({
    mutationFn: (userData) => apiUpdateUser(userId, userData),
    onSuccess: () => {
      sessionStorage.setItem("name", namaUser)
      queryClient.invalidateQueries("getUserData")
      navigate("/")
    },
  })

  // prettier-ignore
  useEffect(() => {
    setIndexFakultas(fakultasOpt.map(({value}) => value).indexOf(namaFakultas))
    setCurrentJurusanOpt(jurusanOpt[indexFakultas])
  }, [namaFakultas, indexFakultas])

  return (
    <div id="sign-up" className="text-grey-2">
      <div className="site-wrapper w-container h-[100vh] flex-center flex-col gap-4">
        <AnimatePresence>
          {mutation.isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 left-0 z-20 w-screen h-screen flex-center backdrop-blur-sm"
            >
              <HexaBorder duration={2.5} theme="dark" className="w-12" />
            </motion.div>
          ) : (
            <motion.form
              onSubmit={loginGoogle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-lg flex flex-col w-full max-w-lg"
            >
              <InputText
                name="Nama"
                placeholder="Masukkan Nama Anda"
                required={true}
                content={namaUser}
                onChange={setNamaUser}
                maxLength={100}
                minLength={3}
              />

              <>
                <label className="mb-2" htmlFor="Fakultas">
                  Fakultas
                </label>

                <Select
                  required
                  isSearchable
                  options={fakultasOpt}
                  onChange={fakultasChange}
                  placeholder="Pilih Fakultas Anda"
                  name="Fakultas"
                  styles={{
                    control: (base, state) => ({
                      // ...base,
                      borderColor: "none",
                      background: "#FAFAFA",
                      display: "flex",
                      color: "#1C465C",
                      borderRadius: "2rem",
                      paddingLeft: "0.5rem",
                      height: "3rem",
                      boxShadow:
                        "0 4px 6px -1px #527182, 0 2px 4px -2px #527182",
                      cursor: "pointer",
                    }),
                    option: (base, state) => ({
                      ...base,
                      background:
                        state.isFocused || state.isSelected
                          ? "#527182"
                          : "#FAFAFA",
                      color:
                        state.isFocused || state.isSelected
                          ? "#FAFAFA"
                          : "#1C465C",
                      cursor: "pointer",
                    }),
                  }}
                />
              </>

              <>
                <label className="mt-4" htmlFor="Jurusan">
                  Jurusan
                </label>

                <Select
                  required
                  isDisabled={!currentJurusanOpt ? true : false}
                  isSearchable
                  options={currentJurusanOpt}
                  onChange={jurusanChange}
                  placeholder={
                    !currentJurusanOpt
                      ? "Pilih Fakultas Terlebih Dahulu!"
                      : "Pilih Jurusan"
                  }
                  name="Jurusan"
                  styles={{
                    control: (base, state) => ({
                      // ...base,
                      borderColor: "none",
                      background: "#FAFAFA",
                      opacity: state.isDisabled ? "30%" : "100%",
                      display: "flex",
                      color: "#1C465C",
                      borderRadius: "2rem",
                      margin: "0.5rem 0 1rem",
                      paddingLeft: "0.5rem",
                      height: "3rem",
                      boxShadow:
                        "0 4px 6px -1px #527182, 0 2px 4px -2px #527182",
                      cursor: state.isDisabled ? "not-allowed" : "pointer",
                    }),
                    option: (base, state) => ({
                      ...base,
                      background:
                        state.isFocused || state.isSelected
                          ? "#527182"
                          : "#FAFAFA",
                      color:
                        state.isFocused || state.isSelected
                          ? "#FAFAFA"
                          : "#1C465C",
                      cursor: "pointer",
                    }),
                  }}
                />
              </>

              <button
                type="submit"
                className="bg-light text-dark-1 font-bold py-2 px-6 hover:scale-95 ease-in-out duration-200 rounded-md text-center text-lg flex-center flex-row gap-6 shadow-grey-2 shadow-md mt-2"
              >
                Save
              </button>
            </motion.form>
          )}
        </AnimatePresence>
        <HexaParticles angle="counter-clockwise" direction="left" />
      </div>
    </div>
  )
}

export default RegisterPage
