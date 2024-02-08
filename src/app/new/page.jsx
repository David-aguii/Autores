"use client";
import "./new.css";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/system/Box";
import { useState } from "react";
import axios from "axios";
 
import TopNav from '../components/TopNav'
 
import { useRouter } from "next/navigation";
const NewAutor = () => {
  const [nombre, setNombre] = useState("");
  const router = useRouter()
  
  const handleCreateAutor = async (e) => {
    e.preventDefault();
    try {
      if(nombre.length>3){
        const data = {
            nombre
          }
     const response = await axios.post("http://localhost:8000/api/autor", data);
  
      if (response.status === 201) {
        alert("Autor agregado exitosamente.");
        setNombre("");
        router.push("/");
      } 
     }else{
        alert("Debes de escribir al menos 3 caracteres")
     }} catch (error) {
      console.log(error);
    } 
      
  
      
  };

  return (
    <div>
      <TopNav titulo="back to home" direccion="../"  />
      <h3>Add a new author </h3>
      <Box
        sx={{ border: "3px solid black", padding: 4, width: 700, height: 350 }}
      >
        <form >
          <Stack direction={"row"}>
            <Stack direction="column" spacing={1}>
              <Stack spacing={1} alignItems="flex-start">
                <Typography
                  variant="h6"
                  component="label"
                  sx={{ minWidth: "fit-content" }}
                >
                  {" "}
                  Autor Name:
                </Typography>
                <TextField
                  type="text"
                  size="small"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  helperText={
                    nombre.length < 3 && nombre.length>0
                      ? "Debes de escribir al menos 3 caracteres"
                      : ""
                  }
                  error={nombre.length < 3 && nombre.length>0}
                />
                <button className="button">Cancel</button>
                 <Stack className="buttons">
                    <button className="button"onClick={handleCreateAutor}>Submit</button>
                </Stack>
              </Stack>
              </Stack>
              </Stack>
        </form>
      </Box>
    </div>
  );
}

export default NewAutor;
