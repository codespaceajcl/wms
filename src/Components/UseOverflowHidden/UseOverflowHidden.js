import { useEffect } from 'react';

const useOverflowHidden = (shouldApplyOverflowHidden) => {
  useEffect(() => {
    document.body.style.overflow = shouldApplyOverflowHidden ? 'hidden' : 'auto';
    // document.body.style.padding = shouldApplyOverflowHidden ? '25px' : '0px';
    
    return () => {
        document.body.style.overflow = 'hidden';
        // document.body.style.padding = '25px'
    };
  }, [shouldApplyOverflowHidden]);
};

export default useOverflowHidden;