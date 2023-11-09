import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import './styles.css';
import { parser } from "../../componentParser";
import { useEffect, useState } from "react";

export type History = Array<{_id: number, name: string, oldId: number, oldName: string, date: Date, componentType: string}>;

type HistoryParams = {
  history: History
}

const PartDetails: React.FC<HistoryParams> = ({history}) => {
  const dispatch = useAppDispatch();
  // const {  } = useAppSelector((state: RootState) => state.computer);
  return (
    <aside className="history">
      { history ?
          <>
            { history.map((item, index) => {
              const formattedDate = new Date(item.date);
              return <div className="item" key={index}>
                <div className="date">
                  <span>
                    {parser[item.componentType]}
                  </span>
                  <span>
                    {formattedDate.toLocaleDateString('en-GB')}
                  </span>
                </div>
                {item.oldName && item.oldId ?
                  <div className="content">
                    Компонент <a href={`/${item.oldId}`}>{item.oldName}</a> замінено на <a href={`/${item._id}`}>{item.name}</a>
                  </div>
                  :
                    <div className="content">
                      Початок експлуатації <a href={`/${item._id}`}>{item.name}</a>
                    </div>  
                  }
                </div>
            })}
          </>
        :
        <div className="font none">
          Історія відсутня
        </div>
      }
    </aside>
  )
}
export default PartDetails;