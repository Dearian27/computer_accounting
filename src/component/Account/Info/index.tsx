import React, { ChangeEvent, useState } from "react";
import './styles.css';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import Component from "../../Component";
import { componentParams, setAllComponents, setComputers, setEditMode } from "../../../../redux/slices/computer";
import PartDetails, { historyParams } from "../../PartDetails";
import { MdDeleteSweep } from "react-icons/md";
import { MdCreate } from "react-icons/md";
import { MdSaveAs } from "react-icons/md";

import { AiOutlineClose } from "react-icons/ai";
import axios from "../../../utils/axios";
import { componentTypeVariants } from "../../ComponentAccount";
import toast from "react-hot-toast";


type AccountParams = {
  id: string;
	components: Array<{type: componentTypeVariants; name: string, id: [string]}>;
	responsible: string;
	location: string;
	history: historyParams;
	compName: string;
}

const Info: React.FC<AccountParams> = ({ id, components, responsible, location, history, compName}) => {
  const dispatch = useAppDispatch();
  const [inputs, setInputs] = useState<{name: string; responsible: string; location: string}>({
    name: compName, responsible, location
  });
  const [defaultInputs] = useState<{name: string; responsible: string; location: string}>({
    name: compName, responsible, location
  });
  const { allComponents, editMode } = useAppSelector(state => state.computer);
  const { user } = useAppSelector(state => state.user);
  const [textArea, setTextArea] = useState('');
  
  const getComputers = async() => {
		try {
			const res = await axios.get('/computers/');
			dispatch(setComputers(res.data.computers));
			
			const res2 = await axios.get('/components/');
			dispatch(setAllComponents(res2.data.components));
		} catch(err) {
			console.error(err);
		}
	}

  const deleteHandler = async () => {
    axios.delete(`/computers/delete/${id}`)
    .then(() => {      
        getComputers();
        toast.success('Комп\'ютер видалено успішно!');
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      console.error(error);
    })
	}

  const inputsChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [event.target.name]: event.target.value
    }))
  }
  const editClickHandler = () => {
    if(user?.status === 'admin' || user?.status === 'teacher') {
      if(editMode) setInputs(defaultInputs);
      dispatch(setEditMode(!editMode));
    }
  }
  const handleSubmit = async() => {
    dispatch(setEditMode(false));
    const res = await axios.post(`/computers/update/${id}`, {
      name: inputs.name,
      responsible: inputs.responsible,
      location: inputs.location
    })
    if(res.status === 200) {
      toast.success(res.data.message); 
    } else {
      toast.error(res.data.message); 
    }
    getComputers();
  }

  return (
    <section className="infoContainer">
    <main className='info'>
      <div className='info_list'>
        <div className="info_line">
          <h3>Назва</h3>
          <input className={`${editMode ? "active" : ""}`} name="name" value={inputs.name} onChange={(event) => inputsChangeHandler(event)} readOnly={!editMode} />
        </div>
        <div className="info_line">
          <h3>Локація</h3>
          <input className={`${editMode ? "active" : ""}`} name="location" value={inputs.location} onChange={(event) => inputsChangeHandler(event)} readOnly={!editMode} />
        </div>
        <div className="info_line">
          <h3>Відповідальний</h3>
          <input className={`${editMode ? "active" : ""}`} name="responsible" value={inputs.responsible} onChange={(event) => inputsChangeHandler(event)} readOnly={!editMode} />
        </div>
      { components && allComponents &&
        components.map((componentsOneType, index: number) => {
          if(componentsOneType?.id && componentsOneType?.id.length > 0 || (componentsOneType.type === 'ram' || componentsOneType.type === 'disk')) {
            if(componentsOneType.id[0] === undefined) {
              return <Component key={index} name={''} type={componentsOneType.type} id={''} computerId={id} withPlus={true} />
            }
            return componentsOneType.id.map(c => {
              return <Component key={c} name={allComponents.find((component: componentParams) => component._id === c)?.name} type={componentsOneType.type} id={c} computerId={id} withPlus={c === componentsOneType.id[componentsOneType.id.length-1] ? true : false} />
            })
          } else {
            return <Component key={index} name={allComponents.find((component: componentParams) => component._id === componentsOneType.id[0])?.name} type={componentsOneType.type} id={componentsOneType.id[0]} computerId={id} />
          }
        })
      }
      </div>
      <div className='panel'>
        <textarea className='notes' value={textArea} onChange={(event) => {setTextArea(event.target.value); localStorage.setItem('textarea', textArea)}} />
        <div className='control_buttons'>
            <button className={`${editMode ? "active" : ""}`}>
            { editMode ? 
              <>
                <MdSaveAs onClick={handleSubmit}  className="btnIcon" color="#50577A"  />
              </>
              :
              <>
                <MdSaveAs  className="btnIcon" color="#6d759b"  />
              </>
              }
            </button>
            <button className={`${editMode ? "red" : ""}`} onClick={() => editClickHandler()}>
              { (user?.status !== 'admin' && user?.status !== 'teacher' && !editMode) ?
                <>
                  <MdCreate  className="btnIcon" color="#6d759b"  />
                </>
                : editMode ? 
                <>
                  <AiOutlineClose className="btnIcon" color="aliceblue" />
                </>
                :
                <>
                  <MdCreate className="btnIcon" color="aliceblue" />
                </>
              }
            </button>
            <button>
              { (user?.status !== 'admin' && user?.status !== 'teacher') ?
                <MdDeleteSweep onClick={deleteHandler} className="btnIcon" color="#6d759b"/>
                : <MdDeleteSweep onClick={deleteHandler} className="btnIcon" color="aliceblue"/>
              }
            </button>
        </div>
      </div>
    </main>
    <PartDetails history={history} />
    </section>
  )
}
export default Info;