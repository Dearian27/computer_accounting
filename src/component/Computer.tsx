import { useParams } from "react-router-dom";
import { ComputerParams } from "../../redux/slices/computer";
import Account from "./Account";

type ComputerProps = {
  computers: ComputerParams[]
}

const Computer: React.FC<ComputerProps> = ({computers}) => {
  const params = useParams();
  
  if(!computers) return <>Завантаження...</>;
  const computer = computers?.find((computer: ComputerParams) => computer._id === params.id);
  
  return computer ?
    <Account notes={computer.notes} id={computer._id} key={computer._id} components={computer.components} responsible={computer.responsible} location={computer.location} history={computer.history} compName={computer.name} />
    : <></>
}
export default Computer;