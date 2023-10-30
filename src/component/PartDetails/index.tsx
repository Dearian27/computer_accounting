import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";

const PartDetails = () => {
  const dispatch = useAppDispatch();
  const { currentComponent } = useAppSelector((state: RootState) => state.computer);
  
  return (
    <aside className="partDetails">
      { currentComponent ? 
          <>
          <div>
            <span>currentComponent.name</span>
          </div>
          <div className="history">
            <div className="item">history item</div>
            <div className="item">history item</div>
            <div className="item">history item</div>
            <div className="item">history item</div>
            <div className="item">history item</div>
            <div className="item">history item</div>
            <div className="item">history item</div>
          </div>
          </>
        :
        <div className="font none">
          Виберіть деталь
        </div>
      }
    </aside>
  )
}
export default PartDetails;