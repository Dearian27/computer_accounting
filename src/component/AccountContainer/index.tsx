import { useEffect, useState } from "react";
import Account from "../Account";
import './style.css';
import axios from "../../utils/axios";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { ComputerParams, setAllComponents, setComputers } from "../../../redux/slices/computer";
import { RootState } from "../../../redux/store";

type getComputersResponse = {
	computers: Array<ComputerParams>,
	message: string,
}

function AccountContainer(){
	const dispatch = useAppDispatch();
	const { computers } = useAppSelector((state: RootState) => state.computer)
	const [error, setError] = useState('');

	const getComputers = async() => {
		try {
			const res = await axios.get<getComputersResponse>('/computers/');
			dispatch(setComputers(res.data.computers));
			
			const res2 = await axios.get('/components/');
			dispatch(setAllComponents(res2.data.components));
		} catch(err) {
			console.error(err);
			setError('Щось пішло не так')
		}
	}

	useEffect(() => {
		getComputers();
	}, []);

	return !error ? ( 
		<div className="AccountContainer">
			{
				computers?.map((computer: ComputerParams) => {
					return <Account id={computer._id} key={computer._id} components={computer.components} responsible={computer.responsible} location={computer.location} history={computer.history} compName={computer.name} />
				})
			}
		</div>
	): <div className="error">{error}</div>
}

export default AccountContainer;