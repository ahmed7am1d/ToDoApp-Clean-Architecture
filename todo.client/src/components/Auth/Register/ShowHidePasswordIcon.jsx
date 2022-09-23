import React from 'react'
import { ContactsFilled, ContactsOutlined,MailOutlined, EyeOutlined,EyeInvisibleOutlined} from "@ant-design/icons";


const ShowHidePasswordIcon = (prop) => {
    const showPasswordState = prop.showPasswordState;
    const isShowPasswordClicked = showPasswordState.isShowPasswordClicked;
    const setIsShowPasswordClicked = showPasswordState.setIsShowPasswordClicked;
    const handleShowPassword = () => {
        setIsShowPasswordClicked(!isShowPasswordClicked);
    };
  return (
    <>
        {isShowPasswordClicked ? <EyeInvisibleOutlined onClick={handleShowPassword} className="eye-icon"/> : <EyeOutlined className="eye-icon" onClick={handleShowPassword}/>}
    </>
  )
}
export default ShowHidePasswordIcon;
