import { useUser } from "./api/user/v1/user_rbt_react";
import { useState } from "react";

const STARTER_USER_ID = "reboot-user";

function UpdateUser() {
  const { set } = useUser({ id: STARTER_USER_ID });
  const [email, setEmail] = useState<string>();

  const handleChangeEmail = () => set({ email });

  return (
    <>
      <div>Update Email: </div>
      <input onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleChangeEmail}>Update</button>
    </>
  );
}

export default UpdateUser;
