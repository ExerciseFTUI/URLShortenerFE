import { Link } from "react-router-dom"

function ButtonLink({
  to = "",
  title = "Button",
  theme = "dark",
  width = "fit",
  className = "",
}) {
  return (
    // prettier-ignore
    <Link 
      to={to} 
      className={
        "font-semibold hover:scale-95 ease-in-out duration-200 rounded-md text-center text-lg " +
        (theme == "dark" ? "bg-dark-2 " : "bg-light ") +
        (theme == "dark" ? "text-light " : "text-dark-1 ") +
        (`w-${width} `) +
        className
      }
    >
      {title}
    </Link>
  )
}

export default ButtonLink
