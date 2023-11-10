import { useEffect } from "react";
import Account from "../Account";
import './style.css';
import axios from "../../utils/axios";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setAllComponents, setComputers } from "../../../redux/slices/computer";
import { RootState } from "../../../redux/store";

function AccountContainer(){
	const dispatch = useAppDispatch();
	const { computers } = useAppSelector((state: RootState) => state.computer)

	const getComputers = async() => {
		const { data } = await axios.get('/computers/');
		dispatch(setComputers(data.computers));
		const { data:componentsData } = await axios.get('/components/');
		dispatch(setAllComponents(componentsData.components));
	}

	useEffect(() => {
		getComputers();
	}, []);
	console.log(computers);
	return( 
		<div className="AccountContainer">
			{
				computers?.map((computer) => {
					return <Account id={computer._id} key={computer._id} components={computer.components} responsible={computer.responsible} location={computer.location} history={computer.history} compName={computer.name} />
				})
			}
		</div>
	)
}

export default AccountContainer;