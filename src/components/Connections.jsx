import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      // Handle Error Case
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;
  if (connections.length === 0) return <h1> No Connections Found</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-white text-3xl">Connections</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;
        return (
          <div
            key={_id}
            className="flex items-center m-4 p-4 rounded-lg bg-base-300 max-w-2xl w-full mx-auto shadow-lg"
          >
            {/* Image with fixed size and rounded shape */}
            <div className="flex-shrink-0">
              <img
                alt="photo"
                className="w-20 h-20 object-cover rounded-full border-2 border-white"
                src={photoUrl}
              />
            </div>

            {/* Text content with proper spacing */}
            <div className="text-left ml-4 flex-1">
              <h2 className="font-bold text-2xl">{firstName + " " + lastName}</h2>
              {age && gender && <p className="text-md text-gray-400">{`${age}, ${gender}`}</p>}
              <p className="text-md text-gray-300 mt-1">{about}</p>
            </div>
            <Link to={"/chat/" + _id}>
              <button className="btn btn-primary">Chat</button>
            </Link>
          </div>
        );
      })}
    </div>


  );
};
export default Connections;