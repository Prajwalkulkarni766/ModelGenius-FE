import Alerts from "./Alert";
import { AlertProps } from "../../types/Alert";
import { useEffect, useState } from "react";
import { fetchNotificationService } from "../../services/settingService";

const Notification = () => {

    const [data, setData] = useState<AlertProps[] | []>([]);

    const getNotification = async () => {
        try {
            const data = await fetchNotificationService()
            if (data) {
                setData(data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getNotification();
    }, [])

    return (
        <>
            <Alerts alerts={data} />
        </>
    )
}

export default Notification;