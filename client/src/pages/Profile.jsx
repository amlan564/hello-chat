import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.png";
import { ChevronLeft, Pen } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { authUser, updateProfile } = useContext(AuthContext);

  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      await updateProfile({ fullName: name, bio });
      navigate("/");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePic: base64Image, fullName: name, bio });
      navigate("/");
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center max-sm:py-10">
      <div className="w-5/6 max-w-2xl max-sm:max-w-sm p-10 bg-[#2e2e2f] text-gray-100 flex max-sm:flex-col-reverse items-center justify-between gap-12 border-2 border-gray-600 rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1">
          <h3 className="text-lg">Profile Details</h3>
          <div>
            <label htmlFor="avatar" className="inline-block cursor-pointer">
              <input
                onChange={(e) => setSelectedImage(e.target.files[0])}
                type="file"
                id="avatar"
                accept=".png, .jpg, .jpeg"
                hidden
              />
              <div className="relative text-center">
                <img
                  src={
                    selectedImage ? URL.createObjectURL(selectedImage) : avatar
                  }
                  alt=""
                  className="max-sm:w-16 max-sm:h-16 w-20 h-20 object-cover rounded-full"
                />
                <div className="bg-violet-600 w-5 h-5 rounded-full flex items-center justify-center absolute bottom-0 right-0">
                  <Pen size={12} />
                </div>
              </div>
            </label>
          </div>
          <div>
            <p className="mb-2">Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Your Name"
              className="w-full p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              required
            />
          </div>
          <div>
            <p className="mb-2">Bio</p>
            <textarea
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              rows={4}
              placeholder="Write a short bio..."
              className="w-full p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="p-2 bg-gradient-to-r from-blue-600 to-violet-700 text-white rounded-md cursor-pointer"
          >
            Save
          </button>
        </form>
        <div>
          <img
            src={authUser?.profilePic}
            alt=""
            className="max-sm:w-25 max-sm:h-25 w-40 h-40 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
