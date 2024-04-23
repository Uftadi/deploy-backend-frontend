import bgYellow from "../assets/images/wave-haikei.svg";
import avatar from "../assets/images/avatar.png";
import { TbPhotoEdit } from "react-icons/tb";
import { useContext, useEffect, useRef, useState } from "react";
import { Logo } from "../components";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoArrowBackOutline } from "react-icons/io5";
const Profile = () => {
	const {
		isAuthenticated,
		setIsAuthenticated,
		backendApiUrl,
		userId,
		setUserData,
		userData,
		checkIfIsAuthenticated,
		currentUser,
		setCurrentUser,
	} = useContext(UserContext);

	const navigate = useNavigate();
	const [isChanged, setIsChanged] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const fileInputRef = useRef(null);

	useEffect(() => {
		const check = async () => {
			const checkIsAuth = await checkIfIsAuthenticated();
			if (checkIsAuth) {
				setIsAuthenticated(true);
				console.log("authenticated");
			} else {
				navigate("/login");
				setIsAuthenticated(false);
				console.log("not authenticated");
			}
		};
		check();
	}, [isAuthenticated]);

	const handleFormRequest = async (e) => {
		e.preventDefault();
		setCurrentUser({
			username: userData.userName,
			email: userData.email,
			password: userData.password,
		});
		try {
			const res = await axios.post(`${backendApiUrl}/updateProfile/${userId}`, {
				username: !userData.userName ? currentUser.username : userData.userName,
				email: !userData.email ? currentUser.email : userData.email,
				password: userData.password,
			});
			console.log("Profil erfolgreich aktualisiert:", res.data);
		} catch (error) {
			console.error("Fehler beim Aktualisieren des Profils:", error);
		}
	};
	const handleFormChange = (e) => {
		e.preventDefault();
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};
	const handleProfileImage = () => {
		fileInputRef.current.click();
	};

	const handleDeletePhoto = async () => {
		try {
			if (!currentUser.image) {
				return;
			} else {
				const res = await axios.post(
					`${backendApiUrl}/deletePhoto/${userId}`,
					{
						imageUrl: "",
					},
					{ headers: { "Content-Type": "multipart/form-data" } }
				);
				setUserData({
					imageUrl: "",
				});
				setCurrentUser({
					image: res.data.imageUrl,
				});
			}
		} catch (error) {
			console.log("failed delete image", error);
		}
	};
	console.log(currentUser);

	const handleImageChange = async (e) => {
		const imageFile = e.target.files[0];
		const reader = new FileReader();
		reader.onload = async () => {
			const base64Image = reader.result.replace(
				/^data:image\/[a-z]+;base64,/,
				""
			);
			const formData = new FormData();
			formData.append("files", base64Image);
			try {
				const res = await axios.post(
					`${backendApiUrl}/updateImage/${userId}`,
					formData,
					{ headers: { "Content-Type": "multipart/form-data" } }
				);
				setUserData({
					imageUrl: base64Image,
				});
				setCurrentUser({ image: base64Image });
			} catch (error) {
				console.log("failed upload image", error);
			}
		};
		reader.readAsDataURL(imageFile);
		console.log(reader);
	};

	if (isAuthenticated) {
		return (
			<div className="min-h-screen w-full bg-gray-800 text-white">
				<div className="relative flex justify-center items-center">
					<div className="w-full h-[210px]">
						<img
							src={bgYellow}
							className="w-full h-full object-cover object-bottom"
						/>
					</div>
					<Logo
						width={35}
						height={35}
						textClasses="font-bold text-sm md:text-lg lg:text-xl"
						divStyle="absolute left-16 top-[22.5px]"
					/>
					<div className="group w-[200px] h-[200px] absolute -bottom-16 ">
						<img
							src={
								currentUser.image == "undefined" ? avatar : currentUser.image
							}
							alt="avatar"
							className=" w-full h-full object-cover rounded-full relative  group-hover:blur-sm"
						/>
						<TbPhotoEdit
							className="text-5xl absolute right-0 bottom-2 bg-gray-800 p-2 rounded-full cursor-pointer"
							onClick={handleProfileImage}
						/>
						<button
							onClick={handleDeletePhoto}
							className="absolute right-20 top-24 bg-gray-800p-1 border-2 rounded-md hidden group-hover:block     "
						>
							Delete
						</button>
					</div>
				</div>
				<div className="my-32 mb-16 mx-auto w-[400px] lg:w-[550px] flex items-center relative">
					<IoArrowBackOutline
						className="absolute left-0 rounded-full h-7 w-7 text-2xl cursor-pointer hover:text-black duration-300 delay-75 hover:-translate-x-1 hover:bg-yellow-400"
						onClick={() => window.history.back()}
					/>
					<span className="text-center w-full font-semibold text-3xl">
						Edit Profile
					</span>
				</div>
				<input
					type="file"
					ref={fileInputRef}
					id="image"
					name="image"
					accept="image/*"
					onChange={handleImageChange}
					className="hidden"
				/>
				<form
					onSubmit={handleFormRequest}
					className="w-[400px] pb-10 lg:w-[550px] mx-auto flex flex-col gap-5 justify-center items-center"
				>
					<div className="flex flex-col w-full">
						<label htmlFor="userName">User Name</label>
						<input
							className="w-full h-10 px-5 py-3 border-2 border-gray-800 text-black rounded-md placeholder:text-black"
							type="text"
							name="userName"
							id="userName"
							placeholder={currentUser.username}
							onChange={(e) => handleFormChange(e)}
							autoComplete="on"
						/>
					</div>
					<div className="flex flex-col w-full">
						<label htmlFor="email">Email</label>
						<input
							className="w-full h-10 px-5 py-3 border-2 border-gray-800 text-black rounded-md placeholder:text-black"
							type="email"
							name="email"
							id="email"
							placeholder={currentUser.email}
							onChange={(e) => handleFormChange(e)}
							autoComplete="on"
						/>
					</div>
					<div className="flex flex-col w-full relative">
						<label htmlFor="password">New Password</label>
						<input
							className="w-full h-10 pl-5 pr-8 py-3 border-2 border-gray-800 text-black rounded-md"
							type={showPassword ? "text" : "password"}
							name="password"
							id="password"
							placeholder="Password"
							onChange={(e) => handleFormChange(e)}
						/>
						{!showPassword ? (
							<FaEye
								className="absolute bottom-3 right-3 text-black cursor-pointer"
								onClick={() => setShowPassword(true)}
							/>
						) : (
							<FaEyeSlash
								className="absolute bottom-3 right-3 text-black cursor-pointer"
								onClick={() => setShowPassword(false)}
							/>
						)}
					</div>
					<button
						type="submit"
						className="bg-[#DFB700] text-black p-2 rounded-md font-bold text-lg hover:scale-95 transition"
					>
						confirm Changes
					</button>
				</form>
			</div>
		);
	}
};
export default Profile;
