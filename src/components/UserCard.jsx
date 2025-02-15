import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about, saveProfile } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    if (!userId) {
      console.error("❌ Error: User ID is undefined, request not sent.");
      return;
    }
    try {
      const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true })
      console.log(res.data);
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Error sending request:", err.response.data || err.message);
    }
  }
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={user.photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-12">

          {!saveProfile && (<>
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignored
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </>
          )}
        </div>
      </div>
    </div>
  );
};
export default UserCard;