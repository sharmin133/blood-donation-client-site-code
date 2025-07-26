
import { useNavigate } from 'react-router';  
import { AuthContext } from '../../context/AuthContext';

const Fund = () => {

  const navigate = useNavigate();

  const handleFundClick = () => {
    
      navigate(`/fund-page`);
   
  };

  return (
    <div>
      <div className="flex justify-between mx-auto">
        <h2 className="text-2xl font-bold text-red-700 mb-4">Give Fund</h2>

        <button onClick={handleFundClick} className="btn btn-primary">
          Fund
        </button>
      </div>
    </div>
  );
};

export default Fund;