import './styles.css';

export default function Component({value, type}) {
  return (
    <div className='info_line'>
      <h3>{type}</h3>
      <button>{value}</button>
    </div>
  )
}
