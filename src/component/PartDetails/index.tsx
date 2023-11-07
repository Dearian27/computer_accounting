import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";

const PartDetails = () => {
  const dispatch = useAppDispatch();
  // const {  } = useAppSelector((state: RootState) => state.computer);
  
  return (
    <aside className="partDetails">
      { 
      // true ? 
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
        // :
        // <div className="font none">
        //   Виберіть деталь
        // </div>
      }
    </aside>
  )
}
export default PartDetails;