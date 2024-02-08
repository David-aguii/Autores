
import "./topnac.css";
const TopNav = ({ titulo, direccion }) => {
  return (
    <div className="titulo">
      <h1>Favorite authors</h1>
      <a href={direccion} style={{ marginRight: '50%' }} >{titulo}</a>
    </div>
  );
};
export default TopNav
