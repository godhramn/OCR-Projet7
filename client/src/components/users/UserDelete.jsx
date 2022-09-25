import axios from "axios";
import React from "react";
import { Button, IconButton } from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

function UserDelete({
  user,
  setUpdateUser,
  userId,
  setUserId,
  deleteUser,
  setDeleteUser,
}) {
  const handleDeleteUser = (e) => {
    e.preventDefault();

    axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}api/users/${userId}`,
      withCredentials: true,
    })
      .then(() => {
        alert("Compte supprimé");
        setUpdateUser(false);
        window.location("/profil");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {(userId !== user._id || deleteUser === false) && (
        <IconButton
          onClick={() => {
            setDeleteUser(true);
            setUpdateUser(false);
            setUserId(user._id);
          }}
        >
          <DeleteForeverRoundedIcon/>
        </IconButton>
      )}
      {deleteUser === true && user._id === userId && (
        <div className='delete-user-interaction'>
          <p>Voulez-vous vraiment supprimer votre compte ?</p>
          <Button className='delete-user-btn' onClick={handleDeleteUser}>
            Confirmer
          </Button>
          <Button
            className='delete-user-btn'
            onClick={() => {
              setDeleteUser(false);
              setUserId('');
            }}
          >
            Annuler
          </Button>
        </div>
      )}
    </>
  );
}

export default UserDelete;