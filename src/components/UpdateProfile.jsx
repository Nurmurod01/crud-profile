import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Updateprofile() {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    username: "",
    gender: "female",
    email: "",
    name: "",
    age: "",
    image: null,
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleGenderChange = (e) => {
    setFormData((prev) => ({ ...prev, gender: e.target.value }));
  };
  const handleBack = () => {
    navigate("/profile");
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const data = new FormData();
    const location = "127.168.0.1/profile";
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      const response = await fetch(
        "https://mustafocoder.pythonanywhere.com/auth/update-profile/",
        {
          method: "PUT",
          headers: {
            Authorization: `Token ${token}`,
          },
          body: data,
        }
      );

      if (response.ok) {
        alert("Profile updated successfully");
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || "Failed to update profile"}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="mt-5">
      <form className="flex flex-col w-full items-center gap-5">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Update profile
        </Typography>
        <TextField
          id="outlined-username"
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <RadioGroup
          name="gender"
          value={formData.gender}
          onChange={handleGenderChange}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>
        <TextField
          id="outlined-email"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          id="outlined-name"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          id="outlined-age"
          label="Age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        <Button component="label" variant="contained" color="primary">
          Upload profile picture
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        <div>
          <Button variant="contained" color="error" onClick={handleBack}>
            Back
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{ m: 1 }}
            onClick={handleSubmit}
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
