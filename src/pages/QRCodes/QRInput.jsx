function QRInput({
  type = "text",
  placeholder = "",
  className = "",
  value = "",
  required = false,
  onChange = null,
  ...props
}) {
  const handleInputChange = (e, set) => {
    set(e.target.value)
  }

  return (
    // prettier-ignore
    <input
      title={placeholder}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={(e) => handleInputChange(e, onChange)}
      className={
        "bg-light outline-none border-b-2 border-dark-2 py-1 px-4 text-lg  placeholder:text-grey-2 " + 
        className
      }
      required={required}
      maxLength={props.maxLength || 1000}
    />
  )
}

export default QRInput
