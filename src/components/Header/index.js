import './styles.css';
import icone from '../../assets/icone-2.png';


const Header = () => {
  return (
    <header>
        <img src={icone} alt='icone' className='icone'/>
        <h1>GitFind</h1>
    </header>
  )
}

export { Header };
