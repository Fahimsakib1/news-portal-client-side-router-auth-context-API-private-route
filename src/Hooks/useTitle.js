import { useEffect } from "react"

const useTitle = title => {
    useEffect( () => {
        document.title = `${title} -BBC News`;
    }, [title])
}

export default useTitle;