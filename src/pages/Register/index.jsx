import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Select from "react-select"

import InputText from "../../components/inputText"
import HexaParticles from "../../components/hexagonAnim/HexaParticles"

import fakultas from "../../assets/list-fakultas"
import ButtonGoogle from "../../components/button/ButtonGoogle"

function RegisterPage() {
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

  const loginGoogle = (e) => {
    if (namaUser.length < 3 || namaFakultas == "" || namaJurusan == "") {
      e.preventDefault()

      // Give Error
    } else {
      // Login Google
      // Authorized
      // Post Data to Backend
    }
  }

  // prettier-ignore
  useEffect(() => {
    setIndexFakultas(fakultasOpt.map(({value}) => value).indexOf(namaFakultas))
    setCurrentJurusanOpt(jurusanOpt[indexFakultas])
  }, [namaFakultas, indexFakultas])

  return (
    <div id="sign-up" className="text-grey-2">
      <div className="site-wrapper w-container h-[100vh] flex-center flex-col gap-4">
        <form
          className="text-lg flex flex-col w-full max-w-lg"
          onSubmit={loginGoogle}
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
            <label className="mt-05" htmlFor="Fakultas">
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
                  boxShadow: "0 4px 6px -1px #527182, 0 2px 4px -2px #527182",
                }),
                option: (base, state) => ({
                  ...base,
                  background:
                    state.isFocused || state.isSelected ? "#527182" : "#FAFAFA",
                  color:
                    state.isFocused || state.isSelected ? "#FAFAFA" : "#1C465C",
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
              onInputChange={jurusanChange}
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
                  boxShadow: "0 4px 6px -1px #527182, 0 2px 4px -2px #527182",
                }),
                option: (base, state) => ({
                  ...base,
                  background:
                    state.isFocused || state.isSelected ? "#527182" : "#FAFAFA",
                  color:
                    state.isFocused || state.isSelected ? "#FAFAFA" : "#1C465C",
                }),
              }}
            />
          </>

          <ButtonGoogle
            type="submit"
            theme="light"
            title="Sign Up With Google"
            className="w-full text-dark-2 mt-4 mb-2 shadow-md shadow-grey-2 font-medium"
          />
        </form>

        <p className="text-center text-sm font-medium italic">
          Already have an account?{" "}
          <Link to="/account/login" className="underline underline-offset-4">
            Sign in
          </Link>
        </p>

        <HexaParticles angle="counter-clockwise" direction="left" />
      </div>
    </div>
  )
}

export default RegisterPage
