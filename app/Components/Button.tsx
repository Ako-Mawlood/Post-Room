
const Button = ({ type,buttonText,style}: { type: "button" | "submit" | "reset",buttonText:string,style:string }) => {
  
  return <button className={style} type={type}>{buttonText}</button>;
};

export default Button;
