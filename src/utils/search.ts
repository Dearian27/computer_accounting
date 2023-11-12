import { ComputerParams, componentParams } from "../../redux/slices/computer";

export function searchMatchesByComputer(computer: ComputerParams, query: string): boolean {
	if(computer.name.toLowerCase().includes(query.toLowerCase())) {
		return true;
	}
	if(computer.location.toLowerCase().includes(query.toLowerCase())) { 
		return true;
	}
	if(computer.responsible.toLowerCase().includes(query.toLowerCase())) {
		return true;
	}
	computer.components.map((component) => component.name?.toLowerCase().includes(query.toLowerCase()) && true);
	return false;
}

export function searchMatchesByComponent(component: componentParams, query: string): boolean {
	if(component.name.toLowerCase().includes(query.toLowerCase())) {
		return true;
	}
	return false;
}