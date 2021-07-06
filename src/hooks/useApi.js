import { useState } from "react";
import { useStore } from "../store/store";

export const useApi = () => {
    const [load, setLoad] = useState(false);
    const { user } = useStore();
    const fetcher = async (url, method = 'GET', body = null) => {
        setLoad(true);
        const resp = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-SessionID': await user.getToken()
            },
            body
        });
        const respJson = await resp.json();
        setLoad(false);
        return respJson;
    }
    return [load, fetcher];
}