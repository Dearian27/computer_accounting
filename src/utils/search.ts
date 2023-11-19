import { ComputerParams, componentParams } from "../../redux/slices/computer";

export function searchMatchesByComputer(computer: ComputerParams, query: string, allComponents: componentParams[]): boolean {
	if(computer.name.toLowerCase().includes(query.toLowerCase())) {
		return true;
	}
	if(computer.location.toLowerCase().includes(query.toLowerCase())) { 
		return true;
	}
	if(computer.responsible.toLowerCase().includes(query.toLowerCase())) {
		return true;
	}
	let isTrue = false;
	computer.components.map((component) => {
		component.id.map((cId) => {
			if(allComponents.find(component => component._id === cId)?.name.toLowerCase().includes(query.toLowerCase())) {
				console.log('true');
				isTrue = true;
				return true;
			}
		})
	});
	if(isTrue) return true;
	return false;
}

export function searchMatchesByComponent(component: componentParams, query: string, computerId: string, computers: ComputerParams[]): boolean {
	if(component.name.toLowerCase().includes(query.toLowerCase())) {
		return true;
	}
	if(computerId) {
		let isTrue = false;
		computers.map(computer => {
			if(computerId === computer._id && computer.name.toLowerCase().includes(query.toLowerCase())) {
				isTrue = true;
				return true;
			}
		})
		if(isTrue) return true;
	}
	return false;
}