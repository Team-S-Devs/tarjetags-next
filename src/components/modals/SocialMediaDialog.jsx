import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
  Grid,
  Typography,
} from '@mui/material';
import { socialMediaOptions } from '../../sections/SocialMediaButtons';

const SocialMediaDialog = (
    { open, onClose, elementsInfo = {title: "", description: "", socialLinks: [] }, setElementsInfo,
    indexEditSocialLink, isEditing = false }
) => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [profileLink, setProfileLink] = useState('');
  const [error, setError] = useState(false)

  const handleIconClick = (name) => {
    setError("")
    if (selectedIcon === name) {
      setSelectedIcon(null);
    } else {
      setSelectedIcon(name);
    }
  };
  
  useEffect(() => {
    if(isEditing) {
        setSelectedIcon(elementsInfo.socialLinks[indexEditSocialLink].name)
        setProfileLink(elementsInfo.socialLinks[indexEditSocialLink].url)
    } else {
        setSelectedIcon(null);
        setProfileLink("")
    }
  }, [isEditing])
  

  const handleSave = () => {
    if (selectedIcon && profileLink.trim() !== '') {
        if(!isEditing){
            setElementsInfo(
                {...elementsInfo, socialLinks: [...elementsInfo.socialLinks, { name: selectedIcon, url: profileLink.trim() }]}
            )
        } else {
            let socialLinksCopy = [...elementsInfo.socialLinks];
            socialLinksCopy[indexEditSocialLink] = { name: selectedIcon, url: profileLink.trim() }
            setElementsInfo({...elementsInfo, socialLinks: socialLinksCopy})
        }
        setSelectedIcon(null)
        setProfileLink("")
        onClose();
    } else if(!selectedIcon) {
      setError('Selecciona un ícono.');
    } else {
      setError('Introduce el link de tu perfil de la red social.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Selecciona tu red social</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {socialMediaOptions.map((option) => (
            <Grid item key={option.name} xs={3} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
              <IconButton
                style={{ color: selectedIcon === option.name ? option.color : undefined }}
                onClick={() => handleIconClick(option.name)}
              >
                {option.icon}
              </IconButton>
              <Typography variant='caption'>{option.name}</Typography>
            </Grid>
          ))}
        </Grid>
        <TextField
          label={`Enlace de tu perfil ${selectedIcon ? " en " + socialMediaOptions.find(option => option.name === selectedIcon).name : ""} `}
          fullWidth
          value={profileLink}
          onChange={(e) => {
            setError("")
            setProfileLink(e.target.value)
          }}
          placeholder={
            selectedIcon ? `Ej. ${socialMediaOptions.find(option => option.name === selectedIcon).placeholder}` 
                : 'Ej. https://link-red-social.com/tuperfil'}
          style={{ marginTop: '28px' }}
        />
        {
            error !== "" && <Typography variant='body2' color="error">{error}</Typography>
        }
      </DialogContent>
      <DialogActions style={{ marginBottom: 16, marginRight: 8 }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SocialMediaDialog;
