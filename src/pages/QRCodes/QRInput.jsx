function QRInput({
  type = "text",
  placeholder = "",
  className = "",
  value = "",
  required = false,
  onChange = null,
  name = "name",
  ...props
}) {
  const handleInputChange = (e, set) => {
    set(e.target.value)
  }

  return (
    // prettier-ignore
    <>
    <label htmlFor={name} className="font-medium text-lg mb-1">
        {name[0].toUpperCase() + name.slice(1, name.length)}
    </label>
    
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
    </>
  )
}

export default QRInput
