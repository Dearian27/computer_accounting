import { useEffect, useState } from "react";
import Account from "../Account";
import './style.css';
import axios from "../../utils/axios";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { ComputerParams, componentParams, setAllComponents, setComputers } from "../../../redux/slices/computer";
import { RootState } from "../../../redux/store";
import { Route, Routes, useParams } from "react-router-dom";
import Computer from "../Computer";
import ComponentAccount from "../ComponentAccount";

type getComputersResponse = {
	computers: Array<ComputerParams>,
	message: string,
}

function AccountContainer(){
	const params = useParams();
	const dispatch = useAppDispatch();
	const { computers, allComponents } = useAppSelector((state: RootState) => state.computer)
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
			<Routes>
        <Route path='/' element={
						computers?.map((computer: ComputerParams) => {
							return <Account id={computer._id} key={computer._id} components={computer.components} responsible={computer.responsible} location={computer.location} history={computer.history} compName={computer.name} />
						})
				} />
				<Route path='/computers/:id' element={<Computer computers={computers} />} />
				<Route path='/components/' element={
					allComponents?.map((component: componentParams) => {
						return <ComponentAccount key={component._id} id={component._id} />
					})
				} />
				<Route path='/components/:id' element={<ComponentAccount id={'unique'} />} />
				<Route path='*' element={<h1 style={{color: "white", fontSize: "40px"}}>404</h1>} />
			</Routes>
		</div>
	): <div className="error">{error}</div>
}

export default AccountContainer;