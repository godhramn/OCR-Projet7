import React, { useContext, useState } from "react";
import { UidContext } from "../AppContext";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Box, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


const UserUpdate = () => {
  const uid = useContext(UidContext);
  let paramsId = useParams();
  const [isUpdatingImage, setIsUpdatingImage] = useState(false);
  const [imageURL, setImageURL] = useState(null);

  const handleImage = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("image", imageURL);

    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/users/${uid}`,
      withCredentials: true,

      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(() => {
        alert("Image modifiée");
        setIsUpdatingImage(false);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Box className="update-image">
          {paramsId === uid && isUpdatingImage === false && (
            <Box className="image-btn-bloc">
              <Button
                variant="outlined"
                className="image-btn"
                onClick={() => setIsUpdatingImage(true)}
              >
                Modifier
              </Button>
            </Box>
          )}
          {paramsId === uid && isUpdatingImage && (
            <>
              <Box className="image-btn-bloc">
                <Button
                  type="submit"
                  className="image-btn"
                  onClick={handleImage}
                  endIcon={<CheckCircleIcon />}
                >
                  Valider
                </Button>
                <Button
                  className="image-btn"
                  onClick={() => setIsUpdatingImage(false)}
                  endIcon={<CancelIcon />}
                >
                  Annuler
                </Button>
              </Box>
              <form>
                <label htmlFor="file"></label>
                <input
                  type="file"
                  id="file"
                  className="choose-image"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => setImageURL(e.target.files[0])}
                />
              </form>
            </>
          )}
      </Box>
      
    </>
  );
};

export default UserUpdate;

