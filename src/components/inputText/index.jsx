import React from "react"

function InputText({
  type = "text",
  name = "",
  content = "",
  minLength = 3,
  maxLength = 20,
  onChange,
  ...props
}) {
  const handleInputChange = (e, set) => {
    set(e.target.value)
  }

  return (
    <>
      <label htmlFor={name}>
        {name[0].toUpperCase() + name.slice(1, name.length)}
      </label>
      <input
        type={type}
        name={name}
        placeholder={name + "..."}
        minLength={minLength}
        maxLength={maxLength}
        className={
          "bg-light shadow-md shadow-grey-2 text-dark outline-none rounded-full pl-4 h-12 mt-2 mb-4" +
          " " +
          props.className
        }
        value={content}
        onChange={(e) => handleInputChange(e, onChange)}
      />
    </>
  )
}

export default InputText
