import { useEffect } from "react";

function useDetectOutsideClick (menuRef, expandingMenuRef, deactivate) {
  useEffect(() => {
    function handleOutsideClick (event) {
      if (!expandingMenuRef.current.contains(event.target)) {
        if (!menuRef.current.contains(event.target)) {
          deactivate();
        } 
      }
    }

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    }
  }, []);
}

export default useDetectOutsideClick;
