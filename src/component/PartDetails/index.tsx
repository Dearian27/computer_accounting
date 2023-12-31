import { Link } from "react-router-dom";
import './styles.css';
import { parser } from "../../componentParser";
import { componentTypeVariants } from "../ComponentAccount";

export type historyParams = Array<{_id: number, name: string, oldId: number, oldName: string, date: Date, componentType: componentTypeVariants}>;

type HistoriesParams = {
  history: historyParams
}

const PartDetails: React.FC<HistoriesParams> = ({history}) => {
  
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
                {item.oldName && item.name ?
                  <div className="content">
                    Компонент <Link to={`/components/${item.oldId}`}>{item.oldName}</Link> замінено на <Link to={`/components/${item._id}`}>{item.name}</Link>
                  </div>
                  : item.name && item._id ?
                    <div className="content">
                      Початок експлуатації <Link to={`/components/${item._id}`}>{item.name}</Link>
                    </div>  
                  : item.oldName && item.oldId &&
                    <div className="content">
                      Кінець експлуатації <Link to={`/components/${item._id}`}>{item.oldName}</Link>
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